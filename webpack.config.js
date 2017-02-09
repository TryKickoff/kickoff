const config = require('./kickoff.config');
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    kickoff: './assets/src/js/script.js',
    styleguide: './assets/src/js/styleguide.js'
  }
  output: {
    path: path.resolve(__dirname, 'assets/dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // {
      //   test: /\.scss$/,
      //   use: 'style-loader!css-loader!postcss-loader!sass-loader'
      // }
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract('css-loader!postcss-loader!sass-loader')
      }
    ]
  },
  devtool: 'source-map', // Source maps
  plugins: [
    new CleanWebpackPlugin('assets/dist', { verbose: false }),
    new ExtractTextPlugin('css/[name].css')
  ]
}
