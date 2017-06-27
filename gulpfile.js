'use strict';

const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');

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

gulp.task('fonts:copy', function() {
  return gulp.src('node_modules/mdbootstrap/font/**/*').pipe(gulp.dest('public/font'));
});

gulp.task('fonts:watch', function () {
  gulp.watch([
    'node_modules/mdbootstrap/font/**/*',
  ], gulp.series('fonts'));
});

gulp.task('fonts', gulp.series('fonts:clean', 'fonts:copy'));

/*
 * CSS
 */
gulp.task('css:process', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sassGlob())
    .pipe(sass({
      includePaths: './node_modules'
    }))
    .on('error', err => console.log(err.message))
    .pipe(gulp.dest('public/css'));
});

gulp.task('css:clean', function() {
  return del(['public/css']);
});

gulp.task('css:watch', function () {
  gulp.watch([
    'src/scss/**/*.scss',
  ], gulp.series('css'));
});

gulp.task('css', gulp.series('css:clean', 'css:process'));


/*
 * Combinations
 */
gulp.task('default', gulp.parallel('css', 'fonts'));

gulp.task('build', gulp.series('default', 'fractal:build'));

gulp.task('watch', gulp.parallel('css:watch'));

gulp.task('dev', gulp.series('default', 'fractal:start', 'watch'));
