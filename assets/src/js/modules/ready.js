module.exports.add = function (callback) {

	if (document.readyState === 'complete') {
		// Already ready, execute callback
		callback.call();
	}
	else if (document.addEventListener) {
		// Modern browsers
		document.addEventListener('DOMContentLoaded', callback);
	}
	else if (document.attachEvent) {
		// Old browsers
		document.attachEvent('onreadystatechange', function () {
			if (document.readyState == 'interactive')
				callback.call();
		});
	}
}
