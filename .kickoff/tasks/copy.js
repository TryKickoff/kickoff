/**
 * gulp copy
 * copy files
 */
const config = require('../config');
const gulp = require('gulp');

gulp.task('copy', ['copy:standaloneJS'], () => {
	console.log('Copying files');
});

// Copy the standalone js files
gulp.task('copy:standaloneJS', () => {
	return gulp.src(`${config.js.srcDir}/standalone/*`)
		.pipe(gulp.dest(`${config.js.distDir}/standalone`));
});

