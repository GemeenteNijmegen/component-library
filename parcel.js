const Bundler = require('parcel-bundler');
const fractal = require('./fractal.js');
const path = require('path');

const entryFiles = path.join(__dirname, 'src/entry.js');
const options = {
    outDir: './public/',
    outFile: 'nijmegen.js',
    global: 'nijmegen',
    contentHash: false,
};

const runDev = async function() {
    const logger = fractal.cli.console;
    const server = fractal.web.server({
        sync: true,
    });

    const bundler = new Bundler(entryFiles, options);
    await bundler.bundle();
    await server.start();
    logger.success(`Fractal server is now running at ${server.url}`);
};

const build = async function() {
    const logger = fractal.cli.console;
    const builder = fractal.web.builder();

    const bundler = new Bundler(entryFiles, options);
    logger.success('Start bundling assets');
    await bundler.bundle();
    logger.success('Assets bundled');
    logger.success('Start building fractal');
    await builder.build();
    logger.success('Fractal build completed!');
};

if (process.env.NODE_ENV === 'development') {
    runDev();
} else {
    build();
}
