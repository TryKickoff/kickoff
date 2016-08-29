/**
 * CSS config
 */

const config = require('../config');
const gulp = require('gulp');


/**
 * gulp compile
 */
gulp.task('compile', ['css', 'images', 'icons', 'javascript']);
