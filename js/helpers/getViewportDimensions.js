/* ==========================================================================
   Reliably get viewport dimensions in JS

   Notes:
   relies on position:fixed support, but it should work in browsers that partially support position: fixed like iOS4 and such...

   Usage:
   * $('.spotlight').css( TMW.getViewportDimensions() );
   * $('.spotlight').css('height', TMW.getViewportDimensions().height);
   * var viewportwidth = TMW.getViewportDimensions.width;
   ========================================================================== */
;(function (TMW) {
	TMW.getViewportDimensions = function getViewportDimensions(){
		var test = document.createElement( "div" );

		test.style.cssText = "position: fixed;top: 0;left: 0;bottom: 0;right: 0;";
		document.documentElement.insertBefore( test, document.documentElement.firstChild );

		var dims = { width: test.offsetWidth, height: test.offsetHeight };
		document.documentElement.removeChild( test );

		return dims;
	};
})(window.TMW = window.TMW || {});