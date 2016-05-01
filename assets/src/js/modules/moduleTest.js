/*
	moduleTest.js
	Example module to show how to include other JS files into you browserify build
*/

// dependencies for this module go here

function doSomething() {
	console.log('Something was done :)');
}

function init() {
	doSomething();
}

module.exports = init;
