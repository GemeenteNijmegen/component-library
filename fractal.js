'use strict';

/*
 * Require the path module
 */
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = (module.exports = require('@frctl/fractal').create());

/*
 * Require the Fractal theme
 */
const mandelbrot = require('@frctl/mandelbrot');

const version = require('./helpers/getVersion')();

const nijmegenTheme = mandelbrot({
    nav: ['docs', 'components'],
    panels: ['html', 'notes', 'info'],
    styles: ['default', '/_subtheme/css/nijmegen.css'], // link to the default stylesheet followed by a custom one
    favicon: '/_subtheme/img/favicon.ico',
    version: version,
});

// specify a directory to hold the theme override templates
nijmegenTheme.addLoadPath(__dirname + '/src/theme-overrides/views');

// Add Nijmegen subtheme to fractal instance
fractal.web.theme(nijmegenTheme);

const { getReleased, getUnreleased, getWip } = require('./helpers/fractal/changelog');
const getPartials = require('./helpers/fractal/getPartials');
const hbs = require('@frctl/handlebars')({
    helpers: {
        componentPath: require('./helpers/fractal/component-path')(fractal),
        assetPath: require('./helpers/fractal/asset-path')(fractal),
        mdbootstrapPath: require('./helpers/fractal/mdbootstrap-path')(fractal),
        changelogReleased: getReleased,
        changelogUnreleased: getUnreleased,
        changelogWip: getWip,
        formatDate: require('./helpers/fractal/formatDate'),
        concat: (...strs) => strs.filter(str => typeof str === 'string').join(''),
        objectLength: obj => Object.keys(obj).length,
    },
    partials: getPartials(path.join(__dirname, './docs/partials')),
});

// Make components use the slightly modified Handlebars engine
fractal.components.engine(hbs);

// Make docs use the slightly modified Handlebars engine
fractal.docs.engine(hbs);

/*
 * Give your project a title.
 */
fractal.set('project.title', 'Nijmegen Component Library');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'components'));

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'));

/*
 * Build output
 */
fractal.web.set('builder.dest', __dirname + '/build');

/*
 * Fractal custom commands
 * @see: https://fractal.build/guide/cli/custom-commands
 *
 * @return: Array of handles of available components
 */
function listComponents(args) {
    let components = [];

    for (let item of fractal.components.flatten()) {
        // skip
        // - the hidden versions (marked with an _ in the file or folder)
        // - the items in the templates folder, since these are just example templates rendering various components together
        if (!item._isHidden && item._parent.name.toLowerCase() !== 'templates') {
            // is it a component in different variants?
            if (typeof item.config.variants !== 'undefined') {
                const collection = item.config.variants;
                for (let i in collection) {
                    if (!collection[i].isHidden) {
                        components.push(collection[i].handle);
                    }
                }
            } else {
                // single component
                components.push(item.handle);
            }
        }
    }

    return components;
}

// register the command
fractal.cli.command('list-components', listComponents, {
    description: 'Lists components in the project and returns an HTML output',
});

/*
 * Other configurations
 * See
 *   http://fractal.build/guide/web/configuration
 *   https://www.browsersync.io/docs/options#option-reloadDelay
 * Omdat ik een watch instel op de source bestanden moet BrowserSync even wachten voordat de browser een refresh krijgt gepushed want in de tussentijd zal Gulp de CSS bestanden genereren.
 * Ik had liever een watch ingesteld op de gegenereerde CSS bestanden, maar die werd niet altijd opgepakt gek genoeg.
 */
fractal.web.set('server.sync', true);

/* Options passed to BrowserSync */
fractal.web.set('server.syncOptions', {
    /* Files to watch for changes */
    files: ['src/**/*.scss'],
    /* Adding a delay to make sure the sourcefiles are compiled before pushing the refresh to the browser */
    reloadDelay: 1000,
});
