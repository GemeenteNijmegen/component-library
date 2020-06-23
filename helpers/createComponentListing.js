const fractal = require('../fractal');
const fs = require('fs');
const getVersion = require('./getVersion');
const { componentListingFile, componentListingRootFile } = require('./paths');

const documentHeader = `
    <!doctype html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
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

const logger = fractal.cli.console;

const route = fractal.web._themes.get('default')._routes.get('preview');
let baseUrl = '';
let linkExtension = '';
if (process.env.NODE_ENV === 'production') {
    baseUrl = '/v' + getVersion();
    linkExtension = fractal._config.web.builder.ext;
}

const createListing = async () => {
    // call fractal custom cli command: list-components
    const componentHandles = await fractal.cli.exec(`list-components`).catch(err => {
        logger.error('Fractal components listing error!');
        logger.error(err);
    });
    const output = componentHandles.map(componentHandle => {
        const link = baseUrl + `${route.path.replace(':handle', componentHandle)}` + linkExtension;
        return `<li><a href="${link}">${componentHandle}</a></li>`;
    });

    fs.writeFileSync(componentListingFile, `${documentHeader} <ol>${output.join('\n')}</ol> ${documentFooter}`);
    fs.writeFileSync(componentListingRootFile, `${documentHeader} <ol>${output.join('\n')}</ol> ${documentFooter}`);
    logger.success('Fractal components listing generated');
};

module.exports = createListing;
