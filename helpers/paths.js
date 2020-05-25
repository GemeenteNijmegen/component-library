const path = require('path');

const changelogDirectory = path.join(__dirname, '../changelogs');
const releasedDirectory = path.join(changelogDirectory, './released');
const unreleasedDirectory = path.join(changelogDirectory, './unreleased');
const versionFile = path.join(__dirname, '../root/version.json');
const publicDirectory = path.join(__dirname, '../public');
const componentListingFile = path.join(publicDirectory, 'components-listing.html');
const componentListingRootFile = path.join(__dirname, '../root/components-listing.html');

module.exports = {
    changelogDirectory,
    releasedDirectory,
    unreleasedDirectory,
    versionFile,
    publicDirectory,
    componentListingFile,
    componentListingRootFile,
};
