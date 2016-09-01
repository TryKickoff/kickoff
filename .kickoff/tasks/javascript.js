/**
 * gulp javascript
 * Gulp task to compile js (no minification)
 */

const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.js');


gulp.task('javascript', () => {
	// additional webpack config options
	const myConfig = webpackConfig;

	// generate source maps for css and js
	// myConfig.devtool = 'source-map';

	// myConfig.output.publicPath = './';

	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			}
		})
	);

	if (process.env.RELEASE) {
		webpackConfig.plugins.push(
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: false,
				mangle: true,
				comments: false,
			})
		);
	}

	// run webpack
	return webpack(myConfig, (err) => {
		if (err) throw new gutil.PluginError('compile', err);
	});
});
