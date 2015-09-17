/*! 
Included shims: Array.forEach,EventListener
*/

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(e, t) {
        var n, r;
        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }
        // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
        var a = Object(this);
        // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var i = a.length >>> 0;
        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if (typeof e !== "function") {
            throw new TypeError(e + " is not a function");
        }
        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 1) {
            n = t;
        }
        // 6. Let k be 0
        r = 0;
        // 7. Repeat, while k < len
        while (r < i) {
            var o;
            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            if (r in a) {
                // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                o = a[r];
                // ii. Call the Call internal method of callback with T as the this value and
                // argument list containing kValue, k, and O.
                e.call(n, o, r, a);
            }
            // d. Increase k by 1.
            r++;
        }
    };
}

// EventListener | CC0 | github.com/jonathantneal/EventListener
this.Element && Element.prototype.attachEvent && !Element.prototype.addEventListener && function() {
    function e(e, t) {
        Window.prototype[e] = HTMLDocument.prototype[e] = Element.prototype[e] = t;
    }
    // add
    e("addEventListener", function(e, t) {
        var n = this, r = n.addEventListener.listeners = n.addEventListener.listeners || {}, a = r[e] = r[e] || [];
        // if no events exist, attach the listener
        if (!a.length) {
            n.attachEvent("on" + e, a.event = function(e) {
                var t = n.document && n.document.documentElement || n.documentElement || {
                    scrollLeft: 0,
                    scrollTop: 0
                };
                // polyfill w3c properties and methods
                e.currentTarget = n;
                e.pageX = e.clientX + t.scrollLeft;
                e.pageY = e.clientY + t.scrollTop;
                e.preventDefault = function() {
                    e.returnValue = false;
                };
                e.relatedTarget = e.fromElement || null;
                e.stopImmediatePropagation = function() {
                    l = false;
                    e.cancelBubble = true;
                };
                e.stopPropagation = function() {
                    e.cancelBubble = true;
                };
                e.target = e.srcElement || n;
                e.timeStamp = +new Date();
                // create an cached list of the master events list (to protect this loop from breaking when an event is removed)
                for (var r = 0, i = [].concat(a), o, l = true; l && (o = i[r]); ++r) {
                    // check to see if the cached event still exists in the master events list
                    for (var c = 0, s; s = a[c]; ++c) {
                        if (s == o) {
                            s.call(n, e);
                            break;
                        }
                    }
                }
            });
        }
        // add the event to the master event list
        a.push(t);
    });
    // remove
    e("removeEventListener", function(e, t) {
        var n = this, r = n.addEventListener.listeners = n.addEventListener.listeners || {}, a = r[e] = r[e] || [];
        // remove the newest matching event from the master event list
        for (var i = a.length - 1, o; o = a[i]; --i) {
            if (o == t) {
                a.splice(i, 1);
                break;
            }
        }
        // if no events exist, detach the listener
        if (!a.length && a.event) {
            n.detachEvent("on" + e, a.event);
        }
    });
    // dispatch
    e("dispatchEvent", function(e) {
        var t = this, n = e.type, r = t.addEventListener.listeners = t.addEventListener.listeners || {}, a = r[n] = r[n] || [];
        try {
            return t.fireEvent("on" + n, e);
        } catch (i) {
            if (a.event) {
                a.event(e);
            }
            return;
        }
    });
    // CustomEvent
    Object.defineProperty(Window.prototype, "CustomEvent", {
        get: function() {
            var e = this;
            return function t(n, r) {
                var a = e.document.createEventObject(), i;
                a.type = n;
                for (i in r) {
                    if (i == "cancelable") {
                        a.returnValue = !r.cancelable;
                    } else if (i == "bubbles") {
                        a.cancelBubble = !r.bubbles;
                    } else if (i == "detail") {
                        a.detail = r.detail;
                    }
                }
                return a;
            };
        }
    });
    // ready
    function t(e) {
        if (t.interval && document.body) {
            t.interval = clearInterval(t.interval);
            document.dispatchEvent(new CustomEvent("DOMContentLoaded"));
        }
    }
    t.interval = setInterval(t, 1);
    window.addEventListener("load", t);
}();

!this.CustomEvent && function() {
    // CustomEvent for browsers which don't natively support the Constructor method
    window.CustomEvent = function e(t, n) {
        var r;
        n = n || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        try {
            r = document.createEvent("CustomEvent");
            r.initCustomEvent(t, n.bubbles, n.cancelable, n.detail);
        } catch (a) {
            // for browsers which don't support CustomEvent at all, we use a regular event instead
            r = document.createEvent("Event");
            r.initEvent(t, n.bubbles, n.cancelable);
            r.detail = n.detail;
        }
        return r;
    };
}();