/**
 * gulp css
 */
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const eyeglass = require('eyeglass');
const gulpIf = require('gulp-if');
const banner = require('gulp-banner');
const filesizegzip = require('filesizegzip');
const tap = require('gulp-tap');

// PostCSS plugins
const reporter = require('postcss-reporter');
const scss = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const flexbugsFixes = require('postcss-flexbugs-fixes');

const config = require('../config');
const pkg = require('../../package.json');

gulp.task('css', () => {
	return gulp.src([`${config.css.scssDir}/*.scss`])

		// Init sourcemaps
		.pipe(gulpIf(!process.env.RELEASE, sourcemaps.init()))

		// Sass Compilation
		.pipe(
			sass( eyeglass() ).on('error', sass.logError)
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
			gulpIf(process.env.RELEASE === 'true',
				postcss([
					cssnano(),
				])
			)
		)

		// Add a banner
		.pipe(
			gulpIf(process.env.RELEASE === 'true',
				banner(config.misc.banner)
			)
		)

		// Write sourcemaps
		.pipe(gulpIf(!process.env.RELEASE, sourcemaps.write()))

		// Output filesize
		.pipe(
			tap((file) => {
				console.log('>>', file.relative, filesizegzip(file.contents, true));
			})
		)

		// Write file
		.pipe(gulp.dest(`${config.css.distDir}`));
});

