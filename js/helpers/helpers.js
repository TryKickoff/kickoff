// ==================
// === HELPERS.js ===
// ==================

// JS Shims, helpers
// =================
// Consider using one of these libraries to provide support for
// javascript's natives across browsers
//
// * https://github.com/kriskowal/es5-shim
// * http://lodash.com/
// * http://sugarjs.com/


// Array Remove
// ============
// By John Resig (MIT Licensed)
// http://ejohn.org/blog/javascript-array-remove/
Array.prototype.remove = Array.prototype.remove ||  function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

//String substitute, ported from MooTools
String.prototype.substitute = function (object) {
	return this.replace(/\{(.+?)\}/g, function (match, name) {
		return name in object ? object[name] : match;
	});
};

//Array forEach patch
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function (fn, scope) {
		for (var i = 0, len = this.length; i < len; ++i) {
			fn.call(scope, this[i], i, this);
		}
	};
}

//Array filter patch
if (!Array.prototype.filter) {
	Array.prototype.filter = function (fn, scope) {
		var results = [];
		for (var value, i = 0, l = this.length >>> 0; i < l; i++) {
			if (i in this) {
				value = this[i];
				if (fn.call(scope, value, i, this)) {
					results.push(value);
				}
			}
		}
		return results;
	};
}

//Array map patch
if (!Array.prototype.map) {
	Array.prototype.map = function (fn, scope) {
		var length = this.length >>> 0, results = Array(length);
		for (var i = 0; i < length; i++) {
			if (i in this) {
				results[i] = fn.call(scope, this[i], i, this);
			}
		}
		return results;
	};
}
