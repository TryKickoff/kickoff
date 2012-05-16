/*	
 *	jQuery carouFredSel 5.5.5
 *	Demo's and documentation:
 *	caroufredsel.frebsite.nl
 *	
 *	Copyright (c) 2012 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


(function($) {



	//	LOCAL

	if ($.fn.carouFredSel) return;

	$.fn.carouFredSel = function(options, configs) {
		if (this.length == 0) {
			debug(true, 'No element found for "'+this.selector+'".');
			return this;
		}
		if (this.length > 1) {
			return this.each(function() {
				$(this).carouFredSel(options, configs);
			});
		}

		var $cfs = this,
			$tt0 = this[0];

		if ($cfs.data('cfs_isCarousel')) {
			var starting_position = $cfs.triggerHandler('_cfs_currentPosition');
			$cfs.trigger('_cfs_destroy', true);
		} else {
			var starting_position = false;
		}

		$cfs._cfs_init = function(o, setOrig, start) {
			o = go_getObject($tt0, o);


			//	DEPRECATED
			if (o.debug) {
				conf.debug = o.debug;
				debug(conf, 'The "debug" option should be moved to the second configuration-object.');
			}
			//	/DEPRECATED


			var obs = ['items', 'scroll', 'auto', 'prev', 'next', 'pagination'];
			for (var a = 0, l = obs.length; a < l; a++) {
				o[obs[a]] = go_getObject($tt0, o[obs[a]]);
			}

			if (typeof o.scroll == 'number') {
				if (o.scroll <= 50)					o.scroll	= { 'items'		: o.scroll 	};
				else								o.scroll	= { 'duration'	: o.scroll 	};
			} else {
				if (typeof o.scroll == 'string')	o.scroll	= { 'easing'	: o.scroll 	};
			}

				 if (typeof o.items == 'number')	o.items		= { 'visible'	: o.items 	};
			else if (		o.items == 'variable')	o.items		= { 'visible'	: o.items,
																	'width'		: o.items, 
																	'height'	: o.items	};

			if (typeof o.items != 'object') o.items = {};
			if (setOrig) opts_orig = $.extend(true, {}, $.fn.carouFredSel.defaults, o);

			opts = $.extend(true, {}, $.fn.carouFredSel.defaults, o);

			if (typeof opts.items.visibleConf != 'object') opts.items.visibleConf = {};

			if (opts.items.start == 0 && typeof start == 'number') {
				opts.items.start = start;
			}

			crsl.upDateOnWindowResize = (opts.responsive);
			crsl.direction = (opts.direction == 'up' || opts.direction == 'left') ? 'next' : 'prev';

			var dims = [
				['width'	, 'innerWidth'	, 'outerWidth'	, 'height'	, 'innerHeight'	, 'outerHeight'	, 'left', 'top'	, 'marginRight'	, 0, 1, 2, 3],
				['height'	, 'innerHeight'	, 'outerHeight'	, 'width'	, 'innerWidth'	, 'outerWidth'	, 'top'	, 'left', 'marginBottom', 3, 2, 1, 0]
			];

			var dn = dims[0].length,
				dx = (opts.direction == 'right' || opts.direction == 'left') ? 0 : 1;

			opts.d = {};
			for (var d = 0; d < dn; d++) {
				opts.d[dims[0][d]] = dims[dx][d];
			}

			var	all_itm = $cfs.children();


			//	check visible items
			switch (typeof opts.items.visible) {

				//	min and max visible items
				case 'object':
					opts.items.visibleConf.min = opts.items.visible.min;
					opts.items.visibleConf.max = opts.items.visible.max;
					opts.items.visible = false;
					break;
				
				case 'string':
					//	variable visible items
					if (opts.items.visible == 'variable') {
						opts.items.visibleConf.variable = true;

					//	adjust string visible items
					} else {
						opts.items.visibleConf.adjust = opts.items.visible;
					}
					opts.items.visible = false;
					break;

				// function visible items
				case 'function':
					opts.items.visibleConf.adjust = opts.items.visible;
					opts.items.visible = false;
					break;
			}

			//	set items filter
			if (typeof opts.items.filter == 'undefined') {
				opts.items.filter = (all_itm.filter(':hidden').length > 0) ? ':visible' : '*';
			}

			//	primary size set to auto -> measure largest size and set it
			if (opts[opts.d['width']] == 'auto') {
				opts[opts.d['width']] = ms_getTrueLargestSize(all_itm, opts, 'outerWidth');
			}
			//	primary size percentage
			if (ms_isPercentage(opts[opts.d['width']]) && !opts.responsive) {
				opts[opts.d['width']] = ms_getPercentage(ms_getTrueInnerSize($wrp.parent(), opts, 'innerWidth'), opts[opts.d['width']]);
				crsl.upDateOnWindowResize = true;
			}

			//	secondary size set to auto -> measure largest size and set it
			if (opts[opts.d['height']] == 'auto') {
				opts[opts.d['height']] = ms_getTrueLargestSize(all_itm, opts, 'outerHeight');
			}

			//	primary item-size not set
			if (!opts.items[opts.d['width']]) {
//	responsive carousel -> set to largest
if (opts.responsive) {
	debug(true, 'Set a '+opts.d['width']+' for the items!');
	opts.items[opts.d['width']] = ms_getTrueLargestSize(all_itm, opts, 'outerWidth');
				//	 non-responsive -> measure it or set to "variable"
} else {
				opts.items[opts.d['width']] = (ms_hasVariableSizes(all_itm, opts, 'outerWidth')) 
					? 'variable' 
					: all_itm[opts.d['outerWidth']](true);
}
			}

			//	secondary item-size not set -> measure it or set to "variable"
			if (!opts.items[opts.d['height']]) {
				opts.items[opts.d['height']] = (ms_hasVariableSizes(all_itm, opts, 'outerHeight')) 
					? 'variable' 
					: all_itm[opts.d['outerHeight']](true);
			}

			//	secondary size not set -> set to secondary item-size
			if (!opts[opts.d['height']]) {
				opts[opts.d['height']] = opts.items[opts.d['height']];
			}

			//	visible-items not set
			if (!opts.items.visible && !opts.responsive) {
				//	primary item-size variable -> set visible items variable
				if (opts.items[opts.d['width']] == 'variable') {
					opts.items.visibleConf.variable = true;
				}
				if (!opts.items.visibleConf.variable) {
					//	primary size is number -> calculate visible-items
					if (typeof opts[opts.d['width']] == 'number') {
						opts.items.visible = Math.floor(opts[opts.d['width']] / opts.items[opts.d['width']]);
					} else {
						//	measure and calculate primary size and visible-items
						var maxS = ms_getTrueInnerSize($wrp.parent(), opts, 'innerWidth');
						opts.items.visible = Math.floor(maxS / opts.items[opts.d['width']]);
						opts[opts.d['width']] = opts.items.visible * opts.items[opts.d['width']];
						if (!opts.items.visibleConf.adjust) opts.align = false;
					}
					if (opts.items.visible == 'Infinity' || opts.items.visible < 1) {
						debug(true, 'Not a valid number of visible items: Set to "variable".');
						opts.items.visibleConf.variable = true;
					}
				}
			}

			//	primary size not set -> calculate it or set to "variable"
			if (!opts[opts.d['width']]) {
				opts[opts.d['width']] = 'variable';
				if (!opts.responsive && opts.items.filter == '*' && !opts.items.visibleConf.variable && opts.items[opts.d['width']] != 'variable') {
					opts[opts.d['width']] = opts.items.visible * opts.items[opts.d['width']];
					opts.align = false;
				}
			}

			//	variable primary item-sizes with variabe visible-items
			if (opts.items.visibleConf.variable) {
				opts.maxDimention = (opts[opts.d['width']] == 'variable')
					? ms_getTrueInnerSize($wrp.parent(), opts, 'innerWidth')
					: opts[opts.d['width']];
				if (opts.align === false) {
					opts[opts.d['width']] = 'variable';
				}
				opts.items.visible = gn_getVisibleItemsNext(all_itm, opts, 0);

			//	set visible items by filter
			} else if (opts.items.filter != '*') {
				opts.items.visibleConf.org = opts.items.visible;
				opts.items.visible = gn_getVisibleItemsNextFilter(all_itm, opts, 0);
			}

			//	align not set -> set to center if primary size is number
			if (typeof opts.align == 'undefined') {
				opts.align = (opts[opts.d['width']] == 'variable')
					? false
					: 'center';
			}

			opts.items.visible = cf_getItemsAdjust(opts.items.visible, opts, opts.items.visibleConf.adjust, $tt0);
			opts.items.visibleConf.old = opts.items.visible;
			opts.usePadding = false;


if (opts.responsive) {

	if (!opts.items.visibleConf.min) opts.items.visibleConf.min = opts.items.visible;
	if (!opts.items.visibleConf.max) opts.items.visibleConf.max = opts.items.visible;

	opts.align = false;
	opts.padding = [0, 0, 0, 0];

	var isVisible = $wrp.is(':visible');
	if (isVisible) $wrp.hide();
	var fullS = ms_getPercentage(ms_getTrueInnerSize($wrp.parent(), opts, 'innerWidth'), opts[opts.d['width']]);

	if (typeof opts[opts.d['width']] == 'number' && fullS < opts[opts.d['width']]) {
		fullS = opts[opts.d['width']];
	}
	if (isVisible) $wrp.show();

	var visb = cf_getItemAdjustMinMax(Math.ceil(fullS / opts.items[opts.d['width']]), opts.items.visibleConf);
	if (visb > all_itm.length) {
		visb = all_itm.length;
	}

	var newS = Math.floor(fullS/visb),
		seco = opts[opts.d['height']],
		secp = ms_isPercentage(seco);

	all_itm.each(function() {
		var $t = $(this),
			nw = newS - ms_getPaddingBorderMargin($t, opts, 'Width');

		$t[opts.d['width']](nw);
		if (secp) {
			$t[opts.d['height']](ms_getPercentage(nw, seco));
		}
	});

	opts.items.visible = visb;
	opts.items[opts.d['width']] = newS;
	opts[opts.d['width']] = visb * newS;
	
} else {

			opts.padding = cf_getPadding(opts.padding);

			if (opts.align == 'top') 		opts.align = 'left';
			if (opts.align == 'bottom') 	opts.align = 'right';


			switch (opts.align) {
				//	align: center, left or right
				case 'center':
				case 'left':
				case 'right':
					if (opts[opts.d['width']] != 'variable') {
						var p = cf_getAlignPadding(gi_getCurrentItems(all_itm, opts), opts);
						opts.usePadding = true;
						opts.padding[opts.d[1]] = p[1];
						opts.padding[opts.d[3]] = p[0];
					}
					break;

				//	padding
				default:
					opts.align = false;
					opts.usePadding = (
						opts.padding[0] == 0 && 
						opts.padding[1] == 0 && 
						opts.padding[2] == 0 && 
						opts.padding[3] == 0
					) ? false : true;
					break;
			}
}

			if (typeof opts.cookie == 'boolean' && opts.cookie)			opts.cookie 					= 'caroufredsel_cookie_'+$cfs.attr('id');
			if (typeof opts.items.minimum				!= 'number')	opts.items.minimum				= opts.items.visible;
			if (typeof opts.scroll.duration				!= 'number')	opts.scroll.duration			= 500;
			if (typeof opts.scroll.items				== 'undefined') opts.scroll.items 				= (opts.items.visibleConf.variable || opts.items.filter != '*') ? 'visible' : opts.items.visible;

			opts.auto		= go_getNaviObject($tt0, opts.auto, 'auto');
			opts.prev		= go_getNaviObject($tt0, opts.prev);
			opts.next		= go_getNaviObject($tt0, opts.next);
			opts.pagination	= go_getNaviObject($tt0, opts.pagination, 'pagination');

			opts.auto		= $.extend(true, {}, opts.scroll, opts.auto);
			opts.prev		= $.extend(true, {}, opts.scroll, opts.prev);
			opts.next		= $.extend(true, {}, opts.scroll, opts.next);
			opts.pagination	= $.extend(true, {}, opts.scroll, opts.pagination);

			if (typeof opts.pagination.keys				!= 'boolean')	opts.pagination.keys 			= false;
			if (typeof opts.pagination.anchorBuilder	!= 'function'
					&& opts.pagination.anchorBuilder	!== false)		opts.pagination.anchorBuilder	= $.fn.carouFredSel.pageAnchorBuilder;
			if (typeof opts.auto.play					!= 'boolean')	opts.auto.play					= true;
			if (typeof opts.auto.delay					!= 'number')	opts.auto.delay					= 0;
			if (typeof opts.auto.pauseOnEvent 			== 'undefined')	opts.auto.pauseOnEvent			= true;
			if (typeof opts.auto.pauseOnResize 			!= 'boolean')	opts.auto.pauseOnResize			= true;
			if (typeof opts.auto.pauseDuration			!= 'number')	opts.auto.pauseDuration			= (opts.auto.duration < 10) ? 2500 : opts.auto.duration * 5;

			if (opts.synchronise) {
				opts.synchronise = cf_getSynchArr(opts.synchronise);
			}
			if (conf.debug) {
				debug(conf, 'Carousel width: '+opts.width);
				debug(conf, 'Carousel height: '+opts.height);
				if (opts.maxDimention)	debug(conf, 'Available '+opts.d['width']+': '+opts.maxDimention);
				debug(conf, 'Item widths: '+opts.items.width);
				debug(conf, 'Item heights: '+opts.items.height);
				debug(conf, 'Number of items visible: '+opts.items.visible);
				if (opts.auto.play)		debug(conf, 'Number of items scrolled automatically: '+opts.auto.items);
				if (opts.prev.button)	debug(conf, 'Number of items scrolled backward: '+opts.prev.items);
				if (opts.next.button)	debug(conf, 'Number of items scrolled forward: '+opts.next.items);
			}
		};	//	/init

		$cfs._cfs_build = function() {
			$cfs.data('cfs_isCarousel', true);

			var orgCSS = {
				'textAlign'		: $cfs.css('textAlign'),
				'float'			: $cfs.css('float'),
				'position'		: $cfs.css('position'),
				'top'			: $cfs.css('top'),
				'right'			: $cfs.css('right'),
				'bottom'		: $cfs.css('bottom'),
				'left'			: $cfs.css('left'),
				'width'			: $cfs.css('width'),
				'height'		: $cfs.css('height'),
				'marginTop'		: $cfs.css('marginTop'),
				'marginRight'	: $cfs.css('marginRight'),
				'marginBottom'	: $cfs.css('marginBottom'),
				'marginLeft'	: $cfs.css('marginLeft')
			};

			switch (orgCSS.position) {
				case 'absolute':
					var newPosition = 'absolute';
					break;
				case 'fixed':
					var newPosition = 'fixed';
					break;
				default:
					var newPosition = 'relative';
			} 

			$wrp.css(orgCSS).css({
				'overflow'		: 'hidden',
				'position'		: newPosition
			});

			$cfs.data('cfs_origCss', orgCSS).css({
				'textAlign'		: 'left',
				'float'			: 'none',
				'position'		: 'absolute',
				'top'			: 0,
				'left'			: 0,
				'marginTop'		: 0,
				'marginRight'	: 0,
				'marginBottom'	: 0,
				'marginLeft'	: 0
			});

			if (opts.usePadding) {
				$cfs.children().each(function() {
					var m = parseInt($(this).css(opts.d['marginRight']));
					if (isNaN(m)) m = 0;
					$(this).data('cfs_origCssMargin', m);
				});
			}

		};	//	/build

		$cfs._cfs_bind_events = function() {
			$cfs._cfs_unbind_events();

			//	stop event
			$cfs.bind(cf_e('stop', conf), function(e, imm) {
				e.stopPropagation();

				//	button
				if (!crsl.isStopped) {
					if (opts.auto.button) {
						opts.auto.button.addClass(cf_c('stopped', conf));
					}
				}

				//	set stopped
				crsl.isStopped = true;

				if (opts.auto.play) {
					opts.auto.play = false;
					$cfs.trigger(cf_e('pause', conf), imm);
				}
				return true;
			});

			//	finish event
			$cfs.bind(cf_e('finish', conf), function(e) {
				e.stopPropagation();
				if (crsl.isScrolling) {
					sc_stopScroll(scrl);
				}
				return true;
			});

			//	pause event
			$cfs.bind(cf_e('pause', conf), function(e, imm, res) {
				e.stopPropagation();
				tmrs = sc_clearTimers(tmrs);

				//	immediately pause
				if (imm && crsl.isScrolling) {
					scrl.isStopped = true;
					var nst = getTime() - scrl.startTime;
					scrl.duration -= nst;
					if (scrl.pre) scrl.pre.duration -= nst;
					if (scrl.post) scrl.post.duration -= nst;
					sc_stopScroll(scrl, false);
				}

				//	update remaining pause-time
				if (!crsl.isPaused && !crsl.isScrolling) {
					if (res) tmrs.timePassed += getTime() - tmrs.startTime;
				}
				
				//	button
				if (!crsl.isPaused) {
					if (opts.auto.button) {
						opts.auto.button.addClass(cf_c('paused', conf));
					}
				}

				//	set paused
				crsl.isPaused = true;

				//	pause pause callback
				if (opts.auto.onPausePause) {
					var dur1 = opts.auto.pauseDuration - tmrs.timePassed,
						perc = 100 - Math.ceil( dur1 * 100 / opts.auto.pauseDuration );
					opts.auto.onPausePause.call($tt0, perc, dur1);
				}
				return true;
			});

			//	play event
			$cfs.bind(cf_e('play', conf), function(e, dir, del, res) {
				e.stopPropagation();
				tmrs = sc_clearTimers(tmrs);

				//	sort params
				var v = [dir, del, res],
					t = ['string', 'number', 'boolean'],
					a = cf_sortParams(v, t);

				var dir = a[0],
					del = a[1],
					res = a[2];

				if (dir != 'prev' && dir != 'next') dir = crsl.direction;
				if (typeof del != 'number') 		del = 0;
				if (typeof res != 'boolean') 		res = false;

				//	stopped?
				if (res) {
					crsl.isStopped = false;
					opts.auto.play = true;
				}
				if (!opts.auto.play) {
					e.stopImmediatePropagation();
					return debug(conf, 'Carousel stopped: Not scrolling.');
				}

				//	button
				if (crsl.isPaused) {
					if (opts.auto.button) {
						opts.auto.button.removeClass(cf_c('stopped', conf));
						opts.auto.button.removeClass(cf_c('paused', conf));
					}
				}

				//	set playing
				crsl.isPaused = false;
				tmrs.startTime = getTime();

				//	timeout the scrolling
				var dur1 = opts.auto.pauseDuration + del;
					dur2 = dur1 - tmrs.timePassed;
					perc = 100 - Math.ceil(dur2 * 100 / dur1);

				tmrs.auto = setTimeout(function() {
					if (opts.auto.onPauseEnd) {
						opts.auto.onPauseEnd.call($tt0, perc, dur2);
					}
					if (crsl.isScrolling) {
						$cfs.trigger(cf_e('play', conf), dir);
					} else {
						$cfs.trigger(cf_e(dir, conf), opts.auto);
					}
				}, dur2);

				//	pause start callback
				if (opts.auto.onPauseStart) {
					opts.auto.onPauseStart.call($tt0, perc, dur2);
				}

				return true;
			});

			//	resume event
			$cfs.bind(cf_e('resume', conf), function(e) {
				e.stopPropagation();
				if (scrl.isStopped) {
					scrl.isStopped = false;
					crsl.isPaused = false;
					crsl.isScrolling = true;
					scrl.startTime = getTime();
					sc_startScroll(scrl);
				} else {
					$cfs.trigger(cf_e('play', conf));
				}
				return true;
			});

			//	prev + next events
			$cfs.bind(cf_e('prev', conf)+' '+cf_e('next', conf), function(e, obj, num, clb) {
				e.stopPropagation();

				//	stopped or hidden carousel, don't scroll, don't queue
				if (crsl.isStopped || $cfs.is(':hidden')) {
					e.stopImmediatePropagation();
					return debug(conf, 'Carousel stopped or hidden: Not scrolling.');
				}

				//	not enough items
				if (opts.items.minimum >= itms.total) {
					e.stopImmediatePropagation();
					return debug(conf, 'Not enough items ('+itms.total+', '+opts.items.minimum+' needed): Not scrolling.');
				}

				//	get config
				var v = [obj, num, clb],
					t = ['object', 'number/string', 'function'],
					a = cf_sortParams(v, t);

				var obj = a[0],
					num = a[1],
					clb = a[2];

				var eType = e.type.slice(conf.events.prefix.length);

				if (typeof obj != 'object' || obj == null)	obj = opts[eType];
				if (typeof clb == 'function')				obj.onAfter = clb;

				if (typeof num != 'number') {
					if (opts.items.filter != '*') {
						num = 'visible';
					} else {
						var arr = [num, obj.items, opts[eType].items];
						for (var a = 0, l = arr.length; a < l; a++) {
							if (typeof arr[a] == 'number' || arr[a] == 'page' || arr[a] == 'visible') {
								num = arr[a];
								break;
							}
						}
					}
					switch(num) {
						case 'page':
							e.stopImmediatePropagation();
							return $cfs.triggerHandler(eType+'Page', [obj, clb]);
							break;

						case 'visible':
							if (!opts.items.visibleConf.variable && opts.items.filter == '*') {
								num = opts.items.visible;
							}
							break;
					}
				}

				//	resume animation, add current to queue
				if (scrl.isStopped) {
					$cfs.trigger(cf_e('resume', conf));
					$cfs.trigger(cf_e('queue', conf), [eType, [obj, num, clb]]);
					e.stopImmediatePropagation();
					return debug(conf, 'Carousel resumed scrolling.');
				}

				//	queue if scrolling
				if (obj.duration > 0) {
					if (crsl.isScrolling) {
						if (obj.queue) $cfs.trigger(cf_e('queue', conf), [eType, [obj, num, clb]]);
						e.stopImmediatePropagation();
						return debug(conf, 'Carousel currently scrolling.');
					}
				}

				//	test conditions callback
				if (obj.conditions && !obj.conditions.call($tt0)) {
					e.stopImmediatePropagation();
					return debug(conf, 'Callback "conditions" returned false.');
				}

				tmrs.timePassed = 0;
				$cfs.trigger('_cfs_slide_'+eType, [obj, num]);

				//	synchronise
				if (opts.synchronise) {
					var s = opts.synchronise,
						c = [obj, num];
					for (var j = 0, l = s.length; j < l; j++) {
						var d = eType;
						if (!s[j][1]) c[0] = s[j][0].triggerHandler('_cfs_configuration', eType);
						if (!s[j][2]) d = (d == 'prev') ? 'next' : 'prev';
						c[1] = num + s[j][3];
						s[j][0].trigger('_cfs_slide_'+d, c);
					}
				}
				return true;
			});

			//	prev event, accessible from outside
			$cfs.bind(cf_e('_cfs_slide_prev', conf, false), function(e, sO, nI) {
				e.stopPropagation();
				var a_itm = $cfs.children();

				//	non-circular at start, scroll to end
				if (!opts.circular) {
					if (itms.first == 0) {
						if (opts.infinite) {
							$cfs.trigger(cf_e('next', conf), itms.total-1);
						}
						return e.stopImmediatePropagation();
					}
				}

				if (opts.usePadding) sz_resetMargin(a_itm, opts);

				//	find number of items to scroll
				if (typeof nI != 'number') {
					if (opts.items.visibleConf.variable) {
						nI = gn_getVisibleItemsPrev(a_itm, opts, itms.total-1);
					} else if (opts.items.filter != '*') {
						var xI = (typeof sO.items == 'number') ? sO.items : gn_getVisibleOrg($cfs, opts);
						nI = gn_getScrollItemsPrevFilter(a_itm, opts, itms.total-1, xI);
					} else {
						nI = opts.items.visible;
					}
					nI = cf_getAdjust(nI, opts, sO.items, $tt0);
				}

				//	prevent non-circular from scrolling to far
				if (!opts.circular) {
					if (itms.total - nI < itms.first) {
						nI = itms.total - itms.first;
					}
				}

				//	set new number of visible items
				opts.items.visibleConf.old = opts.items.visible;
				if (opts.items.visibleConf.variable) {
					var vI = gn_getVisibleItemsNext(a_itm, opts, itms.total-nI);
					if (opts.items.visible+nI <= vI && nI < itms.total) {
						nI++;
						vI = gn_getVisibleItemsNext(a_itm, opts, itms.total-nI);
					}
					opts.items.visible = cf_getItemsAdjust(vI, opts, opts.items.visibleConf.adjust, $tt0);
				} else if (opts.items.filter != '*') {
					var vI = gn_getVisibleItemsNextFilter(a_itm, opts, itms.total-nI);
					opts.items.visible = cf_getItemsAdjust(vI, opts, opts.items.visibleConf.adjust, $tt0);
				}

				if (opts.usePadding) sz_resetMargin(a_itm, opts, true);

				//	scroll 0, don't scroll
				if (nI == 0) {
					e.stopImmediatePropagation();
					return debug(conf, '0 items to scroll: Not scrolling.');
				}
				debug(conf, 'Scrolling '+nI+' items backward.');

				//	save new config
				itms.first += nI;
				while (itms.first >= itms.total) {
					itms.first -= itms.total;
				}

				//	non-circular callback
				if (!opts.circular) {
					if (itms.first == 0 && sO.onEnd) sO.onEnd.call($tt0);
					if (!opts.infinite) nv_enableNavi(opts, itms.first, conf);
				}

				//	rearrange items
				$cfs.children().slice(itms.total-nI, itms.total).prependTo($cfs);
				if (itms.total < opts.items.visible + nI) {
					$cfs.children().slice(0, (opts.items.visible+nI)-itms.total).clone(true).appendTo($cfs);
				}

				//	the needed items
				var a_itm = $cfs.children(),
					c_old = gi_getOldItemsPrev(a_itm, opts, nI),
					c_new = gi_getNewItemsPrev(a_itm, opts),
					l_cur = a_itm.eq(nI-1),
					l_old = c_old.last(),
					l_new = c_new.last();

				if (opts.usePadding) sz_resetMargin(a_itm, opts);
				if (opts.align) {
					var p = cf_getAlignPadding(c_new, opts),
						pL = p[0],
						pR = p[1];
				} else {
					var pL = 0,
						pR = 0;
				}
				var oL = (pL < 0) ? opts.padding[opts.d[3]] : 0;

				//	hide items for fx directscroll
				if (sO.fx == 'directscroll' && opts.items.visible < nI) {
					var hiddenitems = a_itm.slice(opts.items.visibleConf.old, nI),
						orgW = opts.items[opts.d['width']];
					hiddenitems.each(function() {
						var hi = $(this);
						hi.data('isHidden', hi.is(':hidden')).hide();
					});
					opts.items[opts.d['width']] = 'variable';
				} else {
					var hiddenitems = false;
				}

				//	save new sizes
				var i_siz = ms_getTotalSize(a_itm.slice(0, nI), opts, 'width'),
					w_siz = cf_mapWrapperSizes(ms_getSizes(c_new, opts, true), opts, !opts.usePadding);

				if (hiddenitems) opts.items[opts.d['width']] = orgW;

				if (opts.usePadding) {
					sz_resetMargin(a_itm, opts, true);
					if (pR >= 0) {
						sz_resetMargin(l_old, opts, opts.padding[opts.d[1]]);
					}
					sz_resetMargin(l_cur, opts, opts.padding[opts.d[3]]);
				}
				if (opts.align) {
					opts.padding[opts.d[1]] = pR;
					opts.padding[opts.d[3]] = pL;
				}

				//	animation configuration
				var a_cfs = {},
					a_dur = sO.duration;

					 if (sO.fx == 'none')	a_dur = 0;
				else if (a_dur == 'auto')	a_dur = opts.scroll.duration / opts.scroll.items * nI;
				else if (a_dur <= 0)		a_dur = 0;
				else if (a_dur < 10)		a_dur = i_siz / a_dur;

				scrl = sc_setScroll(a_dur, sO.easing);

				//	animate wrapper
				if (opts[opts.d['width']] == 'variable' || opts[opts.d['height']] == 'variable') {
					scrl.anims.push([$wrp, w_siz]);
				}

				//	animate items
				if (opts.usePadding) {
					var new_m = opts.padding[opts.d[3]];

					if (l_new.not(l_cur).length) {
			 			var a_cur = {};
			 				a_cur[opts.d['marginRight']] = l_cur.data('cfs_origCssMargin');

						if (pL < 0) l_cur.css(a_cur);
						else 		scrl.anims.push([l_cur, a_cur]);
					}

					if (l_new.not(l_old).length) {
						var a_old = {};
							a_old[opts.d['marginRight']] = l_old.data('cfs_origCssMargin');
						scrl.anims.push([l_old, a_old]);
					}

					if (pR >= 0) {
						var a_new = {};
							a_new[opts.d['marginRight']] = l_new.data('cfs_origCssMargin') + opts.padding[opts.d[1]];
						scrl.anims.push([l_new, a_new]);
					}
				} else {
					var new_m = 0;
				}

				//	animate carousel
				a_cfs[opts.d['left']] = new_m;

				//	onBefore callback
				var args = [c_old, c_new, w_siz, a_dur];
				if (sO.onBefore) sO.onBefore.apply($tt0, args);
				clbk.onBefore = sc_callCallbacks(clbk.onBefore, $tt0, args);



				//	ALTERNATIVE EFFECTS

				//	extra animation arrays
				switch(sO.fx) {
					case 'fade':
					case 'crossfade':
					case 'cover':
					case 'uncover':
						scrl.pre = sc_setScroll(scrl.duration, scrl.easing);
						scrl.post = sc_setScroll(scrl.duration, scrl.easing);
						scrl.duration = 0;
						break;
				}

				//	create copy
				switch(sO.fx) {
					case 'crossfade':
					case 'cover':
					case 'uncover':
						var $cf2 = $cfs.clone().appendTo($wrp);
						break;
				}
				switch(sO.fx) {
					case 'uncover':
						$cf2.children().slice(0, nI).remove();
					case 'crossfade':
					case 'cover':
						$cf2.children().slice(opts.items.visible).remove();
						break;
				}

				//	animations
				switch(sO.fx) {
					case 'fade':
						scrl.pre.anims.push([$cfs, { 'opacity': 0 }]);
						break;
					case 'crossfade':
						$cf2.css({ 'opacity': 0 });
						scrl.pre.anims.push([$cfs, { 'width': '+=0' }, function() { $cf2.remove(); }]);
						scrl.post.anims.push([$cf2, { 'opacity': 1 }]);
						break;
					case 'cover':
						scrl = fx_cover(scrl, $cfs, $cf2, opts, true);
						break;
					case 'uncover':
						scrl = fx_uncover(scrl, $cfs, $cf2, opts, true, nI);
						break;
				}

				//	/ALTERNATIVE EFFECTS


				//	complete callback
				var a_complete = function() {

					var overFill = opts.items.visible+nI-itms.total;
					if (overFill > 0) {
						$cfs.children().slice(itms.total).remove();
						c_old = $( $cfs.children().slice(itms.total-(opts.items.visible-overFill)).get().concat( $cfs.children().slice(0, overFill).get() ) );
					}
					if (hiddenitems) {
						hiddenitems.each(function() {
							var hi = $(this);
							if (!hi.data('isHidden')) hi.show();
						});	
					}
					if (opts.usePadding) {
						var l_itm = $cfs.children().eq(opts.items.visible+nI-1);
						l_itm.css(opts.d['marginRight'], l_itm.data('cfs_origCssMargin'));
					}

					scrl.anims = [];
					if (scrl.pre) scrl.pre = sc_setScroll(scrl.orgDuration, scrl.easing);

					var fn = function() {
						switch(sO.fx) {
							case 'fade':
							case 'crossfade':
								$cfs.css('filter', '');
								break;
						}

						scrl.post = sc_setScroll(0, null);
						crsl.isScrolling = false;

						var args = [c_old, c_new, w_siz];
						if (sO.onAfter) sO.onAfter.apply($tt0, args);
						clbk.onAfter = sc_callCallbacks(clbk.onAfter, $tt0, args);

						if (queu.length) {
							$cfs.trigger(cf_e(queu[0][0], conf), queu[0][1]);
							queu.shift();
						}
						if (!crsl.isPaused) $cfs.trigger(cf_e('play', conf));
					};
					switch(sO.fx) {
						case 'fade':
							scrl.pre.anims.push([$cfs, { 'opacity': 1 }, fn]);
							sc_startScroll(scrl.pre);
							break;
						case 'uncover':
							scrl.pre.anims.push([$cfs, { 'width': '+=0' }, fn]);
							sc_startScroll(scrl.pre);
							break;
						default:
							fn();
							break;
					}
				};

				scrl.anims.push([$cfs, a_cfs, a_complete]);
				crsl.isScrolling = true;
				$cfs.css(opts.d['left'], -(i_siz-oL));
				tmrs = sc_clearTimers(tmrs);
				sc_startScroll(scrl);
				cf_setCookie(opts.cookie, $cfs.triggerHandler(cf_e('currentPosition', conf)));

				$cfs.trigger(cf_e('updatePageStatus', conf), [false, w_siz]);

				return true;
			});

			//	next event, accessible from outside
			$cfs.bind(cf_e('_cfs_slide_next', conf, false), function(e, sO, nI) {
				e.stopPropagation();
				var a_itm = $cfs.children();

				//	non-circular at end, scroll to start
				if (!opts.circular) {
					if (itms.first == opts.items.visible) {
						if (opts.infinite) {
							$cfs.trigger(cf_e('prev', conf), itms.total-1);
						}
						return e.stopImmediatePropagation();
					}
				}

				if (opts.usePadding) sz_resetMargin(a_itm, opts);

				//	find number of items to scroll
				if (typeof nI != 'number') {
					if (opts.items.filter != '*') {
						var xI = (typeof sO.items == 'number') ? sO.items : gn_getVisibleOrg($cfs, opts);
						nI = gn_getScrollItemsNextFilter(a_itm, opts, 0, xI);
					} else {
						nI = opts.items.visible;
					}
					nI = cf_getAdjust(nI, opts, sO.items, $tt0);
				}

				var lastItemNr = (itms.first == 0) ? itms.total : itms.first;

				//	prevent non-circular from scrolling to far
				if (!opts.circular) {
					if (opts.items.visibleConf.variable) {
						var vI = gn_getVisibleItemsNext(a_itm, opts, nI),
							xI = gn_getVisibleItemsPrev(a_itm, opts, lastItemNr-1);
					} else {
						var vI = opts.items.visible,
							xI = opts.items.visible;
					}

					if (nI + vI > lastItemNr) {
						nI = lastItemNr - xI;
					}
				}

				//	set new number of visible items
				opts.items.visibleConf.old = opts.items.visible;
				if (opts.items.visibleConf.variable) {
					var vI = gn_getVisibleItemsNextTestCircular(a_itm, opts, nI, lastItemNr);
					while (opts.items.visible-nI >= vI && nI < itms.total) {
						nI++;
						vI = gn_getVisibleItemsNextTestCircular(a_itm, opts, nI, lastItemNr);
					}
					opts.items.visible = cf_getItemsAdjust(vI, opts, opts.items.visibleConf.adjust, $tt0);
				} else if (opts.items.filter != '*') {
					var vI = gn_getVisibleItemsNextFilter(a_itm, opts, nI);
					opts.items.visible = cf_getItemsAdjust(vI, opts, opts.items.visibleConf.adjust, $tt0);
				}

				if (opts.usePadding) sz_resetMargin(a_itm, opts, true);

				//	scroll 0, don't scroll
				if (nI == 0) {
					e.stopImmediatePropagation();
					return debug(conf, '0 items to scroll: Not scrolling.');
				}
				debug(conf, 'Scrolling '+nI+' items forward.');

				//	save new config
				itms.first -= nI;
				while (itms.first < 0) {
					itms.first += itms.total;
				}

				//	non-circular callback
				if (!opts.circular) {
					if (itms.first == opts.items.visible && sO.onEnd) sO.onEnd.call($tt0);
					if (!opts.infinite) nv_enableNavi(opts, itms.first, conf);
				}

				//	rearrange items
				if (itms.total < opts.items.visible+nI) {
					$cfs.children().slice(0, (opts.items.visible+nI)-itms.total).clone(true).appendTo($cfs);
				}

				//	the needed items
				var a_itm = $cfs.children(),
					c_old = gi_getOldItemsNext(a_itm, opts),
					c_new = gi_getNewItemsNext(a_itm, opts, nI),
					l_cur = a_itm.eq(nI-1),
					l_old = c_old.last(),
					l_new = c_new.last();

				if (opts.usePadding) sz_resetMargin(a_itm, opts);
				if (opts.align)	{
					var p = cf_getAlignPadding(c_new, opts),
						pL = p[0],
						pR = p[1];
				} else {
					var pL = 0,
						pR = 0;
				}

				//	hide items for fx directscroll
				if (sO.fx == 'directscroll' && opts.items.visibleConf.old < nI) {
					var hiddenitems = a_itm.slice(opts.items.visibleConf.old, nI),
						orgW = opts.items[opts.d['width']];
					hiddenitems.each(function() {
						var hi = $(this);
						hi.data('isHidden', hi.is(':hidden')).hide();
					});
					opts.items[opts.d['width']] = 'variable';
				} else {
					var hiddenitems = false;
				}

				//	save new sizes
				var i_siz = ms_getTotalSize(a_itm.slice(0, nI), opts, 'width'),
					w_siz = cf_mapWrapperSizes(ms_getSizes(c_new, opts, true), opts, !opts.usePadding);

				if (hiddenitems) opts.items[opts.d['width']] = orgW;

				if (opts.align) {
					if (opts.padding[opts.d[1]] < 0) {
						opts.padding[opts.d[1]] = 0;
					}
				}
				if (opts.usePadding) {
					sz_resetMargin(a_itm, opts, true);
					sz_resetMargin(l_old, opts, opts.padding[opts.d[1]]);
				}
				if (opts.align) {
					opts.padding[opts.d[1]] = pR;
					opts.padding[opts.d[3]] = pL;
				}

				//	animation configuration
				var a_cfs = {},
					a_dur = sO.duration;

					 if (sO.fx == 'none')	a_dur = 0;
				else if (a_dur == 'auto')	a_dur = opts.scroll.duration / opts.scroll.items * nI;
				else if (a_dur <= 0)		a_dur = 0;
				else if (a_dur < 10)		a_dur = i_siz / a_dur;

				scrl = sc_setScroll(a_dur, sO.easing);

				//	animate wrapper
				if (opts[opts.d['width']] == 'variable' || opts[opts.d['height']] == 'variable') {
					scrl.anims.push([$wrp, w_siz]);
				}

				//	animate items
				if (opts.usePadding) {
					var l_new_m = l_new.data('cfs_origCssMargin');
					if (pR >= 0) {
						l_new_m += opts.padding[opts.d[1]];
					}
					l_new.css(opts.d['marginRight'], l_new_m);

					if (l_cur.not(l_old).length) {
						var a_old = {};
							a_old[opts.d['marginRight']] = l_old.data('cfs_origCssMargin');
						scrl.anims.push([l_old, a_old]);
					}

					var c_new_m = l_cur.data('cfs_origCssMargin');
					if (pL >= 0) {
						c_new_m += opts.padding[opts.d[3]];
					}
					var a_cur = {};
						a_cur[opts.d['marginRight']] = c_new_m;
					scrl.anims.push([l_cur, a_cur]);

				}

				//	animate carousel
				a_cfs[opts.d['left']] = -i_siz;
				if (pL < 0) {
					a_cfs[opts.d['left']] += pL;
				}

				//	onBefore callback
				var args = [c_old, c_new, w_siz, a_dur];
				if (sO.onBefore) sO.onBefore.apply($tt0, args);
				clbk.onBefore = sc_callCallbacks(clbk.onBefore, $tt0, args);



				//	ALTERNATIVE EFFECTS

				//	extra animation arrays
				switch(sO.fx) {
					case 'fade':
					case 'crossfade':
					case 'cover':
					case 'uncover':
						scrl.pre = sc_setScroll(scrl.duration, scrl.easing);
						scrl.post = sc_setScroll(scrl.duration, scrl.easing);
						scrl.duration = 0;
						break;
				}

				//	create copy
				switch(sO.fx) {
					case 'crossfade':
					case 'cover':
					case 'uncover':
						var $cf2 = $cfs.clone().appendTo($wrp);
						break;
				}
				switch(sO.fx) {
					case 'uncover':
						$cf2.children().slice(opts.items.visibleConf.old).remove();
						break;
					case 'crossfade':
					case 'cover':
						$cf2.children().slice(0, nI).remove();
						$cf2.children().slice(opts.items.visible).remove();
						break;
				}

				//	animations
				switch(sO.fx) {
					case 'fade':
						scrl.pre.anims.push([$cfs, { 'opacity': 0 }]);
						break;
					case 'crossfade':
						$cf2.css({ 'opacity': 0 });
						scrl.pre.anims.push([$cfs, { 'width': '+=0' }, function() { $cf2.remove(); }]);
						scrl.post.anims.push([$cf2, { 'opacity': 1 }]);
						break;
					case 'cover':
						scrl = fx_cover(scrl, $cfs, $cf2, opts, false);
						break;
					case 'uncover':
						scrl = fx_uncover(scrl, $cfs, $cf2, opts, false, nI);
						break;
				}

				//	/ALTERNATIVE EFFECTS


				//	complete callback
				var a_complete = function() {

					var overFill = opts.items.visible+nI-itms.total,
						new_m = (opts.usePadding) ? opts.padding[opts.d[3]] : 0;
					$cfs.css(opts.d['left'], new_m);
					if (overFill > 0) {
						$cfs.children().slice(itms.total).remove();
					}
					var l_itm = $cfs.children().slice(0, nI).appendTo($cfs).last();
					if (overFill > 0) {
						c_new = gi_getCurrentItems(a_itm, opts);
					}
					if (hiddenitems) {
						hiddenitems.each(function() {
							var hi = $(this);
							if (!hi.data('isHidden')) hi.show();
						});
					}
					if (opts.usePadding) {
						if (itms.total < opts.items.visible+nI) {
							var l_cur = $cfs.children().eq(opts.items.visible-1);
							l_cur.css(opts.d['marginRight'], l_cur.data('cfs_origCssMargin') + opts.padding[opts.d[3]]);
						}
						l_itm.css(opts.d['marginRight'], l_itm.data('cfs_origCssMargin'));
					}

					scrl.anims = [];
					if (scrl.pre) scrl.pre = sc_setScroll(scrl.orgDuration, scrl.easing);

					var fn = function() {
						switch(sO.fx) {
							case 'fade':
							case 'crossfade':
								$cfs.css('filter', '');
								break;
						}

						scrl.post = sc_setScroll(0, null);
						crsl.isScrolling = false;

						var args = [c_old, c_new, w_siz];
						if (sO.onAfter) sO.onAfter.apply($tt0, args);
						clbk.onAfter = sc_callCallbacks(clbk.onAfter, $tt0, args);

						if (queu.length) {
							$cfs.trigger(cf_e(queu[0][0], conf), queu[0][1]);
							queu.shift();
						}
						if (!crsl.isPaused) $cfs.trigger(cf_e('play', conf));
					};
					switch(sO.fx) {
						case 'fade':
							scrl.pre.anims.push([$cfs, { 'opacity': 1 }, fn]);
							sc_startScroll(scrl.pre);
							break;
						case 'uncover':
							scrl.pre.anims.push([$cfs, { 'width': '+=0' }, fn]);
							sc_startScroll(scrl.pre);
							break;
						default:
							fn();
							break;
					}
				};

				scrl.anims.push([$cfs, a_cfs, a_complete]);
				crsl.isScrolling = true;
				tmrs = sc_clearTimers(tmrs);
				sc_startScroll(scrl);
				cf_setCookie(opts.cookie, $cfs.triggerHandler(cf_e('currentPosition', conf)));

				$cfs.trigger(cf_e('updatePageStatus', conf), [false, w_siz]);

				return true;
			});

			//	slideTo event
			$cfs.bind(cf_e('slideTo', conf), function(e, num, dev, org, obj, dir, clb) {
				e.stopPropagation();

				var v = [num, dev, org, obj, dir, clb],
					t = ['string/number/object', 'number', 'boolean', 'object', 'string', 'function'],
					a = cf_sortParams(v, t);
				
				var obj = a[3],
					dir = a[4],
					clb = a[5];

				num = gn_getItemIndex(a[0], a[1], a[2], itms, $cfs);

				if (num == 0) return;
				if (typeof obj != 'object') obj = false;

				if (crsl.isScrolling) {
					if (typeof obj != 'object' || obj.duration > 0) return false;
				}

				if (dir != 'prev' && dir != 'next') {
					if (opts.circular) {
						if (num <= itms.total / 2) 	dir = 'next';
						else 						dir = 'prev';
					} else {
						if (itms.first == 0 ||
							itms.first > num)		dir = 'next';
						else						dir = 'prev';
					}
				}

				if (dir == 'prev') num = itms.total-num;
				$cfs.trigger(cf_e(dir, conf), [obj, num, clb]);

				return true;
			});

			//	prevPage event
			$cfs.bind(cf_e('prevPage', conf), function(e, obj, clb) {
				e.stopPropagation();
				var cur = $cfs.triggerHandler(cf_e('currentPage', conf));
				return $cfs.triggerHandler(cf_e('slideToPage', conf), [cur-1, obj, 'prev', clb]);
			});

			//	nextPage event
			$cfs.bind(cf_e('nextPage', conf), function(e, obj, clb) {
				e.stopPropagation();
				var cur = $cfs.triggerHandler(cf_e('currentPage', conf));
				return $cfs.triggerHandler(cf_e('slideToPage', conf), [cur+1, obj, 'next', clb]);
			});

			//	slideToPage event
			$cfs.bind(cf_e('slideToPage', conf), function(e, pag, obj, dir, clb) {
				e.stopPropagation();
				if (typeof pag != 'number') pag = $cfs.triggerHandler(cf_e('currentPage', conf));
				var ipp = opts.pagination.items || opts.items.visible,
					max = Math.ceil(itms.total / ipp)-1;
				if (pag < 0)	pag = max;
				if (pag > max)	pag = 0;
				return $cfs.triggerHandler(cf_e('slideTo', conf), [pag*ipp, 0, true, obj, dir, clb]);
			});

			//	jumpToStart event
			$cfs.bind(cf_e('jumpToStart', conf), function(e, s) {
				e.stopPropagation();
				if (s)	s = gn_getItemIndex(s, 0, true, itms, $cfs);
				else 	s = 0;

				s += itms.first;
				if (s != 0) {
					while (s > itms.total) s -= itms.total;
					$cfs.prepend($cfs.children().slice(s, itms.total));
				}
				return true;
			});

			//	synchronise event
			$cfs.bind(cf_e('synchronise', conf), function(e, s) {
				e.stopPropagation();
					 if (s) 				s = cf_getSynchArr(s);
				else if (opts.synchronise)	s = opts.synchronise;
				else return debug(conf, 'No carousel to synchronise.');

				var n = $cfs.triggerHandler(cf_e('currentPosition', conf)),
					x = true;
				for (var j = 0, l = s.length; j < l; j++) {
					if (!s[j][0].triggerHandler(cf_e('slideTo', conf), [n, s[j][3], true])) {
						x = false;
					}
				}
				return x;
			});

			//	queue event
			$cfs.bind(cf_e('queue', conf), function(e, dir, opt) {
				e.stopPropagation();
				if (typeof dir == 'function') {
					dir.call($tt0, queu);
				} else if (is_array(dir)) {
					queu = dir;
				} else if (typeof dir != 'undefined') {
					queu.push([dir, opt]);
				}
				return queu;
			});

			//	insertItem event
			$cfs.bind(cf_e('insertItem', conf), function(e, itm, num, org, dev) {
				e.stopPropagation();

				var v = [itm, num, org, dev],
					t = ['string/object', 'string/number/object', 'boolean', 'number'],
					a = cf_sortParams(v, t);
				
				var itm = a[0],
					num = a[1],
					org = a[2],
					dev = a[3];

				if (typeof itm == 'object' && 
					typeof itm.jquery == 'undefined')	itm = $(itm);
				if (typeof itm == 'string') 			itm = $(itm);
				if (typeof itm != 'object' ||
					typeof itm.jquery == 'undefined' || 
					itm.length == 0) return debug(conf, 'Not a valid object.');

				if (typeof num == 'undefined') num = 'end';

				if (opts.usePadding) {
					itm.each(function() {
						var m = parseInt($(this).css(opts.d['marginRight']));
						if (isNaN(m)) m = 0;
						$(this).data('cfs_origCssMargin', m);
					});
				}

				var orgNum = num,
					before = 'before';

				if (num == 'end') {
					if (org) {
						if (itms.first == 0) {
							num = itms.total-1;
							before = 'after';
						} else {
							num = itms.first;
							itms.first += itm.length
						}
						if (num < 0) num = 0;
					} else {
						num = itms.total-1;
						before = 'after';
					}
				} else {
					num = gn_getItemIndex(num, dev, org, itms, $cfs);
				}
				if (orgNum != 'end' && !org) {
					if (num < itms.first) itms.first += itm.length;
				}
				if (itms.first >= itms.total) itms.first -= itms.total;

				var $cit = $cfs.children().eq(num);
				if ($cit.length) {
					$cit[before](itm);
				} else {
					$cfs.append(itm);
				}

				itms.total = $cfs.children().length;

				var sz = $cfs.triggerHandler('updateSizes');
				nv_showNavi(opts, itms.total, conf);
				nv_enableNavi(opts, itms.first, conf);
				$cfs.trigger(cf_e('linkAnchors', conf));
				$cfs.trigger(cf_e('updatePageStatus', conf), [true, sz]);

				return true;
			});

			//	removeItem event
			$cfs.bind(cf_e('removeItem', conf), function(e, num, org, dev) {
				e.stopPropagation();
				
				var v = [num, org, dev],
					t = ['string/number/object', 'boolean', 'number'],
					a = cf_sortParams(v, t);
				
				var num = a[0],
					org = a[1],
					dev = a[2];

				if (typeof num == 'undefined' || num == 'end') {
					$cfs.children().last().remove();
				} else {
					num = gn_getItemIndex(num, dev, org, itms, $cfs);
					var $cit = $cfs.children().eq(num);
					if ($cit.length){
						if (num < itms.first) itms.first -= $cit.length;
						$cit.remove();
					}
				}
				itms.total = $cfs.children().length;

				var sz = $cfs.triggerHandler('updateSizes');
				nv_showNavi(opts, itms.total, conf);
				nv_enableNavi(opts, itms.first, conf);
				$cfs.trigger(cf_e('updatePageStatus', conf), [true, sz]);

				return true;
			});

			//	onBefore and onAfter event
			$cfs.bind(cf_e('onBefore', conf)+' '+cf_e('onAfter', conf), function(e, fn) {
				e.stopPropagation();
				var eType = e.type.slice(conf.events.prefix.length);
				if (is_array(fn))				clbk[eType] = fn;
				if (typeof fn == 'function')	clbk[eType].push(fn);
				return clbk[eType];
			});

			//	currentPosition event, accessible from outside
			$cfs.bind(cf_e('_cfs_currentPosition', conf, false), function(e, fn) {
				e.stopPropagation();
				return $cfs.triggerHandler(cf_e('currentPosition', conf), fn);
			});
			$cfs.bind(cf_e('currentPosition', conf), function(e, fn) {
				e.stopPropagation();
				if (itms.first == 0) var val = 0;
				else var val = itms.total - itms.first;
				if (typeof fn == 'function') fn.call($tt0, val);
				return val;
			});

			//	currentPage event
			$cfs.bind(cf_e('currentPage', conf), function(e, fn) {
				e.stopPropagation();
				var ipp = opts.pagination.items || opts.items.visible;
				var max = Math.ceil(itms.total/ipp-1);
				if (itms.first == 0) 							var nr = 0;
				else if (itms.first < itms.total % ipp) 		var nr = 0;
				else if (itms.first == ipp && !opts.circular) 	var nr = max;
				else 											var nr = Math.round((itms.total-itms.first)/ipp);
				if (nr < 0) nr = 0;
				if (nr > max) nr = max;
				if (typeof fn == 'function') fn.call($tt0, nr);
				return nr;
			});

			//	currentVisible event
			$cfs.bind(cf_e('currentVisible', conf), function(e, fn) {
				e.stopPropagation();
				$i = gi_getCurrentItems($cfs.children(), opts);
				if (typeof fn == 'function') fn.call($tt0, $i);
				return $i;
			});
			
			//	slice event
			$cfs.bind(cf_e('slice', conf), function(e, f, l, fn) {
				e.stopPropagation();

				var v = [f, l, fn],
					t = ['number', 'number', 'function'],
					a = cf_sortParams(v, t);

				f = (typeof a[0] == 'number') ? a[0] : 0,
				l = (typeof a[1] == 'number') ? a[1] : itms.total,
				fn = a[2];
				
				f += itms.first;
				l += itms.first;

				while (f > itms.total) { f -= itms.total }
				while (l > itms.total) { l -= itms.total }
				while (f < 0) { f += itms.total }
				while (l < 0) { l += itms.total }

				var $iA = $cfs.children();

				if (l > f) {
					var $i = $iA.slice(f, l);	
				} else {
					var $i = $( $iA.slice(f, itms.total).get().concat( $iA.slice(0, l).get() ) );
				}

				if (typeof fn == 'function') fn.call($tt0, $i);
				return $i;
			});

			//	isPaused, isStopped and isScrolling events
			$cfs.bind(cf_e('isPaused', conf)+' '+cf_e('isStopped', conf)+' '+cf_e('isScrolling', conf), function(e, fn) {
				e.stopPropagation();
				var eType = e.type.slice(conf.events.prefix.length);
				if (typeof fn == 'function') fn.call($tt0, crsl[eType]);
				return crsl[eType];
			});

			//	configuration event, accessible from outside
			$cfs.bind(cf_e('_cfs_configuration', conf, false), function(e, a, b, c) {
				e.stopPropagation();
				return $cfs.triggerHandler(cf_e('configuration', conf), [a, b, c]);
			});
			$cfs.bind(cf_e('configuration', conf), function(e, a, b, c) {
				e.stopPropagation();
				var reInit = false;

				//	return entire configuration-object
				if (typeof a == 'function') {
					a.call($tt0, opts);

				//	set multiple options via object
				} else if (typeof a == 'object') {
					opts_orig = $.extend(true, {}, opts_orig, a);
					if (b !== false) reInit = true;
					else opts = $.extend(true, {}, opts, a);

				} else if (typeof a != 'undefined') {

					//	callback function for specific option
					if (typeof b == 'function') {
						var val = eval('opts.'+a);
						if (typeof val == 'undefined') val = '';
						b.call($tt0, val);

					//	set individual option
					} else if (typeof b != 'undefined') {
						if (typeof c !== 'boolean') c = true;
						eval('opts_orig.'+a+' = b');
						if (c !== false) reInit = true;
						else eval('opts.'+a+' = b');

					//	return value for specific option
					} else {
						return eval('opts.'+a);
					}
				}
				if (reInit) {
					sz_resetMargin($cfs.children(), opts);
					$cfs._cfs_init(opts_orig);
					$cfs._cfs_bind_buttons();
					var siz = sz_setSizes($cfs, opts, false);
					$cfs.trigger(cf_e('updatePageStatus', conf), [true, siz]);
				}
				return opts;
			});

			//	linkAnchors event
			$cfs.bind(cf_e('linkAnchors', conf), function(e, $con, sel) {
				e.stopPropagation();
				if (typeof $con == 'undefined' || $con.length == 0) $con = $('body');
				else if (typeof $con == 'string') $con = $($con);
				if (typeof $con != 'object') return debug(conf, 'Not a valid object.');
				if (typeof sel != 'string' || sel.length == 0) sel = 'a.caroufredsel';
				$con.find(sel).each(function() {
					var h = this.hash || '';
					if (h.length > 0 && $cfs.children().index($(h)) != -1) {
						$(this).unbind('click').click(function(e) {
							e.preventDefault();
							$cfs.trigger(cf_e('slideTo', conf), h);
						});
					}
				});
				return true;
			});

			//	updatePageStatus event
			$cfs.bind(cf_e('updatePageStatus', conf), function(e, build, sizes) {
				e.stopPropagation();
				if (!opts.pagination.container) return;
				
				if (build) {
					var ipp = opts.pagination.items || opts.items.visible,
						l = Math.ceil(itms.total/ipp);

					if (opts.pagination.anchorBuilder) {
						opts.pagination.container.children().remove();
						opts.pagination.container.each(function() {
							for (var a = 0; a < l; a++) {
								var i = $cfs.children().eq( gn_getItemIndex(a*ipp, 0, true, itms, $cfs) );
								$(this).append(opts.pagination.anchorBuilder(a+1, i));
							}
						});
					}
					opts.pagination.container.each(function() {
						$(this).children().unbind(opts.pagination.event).each(function(a) {
							$(this).bind(opts.pagination.event, function(e) {
								e.preventDefault();
								$cfs.trigger(cf_e('slideTo', conf), [a*ipp, 0, true, opts.pagination]);
							});
						});
					});
				}
				opts.pagination.container.each(function() {
					$(this).children().removeClass(cf_c('selected', conf)).eq($cfs.triggerHandler(cf_e('currentPage', conf))).addClass(cf_c('selected', conf));
				});
				return true;
			});

			//	updateSizes event
			$cfs.bind(cf_e('updateSizes', conf), function(e) {
				var a_itm = $cfs.children(),
					vI = opts.items.visible;

					 if (opts.items.visibleConf.variable)	vI = gn_getVisibleItemsNext(a_itm, opts, 0);
				else if (opts.items.filter != '*') 			vI = gn_getVisibleItemsNextFilter(a_itm, opts, 0);

				if (!opts.circular && itms.first != 0 && vI > itms.first) {
					if (opts.items.visibleConf.variable) {
						var nI = gn_getVisibleItemsPrev(a_itm, opts, itms.first) - itms.first;
					} else if (opts.items.filter != '*') {
						var nI = gn_getVisibleItemsPrevFilter(a_itm, opts, itms.first) - itms.first;
					} else {
						nI = opts.items.visible - itms.first;
					}
					debug(conf, 'Preventing non-circular: sliding '+nI+' items backward.');
					$cfs.trigger('prev', nI);
				}
				opts.items.visible = cf_getItemsAdjust(vI, opts, opts.items.visibleConf.adjust, $tt0);
				return sz_setSizes($cfs, opts);
			});

			//	destroy event, accessible from outside
			$cfs.bind(cf_e('_cfs_destroy', conf, false), function(e, orgOrder) {
				e.stopPropagation();
				$cfs.trigger(cf_e('destroy', conf), orgOrder);
				return true;
			});
			$cfs.bind(cf_e('destroy', conf), function(e, orgOrder) {
				e.stopPropagation();
				tmrs = sc_clearTimers(tmrs);

				$cfs.data('cfs_isCarousel', false);
				$cfs.trigger(cf_e('finish', conf));
				if (orgOrder) {
					$cfs.trigger(cf_e('jumpToStart', conf));
				}
				if (opts.usePadding) {
					sz_resetMargin($cfs.children(), opts);
				}

				$cfs.css($cfs.data('cfs_origCss'));
				$cfs._cfs_unbind_events();
				$cfs._cfs_unbind_buttons();
				$wrp.replaceWith($cfs);

				return true;
			});
		};	//	/bind_events

		$cfs._cfs_unbind_events = function() {
			$cfs.unbind(cf_e('', conf));
			$cfs.unbind(cf_e('', conf, false));
		};	//	/unbind_events

		$cfs._cfs_bind_buttons = function() {
			$cfs._cfs_unbind_buttons();
			nv_showNavi(opts, itms.total, conf);
			nv_enableNavi(opts, itms.first, conf);

			if (opts.auto.pauseOnHover) {
				var pC = bt_pauseOnHoverConfig(opts.auto.pauseOnHover);
				$wrp.bind(cf_e('mouseenter', conf, false), function() { $cfs.trigger(cf_e('pause', conf), pC);	})
					.bind(cf_e('mouseleave', conf, false), function() { $cfs.trigger(cf_e('resume', conf));		});
			}

			if (opts.auto.button) {
				opts.auto.button.bind(cf_e(opts.auto.event, conf, false), function(e) {
					e.preventDefault();
					var ev = false,
						pC = null;

					if (crsl.isPaused) {
						ev = 'play';
					} else if (opts.auto.pauseOnEvent) {
						ev = 'pause';
						pC = bt_pauseOnHoverConfig(opts.auto.pauseOnEvent);
					}
					if (ev) {
						$cfs.trigger(cf_e(ev, conf), pC);
					}
				});
			}
			if (opts.prev.button) {
				opts.prev.button.bind(cf_e(opts.prev.event, conf, false), function(e) {
					e.preventDefault();
					$cfs.trigger(cf_e('prev', conf));
				});
				if (opts.prev.pauseOnHover) {
					var pC = bt_pauseOnHoverConfig(opts.prev.pauseOnHover);
					opts.prev.button.bind(cf_e('mouseenter', conf, false), function() { $cfs.trigger(cf_e('pause', conf), pC);	})
									.bind(cf_e('mouseleave', conf, false), function() { $cfs.trigger(cf_e('resume', conf));		});
				}
			}

			if (opts.next.button) {
				opts.next.button.bind(cf_e(opts.next.event, conf, false), function(e) {
					e.preventDefault();
					$cfs.trigger(cf_e('next', conf));
				});
				if (opts.next.pauseOnHover) {
					var pC = bt_pauseOnHoverConfig(opts.next.pauseOnHover);
					opts.next.button.bind(cf_e('mouseenter', conf, false), function() { $cfs.trigger(cf_e('pause', conf), pC); 	})
									.bind(cf_e('mouseleave', conf, false), function() { $cfs.trigger(cf_e('resume', conf));		});
				}
			}
			if ($.fn.mousewheel) {
				if (opts.prev.mousewheel) {
					if (!crsl.mousewheelPrev) {
						crsl.mousewheelPrev = true;
						$wrp.mousewheel(function(e, delta) { 
							if (delta > 0) {
								e.preventDefault();
								var num = bt_mousesheelNumber(opts.prev.mousewheel);
								$cfs.trigger(cf_e('prev', conf), num);
							}
						});
					}
				}
				if (opts.next.mousewheel) {
					if (!crsl.mousewheelNext) {
						crsl.mousewheelNext = true;
						$wrp.mousewheel(function(e, delta) { 
							if (delta < 0) {
								e.preventDefault();
								var num = bt_mousesheelNumber(opts.next.mousewheel);
								$cfs.trigger(cf_e('next', conf), num);
							}
						});
					}
				}
			}
			if ($.fn.touchwipe) {
				var wP = (opts.prev.wipe) ? function() { $cfs.trigger(cf_e('prev', conf)) } : null,
					wN = (opts.next.wipe) ? function() { $cfs.trigger(cf_e('next', conf)) } : null;

				if (wN || wN) {
					if (!crsl.touchwipe) {
						crsl.touchwipe = true;
						var twOps = {
							'min_move_x': 30,
							'min_move_y': 30,
							'preventDefaultEvents': true
						};
						switch (opts.direction) {
							case 'up':
							case 'down':
								twOps.wipeUp = wP;
								twOps.wipeDown = wN;
								break;
							default:
								twOps.wipeLeft = wN;
								twOps.wipeRight = wP;
						}
						$wrp.touchwipe(twOps);
					}
				}
			}
			if (opts.pagination.container) {
				if (opts.pagination.pauseOnHover) {
					var pC = bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);
					opts.pagination.container.bind(cf_e('mouseenter', conf, false), function() { $cfs.trigger(cf_e('pause', conf), pC);	})
											 .bind(cf_e('mouseleave', conf, false), function() { $cfs.trigger(cf_e('resume', conf));	});
				}
			}
			if (opts.prev.key || opts.next.key) {
				$(document).bind(cf_e('keyup', conf, false, true, true), function(e) {
					var k = e.keyCode;
					if (k == opts.next.key)	{
						e.preventDefault();
						$cfs.trigger(cf_e('next', conf));
					}
					if (k == opts.prev.key) {
						e.preventDefault();
						$cfs.trigger(cf_e('prev', conf));
					}
				});
			}
			if (opts.pagination.keys) {
				$(document).bind(cf_e('keyup', conf, false, true, true), function(e) {
					var k = e.keyCode;
					if (k >= 49 && k < 58) {
						k = (k-49) * opts.items.visible;
						if (k <= itms.total) {
							e.preventDefault();
							$cfs.trigger(cf_e('slideTo', conf), [k, 0, true, opts.pagination]);
						}
					}
				});
			}
			if (opts.auto.play) {
				$cfs.trigger(cf_e('play', conf), opts.auto.delay);
			}

if (crsl.upDateOnWindowResize) {
	$(window).bind(cf_e('resize', conf, false, true, true), function(e) {
		$cfs.trigger(cf_e('finish', conf));
		if (opts.auto.pauseOnResize && !crsl.isPaused) {
			$cfs.trigger(cf_e('play', conf));
		}
		sz_resetMargin($cfs.children(), opts);
		$cfs._cfs_init(opts_orig);
		var siz = sz_setSizes($cfs, opts, false);
		$cfs.trigger(cf_e('updatePageStatus', conf), [true, siz]);
	});
}

		};	//	/bind_buttons

		$cfs._cfs_unbind_buttons = function() {
			var ns1 = cf_e('', conf),
				ns2 = cf_e('', conf, false);
				ns3 = cf_e('', conf, false, true, true);

			$(document).unbind(ns3);
			$(window).unbind(ns3);
			$wrp.unbind(ns2);

			if (opts.auto.button) opts.auto.button.unbind(ns2);
			if (opts.prev.button) opts.prev.button.unbind(ns2);
			if (opts.next.button) opts.next.button.unbind(ns2);
			if (opts.pagination.container) {
				opts.pagination.container.unbind(ns2);
				if (opts.pagination.anchorBuilder) {
					opts.pagination.container.children().remove();
				}
			}

			nv_showNavi(opts, 'hide', conf);
			nv_enableNavi(opts, 'removeClass', conf);

		};	//	/unbind_buttons



		//	START

		var crsl = {
				'direction'		: 'next',
				'isPaused'		: true,
				'isScrolling'	: false,
				'isStopped'		: false,

				'mousewheelNext': false,
				'mousewheelPrev': false,
				'touchwipe'		: false
			},
			itms = {
				'total'			: $cfs.children().length,
				'first'			: 0
			},
			tmrs = {
				'timer'			: null,
				'auto'			: null,
				'queue'			: null,
				'startTime'		: getTime(),
				'timePassed'	: 0
			},
			scrl = {
				'isStopped'		: false,
				'duration'		: 0,
				'startTime'		: 0,
				'easing'		: '',
				'anims'			: []
			},
			clbk = {
				'onBefore'		: [],
				'onAfter'		: []
			},
			queu = [],
			conf = $.extend(true, {}, $.fn.carouFredSel.configs, configs),
			opts = {},
			opts_orig = options,
			$wrp = $cfs.wrap('<'+conf.wrapper.element+' class="'+conf.wrapper.classname+'" />').parent();

		conf.selector		= $cfs.selector;
		conf.serialNumber	= $.fn.carouFredSel.serialNumber++;

		//	create carousel
		$cfs._cfs_init(opts_orig, true, starting_position);
		$cfs._cfs_build();
		$cfs._cfs_bind_events();
		$cfs._cfs_bind_buttons();

		//	find item to start
		if (is_array(opts.items.start)) {
			var start_arr = opts.items.start;
		} else {
			var start_arr = [];
			if (opts.items.start != 0) {
				start_arr.push(opts.items.start);
			}
		}
		if (opts.cookie) {
			start_arr.unshift(cf_readCookie(opts.cookie));
		}
		if (start_arr.length > 0) {
			for (var a = 0, l = start_arr.length; a < l; a++) {
				var s = start_arr[a];
				if (s == 0) {
					continue;
				}
				if (s === true) {
					s = window.location.hash;
					if (s.length < 1) {
						continue;
					}
				} else if (s === 'random') {
					s = Math.floor(Math.random()*itms.total);
				}
				if ($cfs.triggerHandler(cf_e('slideTo', conf), [s, 0, true, { fx: 'none' }])) {
					break;
				}
			}
		}
		var siz = sz_setSizes($cfs, opts, false),
			itm = gi_getCurrentItems($cfs.children(), opts);

		if (opts.onCreate) {
			opts.onCreate.call($tt0, itm, siz);
		}

		$cfs.trigger(cf_e('updatePageStatus', conf), [true, siz]);
		$cfs.trigger(cf_e('linkAnchors', conf));

		return $cfs;
	};


	//	GLOBAL PUBLIC

	$.fn.carouFredSel.serialNumber = 1;
	$.fn.carouFredSel.defaults = {
		'synchronise'	: false,
		'infinite'		: true,
		'circular'		: true,
		'responsive'	: false,
		'direction'		: 'left',
		'items'			: {
			'start'			: 0
		},
		'scroll'		: {
			'easing'		: 'swing',
			'duration'		: 500,
			'pauseOnHover'	: false,
			'mousewheel'	: false,
			'wipe'			: false,
			'event'			: 'click',
			'queue'			: false
		}
	};
	$.fn.carouFredSel.configs = {
		'debug'			: false,
		'events'		: {
			'prefix'		: '',
			'namespace'		: 'cfs'
		},
		'wrapper'		: {
			'element'		: 'div',
			'classname'		: 'caroufredsel_wrapper'
		},
		'classnames'	: {}
	};
	$.fn.carouFredSel.pageAnchorBuilder = function(nr, itm) {
		return '<a href="#"><span>'+nr+'</span></a>';
	};


	//	GLOBAL PRIVATE

	//	scrolling functions
	function sc_setScroll(d, e) {
		return {
			anims		: [],
			duration	: d,
			orgDuration	: d,
			easing		: e,
			startTime	: getTime()
		};
	}
	function sc_startScroll(s) {
		if (typeof s.pre == 'object') {
			sc_startScroll(s.pre);
		}
		for (var a = 0, l = s.anims.length; a < l; a++) {
			var b = s.anims[a];
			if (!b) continue;
			if (b[3]) b[0].stop();
			b[0].animate(b[1], {
				complete: b[2],
				duration: s.duration,
				easing: s.easing
			});
		}
		if (typeof s.post == 'object') {
			sc_startScroll(s.post);
		}
	}
	function sc_stopScroll(s, finish) {
		if (typeof finish != 'boolean') finish = true;
		if (typeof s.pre == 'object') {
			sc_stopScroll(s.pre, finish);
		}
		for (var a = 0, l = s.anims.length; a < l; a++) {
			var b = s.anims[a];
			b[0].stop(true);
			if (finish) {
				b[0].css(b[1]);
				if (typeof b[2] == 'function') b[2]();
			}
		}
		if (typeof s.post == 'object') {
			sc_stopScroll(s.post, finish);
		}
	}
	function sc_clearTimers(t) {
		if (t.auto) clearTimeout(t.auto);
		return t;
	}
	function sc_callCallbacks(cbs, t, args) {
		if (cbs.length) {
			for (var a = 0, l = cbs.length; a < l; a++) {
				cbs[a].apply(t, args);
			}
		}
		return [];
	}

	//	fx functions
	function fx_fade(sO, c, x, d, f) {
		var o = {
			'duration'	: d,
			'easing'	: sO.easing
		};
		if (typeof f == 'function') o.complete = f;
		c.animate({
			opacity: x
		}, o);
	}
	function fx_cover(sc, c1, c2, o, prev) {
		var old_w = ms_getSizes(gi_getOldItemsNext(c1.children(), o), o, true)[0],
			new_w = ms_getSizes(c2.children(), o, true)[0],
			cur_l = (prev) ? -new_w : old_w,
			css_o = {},
			ani_o = {};

		css_o[o.d['width']] = new_w;
		css_o[o.d['left']] = cur_l;
		ani_o[o.d['left']] = 0;
		
		sc.pre.anims.push([c1, { 'opacity': 1 }]);
		sc.post.anims.push([c2, ani_o, function() { $(this).remove(); }]);
		c2.css(css_o);
		return sc;
	}
	function fx_uncover(sc, c1, c2, o, prev, n) {
		var new_w = ms_getSizes(gi_getNewItemsNext(c1.children(), o, n), o, true)[0],
			old_w = ms_getSizes(c2.children(), o, true)[0],
			cur_l = (prev) ? -old_w : new_w,
			css_o = {},
			ani_o = {};

		css_o[o.d['width']] = old_w;
		css_o[o.d['left']] = 0;
		ani_o[o.d['left']] = cur_l;
		sc.post.anims.push([c2, ani_o, function() { $(this).remove(); }]);
		c2.css(css_o);
		return sc;
	}

	//	navigation functions
	function nv_showNavi(o, t, c) {
		if (t == 'show' || t == 'hide') {
			var f = t;
		} else if (o.items.minimum >= t) {
			debug(c, 'Not enough items: hiding navigation ('+t+' items, '+o.items.minimum+' needed).');
			var f = 'hide';
		} else {
			var f = 'show';
		}
		var s = (f == 'show') ? 'removeClass' : 'addClass',
			h = cf_c('hidden', c);
		if (o.auto.button) o.auto.button[f]()[s](h);
		if (o.prev.button) o.prev.button[f]()[s](h);
		if (o.next.button) o.next.button[f]()[s](h);
		if (o.pagination.container) o.pagination.container[f]()[s](h);
	}
	function nv_enableNavi(o, f, c) {
		if (o.circular || o.infinite) return;
		var fx = (f == 'removeClass' || f == 'addClass') ? f : false,
			di = cf_c('disabled', c);
		if (o.auto.button && fx) {
			o.auto.button[fx](di);
		}
		if (o.prev.button) {
			var fn = fx || (f == 0) ? 'addClass' : 'removeClass';
			o.prev.button[fn](di);
		}
		if (o.next.button) {
			var fn = fx || (f == o.items.visible) ? 'addClass' : 'removeClass';
			o.next.button[fn](di);
		}
	}

	//	get object functions
	function go_getObject($tt, obj) {
		if (typeof obj == 'function')	obj = obj.call($tt);
		if (typeof obj == 'undefined')	obj = {};
		return obj;
	}
	function go_getNaviObject($tt, obj, type) {
		if (typeof type != 'string') type = '';

		obj = go_getObject($tt, obj);
		if (typeof obj == 'string') {
			var temp = cf_getKeyCode(obj);
			if (temp == -1) obj = $(obj);
			else 			obj = temp;
		}

		//	pagination
		if (type == 'pagination') {
			if (typeof obj 				== 'boolean')	obj = { 'keys': obj };
			if (typeof obj.jquery 		!= 'undefined')	obj = { 'container': obj };
			if (typeof obj.container	== 'function')	obj.container = obj.container.call($tt);
			if (typeof obj.container	== 'string')	obj.container = $(obj.container);
			if (typeof obj.items		!= 'number')	obj.items = false;

		//	auto
		} else if (type == 'auto') {
			if (typeof obj.jquery	!= 'undefined')		obj = { 'button': obj };
			if (typeof obj == 'boolean')				obj = { 'play': obj };
			if (typeof obj == 'number')					obj = { 'pauseDuration': obj };
			if (typeof obj.button		== 'function')	obj.button = obj.button.call($tt);
			if (typeof obj.button		== 'string')	obj.button = $(obj.button);

		//	prev + next
		} else {
			if (typeof obj.jquery		!= 'undefined')	obj = { 'button': obj };
			if (typeof obj 				== 'number')	obj = { 'key': obj };
			if (typeof obj.button		== 'function')	obj.button = obj.button.call($tt);
			if (typeof obj.button		== 'string')	obj.button = $(obj.button);
			if (typeof obj.key			== 'string')	obj.key = cf_getKeyCode(obj.key);
		}			

		return obj;
	}

	//	get number functions
	function gn_getItemIndex(num, dev, org, items, $cfs) {
		if (typeof num == 'string') {
			if (isNaN(num)) num = $(num);
			else 			num = parseInt(num);
		}
		if (typeof num == 'object') {
			if (typeof num.jquery == 'undefined') num = $(num);
			num = $cfs.children().index(num);
			if (num == -1) num = 0;
			if (typeof org != 'boolean') org = false;
		} else {
			if (typeof org != 'boolean') org = true;
		}
		if (isNaN(num))	num = 0;
		else 			num = parseInt(num);
		if (isNaN(dev))	dev = 0;
		else 			dev = parseInt(dev);

		if (org) {
			num += items.first;
		}
		num += dev;
		if (items.total > 0) {
			while (num >= items.total)	{	num -= items.total; }
			while (num < 0)				{	num += items.total; }
		}
		return num;
	}

	//	items prev
	function gn_getVisibleItemsPrev(i, o, s) {
		var t = 0,
			x = 0;

		for (var a = s; a >= 0; a--) {
			var j = i.eq(a);
			t += (j.is(':visible')) ? j[o.d['outerWidth']](true) : 0;
			if (t > o.maxDimention) return x;
			if (a == 0) a = i.length;
			x++;
		}
	}
	function gn_getVisibleItemsPrevFilter(i, o, s) {
		return gn_getItemsPrevFilter(i, o.items.filter, o.items.visibleConf.org, s);
	}
	function gn_getScrollItemsPrevFilter(i, o, s, m) {
		return gn_getItemsPrevFilter(i, o.items.filter, m, s);
	}
	function gn_getItemsPrevFilter(i, f, m, s) {
		var t = 0,
			x = 0;
	
		for (var a = s, l = i.length-1; a >= 0; a--) {
			x++;
			if (x == l) return x;
	
			var j = i.eq(a);
			if (j.is(f)) {
				t++;
				if (t == m) return x;
			}
			if (a == 0) a = i.length;
		}
	}

	function gn_getVisibleOrg($c, o) {
		return o.items.visibleConf.org || $c.children().slice(0, o.items.visible).filter(o.items.filter).length;
	}

	//	items next
	function gn_getVisibleItemsNext(i, o, s) {
		var t = 0,
			x = 0;

		for (var a = s, l = i.length-1; a <= l; a++) {
			var j = i.eq(a);

			t += (j.is(':visible')) ? j[o.d['outerWidth']](true) : 0;
			if (t > o.maxDimention) return x;

			x++;
			if (x == l) return x;
			if (a == l) a = -1;
		}
	}
	function gn_getVisibleItemsNextTestCircular(i, o, s, l) {
		var v = gn_getVisibleItemsNext(i, o, s);
		if (!o.circular) {
			if (s + v > l) v = l - s;
		}
		return v;
	}
	function gn_getVisibleItemsNextFilter(i, o, s) {
		return gn_getItemsNextFilter(i, o.items.filter, o.items.visibleConf.org, s, o.circular);
	}
	function gn_getScrollItemsNextFilter(i, o, s, m) {
		return gn_getItemsNextFilter(i, o.items.filter, m+1, s, o.circular) - 1;
	}
	function gn_getItemsNextFilter(i, f, m, s, c) {
		var t = 0,
			x = 0;

		for (var a = s, l = i.length-1; a <= l; a++) {
			x++;
			if (x == l) return x;

			var j = i.eq(a);
			if (j.is(f)) {
				t++;
				if (t == m) return x;
			}
			if (a == l) a = -1;
		}
	}

	//	get items functions
	function gi_getCurrentItems(i, o) {
		return i.slice(0, o.items.visible);
	}
	function gi_getOldItemsPrev(i, o, n) {
		return i.slice(n, o.items.visibleConf.old+n);
	}
	function gi_getNewItemsPrev(i, o) {
		return i.slice(0, o.items.visible);
	}
	function gi_getOldItemsNext(i, o) {
		return i.slice(0, o.items.visibleConf.old);
	}
	function gi_getNewItemsNext(i, o, n) {
		return i.slice(n, o.items.visible+n);
	}

	//	sizes functions
	function sz_resetMargin(i, o, m) {
		var x = (typeof m == 'boolean') ? m : false;
		if (typeof m != 'number') m = 0;
		i.each(function() {
			var j = $(this);
			var t = parseInt(j.css(o.d['marginRight']));
			if (isNaN(t)) t = 0;
			j.data('cfs_tempCssMargin', t);
			j.css(o.d['marginRight'], ((x) ? j.data('cfs_tempCssMargin') : m + j.data('cfs_origCssMargin')));
		});
	}
	function sz_setSizes($c, o, p) {
		var $w = $c.parent(),
			$i = $c.children(),
			$v = gi_getCurrentItems($i, o),
			sz = cf_mapWrapperSizes(ms_getSizes($v, o, true), o, p);

		$w.css(sz);

		if (o.usePadding) {
			var p = o.padding,
				r = p[o.d[1]];
			if (o.align) {
				if (r < 0) r = 0;
			}
			var $l = $v.last();
			$l.css(o.d['marginRight'], $l.data('cfs_origCssMargin') + r);
			$c.css(o.d['top'], p[o.d[0]]);
			$c.css(o.d['left'], p[o.d[3]]);
		}

		$c.css(o.d['width'], sz[o.d['width']]+(ms_getTotalSize($i, o, 'width')*2));
		$c.css(o.d['height'], ms_getLargestSize($i, o, 'height'));
		return sz;
	}

	//	measuring functions
	function ms_getSizes(i, o, wrapper) {
		var s1 = ms_getTotalSize(i, o, 'width', wrapper),
			s2 = ms_getLargestSize(i, o, 'height', wrapper);
		return [s1, s2];
	}
	function ms_getLargestSize(i, o, dim, wrapper) {
		if (typeof wrapper != 'boolean') wrapper = false;
		if (typeof o[o.d[dim]] == 'number' && wrapper) return o[o.d[dim]];
		if (typeof o.items[o.d[dim]] == 'number') return o.items[o.d[dim]];
		var di2 = (dim.toLowerCase().indexOf('width') > -1) ? 'outerWidth' : 'outerHeight';
		return ms_getTrueLargestSize(i, o, di2);
	}
	function ms_getTrueLargestSize(i, o, dim) {
		var s = 0;

		for (var a = 0, l = i.length; a < l; a++) {
			var j = i.eq(a);

			var m = (j.is(':visible')) ? j[o.d[dim]](true) : 0;
			if (s < m) s = m;
		}
		return s;
	}
	function ms_getTrueInnerSize($el, o, dim) {
		if (!$el.is(':visible')) return 0;

		var siz = $el[o.d[dim]](),
			arr = (o.d[dim].toLowerCase().indexOf('width') > -1) ? ['paddingLeft', 'paddingRight'] : ['paddingTop', 'paddingBottom'];
		
		for (var a = 0, l = arr.length; a < l; a++) {
			var m = parseInt($el.css(arr[a]));
			siz -= (isNaN(m)) ? 0 : m;
		}
		return siz;
	}
	function ms_getTotalSize(i, o, dim, wrapper) {
		if (typeof wrapper != 'boolean') wrapper = false;
		if (typeof o[o.d[dim]] == 'number' && wrapper) return o[o.d[dim]];
		if (typeof o.items[o.d[dim]] == 'number') return o.items[o.d[dim]] * i.length;
		
		var d = (dim.toLowerCase().indexOf('width') > -1) ? 'outerWidth' : 'outerHeight',
			s = 0;
		
		for (var a = 0, l = i.length; a < l; a++) {
			var j = i.eq(a);
			s += (j.is(':visible')) ? j[o.d[d]](true) : 0;
		}
		return s;
	}
	function ms_hasVariableSizes(i, o, dim) {
		var s = false,
			v = false;
		
		for (var a = 0, l = i.length; a < l; a++) {
			var j = i.eq(a);

			var c = (j.is(':visible')) ? j[o.d[dim]](true) : 0;
			if (s === false) s = c;
			else if (s != c) v = true;
			if (s == 0)		 v = true;
		}
		return v;
	}
	function ms_getPaddingBorderMargin(i, o, d) {
		return i[o.d['outer'+d]](true) - ms_getTrueInnerSize(i, o, 'inner'+d);
	}
	function ms_isPercentage(x) {
		return (typeof x == 'string' && x.slice(-1) == '%');
	}
	function ms_getPercentage(s, o) {
		if (ms_isPercentage(o)) {
			o = o.slice(0, -1);
			if (isNaN(o)) return s;
			s *= o/100;
		}
		return s;
	}

	//	config functions
	function cf_e(n, c, pf, ns, rd) {
		if (typeof pf != 'boolean') pf = true;
		if (typeof ns != 'boolean') ns = true;
		if (typeof rd != 'boolean') rd = false;
		
		if (pf) n = c.events.prefix + n;
		if (ns) n = n +'.'+ c.events.namespace;
		if (ns && rd) n += c.serialNumber;

		return n;
	}
	function cf_c(n, c) {
		return (typeof c.classnames[n] == 'string') ? c.classnames[n] : n;
	}
	function cf_mapWrapperSizes(ws, o, p) {
		if (typeof p != 'boolean') p = true;
		var pad = (o.usePadding && p) ? o.padding : [0, 0, 0, 0];
		var wra = {};
			wra[o.d['width']] = ws[0] + pad[1] + pad[3];
			wra[o.d['height']] = ws[1] + pad[0] + pad[2];

		return wra;
	}
	function cf_sortParams(vals, typs) {
		var arr = [];
		for (var a = 0, l1 = vals.length; a < l1; a++) {
			for (var b = 0, l2 = typs.length; b < l2; b++) {
				if (typs[b].indexOf(typeof vals[a]) > -1 && typeof arr[b] == 'undefined') {
					arr[b] = vals[a];
					break;
				}
			}
		}
		return arr;
	}
	function cf_getPadding(p) {
		if (typeof p == 'undefined') return [0, 0, 0, 0];
		
		if (typeof p == 'number') return [p, p, p, p];
		else if (typeof p == 'string') p = p.split('px').join('').split('em').join('').split(' ');

		if (!is_array(p)) {
			return [0, 0, 0, 0];
		}
		for (var i = 0; i < 4; i++) {
			p[i] = parseInt(p[i]);
		}
		switch (p.length) {
			case 0:	return [0, 0, 0, 0];
			case 1: return [p[0], p[0], p[0], p[0]];
			case 2: return [p[0], p[1], p[0], p[1]];
			case 3: return [p[0], p[1], p[2], p[1]];
			default: return [p[0], p[1], p[2], p[3]];
		}
	}
	function cf_getAlignPadding(itm, o) {
		var x = (typeof o[o.d['width']] == 'number') ? Math.ceil(o[o.d['width']] - ms_getTotalSize(itm, o, 'width')) : 0;
		switch (o.align) {
			case 'left': return [0, x];
			case 'right': return [x, 0];
			case 'center':
			default:
				return [Math.ceil(x/2), Math.floor(x/2)];
		}
	}
	function cf_getAdjust(x, o, a, $t) {
		var v = x;
		if (typeof a == 'function') {
			v = a.call($t, v);

		} else if (typeof a == 'string') {
			var p = a.split('+'),
				m = a.split('-');
			
			if (m.length > p.length) {
				var neg = true,
					sta = m[0],
					adj = m[1];
			} else {
				var neg = false,
					sta = p[0],
					adj = p[1];
			}

			switch(sta) {
				case 'even':
					v = (x % 2 == 1) ? x-1 : x;
					break;
				case 'odd':
					v = (x % 2 == 0) ? x-1 : x;
					break;
				default:
					v = x;
					break;
			}
			adj = parseInt(adj);
			if (!isNaN(adj)) {
				if (neg) adj = -adj;
				v += adj;
			}
		}
		if (typeof v != 'number') v = 1;
		if (v < 1) v = 1;
		return v;
	}
	function cf_getItemsAdjust(x, o, a, $t) {
		return cf_getItemAdjustMinMax(cf_getAdjust(x, o, a, $t), o.items.visibleConf);
	}
	function cf_getItemAdjustMinMax(v, i) {
		if (typeof i.min == 'number' && v < i.min) v = i.min;
		if (typeof i.max == 'number' && v > i.max) v = i.max;
		if (v < 1) v = 1;
		return v;
	}
	function cf_getSynchArr(s) {
		if (!is_array(s)) 		s = [[s]];
		if (!is_array(s[0]))	s = [s];
		for (var j = 0, l = s.length; j < l; j++) {
			if (typeof s[j][0] == 'string')		s[j][0] = $(s[j][0]);
			if (typeof s[j][1] != 'boolean')	s[j][1] = true;
			if (typeof s[j][2] != 'boolean')	s[j][2] = true;
			if (typeof s[j][3] != 'number')		s[j][3] = 0;
		}
		return s;
	}
	function cf_getKeyCode(k) {
		if (k == 'right')	return 39;
		if (k == 'left')	return 37;
		if (k == 'up')		return 38;
		if (k == 'down')	return 40;
		return -1;
	}
	function cf_setCookie(n, v) {
		if (n) document.cookie = n+'='+v+'; path=/';
	}
	function cf_readCookie(n) {
		n += '=';
		var ca = document.cookie.split(';');
		for (var a = 0, l = ca.length; a < l; a++) {
			var c = ca[a];
			while (c.charAt(0) == ' ') {
				c = c.slice(1);
			}
			if (c.indexOf(n) == 0) {
				return c.slice(n.length);
			}
		}
		return 0;
	}

	//	buttons functions
	function bt_pauseOnHoverConfig(p) {
		if (p && typeof p == 'string') {
			var i = (p.indexOf('immediate') > -1) ? true : false,
				r = (p.indexOf('resume') 	> -1) ? true : false;
		} else {
			var i = r = false;
		}
		return [i, r];
	}
	function bt_mousesheelNumber(mw) {
		return (typeof mw == 'number') ? mw : null
	}

	//	helper functions
	function is_array(a) {
		return typeof(a) == 'object' && (a instanceof Array);
	}

	function getTime() {
		return new Date().getTime();
	}

	function debug(d, m) {
		if (typeof d == 'object') {
			var s = ' ('+d.selector+')';
			d = d.debug;
		} else {
			var s = '';
		}
		if (!d) return false;
		
		if (typeof m == 'string') m = 'carouFredSel'+s+': ' + m;
		else m = ['carouFredSel'+s+':', m];

		if (window.console && window.console.log) window.console.log(m);
		return false;
	}


	//	CAROUFREDSEL ALL LOWERCASE

	$.fn.caroufredsel = function(o, c) {
		return this.carouFredSel(o, c);
	};


	//	EASING FUNCTIONS

	$.extend($.easing, {
		'quadratic'	: function(t) {
			var t2 = t * t;
			return t * (-t2 * t + 4 * t2 - 6 * t + 4);
		},
		'cubic'		: function(t) {
			return t * (4 * t * t - 9 * t + 6);
		},
		'elastic'	: function(t) {
			var t2 = t * t;
			return t * (33 * t2 * t2 - 106 * t2 * t + 126 * t2 - 67 * t + 15);
		}
	});


})(jQuery);