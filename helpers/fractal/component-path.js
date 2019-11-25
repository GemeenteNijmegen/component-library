// Get's the route for a component
const getRouteComponent = fractal => {
    const route = fractal.web._themes.get('default')._routes.get('component');

    return route.path;
};

module.exports = fractal => {
    let routeComponent;

    // This get's called for every `{{ componentPath '@handle' }}`
    return handle => {
        // Check whether given handle is indeed a handle
        if (typeof handle !== 'string') {
            return handle;
        }

        // Get rid of the handle prefix
        const path = handle.match(/^@/) ? handle.substr(1) : handle;

        // Memoize the route for components
        if (!routeComponent) {
            routeComponent = getRouteComponent(fractal);
        }

        // Return the HTTP path to the component
        let retval = `${routeComponent.replace(':handle', path)}`;

        if (fractal._config.env === 'production') {
            // This placeholder will be replaced by Nginx
            retval = '%%HOSTNAME%%' + retval;
        }

        if (fractal._config.env === 'production') {
            retval += fractal._config.web.builder.ext;
        }
        return retval;
    };
};
