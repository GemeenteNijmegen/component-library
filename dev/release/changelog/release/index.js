/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const getVersion = require('../../../../helpers/getVersion');
const paths = require('../../../../helpers/getChangelogPath.js/index.js');

const release = () => {
    const version = getVersion();
    const releaseFile = path.join(paths.releasedDirectory, `version-${version}.yml`);

    if (fs.existsSync(releaseFile)) {
        console.error(`Release file already exists for version ${version}`);
        process.exit(1);
    }

    const unreleasedFiles = fs
        .readdirSync(paths.unreleasedDirectory)
        .filter(fileName => ['.yml', '.yaml'].includes(path.extname(fileName)));

    const unreleasedFilePaths = unreleasedFiles.map(fileName => path.join(paths.unreleasedDirectory, fileName));

    const changes = unreleasedFilePaths.reduce((changes, filePath) => {
        const fileChanges = yaml.safeLoad(fs.readFileSync(filePath));
        return changes.concat(fileChanges.changes);
    }, []);

    const release = {
        version,
        date: new Date(),
        files: unreleasedFiles,
        changes,
    };

    fs.writeFileSync(releaseFile, yaml.safeDump(release));

    unreleasedFilePaths.map(filePath => fs.unlinkSync(filePath));
};
release();
