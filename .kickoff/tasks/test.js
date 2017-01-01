/**
 * gulp css
 */
const gulp = require('gulp');
const stylelint = require('gulp-stylelint');
const config = require('../config');

gulp.task('test', ['test:css' /*, 'test:js'*/]);

gulp.task('test:css', () => {
	return gulp.src([`${config.css.scssDir}/*.scss`])
		.pipe(
			stylelint({
				reporters: [{
					formatter: 'string',
					console: true,
				}],
			})
		);
});
