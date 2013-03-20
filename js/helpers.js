/*jslint white: true, browser: true, devel: true, debug: true */
/*jshint browser:true, camelcase: true, curly:true, forin:true, indent:4, latedef: true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:false, maxerr:50, white:false, smarttabs:false, quotmark: single, trailing: true, debug: true, laxcomma: true */

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
		return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
	},
	setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
		if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return; }
		var sExpires = "";
		if (vEnd) {
			switch (vEnd.constructor) {
				case Number:
					sExpires = vEnd === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + vEnd;
					break;
				case String:
					sExpires = "; expires=" + vEnd;
					break;
				case Date:
					sExpires = "; expires=" + vEnd.toGMTString();
					break;
			}
		}
		document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
	},
	removeItem: function(sKey, sPath) {
		if (!sKey || !this.hasItem(sKey)) { return; }
		document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
	},
	hasItem: function(sKey) {
		return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	},
	// Optional method: you can safely remove it!
	keys: function() {
		var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
		for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = unescape(aKeys[nIdx]); }
		return aKeys;
	}
};
