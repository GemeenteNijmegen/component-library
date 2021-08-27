const getVersionBaseUrl = require('../getVersionBaseUrl');

module.exports = fractal => {
    // This get's called for every `{{ assetPath '/a-path-to-a-file' }}`
    return path => {
        if (fractal._config.env === 'production') {
            // This placeholder will be replaced by Nginx
            return getVersionBaseUrl() + path;
        }

        return path;
    };
};
