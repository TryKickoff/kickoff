/**
 * Log.js - Lightweight wrapper for console.log
 *
 * Usage:
 * log('inside coolFunc', this, arguments);
 *
 * paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
 */

window.log = function f() {
	log.history = log.history || [];
	log.history.push(arguments);
	if (this.console) {
		var args = arguments,
			newarr;
		try {
			args.callee = f.caller;
		} catch (e) {}
		newarr = [].slice.call(args);
		if (typeof console.log === 'object')  {
			log.apply.call(console.log, console, newarr);
		} else {
			console.log.apply(console, newarr);
		}
	}
};
