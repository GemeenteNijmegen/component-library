const path = require('path');

const changelogDirectory = path.join(__dirname, '../../../../changelogs');
const releasedDirectory = path.join(changelogDirectory, './released');
const unreleasedDirectory = path.join(changelogDirectory, './unreleased');

module.exports = { changelogDirectory, releasedDirectory, unreleasedDirectory };
