/**
 * Webpack config
 */
const config = require('./.kickoff/config');
const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const webpackConfig = {
	entry: config.js.entryPoints,
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, config.distDir),
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
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								sourceMap: true,
							},
						},
						'postcss-loader',
						'sass-loader',
					],
				}),
			},
		],
	},
	devtool: 'source-map',
	plugins: [
		new CaseSensitivePathsPlugin(),
		new ExtractTextPlugin(`${config.css.distFile}.css`),
		new BrowserSyncPlugin({
			// browse to http://localhost:3000/ during development,
			// ./public directory is being served
			host: 'localhost',
			port: 3001,
			server: { baseDir: ['public'] },
		}),
	],
};

module.exports = webpackConfig;
