module.exports.tasks = {

	/**
	* Watch
	* https://github.com/gruntjs/grunt-contrib-watch
	* Watches your scss, js etc for changes and compiles them
	*/
	watch: {
		options: {
			interrupt: true,
			spawn: false
		},

		scss: {
			files: ['<%=config.css.scssDir%>/**/*.scss'],
			tasks: [
				'compileCSS',
				'clean:tempCSS'
			]
		},

		js: {
			files: ['<%=config.js.fileList%>'],
			tasks: [
				'uglify',
				'newer:copy:modernizr'
			]
		},

		images : {
			files: ['<%=config.img.srcDir%>/**/*.{svg,png,jpg,gif}'],
			tasks: ['newer:imagemin:images']
		},

		grunticon : {
			files: ['<%=config.img.grunticonDir%>/**/*.{svg,png,jpg,gif}'],
			tasks: ['icons']
		},

		grunt: {
			files: ['_grunt-configs/*.js', 'Gruntfile.js'],
			options: {
				reload: true
			}
		}
	}
};
