const path = require('path');

const config = require('./_gulp-tasks/config');
const jsDistDir = config.js.distDir.replace(config.distDir, '').replace('/', '');

const entryPoints = {};
entryPoints[config.css.distFile] = ['./' + config.js.srcFile];

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
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
  plugins: [
  ],
};
