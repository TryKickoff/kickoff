module.exports.tasks = {

	/**
	* Watch
	* https://github.com/gruntjs/grunt-contrib-watch
	* Watches your scss, js etc for changes and compiles them
	*/
	watch: {
		options: {
			interrupt: true,
			spawn: false,
		},

		scss: {
			files: ['<%=config.css.scssDir%>/**/*.scss'],
			tasks: [
				'bsNotify:sassStart',
				'postscss',
				'bsReload:css',
				'filesizegzip:css',
			],
		},

		js: {
			files: [
				'<%=config.js.distDir%>/**/*.js',
			],
			tasks: [
				'bsReload:all',
				'filesizegzip:js',
			],
		},

		images: {
			files: ['<%=config.img.srcDir%>/**/*.{svg,png,jpg,gif}'],
			tasks: [
				'newer:imagemin:images',
				'bsReload:all',
			],
		},

		grunt: {
			files: ['_grunt-configs/*.js', 'Gruntfile.js'],
			options: {
				reload: true,
			},
		},
	},

	// Browsersync reload
	bsReload: {
		css: {
			reload: '<%=config.distDir%>/css/*.css',
		},
		all: {
			reload: true,
		},
	},

	// Browsersync notify
	bsNotify: {
		sassStart: {
			notify: 'Please wait, compiling Sass!',
		},
	},
};
