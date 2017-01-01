/**
 * gulp images
 */

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const config = require('../config');

gulp.task('images', () => {
	return gulp.src([`${config.img.srcDir}/**/*`])
		.pipe(
			imagemin()
		)
		.pipe(
			gulp.dest(`${config.img.distDir}`)
		);
});

