/*
	moduleTest.js
	Example module to show how to include other JS files into you browserify build
*/
'use strict';

// dependencies for this module go here

function init() {
	doSomething();
}

function doSomething() {
	console.log('Something was done :)');
}

module.exports = init;
