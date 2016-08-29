/**
 * gulp icons
 * SVG icon creation
 */

const config = require('../config');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
var svgo = require('imagemin-svgo');


gulp.task('icons', () => {
	return gulp.src([`${config.icons.srcDir}/*`])
		.pipe(
			imagemin([
				imagemin.svgo({
					plugins: [
						{ cleanupAttrs: true },
						{ removeComments: true },
						{ removeDoctype: true },
						{ removeMetadata: true },
						{ removeXMLProcInst: true },
						{ removeEditorsNSData: true },
						{ cleanupNumericValues: true },
						{ collapseGroups: true },
						{ sortAttrs: true },
						{ removeViewBox: false },
						{ removeUselessStrokeAndFill: false },
						{ removeEmptyAttrs: false },
					]
				})
			],
			{verbose: true})
		)
		.pipe(
			svgstore()
		)
		.pipe(
			gulp.dest(`${config.icons.distDir}`)
		);
});

