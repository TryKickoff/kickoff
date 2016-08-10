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
};
