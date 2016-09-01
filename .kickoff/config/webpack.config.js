/**
 * Webpack config
 */
const path = require('path');
const webpack = require('webpack');
const config = require('../config');

const webpackConfig = {
	entry: config.js.entryPoints,
	output: {
		path: path.resolve(`${config.js.distDir}`),
		publicPath: path.resolve(`${config.js.distDir}/`) + '/',
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
	plugins: [],
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
