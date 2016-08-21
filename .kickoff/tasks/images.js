/**
 * CSS config
 */

const config = require('../shared/config');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cached');


/**
 * gulp css
 */
gulp.task('images', () => {
	// process.env.RELEASE = false;

	return gulp.src([`${config.img.srcDir}/**/*`])
		.pipe(
			imagemin()
		)
		.pipe(
			gulp.dest(`${config.img.distDir}`)
		);
});

