#!/bin/bash
set -e # stop on error
echo "Building Site"
yarn install
yarn build
cd build
echo "Finished Build, Test"