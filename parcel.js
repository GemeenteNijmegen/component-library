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

(async function() {
    const logger = fractal.cli.console;
    const server = fractal.web.server({
        sync: true,
    });

    const bundler = new Bundler(entryFiles, options);
    const bundle = await bundler.bundle();

    await server.start();
    logger.success(`Fractal server is now running at ${server.url}`);
})();
