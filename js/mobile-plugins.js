/* MOBILE PLUGIN DIRECTORY
What you can find in this file [listed in order they appear]
Please keep me up-to-date :)

	1.) A fix for the iOS orientationchange zoom bug. Script by @scottjehl
	2.) Normalized address bar hiding for iOS & Android
	3.) Fastclick - fix for touch events (move to plugins mobile)
	4.) ...

*/


// 1.)
// A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto.MIT License
// =================================================================================================
// Use meta content="width=device-width,initial-scale=1" or similar
// This is not needed if we are disallowing user scaling
(function(a){function m(){d.setAttribute("content",g),h=!0}function n(){d.setAttribute("content",f),h=!1}function o(b){l=b.accelerationIncludingGravity,i=Math.abs(l.x),j=Math.abs(l.y),k=Math.abs(l.z),(!a.orientation||a.orientation===180)&&(i>7||(k>6&&j<8||k<8&&j>6)&&i>5)?h&&n():h||m()}var b=navigator.userAgent;if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(b)&&b.indexOf("AppleWebKit")>-1))return;var c=a.document;if(!c.querySelector)return;var d=c.querySelector("meta[name=viewport]"),e=d&&d.getAttribute("content"),f=e+",maximum-scale=1",g=e+",maximum-scale=10",h=!0,i,j,k,l;if(!d)return;a.addEventListener("orientationchange",m,!1),a.addEventListener("devicemotion",o,!1)})(this);


// 2.)
// Normalized address bar hiding for iOS & Android (c) @scottjehl MIT License
(function(win){var doc=win.document;if(!location.hash&&win.addEventListener){window.scrollTo(0,1);var scrollTop=1,getScrollTop=function(){return win.pageYOffset||doc.compatMode==="CSS1Compat"&&doc.documentElement.scrollTop||doc.body.scrollTop||0;},bodycheck=setInterval(function(){if(doc.body){clearInterval(bodycheck);scrollTop=getScrollTop();win.scrollTo(0,scrollTop===1?0:1);}},15);win.addEventListener("load",function(){setTimeout(function(){if(getScrollTop()<20){win.scrollTo(0,scrollTop===1?0:1);}},0);});}})(this);

/* 3.)
 FastClick: polyfill to remove click delays on browsers with touch UIs.

 @copyright The Financial Times Limited [All Rights Reserved]
 @license MIT License (see LICENCE.txt)
 @codingstandard ftlabs-jslint

 Add to all clicks on mobile by adding:
	window.addEventListener('load', function() {
		new FastClick(document.body);
	}, false);
*/
(function(){function l(a){switch(a.nodeName.toLowerCase()){case "textarea":case "select":case "input":case "label":case "video":return!0;default:return/\bneedsclick\b/.test(a.className)}}function m(a,b){j&&window.devicePixelRatio&&(a*=window.devicePixelRatio,b*=window.devicePixelRatio);return document.elementFromPoint(a,b)}function c(a){var b,d=0,e=0,h=0,i=0,f=!1,c=Math.pow(37,2),j=function(a){f=!0;d=a.targetTouches[0].pageX;e=a.targetTouches[0].pageY;d===a.targetTouches[0].clientX&&(d+=window.pageXOffset);
e===a.targetTouches[0].clientY&&(e+=window.pageYOffset);h=window.pageXOffset;i=window.pageYOffset;return!0},o=function(a){if(!f)return!0;Math.pow(a.targetTouches[0].pageX-d,2)+Math.pow(a.targetTouches[0].pageY-e,2)>c&&(f=!1);if(Math.abs(window.pageXOffset-h)>n||Math.abs(window.pageYOffset-i)>n)f=!1;return!0},p=function(a){var k,b,g,c;if(!f)return!0;f=!1;k=d-h;b=e-i;g=m(k,b);if(!g)return!1;g.nodeType===Node.TEXT_NODE&&(g=g.parentElement);if(l(g))return!1;c=document.createEvent("MouseEvents");c.initMouseEvent("click",
!0,!0,window,1,0,0,k,b,!1,!1,!1,!1,0,null);c.forwardedTouchEvent=!0;g.dispatchEvent(c);a.preventDefault();return!1},q=function(){f=!1},r=function(a){var b;if(a.forwardedTouchEvent||!a.cancelable)return!0;b=m(d-h,e-i);return!b||!l(b)?(a.stopImmediatePropagation&&a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault(),!1):!0};if(!a||!a.nodeType)throw new TypeError("Layer must be a document node");"undefined"!==typeof window.ontouchstart&&(a.addEventListener("click",r,!0),a.addEventListener("touchstart",
j,!0),a.addEventListener("touchmove",o,!0),a.addEventListener("touchend",p,!0),a.addEventListener("touchcancel",q,!0),"function"===typeof a.onclick&&(b=a.onclick,a.addEventListener("click",function(a){b(a)},!1),a.onclick=null))}var j=/Android.+Chrome|CrMo/.test(navigator.userAgent),n=-1===navigator.userAgent.indexOf("PlayBook")?5:20;"function"===typeof define&&define.amd?define(function(){return c}):window.FastClick=c})();

