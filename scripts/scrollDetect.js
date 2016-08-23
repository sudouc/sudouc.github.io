// When we load, grab references to the elements we want to manipulate
var parallax = document.getElementById("parallax");

var group1 = document.getElementById("group1"); // Whole group 1 (jumbotron)
var group1_deep = group1.getElementsByClassName("parallax__layer--deep")[0]; // The deep background layer of group1 (the jumbotron)

var group2 = document.getElementById("group2"); // Whole of group2 (first content)

// Set a scroll listener
parallax.onscroll = debounce(detectScroll, 10);

function detectScroll() {
    // Get the bottom of the group2 element and of the group1_deep element
    var group2_bottom = offset(group2).bottom;
    var group1_deep_bottom = offset(group1_deep).bottom;

    // console.log("Group2 Bottom: " + group2_bottom + " | Group1 Deep Background Bottom: " + group1_deep_bottom);

    // if the group2_bottom is less than the group1_deep_bottom
    // push group1 far behind with a css class
    if (group2_bottom < group1_deep_bottom) {
        if (!hasClass(group1, "farBehind")) {
            group1.className += " farBehind";
            // console.info("Added FarBehind!")
        }
    }
    // Otherwise, remove the class name so it goes back to normal
    else if (group2_bottom > group1_deep_bottom) {
        // Reset the css class when we scroll back up
        group1.className = group1.className.replace(/(?:^|\s)farBehind(?!\S)/g, '')
        // console.info("Removed FarBehind!")
    }
}

// Offset
function isWindow(obj) {
    return obj != null && obj === obj.window;
}
function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
}
function offset(elem) {

    var docElem, win,
        box = { top: 0, left: 0 },
        doc = elem && elem.ownerDocument;

    docElem = doc.documentElement;

    if (typeof elem.getBoundingClientRect !== typeof undefined) {
        box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft,
        bottom: box.bottom + win.pageYOffset - docElem.clientTop
    };
};


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// Check if object has class
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}