#!/bin/bash
cd api
set -e
echo "Building"
sam build
# echo "Testing API"
# ./RunSamTests.sh
# go test -v
echo "Beginning Deploy Stage"
sam package --output-template-file packaged-template.yaml --image-repository 128153249323.dkr.ecr.ap-southeast-2.amazonaws.com/techytechsterapirepo --no-progressbar
sam deploy --template ./packaged-template.yaml --stack-name techytechsterwebapis --region ap-southeast-2 --capabilities CAPABILITY_IAM --parameter-overrides Authentication="false" --no-fail-on-empty-changeset --confirm-changeset