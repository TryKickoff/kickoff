/**
 * CSS config
 */

const config = require('../shared/config');
const gulp = require('gulp');


/**
 * gulp compile
 */
gulp.task('compile', ['css', 'images', 'icons']);
