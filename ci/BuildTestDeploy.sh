#!/bin/bash
set -e # stop on error
echo "Deploying Infrastructure"
aws cloudformation deploy --template-file "./Website.yaml" --stack-name Techytechster-WebsiteStack --no-fail-on-empty-changeset --capabilities CAPABILITY_NAMED_IAM
cd ..
echo "Infrastructure Deployed Successfully"
echo "Building Site"
yarn install
yarn build
cd build
echo "Deploying To S3"
aws s3 sync . s3://techytechster
echo "Finished Build, Test, Deploy"