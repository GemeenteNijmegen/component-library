const ssri = require('ssri');
const fs = require('fs');
const path = require('path');

const calculateIntegrity = file => {
    const filePath = path.join(__dirname, '../../', file);
    const fileContents = fs.readFileSync(filePath);
    const integrity = ssri.fromData(fileContents);
    return integrity.toString();
};

module.exports = calculateIntegrity;
