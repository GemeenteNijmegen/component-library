const { fs, analyseChangelog, removeContent, insertContent, buildChanges } = require('./update.helpers');

const updateChangelog = (changelogPath, changeDirectory, releaseVersion, writeChanges, done) => {
    const statusTypes = ['added', 'changed', 'removed'];

    fs.readdirAsync(changeDirectory)
        .then(fileNames => {
            return Promise.all(fileNames.map(filename => {
                    return fs.readYamlFileAsync(changeDirectory.replace(/\/$/, '') + '/' + filename, 'utf8');
                }));
        })
        .then(files => {
            fs.readFile(changelogPath, 'utf8', function(err, changelogData) {
                if (err) throw err;

                const changelogDataArray = changelogData.split('\n');

                const { foundHeader, insertAboveIndex, lastIndex } = analyseChangelog(
                    changelogDataArray,
                    statusTypes,
                    releaseVersion
                );

                // Combine changeDirectory changes
                const changes = files.reduce((array, file) => [...array, ...file.changes], []);

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
                        return done(null);
                    });
                }

                if (!writeChanges) return done(newContent);
            });
        });
};

module.exports = { updateChangelog };
