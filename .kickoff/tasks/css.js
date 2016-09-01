/**
 * gulp css
 */
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const stylelint = require('gulp-stylelint');
const gulpIf = require('gulp-if');
const banner = require('gulp-banner');
const filesizegzip = require('filesizegzip');
const tap = require('gulp-tap');

// PostCSS plugins
const reporter = require('postcss-reporter');
const scss = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const bemLinter = require('postcss-bem-linter');
const doiuse = require('doiuse');
const flexbugsFixes = require('postcss-flexbugs-fixes');

const config = require('../config');
const pkg = require('../../package.json');

gulp.task('css', () => {
	return gulp.src([`${config.css.scssDir}/*.scss`])
		.pipe(
			gulpIf(process.env.TEST,
				stylelint({
					reporters: [
						{
							formatter: 'string',
							console: true,
						},
					],
				})
			)
		)

		.pipe(
			gulpIf(process.env.TEST,
				postcss([
					bemLinter(),
					doiuse({
						browsers: config.css.browsers,
						ignoreFiles: [
							'**/_reset.scss',
							'node_modules/**',
						],
					}),
					reporter({clearMessages: true}),
				],
				{syntax: scss})
			)
		)

		// Init sourcemaps
		.pipe(gulpIf(!process.env.RELEASE, sourcemaps.init()))

		// Sass Compilation
		.pipe(
			sass({
				importer: require('npm-sass').importer,
			}).on('error', sass.logError)
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
		.pipe(banner(config.misc.banner))

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

