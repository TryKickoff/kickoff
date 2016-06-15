const gulp = require('gulp');
const gulpConfig = require('./config');
const del = require('del');

/**
 * clean
 * https://github.com/sindresorhus/del
 * Gulp task to clean dist dir before build
 */

gulp.task('clean', () => {
  del(gulpConfig.distDir);
});

/**
 * copy
 * Gulp task to move standalone files
 */

 gulp.task('copy', () =>
  gulp.src(gulpConfig.srcDir + '/js/standalone/**/*')
    .pipe(gulp.dest(gulpConfig.js.distDir + '/standalone'))
 );
