module.exports.tasks = {

	/**
	* Watch
	* https://github.com/gruntjs/grunt-contrib-watch
	* Watches your scss, js etc for changes and compiles them
	*/
	watch: {
		scss: {
			files: ['scss/**/*.scss'],
			tasks: [
				'sass:kickoff',
				'autoprefixer:dist'
			]
		},

		js: {
			files: ['<%=config.js.fileList%>', 'Gruntfile.js'],
			tasks: ['uglify']
		},

		livereload: {
			options: { livereload: true },
			files: [
				'css/*.css'
			]
		},

		grunticon : {
			files: ['img/src/*.svg', 'img/src/*.png'],
			tasks: [
				'clean:icons',
				'svgmin',
				'grunticon'
			]
		}
	}
}