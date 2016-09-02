/**
 * gulp clean
 */
const gulp = require('gulp');
const del = require('del');
const config = require('../config');

gulp.task('clean', [/*'clean:images', 'clean:js', 'clean:css', 'clean:icons'*/], () => {
	console.log('Cleaning files');
});

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

// Clean the icons directory
gulp.task('clean:icons', () => {
	return del([config.icons.distDir]);
});

// Clean the fonts directory
// gulp.task('clean:fonts', () => {
// 	return del([config.icons.distDir]);
// });
