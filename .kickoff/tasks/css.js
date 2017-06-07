/**
 * gulp css
 */
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const eyeglass = require('eyeglass');
const gutil = require('gulp-util');
const banner = require('gulp-banner');
const filesizegzip = require('filesizegzip');
const tap = require('gulp-tap');
const path = require('path');

// PostCSS plugins
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const flexbugsFixes = require('postcss-flexbugs-fixes');
const pxtorem = require('postcss-pxtorem');

const config = require('../config');

gulp.task('css', () => {
	return gulp.src([`${config.css.scssDir}/*.scss`])

		// Init sourcemaps
		.pipe(
			config.isRelease ? gutil.noop() : sourcemaps.init()
		)

		// Sass Compilation
		.pipe(
			sass(
				eyeglass({
					// put node-sass options you need here.

					eyeglass: { // eyeglass options
						root: __dirname,
					}
				})
			).on('error', sass.logError)
		)

		// PostCSS tasks after Sass compilation
		.pipe(
			postcss([
				flexbugsFixes(),
				autoprefixer({browsers: config.css.browsers}),
				pxtorem({ // See other options at https://github.com/cuth/postcss-pxtorem#options
					rootValue: 20,
					selectorBlackList: ['html'],
				}),
			])
		)

		// Compress CSS
		.pipe(
			config.isRelease ? postcss([
				cssnano(),
			]) : gutil.noop()
		)

		// Add a banner
		.pipe(
			config.isRelease ? banner(config.misc.banner) : gutil.noop()
		)

		// Write sourcemaps
		.pipe(
			config.isRelease ? gutil.noop() : sourcemaps.write()
		)

    // Rename dist file based on config
    .pipe(tap(file => {
      if(path.basename(file.path) === 'kickoff.css') {
        file.path = path.join(path.dirname(file.path), config.css.distFile + '.css')
      }
    }))

		// Output file-size
		.pipe(
			config.misc.showFileSize ? tap(file => {
				console.log(`❯❯ CSS ${file.relative}`, filesizegzip(file.contents, true));
			}) : gutil.noop()
		)

		// Write file
		.pipe(gulp.dest(`${config.css.distDir}`));
});

