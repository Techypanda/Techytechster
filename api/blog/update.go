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

type UpdateRequest struct {
	OldTitle   string
	NewTitle   string
	OldContent string
	NewContent string
	OldAuthor  string
	NewAuthor  string
	Date       string
}

func UpdateEndpoint(rawPayload events.APIGatewayProxyRequest) events.APIGatewayProxyResponse {
	log.Println("Update endpoint begun")
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
		payload, err := processUpdatePayload(rawPayload)
		if err != nil {
			log.Printf("Failed to process payload for update: %s", err.Error())
			return events.APIGatewayProxyResponse{
				Headers: map[string]string{
					"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
					"Access-Control-Allow-Origin":  "*",
					"Access-Control-Allow-Methods": "OPTIONS,POST",
				},
				Body:       fmt.Sprintf("Incorrect payload: %s", err.Error()),
				StatusCode: http.StatusBadRequest,
			}
		}
		log.Printf("Updating old post with title: %s, author: %s, content: %s; with new fields, title: %s, author: %s, content: %s", payload.OldTitle, payload.OldAuthor, payload.OldContent, payload.NewTitle, payload.NewAuthor, payload.NewContent)
		err = UpdateBlog(*payload)
		if err != nil {
			log.Printf("Failed to update: %s", err.Error())
			return events.APIGatewayProxyResponse{
				Headers: map[string]string{
					"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
					"Access-Control-Allow-Origin":  "*",
					"Access-Control-Allow-Methods": "OPTIONS,POST",
				},
				Body:       fmt.Sprintf("Failure to update: %s", err.Error()),
				StatusCode: http.StatusBadRequest,
			}
		}
		log.Println("Successfully Updated Blog")
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "OPTIONS,POST",
			},
			Body:       "Successfully updated",
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

func UpdateBlog(req UpdateRequest) error { // UpdateItem cant update primary keys.
	err := DeleteBlog(req.OldTitle)
	if err != nil {
		return err
	}
	err = CreateBlog(BlogPost{Author: req.NewAuthor, Content: req.NewContent, Date: req.Date, Title: req.NewTitle})
	if err != nil {
		return err
	}
	return nil
}

func processUpdatePayload(payload events.APIGatewayProxyRequest) (*UpdateRequest, error) {
	var req UpdateRequest
	if err := json.Unmarshal([]byte(payload.Body), &req); err != nil {
		return nil, fmt.Errorf("error unmarshling payload: %v", err.Error())
	}
	if req.NewAuthor == "" {
		return nil, errors.New("new author is empty in payload")
	}
	if req.NewContent == "" {
		return nil, errors.New("new content is empty in payload")
	}
	if req.NewTitle == "" {
		return nil, errors.New("new title is empty in payload")
	}
	if req.OldAuthor == "" {
		return nil, errors.New("old author is empty in payload")
	}
	if req.OldContent == "" {
		return nil, errors.New("old content is empty in payload")
	}
	if req.OldTitle == "" {
		return nil, errors.New("old title is empty in payload")
	}
	loc, locErr := time.LoadLocation("Australia/Perth")
	if locErr != nil {
		return nil, errors.New("error loading australia/perth time")
	}
	timeNow := time.Now().In(loc)
	currentDate := fmt.Sprint(timeNow.Format(time.RFC3339))
	req.Date = currentDate
	return &req, nil
}
