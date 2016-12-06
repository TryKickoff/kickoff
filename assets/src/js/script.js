/**
 * Project Name:
 * @description
 * @author
 *
 * Need help using JSDoc? Find out more at http://usejsdoc.org/
 */

'use-strict';

// their code e.g. npm modules
import ready from 'lite-ready';
import $$ from 'double-dollar'; // https://github.com/mrmartineau/double-dollar
import svg4everybody from 'svg4everybody';

// Bundle global libs that don't return a value
import 'console';

// Add support for SVG sprite sheets
svg4everybody();

// our code
// this is a test, uncomment the line below to try it
// import moduleTest from './modules/module-test';

window.$$ = $$; // add double-dollar to global scope

// DOM ready code goes in here
ready(() => {
	// moduleTest(); // this is a test, uncomment this line to try it
});
