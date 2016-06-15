const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('./../webpack.config.js');

gulp.task('compile', ['clean', 'build', 'css', 'images', 'copy']);

/**
 * build
 * Gulp task to compile scss, js, and images (no minification)
 */

gulp.task('build', () => {
  // additional webpack config options
  const myConfig = Object.create(webpackConfig);

  // generate source maps for css and js
  myConfig.devtool = 'source-map';

  // myConfig.output.publicPath = './';

  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    })
  );

  // run webpack
  webpack(myConfig, (err) => {
    if (err) throw new gutil.PluginError('compile', err);
  });
});
