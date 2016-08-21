/**
 * gulp watcher
 */

const config = require('../shared/config');
const gulp = require('gulp');
const runSequence = require('run-sequence');


gulp.task('watcher', () => {

	runSequence(
		'compile'
	);

	gulp.watch([`${config.css.scssDir}/**/*.scss`], ['css']);
	gulp.watch([`${config.icons.srcDir}/**/*`], ['icons']);
	gulp.watch([`${config.img.srcDir}/**/*`], ['images']);
	// gulp.watch(`${config.js.srcDir}/**/*.js`, ['webpack']);
});

