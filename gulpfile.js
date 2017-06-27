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
    // .pipe(bust('cachebust.json'))
    // .pipe(gulp.dest('.'));
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

gulp.task('default', gulp.parallel('css'));

gulp.task('watch', gulp.parallel('css:watch'));

gulp.task('dev', gulp.series('css', 'fractal:start', 'watch'));
