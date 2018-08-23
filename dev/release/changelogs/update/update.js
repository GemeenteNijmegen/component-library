const { fs, analyseChangelog, removeContent, insertContent, buildChanges } = require('./update.helpers');

const updateChangelog = (changelogPath, changeDirectory, releaseVersion, writeChanges, done) => {
    const statusTypes = ['added', 'changed', 'removed'];
    const changeFileNames = fs.readdirAsync(changeDirectory);
    const changeFiles = changeFileNames.then(fileNames => {
        return Promise.all(fileNames.map(filename => {
            return fs.readYamlFileAsync(changeDirectory.replace(/\/$/, '') + '/' + filename, 'utf8');
        }));
    });

    return Promise.all([changeFileNames, changeFiles]).then(results => {
        const changeFileNames = results[0];
        const changeFiles = results[1];
        fs.readFile(changelogPath, 'utf8', function(err, changelogData) {
            if (err) throw err;
            if (changeFiles.length === 0) return done(changelogData);

            const changelogDataArray = changelogData.split('\n');

            const { foundHeader, insertAboveIndex, lastIndex } = analyseChangelog(
                changelogDataArray,
                statusTypes,
                releaseVersion
            );

            // Combine changeDirectory changes
            const changes = changeFiles.reduce((array, file) => [...array, ...file.changes], []);

            const insertArray = buildChanges(changes, changelogDataArray, foundHeader, statusTypes, releaseVersion);

            // If updating, remove any previous sub-headers for the version (so they can be replaced)
            const changelogDataAfterRemovalsArray = foundHeader
                ? removeContent(changelogDataArray, foundHeader.index + 1, insertAboveIndex + 1)
                : [...changelogDataArray];

            const spaceAdjustedInsertIndex = insertAboveIndex === lastIndex ? lastIndex + 1 : insertAboveIndex;
            const whereToInsert = foundHeader ? foundHeader.index + 1 : spaceAdjustedInsertIndex;

            const newContent = insertContent(insertArray, changelogDataAfterRemovalsArray, whereToInsert).join(
                '\n'
            );

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
