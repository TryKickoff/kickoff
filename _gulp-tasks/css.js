const gulp = require('gulp');
const gulpConfig = require('./config');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

let processors = [
  autoprefixer({ browsers: gulpConfig.css.autoprefixer }),
];

function buildCss() {
  gulp.src(gulpConfig.css.scssDir + '/kickoff.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./' + gulpConfig.css.distDir));

  gulp.src(gulpConfig.css.scssDir + '/styleguide.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./' + gulpConfig.css.distDir));
}

/**
 * css
 * Gulp task to compile scss (no minification)
 */

gulp.task('css', buildCss());

/**
 * css-release
 * Gulp task to compile and minify scss
 */

gulp.task('css-release', () => {
  const cssNanoConfig = cssnano({ discardComments: { removeAll: true }});
  processors.push(cssNanoConfig);
  buildCss();
});
