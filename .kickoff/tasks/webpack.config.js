/**
 * Webpack config
 */
const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const config = require('../config');

const webpackConfig = {
	entry: config.js.entryPoints,
	output: {
		path: path.resolve(`${config.js.distDir}`),
		publicPath: path.resolve(`${config.js.distDir}/`) + '/',
		filename: '[name].js',
	},
	stats: {
		colors: true,
		modules: true,
		reasons: true,
		errorDetails: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					cacheDirectory: true,
				},
			},
		],
	},
	devtool: 'source-map', // Source maps
	plugins: [
		// Watcher doesn't work well if you mistype casing in a path so we use
		// a plugin that prints an error when you attempt to do this.
		// See https://github.com/facebookincubator/create-react-app/issues/240
		new CaseSensitivePathsPlugin(),
	],
};

/**
 * The below plugins are used when the `--release` flag is used
 * - minification using uglify
 * - add a banner using the banner plugin
 */
if (config.isRelease) {
	webpackConfig.plugins.push(
		// Minify the code using Uglify
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
			output: {
				comments: false,
			},
		}),

		new webpack.BannerPlugin({
			banner: config.misc.banner,
			raw: true,
		})
	);
}

module.exports = webpackConfig;
