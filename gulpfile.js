'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const through = require('through2');

const mdbootstrapPath = 'src/mdbootstrap-pro/v4.5.0';
const materialdesigniconsPath = 'node_modules/mdi';
const materialdesigniconsFontPath = materialdesigniconsPath + '/fonts';

const buildMode = gutil.env.env || 'dev'; // dev || prod

let xmlEdit;
let fs;

if (buildMode === 'dev') {
  xmlEdit = require('gulp-edit-xml');
  fs = require('fs');
}

function stripSourceMappingURL() {
  return through.obj(function(file, enc, cb) {
    if (!file.isNull()) {
      var src = file.contents.toString('utf8');
      var re = /(^\/\/# sourceMappingURL=.*)/m;
      src = src.replace(re, "");
      file.contents = new Buffer(src.trim());
    }
    this.push(file);
    cb();
  });
}

/*
 * Fractal
 */
gulp.task('fractal:start', function(){
  const fractal = require('./fractal.js');
  fractal._config.env = buildMode === 'dev' ? 'development' : 'production';
  const logger = fractal.cli.console;
  const server = fractal.web.server({
    sync: true
  });

  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
});

gulp.task('fractal:build', function(){
  const fractal = require('./fractal.js');
  const logger = fractal.cli.console;
  const builder = fractal.web.builder();

  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
    logger.success('Fractal build completed!');
  });
});

/*
 * MDB Addons
 */
gulp.task('mdb-addons:copy', function () {
  return gulp.src(mdbootstrapPath+'/mdb-addons/**/*').pipe(gulp.dest('public/mdb-addons'));
});

gulp.task('mdb-addons:clean', function() {
  return del(['public/mdb-addons']);
});

gulp.task('mdb-addons', gulp.series('mdb-addons:clean', 'mdb-addons:copy'));

/*
 * MDB Images
 */
gulp.task('mdb-images:copy', function () {
  return gulp.src(mdbootstrapPath+'/img/**/*').pipe(gulp.dest('public/img'));
});

gulp.task('mdb-images:clean', function() {
  return del(['public/img/lightbox', 'public/img/overlays', 'public/img/svg']);
});

gulp.task('mdb-images', gulp.series('mdb-images:clean', 'mdb-images:copy'));

/*
 * Fonts
 */
gulp.task('fonts:clean', function() {
  return del(['public/font']);
});

gulp.task('mdb-fonts:copy', function() {
  return gulp.src(mdbootstrapPath+'/font/**/*').pipe(gulp.dest('public/font'));
});

gulp.task('mdi-fonts:copy', function() {
  return gulp.src('node_modules/mdi/fonts/*.{eot,svg,ttf,woff,woff2}').pipe(gulp.dest('public/font/mdi'));
});

gulp.task('fonts:copy', function() {
  return gulp.src('./src/font/**/*').pipe(gulp.dest('public/font'));
});

gulp.task('fonts', gulp.series('fonts:clean', 'fonts:copy', 'mdb-fonts:copy', 'mdi-fonts:copy'));

/*
 * MDB JavaScript
 */
gulp.task('mdb-js:clean', function() {
  return del(['public/js']);
});

gulp.task('mdb-js:copy', function() {
  return gulp.src([mdbootstrapPath+'/js/*.min.js'])
    .pipe(stripSourceMappingURL())
    .pipe(gulp.dest('public/js')
  );
});

gulp.task('mdb-js:watch', function () {
  gulp.watch([
    mdbootstrapPath+'/js/**/*',
  ], gulp.series('mdb-js'));
});

gulp.task('mdb-js', gulp.series('mdb-js:clean', 'mdb-js:copy'));

/*
 * CSS
 */
gulp.task('css:process', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({
      // set path to MDB sass files so these can be found by 'import' statements
      // while compiling new CSS
      // includePaths: [mdbootstrapPath+'/sass/', materialdesigniconsPath+'/scss/'],
      includePaths: [mdbootstrapPath+'/scss/', materialdesigniconsPath+'/scss/', 'src/scss/nijmegen/'],
      outputStyle: buildMode === 'dev' ? 'nested' : 'compressed'
    }))
    .on('error', err => console.log(err.message))
    .pipe(buildMode === 'dev' ? sourcemaps.write('maps') : gutil.noop())
    .pipe(gulp.dest('public/css'));
});

gulp.task('css:clean', function() {
  return del(['public/css']);
});

// Copy MDB style file
gulp.task('mdb-css:copy', function() {
  return gulp.src(mdbootstrapPath+'/css/bootstrap.min.css').pipe(gulp.dest('public/css'));
});

gulp.task('css:watch', function() {
  gulp.watch([
    'src/scss/**/*.scss',
  ], gulp.series('css'));
});

gulp.task('css', gulp.series('css:clean', 'mdb-css:copy', 'css:process'));


// Build archive of public files
const zip = require('gulp-zip');
gulp.task('build-archive', function() {
  return gulp.src(['build/{css,font,img,js,mdb-addons}/**'], {base: 'build/'})
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest('build/'));
});

// Generate component view with all icons from icon library
let icons = [];
gulp.task('extract-icons-from-mdi-svg', function() {
  const stream = gulp
    .src(materialdesigniconsFontPath+'/materialdesignicons-webfont.svg')
    .pipe(
      xmlEdit(function(xml) {
        const nodes = xml.svg.defs[0].font[0].glyph;
        const nodesLen = nodes.length;
        for (let i = 0; i < nodesLen; i++) {
          const cn = nodes[i].$;
          icons.push('<i class="mdi mdi-' + cn['glyph-name'] + '" aria-hidden="true"></i>');
        }
        return xml;
      })
    );
  return stream;
});

gulp.task('build-icons-listing', gulp.series('extract-icons-from-mdi-svg', function(done) {
  if (icons.length) {
    fs.writeFileSync('components/icons/icons.hbs', icons.join('\n'));
  }
  done();
}));


/*
 * Combinations
 */
gulp.task('default', gulp.parallel('css', 'fonts', 'mdb-js', 'mdb-addons', 'mdb-images'));

gulp.task('build', gulp.series('default', 'fractal:build', 'build-archive'));

gulp.task('watch', gulp.parallel('css:watch'));

gulp.task('dev', gulp.series('default', 'fractal:start', 'watch'));
