/**
 * gulp javascript
 * Gulp task to compile js (no minification)
 */

const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const config = require('../config');

gulp.task('javascript', () => {
	const wpConfig = Object.create(webpackConfig);

	// wpConfig.output.publicPath = './';

	// run webpack
	return webpack(wpConfig, err => {
		if (err) {
			throw new gutil.PluginError('compile', err);
		}
	});
});
