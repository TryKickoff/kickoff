/**
 * gulp svg
 * SVG icon creation
 */

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const config = require('../config');

gulp.task('svg', () => {
	return gulp.src([`${config.svg.srcDir}/*`])
		.pipe(
			imagemin([
				imagemin.svgo({
					plugins: [
						{cleanupAttrs: true},
						{removeComments: true},
						{removeDoctype: true},
						{removeMetadata: true},
						{removeXMLProcInst: true},
						{removeEditorsNSData: true},
						{cleanupNumericValues: true},
						{collapseGroups: true},
						{sortAttrs: true},
						{removeViewBox: false},
						{removeUselessStrokeAndFill: false},
						{removeEmptyAttrs: false},
						{mergePaths: true},
					],
				}),
			],
			{verbose: true})
		)
		.pipe(
			svgstore()
		)
		.pipe(
			gulp.dest(`${config.svg.distDir}`)
		);
});

