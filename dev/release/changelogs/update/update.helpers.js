const fs = require('fs');
const yaml = require('js-yaml');
const compareVersions = require('compare-versions');

// make Promise version of fs.readdir()
fs.readdirAsync = dirname => {
    return new Promise((resolve, reject) => {
        fs.readdir(dirname, (err, fileNames) => {
            if (err) {
                reject(err);
            } else {
                resolve(fileNames);
            }
        });
    });
};

// make Promise version of fs.readFile() that reads yaml files
fs.readYamlFileAsync = (filename, enc) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, enc, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(yaml.safeLoad(data));
            }
        });
    });
};

const getReleaseVersion = version => {
    compareVersions(version, version); // throw error if invalid
    return version;
};

const ucfirst = string => string.charAt(0).toUpperCase() + string.slice(1);

const analyseChangelog = (changelogDataArray, statuses, releaseVersion) => {
    let foundHeader;
    let pendingSubHeader = '';
    let insertAboveIndex = 0;
    let previousVersion;
    let currentVersion;
    changelogDataArray.some((line, index) => {
        const header = line.match('^## \\[(\\d+.\\d+.\\d+)\\]');

        // Return if reaching the end of the found header section
        if (insertAboveIndex > 0 && header) {
            return true;
        }
        if (foundHeader && header) {
            insertAboveIndex = index - 1;
            return true;
        }

        if (header) {
            previousVersion = currentVersion ? currentVersion : '';
            currentVersion = header[1];
            if (compareVersions(currentVersion, releaseVersion) === 0) {
                foundHeader = { index };
            }

            if (compareVersions(currentVersion, releaseVersion) === -1) {
                insertAboveIndex = index;
            }
        }

        const subHeader = line.match(/^### (added|changed|removed)/i);
        if (foundHeader && subHeader && statuses.includes(subHeader[1].toLowerCase())) {
            const newKey = subHeader[1].toLowerCase();
            foundHeader = {
                ...foundHeader,
                [newKey]: index,
            };
            pendingSubHeader = newKey;
        }

        if (foundHeader && pendingSubHeader && line === '') {
            foundHeader = {
                ...foundHeader,
                [`${pendingSubHeader}End`]: index,
            };
            pendingSubHeader = null;
        }

        if (currentVersion && previousVersion) {
            if (compareVersions(currentVersion, previousVersion) >= 0) throw 'Versions not in order';
        }
    });

    const lastIndex = changelogDataArray.length - 1;
    if (insertAboveIndex === 0) {
        insertAboveIndex = lastIndex;
    }

    if (pendingSubHeader) {
        foundHeader = {
            ...foundHeader,
            [`${pendingSubHeader}End`]: lastIndex,
        };
    }

    return {
        foundHeader,
        insertAboveIndex,
        lastIndex,
    };
};

const removeContent = (contentArray, startIndex, endIndex) => [
    ...contentArray.slice(0, startIndex),
    ...contentArray.slice(endIndex),
];

const insertContent = (newContentArray, contentArray, index) => [
    ...contentArray.slice(0, index),
    ...newContentArray,
    ...contentArray.slice(index),
];

const buildChangeItem = change => {
    const title = `*Component:* [${change.component.replace('-', ' ')}]({{ componentPath '@${change.component}' }})`;
    const description = `*Description:* ${change.description}`;
    if (change.what && change.what.length > 0) {
        const what = `*Changes:* **${change.what.sort().join('**, **')}**`;
        return [`- ${title}  `, `  ${what}  `, `  ${description}`];
    }
    return [`- ${title}  `, `  ${description}`];
};

const buildChangeItems = changes =>
    changes.reduce((changeItems, change) => [...changeItems, ...buildChangeItem(change)], []);

const buildChanges = (changes, changelogDataArray, foundHeader, statuses, releaseVersion) => {
    const today = new Date();
    const header =
        !foundHeader && changes.length > 0
            ? [`## [${releaseVersion}] - ${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}`]
            : [];
    return statuses.reduce((array, status) => {
        const existingChangeItems =
            foundHeader && foundHeader[status]
                ? changelogDataArray.slice(foundHeader[status] + 1, foundHeader[`${status}End`])
                : [];

        const changesForStatus = changes.filter(change => change.type === status);
        const newChangeItems = buildChangeItems(changesForStatus);

        if (existingChangeItems.length > 0 || newChangeItems.length > 0) {
            return [...array, ...[`### ${ucfirst(status)}`, ...existingChangeItems, ...newChangeItems, '']];
        }

        return array;
    }, header);
};

module.exports = {
    fs,
    getReleaseVersion,
    analyseChangelog,
    removeContent,
    insertContent,
    buildChanges,
};
