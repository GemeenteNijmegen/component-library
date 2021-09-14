const getVersionBaseUrl = require('../getVersionBaseUrl');

module.exports = fractal => {
    return componentPath => {
        if (fractal._config.env === 'production') {
            return `${getVersionBaseUrl()}/components/preview/${componentPath}.html`;
        }

        return `/components/preview/${componentPath}`;
    };
};
