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
 */
fractal.web.set('server.sync', true);

/* Options passed to BrowserSync */
fractal.web.set('server.syncOptions', {
  /* Files to watch for changes */
  files: ["src/**/*.scss"],
  /* Adding a delay to make sure the sourcefiles are compiled before pushing the refresh to the browser */
  reloadDelay: 1000
});
