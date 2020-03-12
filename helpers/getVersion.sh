#!/bin/sh

CURRENT_FOLDER=$(dirname "$0")
PACKAGE_VERSION=$(
    grep version < "$CURRENT_FOLDER/../package.json" \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",\t ]//g')

echo "$PACKAGE_VERSION"
