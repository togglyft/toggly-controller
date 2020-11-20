#!/bin/bash
PACKAGE_NAME=$(cat package.json | grep name | head -1 | awk -F: '{print $2}' | sed 's/[",]//g' | tr -d '[[:space:]]')
PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{print $2}' | sed 's/[",]//g' | tr -d '[[:space:]]')
docker login --username=pabloubal
docker tag $PACKAGE_NAME:$PACKAGE_VERSION togglyft/$PACKAGE_NAME:$PACKAGE_VERSION
docker tag togglyft/$PACKAGE_NAME:$PACKAGE_VERSION togglyft/$PACKAGE_NAME:latest
docker push togglyft/$PACKAGE_NAME:$PACKAGE_VERSION
