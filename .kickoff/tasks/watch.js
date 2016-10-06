/**
 * gulp watch
 */
const config = require('../config');
const gulp = require('gulp');

gulp.task('watch', ['compile'], () => {
	gulp.watch([`${config.css.scssDir}/**/*.scss`], ['css']);
	gulp.watch([`${config.svg.srcDir}/**/*`], ['svg']);
	gulp.watch([`${config.img.srcDir}/**/*`], ['images']);
	gulp.watch(`${config.js.srcDir}/**/*.js`, ['javascript']);
});

// Alias of watch task
gulp.task('watcher', ['watch'])

