/**
 * Webpack config
 */
const config = require('../shared/config');
const path = require('path');
const webpack = require('webpack');

let webpackConfig = {
	entry: config.js.entryPoints,
	output: {
		path: `${config.js.distDir}`,
		publicPath: `${config.js.distDir}/`,
		filename: '[name].js',
	},
	devServer: {
		inline: true,
		port: 3000,
		stats: 'errors-only',
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
			},
		],
	},
		plugins: [
	],
};


if (process.env.RELEASE) {
	webpackConfig.plugins.push(
		new webpack.optimize.DedupePlugin()
	);

	webpackConfig.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false,
			mangle: true,
			comments: false
		})
	);
}

module.exports = webpackConfig;
