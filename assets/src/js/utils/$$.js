/**
 * $$
 * @description Loop over DOM elements more easily
 *
 * @usage $$('.foo').forEach(function(item) { // do something });
 */

export default window.$$ = function $$(selector, context) {
	const cntxt = context || document;
	const elements = cntxt.querySelectorAll(selector);
	return Array.prototype.slice.call(elements);
};
