// ==================
// === HELPERS.js ===
// ==================
var TMW = window.TMW || {};

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

// Complete cookie reader/writer
// =============================
// From https://developer.mozilla.org/en-US/docs/DOM/document.cookie

// Usage:
// TMW.cookies.setItem(name, value[, end[, path[, domain[, secure]]]])
// TMW.cookies.getItem(name)
// TMW.cookies.removeItem(name[, path])
// TMW.cookies.hasItem(name)
// TMW.cookies.keys()

TMW.cookies = {
	getItem: function(sKey) {
		if (!sKey || !this.hasItem(sKey)) { return null; }
		return unescape(document.cookie.replace(new RegExp('(?:^|.*;\\s*)' + escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'), '$1'));
	},
	setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
		if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return; }
		var sExpires = '';
		if (vEnd) {
			switch (vEnd.constructor) {
				case Number:
					sExpires = vEnd === Infinity ? '; expires=Tue, 19 Jan 2038 03:14:07 GMT' : '; max-age=' + vEnd;
					break;
				case String:
					sExpires = '; expires=' + vEnd;
					break;
				case Date:
					sExpires = '; expires=' + vEnd.toGMTString();
					break;
			}
		}
		document.cookie = escape(sKey) + '=' + escape(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '');
	},
	removeItem: function(sKey, sPath) {
		if (!sKey || !this.hasItem(sKey)) { return; }
		document.cookie = escape(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sPath ? '; path=' + sPath : '');
	},
	hasItem: function(sKey) {
		return (new RegExp('(?:^|;\\s*)' + escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
	},
	// Optional method: you can safely remove it!
	keys: function() {
		var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
		for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = unescape(aKeys[nIdx]); }
		return aKeys;
	}
};
