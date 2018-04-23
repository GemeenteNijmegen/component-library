'use strict';

/*
* Require the path module
*/
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

/*
 * Require the Fractal theme
 */
const mandelbrot = require('@frctl/mandelbrot');

const nijmegenTheme = mandelbrot({
    nav: ['docs', 'components'],
    panels: ['html', 'notes', 'info'],
    styles: ['default', '/_subtheme/css/nijmegen.css'], // link to the default stylesheet followed by a custom one
    favicon: '/_subtheme/img/favicon.ico',
});

// specify a directory to hold the theme override templates
nijmegenTheme.addLoadPath(__dirname + '/src/theme-overrides/views');

// Add Nijmegen subtheme to fractal instance
fractal.web.theme(nijmegenTheme);

const hbs = require('@frctl/handlebars')({
    helpers: {
        componentPath: require('./helpers/component-path')(fractal),
        assetPath: require('./helpers/asset-path')(fractal),
        mdbootstrapPath: require('./helpers/mdbootstrap-path')(fractal),
    },
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
 */
const lcOutFile = 'list-components.html';

function listComponents(args, done) {
    const fs = require('fs');

    const documentHeader = `
        <!doctype html>
        <html lang="en">
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="robots" content="noindex, nofollow">
        <meta name="robots" content="noarchive">
        <meta name="googlebot" content="noindex, nofollow">
        <meta name="googlebot" content="noarchive">
        <title>Components listing</title>
        </head>
        <body>
        <main>
    `;

    const documentFooter = `
        </main>
        </body>
        </html>
    `;

    // route.path will look like: /components/preview/:handle
    const route = fractal.web._themes.get('default')._routes.get('preview');
    let baseUrl = '';
    let linkExtension = '';
    if (fractal._config.env === 'production') {
        baseUrl = '%%HOSTNAME%%'; // nginx will take care of the replacement on .acc and .prod
        linkExtension = fractal._config.web.builder.ext;
    }
    this.log(route.path);
    this.log(`ENV :: ${fractal._config.env}`);
    this.log((fractal._config.env === 'production' ? 'true': 'false'));
    this.log(linkExtension);

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
                        const link = `${route.path.replace(':handle', collection[i].handle)}`;
                        this.log(`${collection[i].handle} - ${link}${linkExtension}`);
                        components.push('<li><a href="'+baseUrl+''+link+''+linkExtension+'">'+collection[i].handle+'</a></li>');
                    }
                }
            } else {
                // single component
                const link = `${route.path.replace(':handle', item.handle)}`;
                this.log(`${item.handle} - ${item.status.label} - ${link}${linkExtension}`);
                components.push('<li><a href="'+baseUrl+''+link+''+linkExtension+'">'+item.handle+'</a></li>');
            }
        }
    }

    fs.writeFileSync(`${__dirname}/public/${lcOutFile}`, `${documentHeader} <ol>${components.join('\n')}</ol> ${documentFooter}`);

    done();
};

// register the command
fractal.cli.command('list-components',
    listComponents,
    { description: `Lists components in the project and generates an HTML output (/${lcOutFile})` }
);

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
    reloadDelay: 1000
});
