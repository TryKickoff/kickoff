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
			jshintrc: '.jshintrc',
			reporter: require('jshint-stylish')
		},
		project: [
			'<%=config.srcDir%>/js/**/*.js',
			'!<%=config.srcDir%>/js/{standalone,helpers}/**/*.js',
			'!<%=config.srcDir%>/js/**/*.min.js'
		]
	}
};
