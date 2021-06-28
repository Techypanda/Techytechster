package main

import (
	"context"
	"errors"
	"fmt"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/dgrijalva/jwt-go"
	"github.com/lestrrat-go/jwx/jwk"
)

type DynamoDBBlog struct {
	BlogTitle string
	Content   string
	Date      string
	Author    string
}

const COGNITOJWKSURI string = "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_dXWQJmeqM/.well-known/jwks.json"

func ValidateJWT(accessTokenString string) (bool, error) {
	keySet, err := jwk.Fetch(context.TODO(), COGNITOJWKSURI)
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

func GetBlog(blogTitle string) (*BlogPost, error) {
	newSession := session.Must(session.NewSession())
	client := dynamodb.New(newSession, aws.NewConfig().WithRegion("ap-southeast-2"))
	if client != nil {
		input := &dynamodb.QueryInput{
			ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
				":title": {
					S: aws.String(blogTitle),
				},
			},
			KeyConditionExpression: aws.String("BlogTitle = :title"),
			TableName:              aws.String("Techytechster-Blog"),
		}
		result, getErr := client.Query(input)
		if getErr != nil {
			return nil, getErr
		}
		if *result.Count > 0 {
			ddb := DynamoDBBlog{}
			err := dynamodbattribute.UnmarshalMap(result.Items[0], &ddb)
			if err != nil {
				return nil, err
			}
			post := BlogPost{
				Title:   ddb.BlogTitle,
				Content: ddb.Content,
				Date:    ddb.Date,
				Author:  ddb.Author,
			}
			return &post, nil
		} else {
			return nil, errors.New("there is no blog with that title")
		}
	} else {
		return nil, errors.New("unable to construct dynamodb client")
	}
}
