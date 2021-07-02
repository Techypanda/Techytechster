package main

import (
	"bytes"
	"encoding/base64"
	"encoding/gob"
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type GetAllResponse struct {
	Posts     []DynamoDBBlog
	NextPage  string // serialized key, end user doesnt need the object
	PageCount int64
}

type GetAllPayload struct {
	NextPage  *string
	PageCount *int64
}

func GetAllEndpoint(request events.APIGatewayProxyRequest) events.APIGatewayProxyResponse {
	log.Printf("Attempting to retrieve a page of blogs")
	var pageCount int64 = 10 // Max is 10 im not made of money
	itemCount, err := estimateItems()
	if err != nil {
		log.Printf("Failed to estimate item count: %s", err.Error())
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "OPTIONS,POST",
			},
			Body:       fmt.Sprintf("Failed to estimate dynamodb items: %s", err.Error()),
			StatusCode: http.StatusInternalServerError,
		}
	}

	payload, err := interpretPayload(request)
	if err != nil {
		log.Printf("Failed to interpret payload: %s, assuming default payload!", err.Error())
		payload = new(GetAllPayload)
	}

	if payload.PageCount != nil {
		if *payload.PageCount > 0 && *payload.PageCount < pageCount {
			pageCount = *payload.PageCount
		}
	}
	pages := math.Ceil(float64(*itemCount) / float64(pageCount))

	var pageKey *map[string]*dynamodb.AttributeValue
	if payload.NextPage != nil {
		pageKey, err = deserializeKey(*payload.NextPage)
		if err != nil {
			log.Printf("Failed to deserialize key: %s", err.Error())
			return events.APIGatewayProxyResponse{
				Headers: map[string]string{
					"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
					"Access-Control-Allow-Origin":  "*",
					"Access-Control-Allow-Methods": "OPTIONS,POST",
				},
				Body:       fmt.Sprintf("Failed to deserialize key: %s", err.Error()),
				StatusCode: http.StatusBadRequest,
			}
		}
	}

	currentPage, err := retrievePage(&pageCount, pageKey)
	if err != nil {
		log.Printf("Failed to retrieve page: %s", err.Error())
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "OPTIONS,POST",
			},
			Body:       fmt.Sprintf("Failed to estimate dynamodb items: %s", err.Error()),
			StatusCode: http.StatusBadRequest,
		}
	}
	resp := GetAllResponse{}
	err = dynamodbattribute.UnmarshalListOfMaps(currentPage.Items, &resp.Posts)
	if err != nil {
		log.Printf("Failed to unmarshal page: %s", err.Error())
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "OPTIONS,POST",
			},
			Body:       fmt.Sprintf("Failed to unmarshal page: %s", err.Error()),
			StatusCode: http.StatusInternalServerError,
		}
	}
	resp.PageCount = int64(pages)
	serializedKey, err := serializeKey(currentPage.LastEvaluatedKey)
	if err != nil {
		log.Printf("Failed to serialize last page key: %s", err.Error())
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "OPTIONS,POST",
			},
			Body:       fmt.Sprintf("Failed to serialize last page key: %s", err.Error()),
			StatusCode: http.StatusInternalServerError,
		}
	}

	resp.NextPage = *serializedKey
	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Printf("Failed to marshal to json: %s", err.Error())
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "OPTIONS,POST",
			},
			Body:       fmt.Sprintf("Failed to marshal to json: %s", err.Error()),
			StatusCode: http.StatusInternalServerError,
		}
	}
	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
			"Access-Control-Allow-Origin":  "*",
			"Access-Control-Allow-Methods": "OPTIONS,POST",
		},
		Body:       string(jsonResp),
		StatusCode: http.StatusOK,
	}
}

func GetBlogEndpoint(request events.APIGatewayProxyRequest) events.APIGatewayProxyResponse {
	log.Printf("Attempting to get blog: %s", strings.ToUpper(request.PathParameters["operation"]))
	blogTitle := request.PathParameters["operation"]
	post, err := GetBlog(strings.ToUpper(blogTitle))
	if err != nil {
		log.Printf("Failed to get a post, error occured: %s", err.Error())
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "OPTIONS,POST",
			},
			Body:       fmt.Sprintf("Failed to get post: %s", err.Error()),
			StatusCode: http.StatusBadRequest,
		}
	}
	if post == nil {
		log.Printf("Failed to get a post it does not exist")
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "OPTIONS,POST",
			},
			Body:       "Failed to get post, it does not exist",
			StatusCode: http.StatusBadRequest,
		}
	}
	log.Printf("Successfully returning blog")
	post.Title = strings.Title(strings.ToLower(post.Title))
	jsonPost, err := json.Marshal(post)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "OPTIONS,POST",
			},
			Body:       "Failed to marshal post",
			StatusCode: http.StatusInternalServerError,
		}
	}
	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
			"Access-Control-Allow-Origin":  "*",
			"Access-Control-Allow-Methods": "OPTIONS,POST",
		},
		Body:       string(jsonPost),
		StatusCode: http.StatusOK,
	}
}

func estimateItems() (*int64, error) {
	client := dynamodb.New(session.Must(session.NewSession()))
	descInput := &dynamodb.DescribeTableInput{
		TableName: aws.String("Techytechster-Blog"),
	}
	res, err := client.DescribeTable(descInput)
	if err != nil {
		return nil, err
	}
	return res.Table.ItemCount, nil
}

func interpretPayload(in events.APIGatewayProxyRequest) (*GetAllPayload, error) {
	var payload GetAllPayload
	if err := json.Unmarshal([]byte(in.Body), &payload); err != nil {
		return nil, fmt.Errorf("error unmarshling payload: %v", err.Error())
	}
	return &payload, nil
}

func retrievePage(pageCount *int64, lastPage *map[string]*dynamodb.AttributeValue) (*dynamodb.ScanOutput, error) {
	client := dynamodb.New(session.Must(session.NewSession()))
	var input *dynamodb.ScanInput
	if lastPage != nil {
		input = &dynamodb.ScanInput{
			TableName:         aws.String("Techytechster-Blog"),
			Limit:             pageCount,
			ExclusiveStartKey: *lastPage,
		}
	} else {
		input = &dynamodb.ScanInput{
			TableName: aws.String("Techytechster-Blog"),
			Limit:     pageCount,
		}
	}
	return client.Scan(input)
}

func serializeKey(key map[string]*dynamodb.AttributeValue) (*string, error) {
	b := bytes.Buffer{}
	e := gob.NewEncoder(&b)
	err := e.Encode(key)
	if err != nil {
		return nil, err
	}
	encodedStr := base64.StdEncoding.EncodeToString(b.Bytes())
	return &encodedStr, nil
}

func deserializeKey(key string) (*map[string]*dynamodb.AttributeValue, error) {
	deserialized := map[string]*dynamodb.AttributeValue{}
	by, err := base64.StdEncoding.DecodeString(key)
	if err != nil {
		return nil, err
	}
	b := bytes.Buffer{}
	b.Write(by)
	d := gob.NewDecoder(&b)
	err = d.Decode(&deserialized)
	if err != nil {
		return nil, err
	}
	return &deserialized, nil
}
