module.exports.tasks = {

	/**
	 * Connect
	 * https://github.com/gruntjs/grunt-contrib-connect
	 * Start a static web server
	 */
	connect: {
		site: {
			options: {
				open: true,
				livereload: true
			}
		},
		styleguide: {
			options: {
				open: {
					target: 'http://0.0.0.0:8000/_docs/styleguide.html'
				},
				livereload: true
			}
		},
		start: {
			options: {
				open: {
					target: 'http://0.0.0.0:8000/_docs/index.html'
				},
				livereload: true
			}
		}
	},


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

		watch: {
			bsFiles: {
				src: ['css/*.css', '<%=config.js.distDir%>/*.js']
			},
			options: {
				watchTask: true,
				proxy: '<%=config.localserver%>'
			}
		}
	}

};
