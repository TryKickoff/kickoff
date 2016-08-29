/**
 * gulp images
 */

const config = require('../config');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cached');


gulp.task('images', () => {
	return gulp.src([`${config.img.srcDir}/**/*`])
		.pipe(
			imagemin()
		)
		.pipe(
			gulp.dest(`${config.img.distDir}`)
		);
});

