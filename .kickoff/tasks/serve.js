/**
 * gulp serve
 * Gulp task to run Browsersync server
 */
const path = require('path');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.config.js');

gulp.task('serve', ['watcher'], () => {
	webpackConfig.plugins.push(
		new webpack.NoErrorsPlugin()
	);

	browserSync.init({
		server: {
			baseDir: './',
		},

		files: [
			`${config.css.distDir}/**/*.css`,
			`${config.js.distDir}/**/*.js`,
			`${config.img.distDir}/**/*`,
			`${config.svg.distDir}/**/*`,
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
