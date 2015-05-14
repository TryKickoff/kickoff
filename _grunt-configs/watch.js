module.exports.tasks = {

	/**
	* Watch
	* https://github.com/gruntjs/grunt-contrib-watch
	* Watches your scss, js etc for changes and compiles them
	*/
	watch: {
		scss: {
			files: ['<%=config.css.scssDir%>/**/*.scss'],
			tasks: [
				'sass',
				'autoprefixer',
				'clean:tempCSS'
			],
			options: {
				interrupt: true
			}
		},

		js: {
			files: ['<%=config.js.fileList%>'],
			tasks: [
				'uglify',
				'newer:copy:modernizr'
			],
			options: {
				interrupt: true,
				spawn: false
			}
		},

		images : {
			files: ['<%=config.img.srcDir%>/**/*.{svg,png,jpg,gif}'],
			tasks: ['imagemin:images']
		},

		grunticon : {
			files: ['<%=config.img.grunticonDir%>/**/*.{svg,png,jpg,gif}'],
			tasks: ['icons'],
			options: {
				interrupt: true
			}
		},

		grunt: {
			files: ['_grunt-configs/*.js', 'Gruntfile.js'],
			options: {
				reload: true
			}
		}
	}
};
