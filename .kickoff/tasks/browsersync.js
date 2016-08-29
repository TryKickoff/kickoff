/**
 * gulp javascript
 * Gulp task to compile js (no minification)
 */
const config = require('../config');
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

// Watch scss AND html files, doing different things with each.
gulp.task('server', ['watcher'], () => {

		// Serve files from the root of this project
		browserSync.init({
			server: {
					baseDir: "./"
			},

			files: [
				`${config.css.distDir}/**/*.css`,
				`${config.js.distDir}/**/*.js`,
				`${config.img.distDir}/**/*`,
				`${config.icons.distDir}/**/*`,
				'**/*.html'
			],

			notify: {
				styles: [
					'pointer-events: none',
					'position: fixed',
					'bottom: 0',
					'left: 0',
					'text-align: center',
					'background-color: #181830',
					'color: #fff',
					'padding: 15px',
				],
			},
		});
});
