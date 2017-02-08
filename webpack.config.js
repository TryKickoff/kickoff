var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

const config = {
  entry: [
    './assets/src/js/script.js',
    './assets/src/scss/kickoff.scss'
  ],
  output: {
    path: path.resolve(__dirname, 'assets/dist'),
    filename: 'kickoff.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
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
  plugins: [
    new CleanWebpackPlugin('assets/dist', { verbose: false }),
    new ExtractTextPlugin('kickoff.css')
  ]
}

module.exports = config
