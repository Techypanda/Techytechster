#!/bin/bash
cd api
set -e # stop on error
echo "Building"
sam build
echo "Deploying"
sam deploy