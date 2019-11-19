module.exports = (fractal) => {
    // This get's called for every `{{ mdbootstrapPath '/a-path-to-a-location' }}`
    return (path) => {
        return "https://mdbootstrap.com" + path;
    };
};
