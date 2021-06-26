package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/aws/aws-lambda-go/events"
)

type BlogPost struct {
	Title   string
	Content string
	Date    string
	Author  string
}

func CreateEndpoint(rawPayload events.APIGatewayProxyRequest) events.APIGatewayProxyResponse {
	log.Println("Create endpoint begun")
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
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "OPTIONS,POST",
			},
			Body:       "Create Endpoint",
			StatusCode: http.StatusOK,
		}
	}
}

func DeleteEndpoint(rawPayload events.APIGatewayProxyRequest) events.APIGatewayProxyResponse {
	log.Println("Delete endpoint begun")
	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
			"Access-Control-Allow-Origin":  "*",
			"Access-Control-Allow-Methods": "OPTIONS,POST",
		},
		Body:       "Delete Endpoint",
		StatusCode: http.StatusOK,
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
