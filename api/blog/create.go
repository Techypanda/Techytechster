package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

type BlogPost struct {
	Title   string
	Content string
	Date    string
	Author  string
}

func CreateEndpoint(rawPayload events.APIGatewayProxyRequest) events.APIGatewayProxyResponse {
	log.Println("Create endpoint begun")
	authStatus, authErr := ValidateJWT(rawPayload.Headers["Authorization"])
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
			err = CreateBlog(*payload)
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

func CreateBlog(post BlogPost) error {
	newSession := session.Must(session.NewSession())
	client := dynamodb.New(newSession, aws.NewConfig().WithRegion("ap-southeast-2"))
	if client != nil {
		_, getErr := GetBlog(post.Title)
		if getErr == nil {
			return errors.New("that blog already exists, please use update endpoint instead")
		}
		if getErr.Error() != "there is no blog with that title" {
			return getErr
		}
		data := &dynamodb.PutItemInput{
			Item: map[string]*dynamodb.AttributeValue{
				"BlogTitle": {
					S: aws.String(strings.Title(strings.ToLower(post.Title))),
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
