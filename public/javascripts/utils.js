var makeDiv = exports.makeDiv = function (styleObj, className, idName) {
    var el = document.createElement('div');
    if (Object.getOwnPropertyNames(styleObj).length !== 0) {
        Object.keys(styleObj).forEach(function (key) {
            //console.log('addign style', key, styleObj[key]);
            el.style[key] = styleObj[key]
        })
    }
    if (className !== undefined && className.length !== 0) {
        el.className += className;
    }
    if (idName !== undefined && idName.length !== 0) {
        el.id = idName
    }
    return el
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
exports.debounce = function (func, wait, immediate) {
    var timeout;
    return function () {
        var args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(this, args);
        }.bind(this);
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    }.bind(this);
};


var limit = exports.limit = function (fnc, wait) {
    var lastExecutionTime;

    return function () {
        if (!lastExecutionTime) {
            fnc.apply(this, arguments);
            lastExecutionTime = new Date()
        }
        else if (new Date() - lastExecutionTime >= wait) {
            fnc.apply(this, arguments);
            lastExecutionTime = new Date()
        }
    }.bind(this)
};

/**
 * @param {string} url
 * @param {boolean} newTab*/
var goTo = exports.goTo = function (url, newTab) {
    if (newTab) {
        window.open(url, '_blank')
    }
    else {
        window.open(url)

    }
};

