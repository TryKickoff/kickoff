/**
 * gulp javascript
 * Gulp task to compile js (no minification)
 */

const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.js');
const WebpackDevServer = require('webpack-dev-server');


gulp.task('serve', () => {
	var myConfig = Object.create(webpackConfig);
	// eval each module (no source maps)
	myConfig.devtool = 'eval';
	myConfig.debug = true;

	myConfig.plugins.push(
		new webpack.HotModuleReplacementPlugin()
	);

	myConfig.entry.kickoff.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");

	// run webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
		publicPath: myConfig.output.publicPath,
		hot: true,
		stats: {
			colors: true
		},
	}).listen(3000, 'localhost', (err) => {
		if (err) throw new gutil.PluginError('webpack-dev-server', err);
		gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
	});
});
