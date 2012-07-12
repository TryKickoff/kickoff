/* MOBILE PLUGIN DIRECTORY
What you can find in this file [listed in order they appear]
Please keep me up-to-date :)

	1.) A fix for the iOS orientationchange zoom bug. Script by @scottjehl
	2.) Normalized address bar hiding for iOS & Android
	3.) ...

*/


// A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto.MIT License
// =================================================================================================
// Use meta content="width=device-width,initial-scale=1" or similar
// This is not needed if we are disallowing user scaling
(function(a){function m(){d.setAttribute("content",g),h=!0}function n(){d.setAttribute("content",f),h=!1}function o(b){l=b.accelerationIncludingGravity,i=Math.abs(l.x),j=Math.abs(l.y),k=Math.abs(l.z),(!a.orientation||a.orientation===180)&&(i>7||(k>6&&j<8||k<8&&j>6)&&i>5)?h&&n():h||m()}var b=navigator.userAgent;if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(b)&&b.indexOf("AppleWebKit")>-1))return;var c=a.document;if(!c.querySelector)return;var d=c.querySelector("meta[name=viewport]"),e=d&&d.getAttribute("content"),f=e+",maximum-scale=1",g=e+",maximum-scale=10",h=!0,i,j,k,l;if(!d)return;a.addEventListener("orientationchange",m,!1),a.addEventListener("devicemotion",o,!1)})(this);


// Normalized address bar hiding for iOS & Android (c) @scottjehl MIT License
(function(win){var doc=win.document;if(!location.hash&&win.addEventListener){window.scrollTo(0,1);var scrollTop=1,getScrollTop=function(){return win.pageYOffset||doc.compatMode==="CSS1Compat"&&doc.documentElement.scrollTop||doc.body.scrollTop||0;},bodycheck=setInterval(function(){if(doc.body){clearInterval(bodycheck);scrollTop=getScrollTop();win.scrollTo(0,scrollTop===1?0:1);}},15);win.addEventListener("load",function(){setTimeout(function(){if(getScrollTop()<20){win.scrollTo(0,scrollTop===1?0:1);}},0);});}})(this);