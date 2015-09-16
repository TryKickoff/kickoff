module.exports.tasks = {

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
