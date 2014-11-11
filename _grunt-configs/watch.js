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

		livereload: {
			options: { livereload: true },
			files: [
				'<%=config.css.distDir%>/*.css'
			]
		},

		grunticon : {
			files: ['<%=config.img.dir%>/src/*.svg', '<%=config.img.dir%>/src/*.png'],
			tasks: [
				'clean:icons',
				'svgmin',
				'grunticon'
			]
		},

		grunt: {
			files: ['_grunt-configs/*.js', 'Gruntfile.js']
		}
	}
};
