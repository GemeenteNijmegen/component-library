#!/usr/bin/env sh

export GITLAB_TOKEN=bMFS_Ms2dp5hsqx6v71C
export CI_COMMIT_REF_SLUG=release-1
export CI_COMMIT_REF_NAME=release/1
#export CI_COMMIT_REF_SLUG=master
#export CI_COMMIT_REF_NAME=master
export CI_REGISTRY_IMAGE=gitlab.ernise.com:5001/images/
export CI_PIPELINE_ID=21332
export DOCKER_TAG="$CI_COMMIT_REF_SLUG.$CI_PIPELINE_ID";


node $(dirname "$0")/update-releases.js

#node $(dirname "$0")/prepare.js
