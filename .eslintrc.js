// http://eslint.org/docs/user-guide/configuring#configuring-rules
module.exports = {

	extends: 'airbnb/base', // Extending the AirBnB ES2015 config: https://www.npmjs.com/package/eslint-config-airbnb

	// Rule overrides: see http://eslint.org/docs/rules/
	rules: {
		'max-len': [1, 100, 4],
		'indent': [2, 'tab', { SwitchCase: 1, VariableDeclarator: 1 }], // http://eslint.org/docs/rules/indent
		'func-names': 1, // http://eslint.org/docs/rules/func-names
		'padded-blocks': 0, // http://eslint.org/docs/rules/padded-blocks
		'prefer-arrow-callback': 1,
		'space-before-function-paren': [2, 'never'], // http://eslint.org/docs/rules/space-before-function-paren
		'strict': [2, 'global'],
		'no-console': 0, // http://eslint.org/docs/rules/no-console
		'no-use-before-define': 0, // http://eslint.org/docs/rules/no-console
	},

	env: {
		browser: true,
		node: true,
		es6: true,
	},
};
