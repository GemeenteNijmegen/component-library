// Get's the route for a component
const getRouteComponent = (fractal) => {
    const route = fractal.web._themes.get('default')._routes.get('component');

    return route.path;
};

module.exports = (fractal) => {
    let routeComponent;

    // This get's called for every `{{ componentPath '@handle' }}`
    return (handle) => {
        // Check whether given handle is indeed a handle
        if (typeof handle !== 'string' || !handle.match(/^@/)) {
            return handle;
        }

        // Get rid of the handle prefix
        const path = handle.substr(1);

        // Memoize the route for components
        if (!routeComponent) {
            routeComponent = getRouteComponent(fractal);
        }

        // Return the HTTP path to the component
        return `${routeComponent.replace(':handle', path)}`;
    };
};
