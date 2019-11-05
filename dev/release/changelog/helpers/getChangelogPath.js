const path = require('path');

const changelogDirectory = path.join(__dirname, '../../../../changelogs');
const releasedDirectory = path.join(changelogDirectory, './released');
const unreleasedDirectory = path.join(changelogDirectory, './unreleased');
const wipDirectory = path.join(changelogDirectory, './wip');

module.exports = { changelogDirectory, releasedDirectory, unreleasedDirectory, wipDirectory };
