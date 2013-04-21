// ===============
// === Plugins ===
// ===============
/* PLUGIN DIRECTORY
What you can find in this file [listed in order they appear]
Please keep me up-to-date :)

	1.) Lightweight console.log wrapper function log()
	2.) Safe log - Makes it safe to leave log's in production code
	3.) ...

*/
var TMW = window.TMW || {};
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

// place any jQuery/helper plugins in here, instead of separate, slower script files.
// if conflicts wrap in the below
// (function($) {
//
// })(jQuery);
