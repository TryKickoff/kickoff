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
				'bsNotify:sassStart',
				// 'scsslint', // uncomment this line if you want to run linting checks on your SCSS as part of your watch build
				'postscss',
				'bsReload:css',
				'filesizegzip:css'
			]
		},

		js: {
			files: [
				'<%=config.js.distDir%>/**/*.js'
			],
			tasks: [
				// 'jshint:project', // uncomment this line if you want to run linting checks on your JS as part of your watch build
				'filesizegzip:js'
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
	},

	// Browsersync reload
	bsReload: {
		css: {
			reload: '<%=config.distDir%>/css/*.css'
		},
		all: {
			reload: true
		}
	},

	// Browsersync notify
	bsNotify: {
		sassStart: {
			notify: 'Please wait, compiling Sass!'
		}
	}
};
