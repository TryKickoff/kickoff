/**
 * gulp compile
 */
const gulp = require('gulp');
const config = require('../config');

gulp.task('compile', [
	'precompile',
	'css',
	'javascript',
	'images',
	'svg',
	'copy',
], () => {
	console.log();
	console.log('❯❯ Kickoff compiled');
	console.log();
});

gulp.task('precompile', () => {
	if (process.env.RELEASE) {
		console.log();
		console.log('❯❯ Creating an optimized production build...');
		console.log();
	}
});
