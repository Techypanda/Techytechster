package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Printf("New User Has Hit WMetric, Attempting To Write IpAddress: %v to DynamoDB\n", request.RequestContext.Identity.SourceIP)
	wmetricdata, err := ParseContext(request.RequestContext.Identity.SourceIP)
	if err != nil {
		log.Printf("Failed To Record User: %v", err)
		return events.APIGatewayProxyResponse{
			Body:       fmt.Sprintf("Failure to record your visit today: %v", err.Error()),
			StatusCode: http.StatusBadRequest,
		}, nil
	}
	err = InsertWebsiteVisit(*wmetricdata)
	if err != nil {
		log.Printf("Failed To Record User: %v", err)
		return events.APIGatewayProxyResponse{
			Body:       fmt.Sprintf("Failure to record your visit today: %v", err.Error()),
			StatusCode: http.StatusBadRequest,
		}, nil
	}
	log.Printf("Successfully Recorded Metric, IPAddress: %v", request.RequestContext.Identity.SourceIP)
	return events.APIGatewayProxyResponse{
		Body:       "Hi, I have recorded your visit for website metrics, if you would like to opt out please contact me and I will remove you, (no sensitive data is held its purely for analytics).",
		StatusCode: http.StatusOK,
	}, nil
}

func main() {
	lambda.Start(handler)
}
