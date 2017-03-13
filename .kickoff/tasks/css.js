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
const rename = require('gulp-rename');

// PostCSS plugins
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const flexbugsFixes = require('postcss-flexbugs-fixes');

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
				eyeglass()
			).on('error', sass.logError)
		)

		// PostCSS tasks after Sass compilation
		.pipe(
			postcss([
				flexbugsFixes(),
				autoprefixer({browsers: config.css.browsers}),
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
		.pipe(
			rename(config.css.distFile + '.css')
		)

		// Output file-size
		.pipe(
			config.misc.showFileSize ? tap(file => {
				console.log(`❯❯ CSS ${file.relative}`, filesizegzip(file.contents, true));
			}) : gutil.noop()
		)

		// Write file
		.pipe(gulp.dest(`${config.css.distDir}`));
});

