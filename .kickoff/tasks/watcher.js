/**
 * gulp watcher
 */

const config = require('../config');
const gulp = require('gulp');

gulp.task('watcher', ['compile'], () => {
	gulp.watch([`${config.css.scssDir}/**/*.scss`], ['css']);
	gulp.watch([`${config.icons.srcDir}/**/*`], ['icons']);
	gulp.watch([`${config.img.srcDir}/**/*`], ['images']);
	gulp.watch(`${config.js.srcDir}/**/*.js`, ['javascript']);
});

