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
				'sass:kickoff',
				'autoprefixer:kickoff'
			]
		},

		"styleguide_scss": {
			files: ['<%=config.css.scssDir%>/styleguide.scss'],
			tasks: [
				'sass:styleguide',
				'autoprefixer:styleguide'
			]
		},

		js: {
			files: ['<%=config.js.fileList%>'],
			tasks: ['uglify']
		},

		grunticon : {
			files: ['<%=config.img.dir%>/grunticon/source/*.{svg,png,jpg,gif}'],
			tasks: [
				'clean:icons',
				'newer:imagemin:grunticon',
				'grunticon'
			]
		},

		images : {
			files: [
				'<%=config.img.dir%>/**/*.{svg,png,jpg,gif}',
				'!<%=config.img.dir%>/grunticon/**/*.{svg,png,jpg,gif}'
			],
			tasks: [
				'newer:imagemin:images'
			]
		},

		grunt: {
			files: ['_grunt-configs/*.js', 'Gruntfile.js']
		}
	}
};
