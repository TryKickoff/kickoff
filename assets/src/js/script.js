/**
 * Project Name:
 * Client:
 * Author:
 * Company:
 */

'use-strict';

// npm modules
import SwiftClick from 'swiftclick';
import trak from 'trak.js';
import ready from 'lite-ready';


// Bundle global libs that don't return a value
import 'console';

// DOM ready code goes in here
ready(() => {
	const swiftclick = SwiftClick.attach(document.body);
	trak.start();
});
