const { fs, analyseChangelog, removeContent, insertContent, buildChanges } = require('./update.helpers');

const updateChangelog = (changelogPath, changeDirectory, releaseVersion, writeChanges, done) => {
    const statusTypes = ['added', 'changed', 'removed'];
    const changeFileNames = fs
        .readdirAsync(changeDirectory)
        .then(fileNames => fileNames.filter(fileName => ['yml', 'yaml'].includes(fileName.split('.').pop())));
    const changeFiles = changeFileNames.then(fileNames =>
        Promise.all(
            fileNames.map(fileName =>
                fs.readYamlFileAsync(`${changeDirectory.replace(/\/$/, '')}/${fileName}`, 'utf8'),
            ),
        ),
    );

    return Promise.all([changeFileNames, changeFiles]).then(results => {
        const changeFileNames = results[0];
        const changeFiles = results[1];
        fs.readFile(changelogPath, 'utf8', function(err, changelogData) {
            if (err) throw err;
            if (changeFiles.length === 0) return done(writeChanges ? null : changelogData);

            const changelogDataArray = changelogData.split('\n');

            const { foundHeader, insertAboveIndex, lastIndex } = analyseChangelog(
                changelogDataArray,
                statusTypes,
                releaseVersion,
            );

            // Combine changeDirectory changes
            const changes = changeFiles.reduce(
                (array, file) => (file && file.changes ? [...array, ...file.changes] : array),
                [],
            );

            const insertArray = buildChanges(changes, changelogDataArray, foundHeader, statusTypes, releaseVersion);

            // If updating, remove any previous sub-headers for the version (so they can be replaced)
            const changelogDataAfterRemovalsArray = foundHeader
                ? removeContent(changelogDataArray, foundHeader.index + 1, insertAboveIndex + 1)
                : [...changelogDataArray];

            const spaceAdjustedInsertIndex = insertAboveIndex === lastIndex ? lastIndex + 1 : insertAboveIndex;
            const whereToInsert = foundHeader ? foundHeader.index + 1 : spaceAdjustedInsertIndex;

            const newContent = insertContent(insertArray, changelogDataAfterRemovalsArray, whereToInsert).join('\n');

            if (writeChanges) {
                fs.writeFile(changelogPath, newContent, function(err) {
                    if (err) return done(err);

                    changeFileNames.forEach(fileName => {
                        const filePath = `${changeDirectory}/${fileName}`;
                        if (fs.statSync(filePath).isFile()) {
                            fs.unlinkSync(filePath);
                        }
                    });

                    return done(null);
                });
            }

            if (!writeChanges) return done(newContent);
        });
    });
};

module.exports = { updateChangelog };
