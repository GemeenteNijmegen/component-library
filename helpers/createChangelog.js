/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { execSync } = require('child_process');

const paths = require('./paths');

const versionBumpTypes = ['patch', 'minor', 'major'];

/**
 * Loops through all unreleased files
 * Gets the version bump for every file (patch, minor or major)
 * Returns the greatest version bump major > minor > patch
 */
const getGreatestVersionBumpType = filePaths => {
    const versionBumpIndex = filePaths.reduce((versionBumpIndex, filePath) => {
        const fileChanges = yaml.safeLoad(fs.readFileSync(filePath));
        if (!fileChanges.versionBump) {
            return versionBumpIndex;
        }
        const fileVersionBumpIndex = versionBumpTypes.findIndex(
            bumpName => fileChanges.versionBump.toLowerCase() === bumpName
        );

        if (fileVersionBumpIndex > versionBumpIndex) {
            return fileVersionBumpIndex;
        }
        return versionBumpIndex;
    }, 0);

    return versionBumpTypes[versionBumpIndex];
};

/**
 * Bump version with npm
 * Npm will update the version in package.json and lockfile and commit those files
 * Npm tags the current branch with the new version number
 */
const bumpVersion = versionBump => {
    try {
        const gitTag = process.env.SKIP_GIT_TAG ? '--no-git-tag-version' : '';
        return execSync(`npm version --no-commit-hooks ${gitTag} ${versionBump}`)
            .toString()
            .replace('v', '')
            .trim();
    } catch (error) {
        console.error('Failed to bump version');
        process.exit(1);
    }
};

const updateLatestVersion = version => {
    const versionFileContents = JSON.parse(fs.readFileSync(paths.versionFile));
    versionFileContents.latest = version;
    fs.writeFileSync(paths.versionFile, JSON.stringify(versionFileContents, null, 4));
};

/**
 * Bumps the version
 * Put all changelog items in a file `version-x.x.x.yml` the release folder
 * Remove all unreleased files
 */
const release = () => {
    const unreleasedFiles = fs
        .readdirSync(paths.unreleasedDirectory)
        .filter(fileName => ['.yml', '.yaml'].includes(path.extname(fileName)));

    if (!unreleasedFiles.length) {
        console.log('No changes');
        process.exit(0);
    }

    const unreleasedFilePaths = unreleasedFiles.map(fileName => path.join(paths.unreleasedDirectory, fileName));

    const versionBump = getGreatestVersionBumpType(unreleasedFilePaths);

    const version = bumpVersion(versionBump);

    const releaseFile = path.join(paths.releasedDirectory, `version-${version}.yml`);

    if (fs.existsSync(releaseFile)) {
        console.error(`Release file already exists for version ${version}`);
        process.exit(1);
    }

    const changes = unreleasedFilePaths.reduce((changes, filePath) => {
        const fileChanges = yaml.safeLoad(fs.readFileSync(filePath));
        return changes.concat(fileChanges.changes);
    }, []);

    const release = {
        version,
        versionBump,
        date: new Date(),
        files: unreleasedFiles,
        changes,
    };

    fs.writeFileSync(releaseFile, yaml.safeDump(release));
    updateLatestVersion(version);

    unreleasedFilePaths.map(filePath => fs.unlinkSync(filePath));
};
release();
