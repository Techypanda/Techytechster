package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

type DeleteRequest struct {
	Title string
}

func DeleteEndpoint(rawPayload events.APIGatewayProxyRequest) events.APIGatewayProxyResponse {
	log.Println("Delete endpoint begun")
	auth, authErr := ValidateJWT(rawPayload.Headers["Authorization"])
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
		err = DeleteBlog(payload.Title)
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

func DeleteBlog(blogTitle string) error {
	log.Printf("Attempting to delete blog: %s", blogTitle)
	post, err := GetBlog(blogTitle)
	if err != nil {
		return err
	}
	newSession := session.Must(session.NewSession())
	client := dynamodb.New(newSession, aws.NewConfig().WithRegion("ap-southeast-2"))
	if client != nil {
		input := &dynamodb.DeleteItemInput{
			Key: map[string]*dynamodb.AttributeValue{
				"BlogTitle": {
					S: aws.String(strings.Title(strings.ToLower(post.Title))),
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
