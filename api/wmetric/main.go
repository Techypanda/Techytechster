package main

import (
	"fmt"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	payload, err := ParseBody(request.Body)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body:       fmt.Sprintf("That is a invalid request: %v", err.Error()),
			StatusCode: http.StatusBadRequest,
		}, nil
	}
	return events.APIGatewayProxyResponse{
		Body:       fmt.Sprintf("Logged user activity for ip: %s", payload.IPAddress),
		StatusCode: http.StatusOK,
	}, nil
}

func main() {
	lambda.Start(handler)
}
