module.exports.tasks = {

	/**
	* Watch
	* https://github.com/gruntjs/grunt-contrib-watch
	* Watches your scss, js etc for changes and compiles them
	*/
	watch: {
		scss: {
			files: ['<%=config.css.scssDir%>/**/*.scss', '!<%=config.css.scssDir%>/styleguide.scss'],
			tasks: [
				'sass',
				'autoprefixer',
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

		grunticon : {
			files: ['<%=config.img.grunticonDir%>/**/*.{svg,png,jpg,gif}'],
			tasks: [
				'clean:icons',
				'imagemin:grunticon',
				'grunticon'
			]
		},

		images : {
			files: ['<%=config.img.dir%>/**/*.{svg,png,jpg,gif}'],
			tasks: ['imagemin:images']
		},

		grunt: {
			files: ['_grunt-configs/*.js', 'Gruntfile.js']
		}
	}
};
