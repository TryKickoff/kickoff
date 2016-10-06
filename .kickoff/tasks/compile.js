/**
 * gulp compile
 */
const gulp = require('gulp');
const config = require('../config');

gulp.task('compile', [
	'css',
	'javascript',
	'images',
	'svg',
	'copy',
]);
