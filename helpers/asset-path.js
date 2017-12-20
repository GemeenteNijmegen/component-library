module.exports = (fractal) => {
    // console.log(fractal);
    // This get's called for every `{{ buildAbsPath '@handle' }}`
    return (path) => {
        const buildUrl = fractal.get('build.url');
        // console.log('buildUrl', buildUrl);
        // Check whether given handle is indeed a handle
        // if (typeof handle !== 'string' || !handle.match(/^@/)) {
        //     return handle;
        // }

        // // Get rid of the handle prefix
        // const path = handle.substr(1);

        // // Memoize the route for components
        // if (!routeComponent) {
        //     routeComponent = getRouteComponent(fractal);
        // }

        // // Return the HTTP path to the component
        // let retval = `${routeComponent.replace(':handle', path)}`;
        // if (fractal._config.env === 'production') {
        //     retval += fractal._config.web.builder.ext;
        // }
        // return retval;

        // console.log('path', path, buildUrl, fractal._config.env);

        // const options = Array.from(arguments).pop();
        // console.log(fractal);
        if (buildUrl && fractal._config.env === 'production') {
            path = buildUrl + path;
        }

        return path;
    };
};
