/**
 * Gulp tasks:
 * - gulp            : default task. Alias for `gulp compile`
 * - gulp compile    : compiles js, scss, minifies images etc
 * - gulp css        : processes scss both for kickoff and styleguide
 * - gulp javascript : compile js (using Webpack)
 * - gulp serve      : run Browsersync server (with hot module reloading)
 * - gulp svg        : converts SVGs into an SVG sprite-sheet
 * - gulp images     : minifies images
 * - gulp copy       : copies files, including standalone js files, to dist folder
 * - gulp clean      : deletes certain dist directories
 * - gulp watch      : watches for changes and compile
 * - gulp test       : various tests. e.g. scss linting
 */
require('./.kickoff/index');
