const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const config = require('./_gulp-tasks/config');
const jsDistDir = config.js.distDir.replace(config.distDir, '').replace('/', '');
const cssDistDir = config.css.distDir.replace(config.distDir, '').replace('/', '');

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './' + config.srcDir)
];

// separate entry points so we generate separate css files
// if you don't want the styleguide, comment the entry point below out
const entryPoints = {};
entryPoints[config.css.distFile] = ['./' + config.srcDir + '/entry-kickoff'];
entryPoints.styleguide = ['./' + config.srcDir + '/entry-styleguide'];

module.exports = {
  entry: entryPoints,
  output: {
    path: path.join(__dirname, './' + config.distDir),
    publicPath: '/' + config.distDir,
    filename: jsDistDir + config.js.distFile,
  },
  devServer: {
    inline: true,
    port: 3000,
    stats: 'errors-only',
  },
  module: {
    loaders: [
      {
        test: /standalone\/.*$/,
        loader: 'file?name=' + jsDistDir + 'standalone/[name].[ext]',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')),
      },
      {
        test: /\.svg$/,
        loader: 'file?name=img/icons/[name].[ext]',
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        loaders: [
          'file?name=img/[name].[ext]',
          'image-webpack'
        ]
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(config.distDir, { verbose: false }),
    new ExtractTextPlugin(cssDistDir + '/[name].css'),
  ],
  postcss: [
    autoprefixer({
      browsers: config.css.autoprefixer,
    }),
  ],
  imageWebpackLoader: {
    pngquant:{
      quality: '40-50',
      speed: 4
    },
  }
};
