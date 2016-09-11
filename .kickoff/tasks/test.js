/**
 * gulp css
 */
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const stylelint = require('gulp-stylelint');
const gulpIf = require('gulp-if');

// PostCSS plugins
const reporter = require('postcss-reporter');
const scss = require('postcss-scss');
const bemLinter = require('postcss-bem-linter');
const doiuse = require('doiuse');

const config = require('../config');
const pkg = require('../../package.json');

gulp.task('test', ['test:css' /*, 'test:js'*/], () => {
	console.log('Testing files');
});

gulp.task('test:css', () => {
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
		);
});

