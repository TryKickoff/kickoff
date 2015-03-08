module.exports.tasks = {

	/**
	 * browserSync
	 * http://www.browsersync.io/docs/options/
	 * http://www.browsersync.io/docs/grunt/
	 */
	browserSync: {
		serve: {
			bsFiles: {
				src: ['css/*.css', '<%=config.js.distDir%>/*.js', '*.html']
			},
			options: {
				watchTask: true,
				server: {
					baseDir: "./"
				}
			}
		},


		start: {
			bsFiles: {
				src: ['css/*.css', '<%=config.js.distDir%>/*.js', '*.html']
			},
			options: {
				watchTask: true,
				server: {
					baseDir: "./",
					index: "_docs/index.html"
				}
			}
		},


		styleguide: {
			bsFiles: {
				src: ['css/*.css', '<%=config.js.distDir%>/*.js', '*.html']
			},
			options: {
				watchTask: true,
				server: {
					baseDir: "./",
					index: "_docs/styleguide.html"
				}
			}
		}
	}
};
