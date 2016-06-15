const gulp = require('gulp');
const gulpConfig = require('./config');
const imagemin = require('gulp-imagemin');

/**
 * images
 */

gulp.task('images', () =>
  gulp.src(gulpConfig.img.srcDir + '/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(gulpConfig.img.distDir))
);
