const { updateChangelog } = require('./update');
const { getReleaseVersion } = require('./update.helpers');
const path = require('path');

const changelogPath = path.join(__dirname, '../../../../docs/03-Changelog.md');
const changeDirectory = path.join(__dirname, '../../../../changelogs/unreleased');
const releaseVersion = getReleaseVersion(process.argv[2]);
// Example: docker-compose run frontend node dev/release/changelogs/update '1.2.1'
// TODO: setup the hook after merging to a release branch
// TODO: create a pipeline and add tests
// TODO: update readme and changelog

updateChangelog(changelogPath, changeDirectory, releaseVersion, true, error => {
    if (error) {
        throw error;
    } else {
        console.log('Changelog updated');
    }
});
