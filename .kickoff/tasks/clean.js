/**
 * gulp clean
 */
const gulp = require('gulp');
const del = require('del');
const config = require('../config');

gulp.task('clean', [/*'clean:images', 'clean:js', 'clean:css', 'clean:svg'*/]);

// Clean the image directory
gulp.task('clean:images', () => {
	return del([config.img.distDir]);
});

// Clean the css directory
gulp.task('clean:css', () => {
	return del([`${config.css.distDir}/**/*`]);
});

// Clean the js directory
gulp.task('clean:js', () => {
	return del([config.js.distDir]);
});

// Clean the svg directory
gulp.task('clean:svg', () => {
	return del([config.svg.distDir]);
});

// Clean the fonts directory
// gulp.task('clean:fonts', () => {
// 	return del([config.fonts.distDir]);
// });
