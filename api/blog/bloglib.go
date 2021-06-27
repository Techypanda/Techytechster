package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/dgrijalva/jwt-go"
	"github.com/lestrrat-go/jwx/jwk"
)

type DynamoDBBlog struct {
	BlogTitle string
	Content   string
	Date      string
	Author    string
}

type BlogPost struct {
	Title   string
	Content string
	Date    string
	Author  string
}

type DeleteRequest struct {
	Title string
}

func CreateEndpoint(rawPayload events.APIGatewayProxyRequest) events.APIGatewayProxyResponse {
	log.Println("Create endpoint begun")
	authStatus, authErr := validateJWT(rawPayload.Headers["Authorization"])
	if authErr != nil {
		log.Printf("Error occured in JWT validation: %v", authErr.Error())
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "OPTIONS,POST",
			},
			Body:       fmt.Sprintf("Error occured in JWT validation: %v", authErr.Error()),
			StatusCode: http.StatusUnauthorized,
		}
	}
	if authStatus {
		log.Println("Successfully authenticated")
		payload, err := processPayload(rawPayload)
		if err != nil {
			log.Println("Invalid payload for create endpoint")
			return events.APIGatewayProxyResponse{
				Headers: map[string]string{
					"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
					"Access-Control-Allow-Origin":  "*",
					"Access-Control-Allow-Methods": "OPTIONS,POST",
				},
				Body:       err.Error(),
				StatusCode: http.StatusBadRequest,
			}
		} else {
			log.Printf("Creating new post called: %s, created by %s", payload.Title, payload.Author)
			err = putBlog(*payload)
			if err != nil {
				return events.APIGatewayProxyResponse{
					Headers: map[string]string{
						"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
						"Access-Control-Allow-Origin":  "*",
						"Access-Control-Allow-Methods": "OPTIONS,POST",
					},
					Body:       fmt.Sprintf("Failed To Create Blog: %v", err.Error()),
					StatusCode: http.StatusBadRequest,
				}
			} else {
				return events.APIGatewayProxyResponse{
					Headers: map[string]string{
						"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
						"Access-Control-Allow-Origin":  "*",
						"Access-Control-Allow-Methods": "OPTIONS,POST",
					},
					Body:       "Successfully Created New Blog",
					StatusCode: http.StatusOK,
				}
			}
		}
	} else {
		log.Println("Failed authentication")
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "OPTIONS,POST",
			},
			Body:       "Failed To Validate JWT",
			StatusCode: http.StatusUnauthorized,
		}
	}
}

func DeleteEndpoint(rawPayload events.APIGatewayProxyRequest) events.APIGatewayProxyResponse {
	log.Println("Delete endpoint begun")
	auth, authErr := validateJWT(rawPayload.Headers["Authorization"])
	if authErr != nil {
		log.Printf("Error occured in JWT validation: %v", authErr.Error())
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "OPTIONS,POST",
			},
			Body:       fmt.Sprintf("Error occured in JWT validation: %v", authErr.Error()),
			StatusCode: http.StatusUnauthorized,
		}
	}
	if auth {
		payload, err := processDeletePayload(rawPayload)
		if err != nil {
			return events.APIGatewayProxyResponse{
				Headers: map[string]string{
					"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
					"Access-Control-Allow-Origin":  "*",
					"Access-Control-Allow-Methods": "OPTIONS,POST",
				},
				Body:       fmt.Sprintf("Error occured in JSON payload: %v", err.Error()),
				StatusCode: http.StatusBadRequest,
			}
		}
		log.Printf("Attempting to delete: %s", payload.Title)
		err = deleteBlog(payload.Title)
		if err != nil {
			log.Printf("Failed to delete due to error: %s", err.Error())
			return events.APIGatewayProxyResponse{
				Headers: map[string]string{
					"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
					"Access-Control-Allow-Origin":  "*",
					"Access-Control-Allow-Methods": "OPTIONS,POST",
				},
				Body:       fmt.Sprintf("Error occured in deleting post: %v", err.Error()),
				StatusCode: http.StatusBadRequest,
			}
		}
		log.Printf("Successfully Deleted: %s", payload.Title)
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "OPTIONS,POST",
			},
			Body:       "Deleted post successfully",
			StatusCode: http.StatusOK,
		}
	} else {
		log.Println("Failed authentication")
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "OPTIONS,POST",
			},
			Body:       "Failed To Validate JWT",
			StatusCode: http.StatusUnauthorized,
		}
	}
}

func UpdateEndpoint(rawPayload events.APIGatewayProxyRequest) events.APIGatewayProxyResponse {
	log.Println("Update endpoint begun")
	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
			"Access-Control-Allow-Origin":  "*",
			"Access-Control-Allow-Methods": "OPTIONS,POST",
		},
		Body:       "Update Endpoint",
		StatusCode: http.StatusOK,
	}
}

