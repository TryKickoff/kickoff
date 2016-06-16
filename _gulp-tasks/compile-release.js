const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('./../webpack.config.js');

gulp.task('compile-release', ['clean', 'build-release', 'css-release', 'images', 'copy']);


/**
 * build-release
 * Gulp task to compile and minify js
 */

gulp.task('build-release', () => {
  // additional webpack config options
  const myConfig = Object.create(webpackConfig);

  // generate source maps for css and js
  myConfig.devtool = 'source-map';

  // myConfig.output.publicPath = './';

  // minify with built-in webpack plugins
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, (err) => {
    if (err) throw new gutil.PluginError('compile-release', err);
  });
});
