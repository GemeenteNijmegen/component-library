const Bundler = require('parcel-bundler');
const fractal = require('./fractal.js');
const path = require('path');
const { copyFileSync } = require('fs');
const createComponentListing = require('./helpers/createComponentListing');

const entryFiles = path.join(__dirname, 'src/entry.js');
const options = {
    outDir: './public/',
    outFile: 'nijmegen.js',
    global: 'nijmegen',
    contentHash: false,
    hmr: false,
};

const runDev = async function() {
    const logger = fractal.cli.console;
    const server = fractal.web.server({
        sync: true,
    });

    const bundler = new Bundler(entryFiles, options);
    await bundler.bundle();
    await server.start();
    copyFileSync(path.join(__dirname, 'root/version.json'), path.join(__dirname, 'public/version.json'));
    logger.success(`Fractal server is now running at ${server.url}`);
};

const build = async function() {
    options.publicUrl = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '/';
    const logger = fractal.cli.console;
    const builder = fractal.web.builder();

    const bundler = new Bundler(entryFiles, options);

    logger.log('\nStart creating component listing ...\n');
    await createComponentListing();
    logger.log('\nStart bundling assets ...\n');
    await bundler.bundle();
    logger.success('Assets bundled');
    logger.log('\nStart building fractal ...\n');
    await builder.build();
    logger.success('Fractal build completed!');
};

if (process.env.NODE_ENV === 'development') {
    runDev();
} else {
    build();
}
