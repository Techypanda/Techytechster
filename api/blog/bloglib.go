package main

import (
	"log"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
)

func CreateEndpoint(payload events.APIGatewayProxyRequest) events.APIGatewayProxyResponse {
	log.Println("Create endpoint begun")
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

func DeleteEndpoint(payload events.APIGatewayProxyRequest) events.APIGatewayProxyResponse {
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

func UpdateEndpoint(payload events.APIGatewayProxyRequest) events.APIGatewayProxyResponse {
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
