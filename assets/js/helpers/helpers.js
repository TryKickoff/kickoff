/* ==========================================================================
   Helpers.js - JS Shims, helpers

   Consider using one of these libraries to provide support for
   javascript's natives across browsers

   * https://github.com/kriskowal/es5-shim
   * http://lodash.com/
   * http://sugarjs.com/
   ========================================================================== */

/*
   Array Remove
   By John Resig (MIT Licensed)
   http://ejohn.org/blog/javascript-array-remove/
   ========================================================================== */
Array.prototype.remove = Array.prototype.remove || function (from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

/*
   String substitute, ported from MooTools
   Usage: https://gist.github.com/mrmartineau/7926397
   ========================================================================== */
String.prototype.substitute = function (object) {
	return this.replace(/\{(.+?)\}/g, function (match, name) {
		return name in object ? object[name] : match;
	});
};


/*
   Object create patch
   ========================================================================== */
if (!('create' in Object.prototype)) {
	Object.create = (function () {
		function F() { }

		return function (o) {
			if (arguments.length != 1) {
				throw new Error('Object.create implementation only accepts one parameter.');
			}
			F.prototype = o;
			return new F();
		};
	})();
}


/*
   Object comparison is not the same as if you compare primitive types.
   https://gist.github.com/nicbell/6081098
   ========================================================================== */
Object.compare = function (obj1, obj2) {
	for (var p in obj1) {
		if ( obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
			return false;
		}

		switch (typeof (obj1[p])) {
			case 'object':
				if (!Object.compare(obj1[p], obj2[p])) {
					return false;
				}
				break;
			case 'function':
				if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) {
					return false;
				}
				break;
			default:
				if (obj1[p] != obj2[p]) {
					return false;
				}
		}
	}

	for (var p in obj2) {
		if (typeof (obj1[p]) == 'undefined') {
			return false;
		}
	}
	return true;
};


