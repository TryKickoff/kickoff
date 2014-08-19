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

	browserSync: {
		dev: {
			bsFiles: {
				src: ['css/*.css', '<%=config.js.distDir%>/*.js']
			},
			options: {
				// proxy: 'kickoff.dev',
				watchTask: true,
				server: {
					baseDir: "./"
				},
				xip : true
			}
		}
	}

};
