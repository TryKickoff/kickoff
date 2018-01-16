/**
 * Webpack config
 */
const path = require('path');
// const {resolve} = require('path')
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const config = require('./.kickoff/config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const eyeglass = require('eyeglass');

module.exports = {
	// context: path.resolve(__dirname, '../assets/src'),
	entry: config.js.entryPoints,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'assets/dist'),
  },
	// output: {
	// 	path: path.resolve(`${config.distDir}`),
	// 	// publicPath: path.resolve(`${config.distDir}/`) + '/',
	// 	filename: '[name].js',
	// },
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
								sourceMap: true
							}
						},
						'postcss-loader',
						'sass-loader'
					]
				})
			},

			// {
      //   test: /\.scss$/,
      //   include: config.paths.assets,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     publicPath: '../',
      //     use: [
      //       `css?${sourceMapQueryStr}`,
      //       'postcss',
      //       `resolve-url?${sourceMapQueryStr}`,
      //       {
      //         loader: `sass?${sourceMapQueryStr}`,
      //         options: eyeglass({
      //             // sass options...
      //             includePaths: ['/share/scss/'],
      //             eyeglass: {
      //               // eyeglass options
      //             }
      //           })
      //       }
      //     ],
      //   }),
      // },
		],
	},
	devtool: 'source-map', // Source maps
	plugins: [
		new CaseSensitivePathsPlugin(),
		new ExtractTextPlugin("kickoff.css"),
	],
	devServer: {
		// hot: true,
		publicPath: '/',
		contentBase: './assets/dist',
		// contentBase: path.resolve(`${config.distDir}/`) + '/',
		// historyApiFallback: true,
	},
};

/**
 * The below plugins are used when the `--release` flag is used
 * - minification using uglify
 * - add a banner using the banner plugin
 */
// if (config.isRelease) {
// 	webpackConfig.plugins.push(
// 		// Minify the code using Uglify
// 		new webpack.optimize.UglifyJsPlugin({
// 			output: {
// 				comments: false,
// 			},
// 		}),

// 		new webpack.BannerPlugin({
// 			banner: config.misc.banner,
// 			raw: true,
// 		}),

// 		new ExtractTextPlugin("kickoff.css"),
// 	);
// }
