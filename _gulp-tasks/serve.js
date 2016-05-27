const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./../webpack.config.js');

/**
 * serve
 * Gulp task to start webpack-dev-server
 */

gulp.task('serve', () => {
  // additional webpack config options
  const myConfig = Object.create(webpackConfig);

  // eval each module (no source maps)
  myConfig.devtool = 'eval';

  myConfig.debug = true;

  // TODO -- we need something like this for hot module reloading
  // myConfig.entry.bundle.unshift('webpack-dev-server/client?http://localhost:3000/');

  // run webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    publicPath: myConfig.output.publicPath,
    stats: myConfig.devServer.stats,
  }).listen(3000, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
  });
});
