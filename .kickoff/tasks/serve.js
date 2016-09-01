/**
 * gulp serve
 * Gulp task to run Browsersync server
 */
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../config');
const webpackConfig = require('../config/webpack.config.js');

// const reload = browserSync.reload;
const compiler = webpack(webpackConfig);

gulp.task('serve', ['watcher'], () => {

	webpackConfig.plugins.push(
		// Webpack 1.0
		new webpack.optimize.OccurenceOrderPlugin(),
		// Webpack 2.0 fixed this mispelling
		// new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	);

	for (const key in config.js.entryPoints) {
		config.js.entryPoints[key].unshift('webpack-hot-middleware/client?&reload=true');
	}

	webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

	browserSync.init({
		server: {
			baseDir: './',
		},

		middleware: [
			webpackDevMiddleware(compiler, {
				stats: 'errors-only',
				publicPath: path.resolve(webpackConfig.output.publicPath),
			}),
			webpackHotMiddleware(compiler),
		],

		files: [
			`${config.css.distDir}/**/*.css`,
			// `${config.js.distDir}/**/*.js`,
			`${config.img.distDir}/**/*`,
			`${config.icons.distDir}/**/*`,
			'**/*.html',
		],

		notify: {
			styles: [
				'pointer-events: none',
				'position: fixed',
				'bottom: 10px',
				'left: 10px',
				'text-align: center',
				'background-color: rgba(24, 24, 48, 0.8)',
				'color: #fff',
				'padding: 10px',
				'border: 2px solid #fff',
				'font: 13px Menlo, Monaco, monospace',
				'border-radius: 5px',
			],
		},
	});
});
