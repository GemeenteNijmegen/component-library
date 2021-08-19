const assetPath = require('./asset-path');

module.exports = fractal => {
    return url => {
        const path = assetPath(fractal)(url);
        if (fractal._config.env === 'production') return path;

        return path.split('.html').join('');
    };
};
