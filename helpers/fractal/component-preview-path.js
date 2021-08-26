const getVersion = require('../getVersion');

module.exports = fractal => {
    return compenentPath => {
        if (fractal._config.env === 'production') {
            return `${getVersion()}/components/preview/${compenentPath}.html`;
        }

        return compenentPath;
    };
};
