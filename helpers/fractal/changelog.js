const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const compareVersions = require('compare-versions');

const parseFilesInDir = dir => {
    const unreleasedFiles = fs.readdirSync(dir).filter(fileName => ['.yml', '.yaml'].includes(path.extname(fileName)));

    const contents = unreleasedFiles.reduce((contents, fileName) => {
        const filePath = path.join(dir, fileName);
        contents.push(yaml.safeLoad(fs.readFileSync(filePath)));
        return contents;
    }, []);
    return contents;
};

const groupChangelogItems = items => {
    return items.reduce((changelog, item) => {
        if (!Array.isArray(changelog[item.type])) {
            changelog[item.type] = [];
        }
        item.what = !item.what ? [] : Array.isArray(item.what) ? item.what : [item.what];
        item.component = Array.isArray(item.component) ? item.component : [item.component];
        changelog[item.type].push(item);
        return changelog;
    }, {});
};

const getReleased = () => {
    const versions = parseFilesInDir(path.join(__dirname, '../../changelogs/released'));
    versions.sort((versionA, versionB) => compareVersions(versionA.version, versionB.version));
    const changelog = versions.map(version => {
        version.changelog = groupChangelogItems(version.changes);
        return version;
    });

    return changelog;
};

const getBranchChanges = dir => {
    const unreleased = parseFilesInDir(dir);
    const changes = groupChangelogItems(
        unreleased.reduce((changes, file) => {
            return changes.concat(file.changes);
        }, []),
    );
    return changes;
};

const getUnreleased = () => getBranchChanges(path.join(__dirname, '../../changelogs/unreleased'));

const getWip = () => getBranchChanges(path.join(__dirname, '../../changelogs/wip'));

module.exports = { getReleased, getUnreleased, getWip };
