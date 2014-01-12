// Include gulp
var gulp = require('gulp'),

// Include Our Plugins
	jshint     = require('gulp-jshint'),
	sass       = require('gulp-ruby-sass'),
	concat     = require('gulp-concat'),
	uglify     = require('gulp-uglify'),
	rename     = require('gulp-rename'),
	lr         = require('tiny-lr'),
	livereload = require('gulp-livereload'),
	server     = lr()
;


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
		.pipe(sass({
					unixNewlines: true,
					style: 'expanded',
					lineNumbers: false,
					debugInfo : false,
					precision : 8,
					sourcemap : true
				})
		)
		.pipe(gulp.dest('./css'))
		.pipe(livereload(server));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
	gulp.src(jsFileList)
		.pipe(concat('app.js'))
		.pipe(gulp.dest(jsDistDir))
		.pipe(rename('app.min.js'))
		.pipe(uglify({
			mangle: true, // mangle: Turn on or off mangling
			beautify: false, // beautify: beautify your code for debugging/troubleshooting purposes
			compress: true,
			// report: 'gzip', // report: Show file size report
			outSourceMap	: jsDistDir + jsFile + '.map',
			sourceMappingURL: jsFile + '.map',
			sourceMapRoot: '../../'
		}))
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
	server.listen(35729, function (err) {
		if (err) { return console.log(err); }

		gulp.watch('./scss/**/*.scss', function(){
			gulp.run('sass');
		});
	});
});
