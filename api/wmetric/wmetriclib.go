package main

import (
	"encoding/json"
	"errors"
)

type WebsiteMetricData struct {
	IPAddress *string
	Date      *string
}

func ParseBody(payloadJSON string) (*WebsiteMetricData, error) {
	var metric WebsiteMetricData
	json.Unmarshal([]byte(payloadJSON), &metric)
	if metric.IPAddress != nil {

		return &metric, nil
	} else {
		if metric.IPAddress == nil {
			return nil, errors.New("invalid payload, missing ip address")
		} else {
			return nil, errors.New("invalid payload, failure to process json")
		}
	}
}
