const getVersion = require('./getVersion');

const getVersionBaseUrl = () => `/v${getVersion()}`;

module.exports = getVersionBaseUrl;
