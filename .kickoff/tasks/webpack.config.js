/**
 * Webpack config
 */
const path = require('path');
const webpack = require('webpack');
const ClosureCompilerPlugin = require('webpack-closure-compiler');
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
		new webpack.optimize.DedupePlugin(),

		// Reduce React builds by using the production flag
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),

		new ClosureCompilerPlugin({
			compiler: {
				language_in: 'ECMASCRIPT6',
				language_out: 'ECMASCRIPT5',
				compilation_level: 'ADVANCED',
			},
			concurrency: 3,
		}),

		new webpack.BannerPlugin(config.misc.banner, {
			raw: true,
		})
	);
} else {
	webpackConfig.devtool = 'cheap-module-source-map'; // Source maps
}

module.exports = webpackConfig;
