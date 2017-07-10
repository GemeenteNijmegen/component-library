'use strict';

const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');

const mdbootstrapPath = 'src/mdbootstrap-pro/v4.3.2';

/*
 * Fractal
 */
gulp.task('fractal:start', function(){
  const fractal  = require('./fractal.js');
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
  const fractal  = require('./fractal.js');
  const logger = fractal.cli.console;
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
    logger.success('Fractal build completed!');
  });
});

/*
 * Fonts
 */
gulp.task('fonts:clean', function() {
  return del(['public/font']);
});

gulp.task('mdb-fonts:copy', function() {
  return gulp.src(mdbootstrapPath+'/font/**/*').pipe(gulp.dest('public/font'));
});

gulp.task('material-icon-fonts:copy', function() {
  return gulp.src('node_modules/material-design-icons/iconfont/*.{eot,svg,ttf,woff,woff2}').pipe(gulp.dest('public/font/materialicons'));
});

gulp.task('fonts:copy', function() {
  return gulp.src('./src/font/**/*').pipe(gulp.dest('public/font'));
});

gulp.task('fonts', gulp.series('fonts:clean', 'fonts:copy', 'mdb-fonts:copy', 'material-icon-fonts:copy'));

/*
 * MDB JavaScript
 */
gulp.task('mdb-js:clean', function() {
  return del(['public/js']);
});

gulp.task('mdb-js:copy', function() {
  return gulp.src(mdbootstrapPath+'/js/*.min.js').pipe(gulp.dest('public/js'));
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
    .pipe(sassGlob())
    .pipe(sass({
      // set path to MDB sass files so these can be found by 'import' statements
      // while compiling new CSS
      includePaths: mdbootstrapPath+'/sass/'
    }))
    .on('error', err => console.log(err.message))
    .pipe(gulp.dest('public/css'));
});

gulp.task('css:clean', function() {
  return del(['public/css']);
});

// Copy MDB style file
gulp.task('mdb-css:copy', function() {
  return gulp.src(mdbootstrapPath+'/css/bootstrap.min.css').pipe(gulp.dest('public/css'));
});

gulp.task('css:watch', function () {
  gulp.watch([
    'src/scss/**/*.scss',
  ], gulp.series('css'));
});

gulp.task('css', gulp.series('css:clean', 'mdb-css:copy', 'css:process'));


/*
 * Combinations
 */
gulp.task('default', gulp.parallel('css', 'fonts', 'mdb-js'));

gulp.task('build', gulp.series('default', 'fractal:build'));

gulp.task('watch', gulp.parallel('css:watch'));

gulp.task('dev', gulp.series('default', 'fractal:start', 'watch'));
