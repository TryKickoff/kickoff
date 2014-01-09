// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


/*
	 Javascript settings - Edit this section
	 ========================================================================== */
/**
 * Specify which js files you want to include
 */
var jsFileList = [
	'js/helpers/helpers.js',
	'js/helpers/console.js',
	'js/script.js'
];

/**
 * Specify your output directory
 */
var jsDistDir = './js/dist/';

/**
 * Specify the name of your compiled JS file
 * which will be placed in the directory you define above
 */
var jsFile = 'app.min.js';


/*
	 Gulp tasks
	 ========================================================================== */

// Lint Task
gulp.task('lint', function() {
	gulp.src(jsFileList)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
	gulp.src(['./scss/kickoff.scss', './scss/kickoff-old-ie.scss', './scss/styleguide.scss'])
		.pipe(sass())
		.pipe(gulp.dest('./css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
	gulp.src(jsFileList)
		.pipe(concat('app.js'))
		.pipe(gulp.dest(jsDistDir))
		.pipe(rename('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(jsDistDir));
});

// Default Task
gulp.task('default', function(){
	gulp.run('lint', 'sass', 'scripts');

	// Watch For Changes To Our JS
	gulp.watch(jsFileList, function(){
		gulp.run('lint', 'scripts');
	});

	// Watch For Changes To Our SCSS
	gulp.watch('./scss/*.scss', function(){
		gulp.run('sass');
	});
});
