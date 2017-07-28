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
    panels: ['html', 'info', 'notes'],
    styles: ['default', '/_subtheme/css/nijmegen.css'], // link to the default stylesheet followed by a custom one
    favicon: '/_subtheme/img/favicon.ico',
});

// Add Nijmegen subtheme to fractal instance
fractal.web.theme(nijmegenTheme);

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
