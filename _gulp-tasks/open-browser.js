const gulp = require('gulp');
const opn = require('opn');

/**
 * open-browser
 * https://github.com/sindresorhus/opn
 * Gulp task to open a browser window
 */

gulp.task('open-browser', () => {
  opn('http://trykickoff.com/learn/checklist.html');
});
