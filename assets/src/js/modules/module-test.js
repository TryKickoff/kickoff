/**
 * moduleTest
 * @module moduleTest
 * @description Example module to show how to include other JS files into you browserify build
 * @author Zander Martineau
 */

// their code - dependencies for this module go here

function doSomething() {
	console.log('Something was done :)');
}

export default function init() {
	doSomething();
}
