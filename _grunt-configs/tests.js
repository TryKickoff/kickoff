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
			reporterOutput: null,
		},
	},


	/**
	 * Eslint
	 * http://eslint.org
	 * https://github.com/sindresorhus/grunt-eslint
	 * Manage the options inside .eslintrc.js file
	 */
	eslint: {
		target: [
			'<%=config.srcDir%>/js/**/*.js',
			'!<%=config.srcDir%>/js/standalone/**/*.js',
		],
	},
};
