const gulp = require('gulp');
const del = require('del');
const gulpConfig = require('./config');

/**
 * cleanup
 * https://github.com/sindresorhus/del
 * Gulp task to cleanup standalone.js and styleguide.js after build
 * Needed because every webpack entry point generates a .js file too
 */

gulp.task('cleanup', () => {
  del([
    gulpConfig.js.distDir + 'standalone.*',
    gulpConfig.js.distDir + 'styleguide.*',
  ]);
});
