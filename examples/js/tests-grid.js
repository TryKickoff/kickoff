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
