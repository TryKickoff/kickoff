import ready from 'lite-ready';
import $$ from 'double-dollar';
import copy from 'copy-js/src/copy.js';

ready(() => {
	copyText();
});

/**
 * copyText
 *
 * Usage:
 * add `data-copy="your text"` to any html element on the styleguide
 */
function copyText() {
	$$('[data-copy]').forEach(item => {
		item.addEventListener('click', e => {
			e.preventDefault();
			e.stopPropagation();
			const target = e.currentTarget;
			const copyValue = target.getAttribute('data-copy');
			target.classList.add('is-active');

			copy(copyValue, () => {
				console.log('copied ', copyValue);

				setTimeout(() => {
					target.classList.remove('is-active');
				}, 500);
			});
		}, false);
	});
}

