const { updateChangelog } = require('./update');
const { getReleaseVersion } = require('./update.helpers');
const path = require('path');

const changelogPath = path.join(__dirname, '../../../../docs/03-Changelog.md');
const changeDirectory = path.join(__dirname, '../../../../changelogs/unreleased');
// const releaseVersion = getReleaseVersion(process.argv[2]);
console.log(process.argv);
// TODO: setup the hook after merging to a release branch
// TODO: add tests to pipeline
// TODO: update readme and changelog

// updateChangelog(changelogPath, changeDirectory, releaseVersion, true, error => {
//     if (error) {
//         throw error;
//     } else {
//         console.log('=================================================');
//         console.log(`Release ${releaseVersion} Changelog Updated`);
//         console.log('=================================================');
//     }
// });
