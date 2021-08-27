const getVersionBaseUrl = require('../getVersionBaseUrl');

module.exports = fractal => {
    return compenentPath => {
        if (fractal._config.env === 'production') {
            return `${getVersionBaseUrl()}/components/preview/${compenentPath}.html`;
        }

        return compenentPath;
    };
};
