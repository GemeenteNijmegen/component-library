#!/bin/bash

BRANCH_NAME=$(git symbolic-ref --short HEAD)
ISSUE_ID=$(echo "$BRANCH_NAME" | grep -oE '([a-zA-Z]{2,6})\-([0-9]+)' | head -1)

# Do not add the issue ID twice if it's already in place.
# This happens e.g. when amending a commit.
if head -n 1 "./.git/COMMIT_EDITMSG" | grep "^$ISSUE_ID"; then
    exit
fi

# If no branch name could be extracted, stop.
if [[ -z "$ISSUE_ID" ]]; then
    exit
fi

# Prepend the issue ID to the commit message.
sed -i.bak -e "1s/^/$ISSUE_ID /" "./.git/COMMIT_EDITMSG"
