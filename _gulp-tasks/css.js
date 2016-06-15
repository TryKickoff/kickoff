const gulp = require('gulp');
const gulpConfig = require('./config');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

/**
 * css
 */

gulp.task('css', () => {
  const processors = [
    autoprefixer({ browsers: gulpConfig.css.autoprefixer }),
    cssnano({ discardComments: { removeAll: true }}),
  ];

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
});
