#!/bin/bash
cd adminfrontend
set -e # stop on error
echo "Building Admin Site"
yarn install
yarn build
cd build
echo "Finished Build, Test"