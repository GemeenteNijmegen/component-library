const fs = require('fs');
const path = require('path');

module.exports = dir => {
    const files = fs
        .readdirSync(dir)
        .filter(fileName => path.extname(fileName) === '.hbs')
        .map(fileName => path.join(dir, fileName));
    const partials = files.reduce((partials, filePath) => {
        const partialName = path.basename(filePath, path.extname(filePath));
        partials[partialName] = fs.readFileSync(filePath, 'utf8');
        return partials;
    }, {});
    return partials;
};
