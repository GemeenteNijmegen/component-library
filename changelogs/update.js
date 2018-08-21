const {
  fs,
  getReleaseVersion,
  analyseChangelog,
  removeContent,
  insertContent,
  buildChanges
} = require("./update.helpers");
const path = require("path");

const statusTypes = ["added", "changed", "removed"];
const changelogPath = path.join(__dirname, "test-Changelog.md");
const changeDirectory = path.join(__dirname, "unreleased");
const releaseVersion = getReleaseVersion(process.argv[2]);

// TODO: move the unreleased test files and use them in a test instead
// TODO: setup linting against a style guide
// TODO: switch to yaml configs
// TODO: setup the hook after merging to a release branch

const updateChangelog = (
  changelogPath,
  changeDirectory,
  statuses,
  releaseVersion,
  done
) => {
  fs.readdirAsync(changeDirectory)
    .then(fileNames => {
      return Promise.all(
        fileNames.map(filename => {
          return fs.readFileAsync(
            changeDirectory.replace(/\/$/, "") + "/" + filename,
            "utf8"
          );
        })
      );
    })
    .then(files => {
      fs.readFile(changelogPath, "utf8", function(err, changelogData) {
        if (err) throw err;

        const changelogDataArray = changelogData.split("\n");

        const { foundHeader, insertAboveIndex, lastIndex } = analyseChangelog(
          changelogDataArray,
          statuses,
          releaseVersion
        );

        // Combine changeDirectory changes
        const changes = files.reduce((array, file) => {
          const fileChanges = JSON.parse(file);
          return [...array, ...fileChanges.changes];
        }, []);

        const insertArray = buildChanges(
          changes,
          changelogDataArray,
          foundHeader,
          statuses,
          releaseVersion
        );

        // If updating, remove any previous sub-headers for the version (so they can be replaced)
        const changelogDataAfterRemovalsArray = foundHeader
          ? removeContent(
              changelogDataArray,
              foundHeader.index + 1,
              insertAboveIndex + 1
            )
          : [...changelogDataArray];

        const spaceAdjustedInsertIndex =
          insertAboveIndex === lastIndex ? lastIndex + 1 : insertAboveIndex;
        const whereToInsert = foundHeader
          ? foundHeader.index + 1
          : spaceAdjustedInsertIndex;

        const newContent = insertContent(
          insertArray,
          changelogDataAfterRemovalsArray,
          whereToInsert
        ).join("\n");

        fs.writeFile(changelogPath, newContent, function(err) {
          if (err) return done(err);
          return done(null);
        });
      });
    });
};

updateChangelog(
  changelogPath,
  changeDirectory,
  statusTypes,
  releaseVersion,
  error => {
    if (error) {
      throw error;
    } else {
      console.log("Changelog updated");
    }
  }
);
