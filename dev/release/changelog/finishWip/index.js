const fs = require('fs');
const path = require('path');
const util = require('util');
const paths = require('../helpers/getChangelogPath.js');

const moveFile = util.promisify(fs.rename);

const finishWip = async () => {
    const wipFiles = fs
        .readdirSync(paths.wipDirectory)
        .filter(fileName => ['.yml', '.yaml'].includes(path.extname(fileName)));

    const fileMovePromises = wipFiles.map(fileName =>
        moveFile(path.join(paths.wipDirectory, fileName), path.join(paths.unreleasedDirectory, fileName)),
    );

    await Promise.all(fileMovePromises);
};

finishWip();
