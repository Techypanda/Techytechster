package main

import (
	"fmt"
	"time"
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
