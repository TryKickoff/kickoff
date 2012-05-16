$('#grid .row div').each(function() {
	var $spanName = $(this).attr('class'),
		$html = $(this).html();
	$(this).html($html + $spanName);
});

$('#grid .split > div').each(function() {
	var $spanName = $(this).attr('class');
	$(this).text('split ' + $spanName);
});

// Show the grid
$('#show-grid-button').toggle(function(e) {
	e.preventDefault();
	$('body').removeClass('show-grid');
	$(this).text('Show Grid');
}, function(e) {
	e.preventDefault();
	$('body').addClass('show-grid');
	$(this).text('Hide Grid');
});

// Show the grid's info
$('#show-info-button').toggle(function(e) {
	e.preventDefault();
	$('body').addClass('show-info');
	$(this).text('Hide Info');
}, function(e) {
	e.preventDefault();
	$('body').removeClass('show-info');
	$(this).text('Show Info');
});

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

		if (el.length && !el.hasClass('active') && content.length) {
			el.closest('.tabs').find('.active').removeClass('active');
			el.addClass('active');
			content.show().addClass('active').siblings().hide().removeClass('active');
		}
	}

	// listen on event and fire right away
	$(window).on('hashchange.skeleton', hashchange);
	hashchange();
	$(hashchange);
})(jQuery);