package main

import (
	"log"
	"net/http"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	if request.HTTPMethod == "POST" {
		operation := request.PathParameters["operation"]
		log.Printf("IP %v is attempting operation: %s", request.RequestContext.Identity.SourceIP, operation)
		var response events.APIGatewayProxyResponse
		switch strings.ToUpper(operation) {
		case "CREATE":
			response = CreateEndpoint(request)
		case "UPDATE":
			response = UpdateEndpoint(request)
		case "DELETE":
			response = DeleteEndpoint(request)
		case "ALL":
			response = GetAllEndpoint(request)
		default:
			response = events.APIGatewayProxyResponse{
				Headers: map[string]string{
					"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
					"Access-Control-Allow-Origin":  "*",
					"Access-Control-Allow-Methods": "OPTIONS,POST",
				},
				Body:       "Invalid Operation",
				StatusCode: http.StatusBadRequest,
			}
		}
		if response.StatusCode != http.StatusOK {
			log.Printf("Failed to complete requested operation")
		} else {
			log.Printf("Successfully performed requested operation")
		}
		return response, nil
	} else if request.HTTPMethod == "GET" {
		operation := request.PathParameters["operation"]
		log.Printf("IP %v is attempting operation: %s", request.RequestContext.Identity.SourceIP, operation)
		var response events.APIGatewayProxyResponse
		switch strings.ToUpper(operation) {
		case "ALL":
			response = GetAllEndpoint(request)
		default:
			response = GetBlogEndpoint(request)
		}
		if response.StatusCode != http.StatusOK {
			log.Printf("Failed to complete requested operation")
		} else {
			log.Printf("Successfully performed requested operation")
		}
		return response, nil
	} else {
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "OPTIONS,POST",
			},
			Body:       "Invalid HTTP Event",
			StatusCode: http.StatusBadRequest,
		}, nil
	}
}

func main() {
	lambda.Start(handler)
}
