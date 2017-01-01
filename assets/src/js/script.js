/**
 * Project Name: Kickoff
 * @description The Kickoff boilerplate js file
 * @author The Kickoff team
 *
 * Need help using JSDoc? Find out more at http://usejsdoc.org/
 */

// their code e.g. npm modules
import ready from 'lite-ready'; // https://github.com/nicbell/liteready
import svg4everybody from 'svg4everybody'; // https://github.com/jonathantneal/svg4everybody

// Global libs that don't return a value
import 'console';
import 'kickoff-welcome.js'; // The Kickoff message in the js console. Remove it if you like :)

// our code
// import moduleTest from './modules/module-test'; // this is a test, uncomment the line below to try it

// DOM ready code goes in here
ready(() => {
	svg4everybody({
		polyfill: true, // polyfill <use> elements for External Content
	});

	// moduleTest(); // this is a test, uncomment this line to try it
});
