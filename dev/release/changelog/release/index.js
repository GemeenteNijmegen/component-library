/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { execSync } = require('child_process');

const paths = require('../helpers/getChangelogPath');

const versionBumpTypes = ['patch', 'minor', 'major'];

const getVersionBump = filePaths => {
    const versionBumpIndex = filePaths.reduce((versionBumpIndex, filePath) => {
        const fileChanges = yaml.safeLoad(fs.readFileSync(filePath));
        if (!fileChanges.versionBump) {
            return versionBumpIndex;
        }
        const fileVersionBumpIndex = versionBumpTypes.findIndex(
            bumpName => fileChanges.versionBump.toLowerCase() === bumpName,
        );

        if (fileVersionBumpIndex > versionBumpIndex) {
            return fileVersionBumpIndex;
        }
        return versionBumpIndex;
    }, 0);

    return versionBumpTypes[versionBumpIndex];
};

const bumpVersion = versionBump => {
    try {
        return execSync(`npm version ${versionBump}`)
            .toString()
            .replace('v', '')
            .trim();
    } catch (error) {
        console.error('Failed to bump version');
        process.exit(1);
    }
};

const release = () => {
    const unreleasedFiles = fs
        .readdirSync(paths.unreleasedDirectory)
        .filter(fileName => ['.yml', '.yaml'].includes(path.extname(fileName)));

    if (!unreleasedFiles.length) {
        console.log('No changes');
        process.exit(0);
    }

    const unreleasedFilePaths = unreleasedFiles.map(fileName => path.join(paths.unreleasedDirectory, fileName));

    const versionBump = getVersionBump(unreleasedFilePaths);

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

    unreleasedFilePaths.map(filePath => fs.unlinkSync(filePath));
};
release();
