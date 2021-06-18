package main

import (
	"errors"
	"fmt"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

type WebsiteMetricData struct {
	IPAddress *string
	Date      *string
}

func ParseContext(ipadd string) (*WebsiteMetricData, error) {
	var metric WebsiteMetricData
	metric.IPAddress = &ipadd
	loc, err := time.LoadLocation("Australia/Perth")
	timeNow := time.Now().In(loc)
	currentDate := fmt.Sprint(timeNow.Format(time.RFC3339))
	metric.Date = &currentDate
	return &metric, err
}

func InsertWebsiteVisit(metricData WebsiteMetricData) error {
	newSession := session.Must(session.NewSession())
	client := dynamodb.New(newSession, aws.NewConfig().WithRegion("ap-southeast-2"))
	if client != nil {
		data := &dynamodb.PutItemInput{
			Item: map[string]*dynamodb.AttributeValue{
				"IPAddress": {
					S: aws.String(*metricData.IPAddress),
				},
				"Date": {
					S: aws.String(*metricData.Date),
				},
			},
			TableName: aws.String("Techytechster-Views"),
		}
		_, err := client.PutItem(data)
		return err
	} else {
		return errors.New("failed to initialize dynamodb client")
	}
}
