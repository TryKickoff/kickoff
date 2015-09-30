module.exports.tasks = {

	/**
	 * browserSync
	 * http://www.browsersync.io/docs/options/
	 * http://www.browsersync.io/docs/grunt/
	 */
	browserSync: {
		options: {
			watchTask: true,
			notify: {
				styles: [
					'pointer-events: none',
					'position: fixed',
					'bottom: 0',
					'left: 0',
					'right: 0',
					'text-align: center',
					'background-color: #181830',
					'color: #fff',
					'padding: 15px'
				]
			}
		},

		serve: {
			bsFiles: {
				src: [
					'<%=config.distDir%>/{js,img}/*.*',
					'**/*.html'
				]
			},
			options: {
				server: './'
			}
		},

		styleguide: {
			bsFiles: {
				src: [
					'<%=config.distDir%>/{js,img}/*.*',
					'*.html'
				]
			},
			options: {
				server: {
					baseDir: './',
					index: 'styleguide/index.html'
				}
			}
		}
	}
};
