/*jslint white: true, browser: true, devel: true, debug: true */
/*jshint browser:true, camelcase: true, curly:true, forin:true, indent:4, latedef: true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:false, maxerr:50, white:false, smarttabs:false, quotmark: single, trailing: true, debug: true, laxcomma: true */

/**
 * Skeleton V1.1
 * Copyright 2011, Dave Gamache
 * www.getskeleton.com
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 8/17/2011
 */

(function ($) {
	// hash change handler
	function hashchange () {
		var hash = window.location.hash,
			el = $('ul.tabs [href*="' + hash + '"]'),
			content = $(hash);

		if (el.length && !el.hasClass('is-active') && content.length) {
			el.closest('.tabs').find('.is-active').removeClass('is-active');
			el.addClass('is-active');
			content.show().addClass('is-active').siblings().hide().removeClass('is-active');
		}
	}

	// listen on event and fire right away
	$(window).on('hashchange.skeleton', hashchange);
	hashchange();
	$(hashchange);
})(jQuery);
