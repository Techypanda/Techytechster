package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/dgrijalva/jwt-go"
	"github.com/lestrrat-go/jwx/jwk"
)

type BlogPost struct {
	Title   string
	Content string
	Date    string
	Author  string
}

const cognitoJWKSURI string = "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_dXWQJmeqM/.well-known/jwks.json"

func validateJWT(accessTokenString string) (bool, error) {
	keySet, err := jwk.Fetch(context.TODO(), cognitoJWKSURI)
	_, err = jwt.Parse(accessTokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		kid, ok := token.Header["kid"].(string)
		if !ok {
			return nil, errors.New("kid header missing")
		}
		keys, ok := keySet.LookupKeyID(kid)
		if !ok {
			return nil, fmt.Errorf("key with specified kid is not present in jwks")
		}
		var publickey interface{}
		err = keys.Raw(&publickey)
		if err != nil {
			return nil, fmt.Errorf("could not parse pubkey")
		}
		return publickey, nil
	})
	if err != nil {
		return false, err
	}
	return true, nil
}

func CreateEndpoint(rawPayload events.APIGatewayProxyRequest) events.APIGatewayProxyResponse {
	log.Println("Create endpoint begun")
	authStatus, authErr := validateJWT(rawPayload.Headers["Authorization"])
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
