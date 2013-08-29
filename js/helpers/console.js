// Console
(function (window) {
	if (!window.console) {
		console = {};
	}

	var funcs = 'assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn'.split(','),
		stub = function () { };

	for (var i = 0; i < funcs.length; i++) {
		if (!console[funcs[i]]) {
			console[funcs[i]] = stub;
		}
	}
})(window);


// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
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