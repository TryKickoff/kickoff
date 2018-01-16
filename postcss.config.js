const config = require('./.kickoff/config');
const autoprefixer = require('autoprefixer');
const flexbugsFixes = require('postcss-flexbugs-fixes');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  plugins: [
		flexbugsFixes(),
		autoprefixer({browsers: config.css.browsers}),
		pxtorem({ // See other options at https://github.com/cuth/postcss-pxtorem#options
			rootValue: config.css.rootFontSize,
			selectorBlackList: ['html'],
		}),
	]
}
