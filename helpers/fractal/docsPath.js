const getVersionBaseUrl = require('../getVersionBaseUrl');

module.exports = fractal => {
    return path => {
        if (fractal._config.env === 'production') {
            // This placeholder will be replaced by Nginx
            return getVersionBaseUrl() + '/docs/' + path + fractal._config.web.builder.ext;
        }

        return '/docs/' + path;
    };
};