func processPayload(payload events.APIGatewayProxyRequest) (*BlogPost, error) {
	var post BlogPost
	if err := json.Unmarshal([]byte(payload.Body), &post); err != nil {
		return nil, fmt.Errorf("error unmarshling payload: %v", err.Error())
	}
	if post.Title == "" {
		return nil, errors.New("post title is empty in payload")
	}
	if post.Content == "" {
		return nil, errors.New("post content is empty in payload")
	}
	if post.Author == "" {
		return nil, errors.New("post author is empty in payload")
	}
	loc, locErr := time.LoadLocation("Australia/Perth")
	if locErr != nil {
		return nil, errors.New("error loading australia/perth time")
	}
	timeNow := time.Now().In(loc)
	currentDate := fmt.Sprint(timeNow.Format(time.RFC3339))
	post.Date = currentDate
	return &post, nil
}

func processDeletePayload(payload events.APIGatewayProxyRequest) (*DeleteRequest, error) {
	var req DeleteRequest
	if err := json.Unmarshal([]byte(payload.Body), &req); err != nil {
		return nil, fmt.Errorf("error unmarshling payload: %v", err.Error())
	}
	if req.Title == "" {
		return nil, errors.New("post title is empty in payload")
	}
	return &req, nil
}

const cognitoJWKSURI string = "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_dXWQJmeqM/.well-known/jwks.json"

func validateJWT(accessTokenString string) (bool, error) {
	keySet, err := jwk.Fetch(context.TODO(), cognitoJWKSURI)
	_, err = jwt.Parse(accessTokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		kid, ok := token.Header["kid"].(string)
		if !ok {
			return nil, errors.New("kid header missing")
		}
		keys, ok := keySet.LookupKeyID(kid)
		if !ok {
			return nil, fmt.Errorf("key with specified kid is not present in jwks")
		}
		var publickey interface{}
		err = keys.Raw(&publickey)
		if err != nil {
			return nil, fmt.Errorf("could not parse pubkey")
		}
		return publickey, nil
	})
	if err != nil {
		return false, err
	}
	return true, nil
}

func deleteBlog(blogTitle string) error {
	log.Printf("Attempting to delete blog: %s", blogTitle)
	post, err := getBlog(blogTitle)
	if err != nil {
		return err
	}
	newSession := session.Must(session.NewSession())
	client := dynamodb.New(newSession, aws.NewConfig().WithRegion("ap-southeast-2"))
	if client != nil {
		input := &dynamodb.DeleteItemInput{
			Key: map[string]*dynamodb.AttributeValue{
				"BlogTitle": {
					S: aws.String(post.Title),
				},
				"Date": {
					S: aws.String(post.Date),
				},
			},
			TableName: aws.String("Techytechster-Blog"),
		}
		_, err := client.DeleteItem(input)
		if err != nil {
			return err
		}
		return nil
	} else {
		log.Printf("Failed to initialize dynamodb client!")
		return errors.New("dynamodb client could not be initialized")
	}
}

func getBlog(blogTitle string) (*BlogPost, error) {
	newSession := session.Must(session.NewSession())
	client := dynamodb.New(newSession, aws.NewConfig().WithRegion("ap-southeast-2"))
	if client != nil {
		input := &dynamodb.QueryInput{
			ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
				":title": {
					S: aws.String(blogTitle),
				},
			},
			KeyConditionExpression: aws.String("BlogTitle = :title"),
			TableName:              aws.String("Techytechster-Blog"),
		}
		result, getErr := client.Query(input)
		if getErr != nil {
			return nil, getErr
		}
		if *result.Count > 0 {
			ddb := DynamoDBBlog{}
			err := dynamodbattribute.UnmarshalMap(result.Items[0], &ddb)
			if err != nil {
				return nil, err
			}
			post := BlogPost{
				Title:   ddb.BlogTitle,
				Content: ddb.Content,
				Date:    ddb.Date,
				Author:  ddb.Author,
			}
			return &post, nil
		} else {
			return nil, errors.New("there is no blog with that title")
		}
	} else {
		return nil, errors.New("unable to construct dynamodb client")
	}
}

func putBlog(post BlogPost) error {
	newSession := session.Must(session.NewSession())
	client := dynamodb.New(newSession, aws.NewConfig().WithRegion("ap-southeast-2"))
	if client != nil {
		_, getErr := getBlog(post.Title)
		if getErr == nil {
			return errors.New("that blog already exists, please use update endpoint instead")
		}
		if getErr.Error() != "there is no blog with that title" {
			return getErr
		}
		data := &dynamodb.PutItemInput{
			Item: map[string]*dynamodb.AttributeValue{
				"BlogTitle": {
					S: aws.String(post.Title),
				},
				"Date": {
					S: aws.String(post.Date),
				},
				"Content": {
					S: aws.String(post.Content),
				},
				"Author": {
					S: aws.String(post.Author),
				},
			},
			TableName: aws.String("Techytechster-Blog"),
		}
		_, err := client.PutItem(data)
		return err
	} else {
		return errors.New("failed to create dynamodb client")
	}
}
