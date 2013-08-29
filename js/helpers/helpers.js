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
Array.prototype.remove = Array.prototype.remove || function (from, to) {
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
if (!('forEach' in Array.prototype)) {
	Array.prototype.forEach = function (fn, scope) {
		for (var i = 0, len = this.length; i < len; ++i) {
			fn.call(scope, this[i], i, this);
		}
	};
}

//Array filter patch
if (!('filter' in Array.prototype)) {
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
if (!('map' in Array.prototype)) {
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

//Object create patch
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

//Object comparison is not the same as if you compare primitive types.
//https://gist.github.com/nicbell/6081098
Object.compare = function (obj1, obj2) {
	for (var p in obj1) {
		if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

		switch (typeof (obj1[p])) {
			case 'object':
				if (!Object.compare(obj1[p], obj2[p])) return false;
				break;
			case 'function':
				if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
				break;
			default:
				if (obj1[p] != obj2[p]) return false;
		}
	}

	for (var p in obj2) {
		if (typeof (obj1[p]) == 'undefined') return false;
	}
	return true;
};


//Function bind patch
if (!('bind' in Function.prototype)) {
	Function.prototype.bind = function (oThis) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5 internal IsCallable function
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}

		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function () { },
			fBound = function () {
				return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
			};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
};
