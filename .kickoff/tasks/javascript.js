/**
 * gulp javascript
 * Gulp task to compile js (no minification)
 */

const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const webpack = require('webpack');
const filesizegzip = require('filesizegzip');
const config = require('../config');
const webpackConfig = require('./webpack.config');

gulp.task('javascript', () => {
	return webpack(webpackConfig, (err, stats) => {
		if (err) {
			console.error(err.stack || err);
			if (err.details) {
				console.log();
				console.error(err.details);
				console.log();
			}
			return;
		}

		const info = stats.toJson('minimal');

		if (stats.hasErrors()) {
			console.log();
			console.error('Error in ' + info.errors.toString());
			console.log();
		}

		if (stats.hasWarnings()) {
			console.log();
			console.warn(info.warnings.toString());
			console.log();
		}

		// Output file-size
		if (config.misc.showFileSize) {
			for (const prop in config.js.entryPoints) {
				const item = fs.readFileSync(path.resolve(`${config.js.distDir}/${prop}.js`), 'utf8');
				console.log(`❯❯ JS  ${prop}.js`, filesizegzip(item, true));
			}
		}
	});
});
