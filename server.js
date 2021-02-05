const Bundler = require('parcel-bundler');
const fractal = require('./fractal.js');
const path = require('path');
const { copyFileSync } = require('fs');
const createComponentListing = require('./helpers/createComponentListing');
const { setPreloadFiles } = require('./helpers/fractal/preloadFiles');

const entryFiles = path.join(__dirname, 'src/entry.js');
const options = {
    outDir: './public/',
    outFile: 'nijmegen.js',
    global: 'nijmegen',
    contentHash: false,
    hmr: false,
};

const handleBundled = bundle => {
    const preloadTypes = [{ ext: 'woff', type: 'font' }, { ext: 'woff2', type: 'font' }];

    const preloadFiles = [...bundle.childBundles]
        .filter(bundle => preloadTypes.some(({ ext }) => ext === bundle.type))
        .map(bundle => ({
            url: bundle.name.replace('/app/public', ''),
            type: bundle.type,
            as: preloadTypes.find(({ ext }) => ext === bundle.type).type,
        }));

    setPreloadFiles(preloadFiles);
};

const runDev = async function() {
    const logger = fractal.cli.console;
    const server = fractal.web.server({
        sync: true,
    });

    const bundler = new Bundler(entryFiles, options);
    bundler.on('bundled', handleBundled);
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
    bundler.on('bundled', handleBundled);

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
