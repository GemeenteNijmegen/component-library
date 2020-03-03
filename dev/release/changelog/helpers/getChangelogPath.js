const path = require('path');

const changelogDirectory = path.join(__dirname, '../../../../changelogs');
const releasedDirectory = path.join(changelogDirectory, './released');
const unreleasedDirectory = path.join(changelogDirectory, './unreleased');
const versionFile = path.join(__dirname, '../../../../root/version.json');

module.exports = { changelogDirectory, releasedDirectory, unreleasedDirectory, versionFile };
