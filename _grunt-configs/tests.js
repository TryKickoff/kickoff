module.exports.tasks = {

	/**
	 * scss Lint
	 * https://github.com/ahmednuaman/grunt-scss-lint
	 */
	scsslint: {
		allFiles: [
			'<%=config.css.scssDir%>/**/*.scss',
		],
		options: {
			config: '.scss-lint.yml',
			reporterOutput: null
		},
	},


	/**
	 * JSHint
	 * https://github.com/gruntjs/grunt-contrib-jshint
	 * Manage the options inside .jshintrc file
	 */
	jshint: {
		options: {
			jshintrc: '.jshintrc'
		},
		project: [
			'<%=config.srcDir%>/js/**/*.js',
			'!<%=config.srcDir%>/js/{libs,helpers}/**/*.js',
			'!<%=config.srcDir%>/js/**/*.min.js'
		]
	},



	/**
	 * Grunt Photobox
	 * https://github.com/stefanjudis/grunt-photoBox
	 * Visual regression testing tool
	 */
	photobox: {
		task: {
			options: {
			screenSizes : '<%=config.testing.visual.sizes%>',
			urls        : '<%=config.testing.visual.urls%>'
			}
		}
	},


	/**
	 * Grunt Validation
	 * https://github.com/praveenvijayan/grunt-html-validation
	 * W3C html validation grunt plugin
	 */
	validation: {
		options: {
			reset: true,
			path: '<%=config.testing.validationDir%>/validation/validation-status.json',
			reportpath: '<%=config.testing.validationDir%>/validation/validation-report.json',

			// ignores these errors
			// Error ignored is the chrome frame meta tag, since this is a safely ignored validation error
			relaxerror: ['A meta element with an http-equiv attribute whose value is X-UA-Compatible must have a content attribute with the value IE=edge.']
		},
		files: {
				src: ['**/*.html',
							'!*/dist/img/**/*.html',
							'!node_modules/**/*.html']
		}
	}
};
