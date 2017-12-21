module.exports = (fractal) => {
    // This get's called for every `{{ buildAbsPath '@handle' }}`
    return (path) => {

        if (fractal._config.env === 'production') {
            // This placeholder will be replaced by Nginx
            path = '%%HOSTNAME%%' + path;
        }

        return path;
    };
};
