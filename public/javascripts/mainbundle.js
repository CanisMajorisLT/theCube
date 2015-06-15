/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(14);



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!B:\\Projects\\JavaScript\\HTML5_Cube\\cube\\node_modules\\css-loader\\index.js!B:\\Projects\\JavaScript\\HTML5_Cube\\cube\\node_modules\\autoprefixer-loader\\index.js!B:\\Projects\\JavaScript\\HTML5_Cube\\cube\\node_modules\\sass-loader\\index.js!B:\\Projects\\JavaScript\\HTML5_Cube\\cube\\public\\stylesheets\\sass\\main.scss", function() {
			var newContent = require("!!B:\\Projects\\JavaScript\\HTML5_Cube\\cube\\node_modules\\css-loader\\index.js!B:\\Projects\\JavaScript\\HTML5_Cube\\cube\\node_modules\\autoprefixer-loader\\index.js!B:\\Projects\\JavaScript\\HTML5_Cube\\cube\\node_modules\\sass-loader\\index.js!B:\\Projects\\JavaScript\\HTML5_Cube\\cube\\public\\stylesheets\\sass\\main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	exports.push([module.id, "* {\n  box-sizing: border-box; }\n\n.playground, .playground2, .playground3 {\n  position: absolute;\n  top: 220px;\n  left: 15%;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n      -ms-transform: translateX(-50%) translateY(-50%);\n          transform: translateX(-50%) translateY(-50%); }\n\n.playground2 {\n  left: 30%; }\n\n.playground3 {\n  left: 62%; }\n\n.perspective-wrap {\n  -webkit-perspective: 900px;\n          perspective: 900px; }\n\n.cube {\n  position: relative;\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d; }\n\n.back {\n  background: url(http://lorempixel.com/320/320/); }\n\n.right {\n  background: url(http://placehold.it/320x320); }\n\n.left {\n  background: url(http://dummyimage.com/320x320/000/fff); }\n\n/*.top {\r\n  background: url(http://lorempixel.com/320/320/)\r\n\r\n}*/\n/*.bottom {\r\n  background: url(http://lorempixel.com/320/320/)\r\n\r\n}*/\n.front {\n  background: url(https://placekitten.com/g/320/320); }\n\n.back2 {\n  background: url(http://dummyimage.com/320x320/000/fff); }\n\n.right2 {\n  background: url(http://dummyimage.com/320x320/1fd100/ffe); }\n\n.left2 {\n  background: url(http://placehold.it/320x320); }\n\n/*.top {\r\n  background: url(http://lorempixel.com/320/320/)\r\n\r\n}*/\n/*.bottom {\r\n  background: url(http://lorempixel.com/320/320/)\r\n\r\n}*/\n.front2 {\n  background: url(http://lorempixel.com/320/320/); }\n", ""]);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

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
	exports.debounce = function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(this, args);
	        }.bind(func);
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(func, args);
	    };
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



/***/ },
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by vyt on 2015-06-06.
	 */

	var CubeInteraction = __webpack_require__(15);
	var Face = __webpack_require__(16);
	var CubeIE10 = __webpack_require__(17);
	var CubeFlat = __webpack_require__(18);
	var Video =__webpack_require__(19);

	var StaticImage = __webpack_require__(20);

	utils = __webpack_require__(7);
	var makeDiv = utils.makeDiv;


	var Cube = module.exports = function (height, width, length) {
	    this.height = height;
	    this.width = width;
	    this.length = length || height;

	    Object.defineProperty(this, 'cube', {get: function () {
	    // cube property is the one that will be appended to div, this cube has perspective, others might not, so need getter
	        return this.perspectiveWrap
	    }});

	    this.perspectiveWrap = makeDiv({
	        transition: 'all 200ms linear',
	        perspective: '900px',
	        height: height + 'px',
	        width: width + 'px'
	    }, 'perspective-wrap');

	    this.shape = makeDiv({
	        transform: 'rotateX(0) rotateY(0)',
	        transition: 'all 450ms linear',
	        position: 'relative',
	        transformStyle: 'preserve-3d',
	        height: (height || 200) + 'px',
	        width: (width || 200) + 'px'
	    }, 'cube');

	    this.rotationDegreesY = 0;
	    this.rotationDegreesX = 0;
	    this.spinSpeed = 450;
	    this.zoomOutValue = 0.8;

	    this.frontFace = 'front';
	    this.currentPosition = 'still'; // spinning




	    this.__initialize()

	};

	/**
	 * Creates cubes faces*/
	Cube.prototype.__initialize = function () {
	    ['front', 'back', 'left', 'right', 'top', 'bottom'].forEach(function (direction) {
	        var styles = {
	            //transition: 'all 450ms linear',
	            position: 'absolute',
	            height: (this.height || 200) + 'px',
	            width: (this.width || 200) + 'px'
	        };

	        if (direction === 'front') {
	            styles.transform = 'translateZ(' + (this.length / 2) + 'px)'
	        }
	        if (direction === 'back') {
	            styles.transform = 'translateZ(-' + (this.length / 2) + 'px) rotateY(180deg)'
	        }
	        if (direction === 'left') {
	            styles.width = this.length + 'px';
	            styles.transform = 'translateX(-' + (this.length / 2) + 'px) rotateY(270deg)'
	        }
	        if (direction === 'right') {
	            styles.width = this.length + 'px';
	            styles.transform = 'translateX(' + (this.width - (this.length / 2)) + 'px) rotateY(-270deg)'
	        }
	        if (direction === 'top') {
	            styles.height = this.length + 'px';
	            styles.transform = 'translateY(-' + (this.length / 2) + 'px) rotateX(-90deg)'
	        }
	        if (direction === 'bottom') {
	            styles.height = this.length + 'px';
	            styles.transform = 'translateY(' + (this.height - (this.length / 2)) + 'px) rotateX(90deg)'
	        }
	        this[direction] = new Face(makeDiv(styles, direction));
	        this.shape.appendChild(this[direction].domElement)
	    }.bind(this));

	    this.perspectiveWrap.appendChild(this.shape);

	    // to zoom cube back after it stop rotating
	    this.shape.addEventListener('transitionend', function () {
	        this.zoomIn();
	        this.currentPosition = 'still';
	        this.__calculateFrontElement()


	    }.bind(this))

	};

	/**
	 * Updates this.frontFace value and executes any scripts related to that face being on front*/
	Cube.prototype.__calculateFrontElement = function () {
	    // deactivate because sometimes when user rotates cube transitionend fire just miliseconds before he rotates again
	    // and cube face that is out of focus is activated
	    this.frontFaceDeactivate();
	    var frontElementFace;
	    var leadingElementSize = 0;
	    ['front', 'back', 'left', 'right', 'top', 'bottom'].forEach(function (face) {
	        var data = this[face].domElement.getBoundingClientRect();
	        var size = data.height * data.width;
	        if (size > leadingElementSize) {
	            frontElementFace = face;
	            leadingElementSize = size
	        }
	    }.bind(this));
	    this.frontFace = frontElementFace;
	    this.frontFaceActivate()
	};

	Cube.prototype.frontFaceActivate = function () {
	    this[this.frontFace].onFront();
	};

	Cube.prototype.frontFaceDeactivate = function () {
	    this[this.frontFace].offFront();
	};

	Cube.prototype.zoomOut = function () {
	    this.perspectiveWrap.style.transform = 'scale(' + this.zoomOutValue + ')';
	};

	Cube.prototype.zoomIn = function () {
	    this.perspectiveWrap.style.transform = 'scale(1)';
	};

	/**
	 * Rotates cube by updating its containers RotateX and RotateY values*/
	Cube.prototype.__rotate = function () {
	    this.frontFaceDeactivate();
	    var transform = 'rotateX(' + this.rotationDegreesX + 'deg) rotateY(' + this.rotationDegreesY + 'deg)';
	    var timeoutVal = this.currentPosition === 'spinning' ? 20 : 100;
	    if (this.currentPosition === 'still') this.zoomOut();
	    setTimeout(function () {
	        this.currentPosition = 'spinning';
	        this.shape.style.transition = 'all ' + this.spinSpeed + 'ms linear';
	        this.shape.style.transform = transform;
	    }.bind(this), timeoutVal);

	};

	Cube.prototype.rotateLeft = function () {
	    this.rotationDegreesY -= 90;
	    this.__rotate()
	};

	Cube.prototype.rotateRight = function () {
	    this.rotationDegreesY += 90;
	    this.__rotate()
	};
	Cube.prototype.rotateUp = function () {
	    this.rotationDegreesX += 90;
	    this.__rotate()
	};

	Cube.prototype.rotateDown = function () {
	    this.rotationDegreesX -= 90;
	    this.__rotate()
	};

	Cube.prototype.setPerspectiveTo = function (value) {
	    this.perspectiveWrap.style.perspective = value + 'px'
	};


	/*Cube.prototype.__nextSpin = function () {
	 this.rotationDegreesY += 360;
	 this.shape.style.transform = 'rotateY(' + this.rotationDegreesY + 'deg';
	 };
	 Cube.prototype.__spin = function () {
	 this.rotationDegreesY += 360;
	 this.shape.style.transition = 'all ' + 3000 + 'ms linear';
	 this.shape.style.transform = 'rotateY(' + this.rotationDegreesY + 'deg';
	 this.shape.addEventListener('transitionend', this.__nextSpin.bind(this))
	 };*/



	/*

	 var cub2 = new Cube(400, 400, 200);
	 //var cub3 = new CubeIE10(320, 320);
	 var cubF = new CubeFlat(200, 200);

	 var interFalt = new CubeInteraction(cubF);
	 interFalt.addMiddleScrollRotate('upDown');
	 interFalt.addSwipeRotate();
	 */
	/*console.log('next -- ', cubF.__rotate('right'));
	 console.log('next -- ', cubF.__rotate('top'));
	 console.log('next -- ', cubF.__rotate('top'));
	 console.log('next -- ', cubF.__rotate('top'));
	 console.log('next -- ', cubF.__rotate('top'));
	 console.log('next -- ', cubF.__rotate('right'));*//*


	 var imgIE1 = new StaticImage({
	 url: 'http://dummyimage.com/320x320/1fd300/fff'
	 });
	 //cub3.back2.tempAddContent(imgIE1);
	 //
	 //setInterval(function () {
	 //    cub3.rotateRight()
	 //
	 //}, 3000);


	 var interaction = new CubeInteraction(cub2);

	 //interaction.addAutorotateBlueprint(
	 //    {
	 //        blueprint: [['left', 4, 1500], ['up', 4, 1500]],
	 //        options: {repeat: false, repeatInterval: 1, defaultPartsDelay: 1000}
	 //    });


	 interaction.addMiddleScrollRotate('upDown');
	 interaction.addSwipeRotate();


	 cub2.bottom.addContent({
	 type: 'image',
	 url: 'http://dummyimage.com/320x320/1fd100/ffe',
	 onClickUrl: 'http://google.com',
	 newTab: true
	 });


	 var vid = new Video({
	 url: '/video/big_buck_bunny.webm',
	 onclickDo: 'playStop',
	 autoplay: true
	 });
	 cub2.front.tempAddContent(vid);

	 var vid2 = new Video({
	 url: '/video/big_buck_bunny.webm',
	 onclickDo: utils.goTo.bind(this, 'http://facebook.com', true),
	 autoplay: false
	 });
	 cub2.top.tempAddContent(vid2);

	 var vid3 = new Video({
	 url: '/video/big_buck_bunny.webm',
	 onmouseoverDo: 'playStop'
	 });
	 cub2.right.tempAddContent(vid3);

	 var img = new StaticImage({
	 url: 'http://dummyimage.com/320x320/1fd300/ffe',
	 onclickDo: utils.goTo.bind(null, 'http://skelbiu.lt', true)
	 });

	 cub2.left.tempAddContent(img);

	 var img2 = new StaticImage({
	 url: 'http://dummyimage.com/320x320/1fd300/fff',
	 onclickDo: utils.goTo.bind(null, 'http://skelbiu.lt', true)
	 });
	 cub2.back.tempAddContent(img2);


	 document.getElementsByClassName('playground2')[0].appendChild(cub2.perspectiveWrap);
	 document.getElementsByClassName('playground3')[0].appendChild(cubF.shape);
	 */


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Implements logic related to users interaction with cube
	 * @param {object} cube*/
	var CubeInteraction = module.exports = function (cube) {
	    this.cube = cube;
	    this.locked = false; //if true any interaction is locked, any media is stopped (for when user is focusing other tab);
	    this.autoplayInProgres = false; // if true user interaction such as wheel/swipe is disabled;
	    this.autoplayBlueprint = {};

	};

	CubeInteraction.prototype.addPauseOnUserInactivity = function () {
	    window.addEventListener('blur', function () {
	        // stop all action if user switches tabs
	        this.locked = true;
	        this.cube.frontFaceDeactivate()
	    }.bind(this));

	    window.addEventListener('focus', function () {
	        // continue
	        this.locked = false;
	        this.cube.frontFaceActivate()
	    }.bind(this));
	};

	/**
	 * Adds cube auto-rotation blue print
	 * @param {object} blueprint - contain information about auto-rotation logic:
	 *  {
	        blueprint: [['rotateDirection', 'timesToRotate', 'intervalBetweenRotations [including first]'], 'numberSleep seconds [optional]',
	            ['direction', 'times', 'intervalBetweenRotations']],
	        currentPart: 0,
	        options: {repeat: 'bool', repeatInterval: 'number s'}
	    }
	 * @param {number} delayBeforeStart - number of ms before starting auto-rotation
	 * */
	CubeInteraction.prototype.addAutorotateBlueprint = function (blueprint, delayBeforeStart) {
	    // TODO fix timing calculations
	    this.autoplayBlueprint = blueprint;
	    setTimeout(this.startAutorotate.bind(this), delayBeforeStart)
	};

	CubeInteraction.prototype.startAutorotate = function (delay) {
	    var partNum;
	    var partContent;
	    var length = this.autoplayBlueprint.blueprint.length;

	    if (this.autoplayBlueprint.hasOwnProperty('currentPart')) {
	        partNum = this.autoplayBlueprint.currentPart + 1;
	        this.autoplayBlueprint.currentPart += 1
	    }
	    else {
	        this.autoplayBlueprint.currentPart = 0;
	        partNum = 0
	    }

	    if (partNum >= length) {
	        // if partNum is same as length, means that last part was done already.
	        if (this.autoplayBlueprint.options.repeat === true) {
	            this.autoplayBlueprint.currentPart = -1; // -1 because property exists so it will add 1
	            setTimeout(this.startAutorotate.bind(this), this.options.repeatInterval * 1000)
	        }
	        else {
	            // autoplay is over, allow user interaction
	            this.autoplayInProgres = false;
	        }
	    }
	    else {
	        // this is where action is called!
	        partContent = this.autoplayBlueprint.blueprint[partNum];
	        if (typeof partContent === 'number') {
	            // add pause if number
	            setTimeout(this.startAutorotate.bind(this), partContent * 1000)
	        }
	        else {
	            this.autoplayInProgres = true;
	            this.__startIntervalRotation.apply(this, partContent)
	        }
	    }
	};

	/**
	 * Called by startAutoplay and executes a cut of blue print*/
	CubeInteraction.prototype.__startIntervalRotation = function (direction, times, interval) {

	    var inter = interval || 500;
	    var tms = times || 1;
	    var spinnedTimes = 0;

	    var spinInterval = setInterval(function () {
	        if (this.locked) {
	            return
	        }
	        if (direction === 'left') this.cube.rotateLeft();
	        else if (direction === 'right') this.cube.rotateRight();
	        else if (direction === 'up') this.cube.rotateUp();
	        else this.cube.rotateDown();
	        spinnedTimes += 1;


	        if (spinnedTimes >= tms) {
	            clearInterval(spinInterval);
	            this.startAutorotate()
	        }

	    }.bind(this), inter)
	};


	/**
	 * Adds mobile interaction to cube, user can rotate cube to any of the 4 [or ones that are implemented by cube API]
	 *  sides by swiping*/
	CubeInteraction.prototype.addSwipeRotate = function () {
	    var startX;
	    var startY;
	    this.cube.shape.addEventListener('touchstart', function (touchEvent) {
	        if (this.autoplayInProgres) {
	            return
	        }
	        startX = touchEvent.touches[0].clientX;
	        startY = touchEvent.touches[0].clientY;
	        console.log('touchStart', startX, startY);
	    });

	    this.cube.shape.addEventListener('touchmove', function (touchEvent) {
	        if (!startX || !startY) {
	            return
	        }
	        console.log('toucmove', touchEvent.touches[0].clientX, touchEvent.touches[0].clientY);

	        var diffX = startX - touchEvent.touches[0].clientX;
	        var diffY = startY - touchEvent.touches[0].clientY;

	        console.log('toucmove', diffX, diffY);


	        if (Math.abs(diffX) > Math.abs(diffY)) {
	            console.log('touchmove X');
	            if (diffX > 0) {
	                this.cube.rotateLeft()
	            }
	            else {
	                this.cube.rotateRight()
	            }
	        }
	        else {
	            console.log('touchmove Y');

	            if (diffY > 0) {
	                this.cube.rotateUp()
	            }
	            else {
	                this.cube.rotateDown()
	            }
	        }

	        // set to null, so only touchmove is ignored after it fires once
	        startX = null;
	        startY = null;

	    }.bind(this))


	};

	/**
	 * Adds ability for user to rotate cube by mouse wheel
	 * @param {string} direction which way to rotate: upDown, leftRight*/
	CubeInteraction.prototype.addMiddleScrollRotate = function (direction) {

	    // since FF has wheel event, while all others have mousewheel and wheel.
	    var wheelEvent = 'onwheel' in window ? 'wheel' : 'mousewheel';

	    this.cube.shape.addEventListener(wheelEvent, function (wheelEvent) {
	        if (this.autoplayInProgres) {
	            return
	        }

	        wheelEvent.preventDefault();

	        var value = wheelEvent.deltaY;

	        if (value > 0) {
	            if (direction === 'leftRight') {
	                this.cube.rotateRight()
	            }
	            else {
	                this.cube.rotateUp()
	            }
	        }
	        else {
	            if (direction === 'leftRight') {
	                this.cube.rotateLeft()
	            }
	            else {
	                this.cube.rotateDown()
	            }

	        }


	    }.bind(this))
	};







	// NOT finished, ability to rotate cube by hovering over it
	/*CubeInteraction.prototype.__calculateSpinSideAndSpin = function (mouse) {
	    if (mouse.offsetX >= (this.cube.width / 2)) {
	        return this.cube.rotateLeft()
	    }
	    else {
	        return this.cube.rotateRight()
	    }
	};

	CubeInteraction.prototype.addHoverSpin = function () {
	    var debouncedSpin = utils.debounce.call(this, this.__calculateSpinSideAndSpin, 200);
	    this.cube.shape.addEventListener('mousemove', debouncedSpin)
	};


	var calculateSide = function calculateSide(mouse, cubeWidth) {
	    if (mouse.offsetX >= (cubeWidth / 2)) {
	        return 'spinRight'
	    }
	    else {
	        return 'spinLeft'
	    }
	};*/


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * A wrap object for DOM element containing one of cubes faces,
	 * logic and state related to cubes faces go there*/
	var Face = module.exports = function (DOMel) {
	    this.domElement = DOMel;
	    this.content = null;
	};

	Face.prototype.onFront = function () {
	    if (this.content) this.content.onFront()
	};

	Face.prototype.offFront = function () {
	    if (this.content) this.content.offFront()
	};

	/**
	 * @param {object} contObj - StaticImage or Video objects*/
	Face.prototype.addContent = function (contObj) {
	    this.content = contObj;
	    this.domElement.appendChild(contObj.domElement)
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Face = __webpack_require__(16);

	var faces = ['front2', 'back2', 'left2', 'right2', 'top2', 'bottom2'];


	var Cube = module.exports = function (height, width) {
	    this.height = height;
	    this.width = width;

	    this.shape = makeDiv({
	        transform: 'perspective(900px)',
	        transition: 'all 200ms linear',
	        position: 'relative',
	        height: (height || 200) + 'px',
	        width: (width || 200) + 'px'
	    }, 'cube2');

	    this.rotationDegreesY = 0;
	    this.rotationDegreesX = 0;
	    this.zoomOutValue = 0.8;
	    this.spinSpeed = 450;
	    this.perspective = '';
	    this.facesRotationSequenceYRight = ['front2', 'left2', 'back2', 'right2'];
	    this.facesRotationSequenceYLeft = ["right2", "back2", "left2", "front2"];
	    this.facesRotationSequenceXUp = ["front2", "bottom2", "back2", "top2"];
	    this.facesRotationSequenceXDown = ["top2", "back2", "bottom2", "front2"];
	    this.currentFrontFace = 'front2';


	    faces.forEach(function (direction) {
	        var styles = {
	            transition: 'all 450ms linear',
	            position: 'absolute',
	            top: '0',
	            left: '0',
	            height: (height || 200) + 'px',
	            width: (width || 200) + 'px'
	        };

	        if (direction === 'front2') {
	            styles.zIndex = 2;
	            styles.transform = this.perspective + 'rotateY(0) rotateX(0) rotateY(0) translateZ(' + (height / 2) + 'px)'
	        }
	        if (direction === 'back2') {
	            styles.transform = this.perspective + 'rotateY(0) rotateX(0) rotateY(-180deg) translateZ(' + (height / 2) + 'px)'
	        }
	        if (direction === 'left2') {
	            styles.zIndex = 1;
	            styles.transform = this.perspective + 'rotateY(0) rotateX(0) rotateY(270deg) translateZ(' + (height / 2) + 'px)'
	        }
	        if (direction === 'right2') {
	            styles.transform = this.perspective + 'rotateY(0) rotateX(0) rotateY(90deg) translateZ(' + (height / 2) + 'px)'
	        }
	        if (direction === 'top2') {
	            styles.height = width + 'px';
	            styles.transform = this.perspective + 'rotateY(0) rotateX(0) rotateX(90deg) translateZ(' + (height / 2) + 'px)'
	        }
	        if (direction === 'bottom2') {
	            styles.height = width + 'px';
	            styles.transform = this.perspective + 'rotateY(0) rotateX(0) rotateX(-90deg) translateZ(' + (height / 2) + 'px)'
	        }
	        this[direction] = new Face(makeDiv(styles, direction));
	        this.shape.appendChild(this[direction].domElement)
	    }.bind(this));


	    this.shape.addEventListener('click', this.__rotate.bind(this))

	};

	Cube.prototype.zoomOut = function () {
	    this.shape.style.transform = 'scale(' + this.zoomOutValue + ') perspective(900px)';
	};

	Cube.prototype.zoomIn = function () {
	    this.shape.style.transform = 'scale(1) perspective(900px)';
	};

	Cube.prototype.changeZ = function () {
	    var currentFaceIndex = this.facesRotationSequenceYRight.indexOf(this.currentFrontFace);

	    var nextFaceIndex;
	    var nextFace;

	    var nextLeftFaceIndex;
	    var nextLeftFace;

	    if (currentFaceIndex === 3) {
	        nextFaceIndex = 0;
	    }
	    else {
	        nextFaceIndex = currentFaceIndex + 1
	    }
	    nextFace = this.facesRotationSequenceYRight[nextFaceIndex];

	    if (nextFaceIndex === 3) {
	        nextLeftFaceIndex = 0;
	    }
	    else {
	        nextLeftFaceIndex = nextFaceIndex + 1;
	    }
	    nextLeftFace = this.facesRotationSequenceYRight[nextLeftFaceIndex];

	    this[this.currentFrontFace].style.zIndex = 0;

	    this[nextFace].style.zIndex = 2;

	    //console.log('nextFace', nextFace, nextFaceIndex);
	    //console.log('nextLeftFace', nextLeftFace, nextLeftFaceIndex);
	    //console.log('CurrentFace', this.currentFrontFace);


	    this.currentFrontFace = nextFace;


	    this[nextLeftFace].style.zIndex = 1

	};

	Cube.prototype.__rotate = function () {
	    this.zoomOut();
	    var rotationStr = 'rotateY(' + this.rotationDegreesY + 'deg) rotateX(' + this.rotationDegreesX+'deg)';


	    faces.forEach(function (direction) {
	        if (direction === 'front2') {

	            this[direction].domElement.style.transform = this.perspective + rotationStr + 'rotateY(0) translateZ(' + (this.height / 2) + 'px)'
	        }
	        if (direction === 'back2') {
	            this[direction].domElement.style.transform = this.perspective + rotationStr + 'rotateY(180deg) translateZ(' + (this.height / 2) + 'px)'
	        }
	        if (direction === 'left2') {
	            this[direction].domElement.style.transform = this.perspective + rotationStr + 'rotateY(270deg) translateZ(' + (this.height / 2) + 'px)'
	        }
	        if (direction === 'right2') {
	            this[direction].domElement.style.transform = this.perspective + rotationStr + 'rotateY(90deg) translateZ(' + (this.height / 2) + 'px)'
	        }
	        if (direction === 'top2') {
	            this[direction].domElement.style.transform = this.perspective + rotationStr + 'rotateX(90deg) translateZ(' + (this.height / 2) + 'px)'
	        }
	        if (direction === 'bottom2') {
	            this[direction].domElement.style.transform = this.perspective + rotationStr + 'rotateX(-90deg) translateZ(' + (this.height / 2) + 'px)'
	        }
	    }.bind(this));
	    setTimeout(function () {
	        this.zoomIn();
	        this.changeZ()
	    }.bind(this), 450)

	};

	Cube.prototype.rotateLeft = function () {
	    this.rotationDegreesY -= 90;
	    this.__rotate()
	};

	Cube.prototype.rotateRight = function () {
	    this.rotationDegreesY += 90;
	    this.__rotate()
	};
	Cube.prototype.rotateUp = function () {
	    this.rotationDegreesX += 90;
	    this.__rotate()
	};

	Cube.prototype.rotateDown = function () {
	    this.rotationDegreesX -= 90;
	    this.__rotate()
	};



	var makeDiv = function makeDiv(styleObj, className, idName) {
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


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Face = __webpack_require__(16);

	utils = __webpack_require__(7);
	var makeDiv = utils.makeDiv;


	var Cube = module.exports = function (height, width) {
	    this.height = height;
	    this.width = width;

	    Object.defineProperty(this, 'cube', {
	        get: function () {
	            return this.shape
	        }
	    });

	    this.shape = makeDiv({
	        position: 'relative',
	        transition: 'all 450ms linear',
	        height: (height || 200) + 'px',
	        width: (width || 200) + 'px'
	    }, 'cube');

	    this.rotationMap = {
	        front: {left: 'right', right: 'left', up: 'bottom', down: 'top'},
	        back: {left: 'right', right: 'left', up: 'top', down: 'bottom'},
	        left: {left: 'front', right: 'back', up: 'bottom', down: 'top'},
	        right: {left: 'back', right: 'front', up: 'bottom', down: 'top'},
	        top: {left: 'right', right: 'left', up: 'front', down: 'back'},
	        bottom: {left: 'right', right: 'left', up: 'back', down: 'front'}
	    };


	    this.rotationDegreesY = 0;
	    this.rotationDegreesX = 0;
	    this.spinSpeed = 450;
	    this.zoomOutValue = 0.8;

	    this.frontFace = 'front';
	    this.currentPosition = 'still'; // spinning


	    this.__currentAxis = 'x';

	    this.__currentPositionX = 0;
	    this.__currentPositionY = 0;

	    this.__XtoRight = ['front', 'right', 'back', 'left'];
	    this.__YtoTop = [, 'top', , 'bottom'];


	    this.__initialize()


	};

	Cube.prototype.__initialize = function () {
	    ['front', 'back', 'left', 'right', 'top', 'bottom'].forEach(function (direction) {
	        var styles = {
	            transition: 'all 450ms linear',
	            position: 'absolute',
	            height: (this.height || 200) + 'px',
	            width: (this.width || 200) + 'px',
	            display: 'none'
	        };

	        if (direction === 'front') {
	            styles.top = '0';
	            styles.left = '0';
	            styles.display = 'block';
	        }

	        this[direction] = new Face(makeDiv(styles, direction));

	        if (direction === 'front') {
	            this.shape.appendChild(this[direction].domElement)
	        }
	    }.bind(this));

	    // to zoom cube back after it stop rotating
	    this.shape.addEventListener('click', function () {
	        console.log('flatcube on click');
	        this.rotateLeft()

	    }.bind(this))
	};

	Cube.prototype.__calculateFrontElement = function () {
	    // deactivate because sometimes when user rotates cube transitionend fire just miliseconds before he rotates again
	    // and cube face that is out of focus is activated
	    this.frontFaceDeactivate();
	    var frontElementFace = 'front';
	    var leadingElementSize = 0;
	    ['front', 'back', 'left', 'right', 'top', 'bottom'].forEach(function (face) {
	        var data = this[face].domElement.getBoundingClientRect();
	        var size = data.height * data.width;
	        if (size > leadingElementSize) {
	            frontElementFace = face;
	            leadingElementSize = size
	        }
	    }.bind(this));
	    //activate front facing element
	    this.frontFace = frontElementFace;
	    this.frontFaceActivate()
	};

	Cube.prototype.frontFaceActivate = function () {
	    //this[this.frontFace].onFront();
	};

	Cube.prototype.frontFaceDeactivate = function () {
	    //this[this.frontFace].offFront();
	};

	Cube.prototype.zoomOut = function () {
	    //this.perspectiveWrap.style.transform = 'scale(' + this.zoomOutValue + ')';
	};

	Cube.prototype.zoomIn = function () {
	    //this.perspectiveWrap.style.transform = 'scale(1)';
	};
	Cube.prototype.__rotate = function () {
	    this.frontFaceDeactivate();
	    var transform = 'rotateX(' + this.rotationDegreesX + 'deg) rotateY(' + this.rotationDegreesY + 'deg)';
	    var timeoutVal = this.currentPosition === 'spinning' ? 20 : 100;
	    if (this.currentPosition === 'still') this.zoomOut();
	    setTimeout(function () {
	        this.currentPosition = 'spinning';
	        this.shape.style.transition = 'all ' + this.spinSpeed + 'ms linear';
	        this.shape.style.transform = transform;
	    }.bind(this), timeoutVal);

	};

	var increasePositionByOne = function (position) {
	    var next;
	    if (position === 3) {
	        next = 0
	    }
	    else {
	        next = position + 1
	    }

	    return next
	};

	var decreasePositionByOne = function (position) {
	    var next;
	    if (position === 0) {
	        next = 3
	    }
	    else {
	        next = position - 1
	    }

	    return next
	};

	Cube.prototype.__rotate = function (way) {
	    var nextSide;
	    var pairs = {top: 'bottom', bottom: 'top', left: 'right', right: 'left', front: 'back', back: 'front'};
	    var oneSide;
	    var secondSide;

	    if (way === 'right') {
	        if (this.__currentAxis === 'x') {
	            console.log('current axis x');
	            console.log(this.__currentPositionX);

	            this.__currentPositionX = decreasePositionByOne(this.__currentPositionX);
	            nextSide = this.__XtoRight[this.__currentPositionX];
	            console.log(this.__currentPositionX);
	        }
	        else {
	            oneSide = this.__YtoTop[this.__currentPositionY];
	            secondSide = pairs[oneSide];

	            this.__XtoRight[this.__currentPositionX] = oneSide;
	            this.__XtoRight[increasePositionByOne(increasePositionByOne(this.__currentPositionX))] = secondSide;

	            this.__currentPositionX = decreasePositionByOne(this.__currentPositionX);
	            nextSide = this.__XtoRight[this.__currentPositionX];

	            this.__currentAxis = 'x'


	        }
	    }
	    else if (way === 'left') {
	        if (this.__currentAxis === 'x') {
	            this.__currentPositionX = increasePositionByOne(this.__currentPositionX);
	            nextSide = this.__XtoRight[this.__currentPositionX]
	        }
	        else {
	            oneSide = this.__YtoTop[this.__currentPositionY];
	            secondSide = pairs[oneSide];

	            this.__XtoRight[this.__currentPositionX] = oneSide;
	            this.__XtoRight[increasePositionByOne(increasePositionByOne(this.__currentPositionX))] = secondSide;

	            this.__currentPositionX = increasePositionByOne(this.__currentPositionX);
	            nextSide = this.__XtoRight[this.__currentPositionX];

	            this.__currentAxis = 'x'

	        }

	    }
	    else if (way === 'top') {

	        if (this.__currentAxis === 'y') {
	            console.log('top - current axis Y');
	            console.log(this.__YtoTop);

	            this.__currentPositionY = decreasePositionByOne(this.__currentPositionY);
	            nextSide = this.__YtoTop[this.__currentPositionY]
	        }
	        else {
	            console.log('top - current axis X');
	            oneSide = this.__XtoRight[this.__currentPositionX];
	            secondSide = pairs[oneSide];

	            this.__YtoTop[this.__currentPositionY] = oneSide;
	            this.__YtoTop[increasePositionByOne(increasePositionByOne(this.__currentPositionY))] = secondSide;

	            this.__currentPositionY = decreasePositionByOne(this.__currentPositionY);
	            nextSide = this.__YtoTop[this.__currentPositionY];

	            this.__currentAxis = 'y'
	        }
	    }
	    else if (way === 'bottom') {
	        if (this.__currentAxis === 'y') {
	            this.__currentPositionY = increasePositionByOne(this.__currentPositionY);
	            nextSide = this.__YtoTop[this.__currentPositionY]
	        }
	        else {
	            oneSide = this.__XtoRight[this.__currentPositionX];
	            secondSide = pairs[oneSide];

	            this.__YtoTop[this.__currentPositionY] = oneSide;
	            this.__YtoTop[increasePositionByOne(increasePositionByOne(this.__currentPositionY))] = secondSide;

	            this.__currentPositionY = increasePositionByOne(this.__currentPositionY);
	            nextSide = this.__YtoTop[this.__currentPositionY];

	            this.__currentAxis = 'y'
	        }
	    }

	    return nextSide


	};

	Cube.prototype.updateFrontFace = function (face) {
	    var curFF = this[this.frontFace].domElement;
	    curFF.style.display = 'none';
	    this.frontFace = face;

	    var el = this[face].domElement;
	    el.style.display = 'block';
	    el.style.top = '0';
	    el.style.left = '0';

	    this.shape.appendChild(el)
	    console.log('front element now is : ', face);
	    console.log('Y calclulation is : ', this.__currentPositionY);
	};

	Cube.prototype.rotateLeft = function () {
	    var nextFace = this.__rotate('left');
	    this.updateFrontFace(nextFace)
	};

	Cube.prototype.rotateRight = function () {
	    var nextFace = this.__rotate('right');
	    this.updateFrontFace(nextFace)
	};
	Cube.prototype.rotateUp = function () {
	    var nextFace = this.__rotate('top');
	    this.updateFrontFace(nextFace)
	};

	Cube.prototype.rotateDown = function () {
	    var nextFace = this.__rotate('bottom');
	    this.updateFrontFace(nextFace)
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Implements logic related to displaying a video on cubes face
	 *
	 * @param {object} options
	 * @param {string} options.url - url to video (only local allowed, no YT etc.)
	 * @param {boolean} options.controls - display controls or not
	 * @param {boolean} options.autoplay - should video autolay when on front
	 * @param {string || function} options.onclickDo - what to do when video is clicked on
	 *  if value is "playStop" it will do what value says, if value is function, then function will be executed.
	 * @param {string || boolean} options.onmouseoverDo - what to do when video is mouseover/mouseout on
	 *  if value is "playStop" it will do what value says, if value is function, then function will be executed.
	 * */
	var Video = module.exports = function (options) {
	    this.domElement = null;
	    this.autoplay = options.autoplay;

	    this.__initialize(options)
	};
	Video.prototype.onFront = function () {
	    if (this.autoplay) {
	        this.play()
	    }
	};

	Video.prototype.offFront = function () {
	    this.stop()
	};

	Video.prototype.play = function () {
	    if (this.domElement.paused) {
	        this.domElement.play()
	    }
	};

	Video.prototype.stop = function () {
	    if (!this.domElement.paused) {
	        this.domElement.pause();
	    }
	};

	Video.prototype.__initialize = function (options) {
	    this.domElement = document.createElement('video');
	    this.domElement.style.height = '100%';
	    this.domElement.style.width = '100%';
	    this.domElement.src = options.url;
	    if (options.hasOwnProperty('controls')) {
	        if (options.controls) {
	            this.domElement.controls = true;
	        }
	        else {
	            this.domElement.controls = false;
	        }
	    }
	    else {
	        this.domElement.controls = true;

	    }

	    if (options.hasOwnProperty('onclickDo')) {
	        if (options.onclickDo === 'playStop') {
	            this.domElement.addEventListener('click', this.__startStopOnClick.bind(this))
	        }
	        else if (typeof options.onclickDo === 'function') {
	            this.domElement.addEventListener('click', options.onclickDo.bind(this))
	        }
	    }

	    if (options.hasOwnProperty('onmouseoverDo')) {
	        if (options.onmouseoverDo === 'playStop') {
	            this.domElement.addEventListener('mouseover', this.play.bind(this));
	            this.domElement.addEventListener('mouseout', this.stop.bind(this))
	        }
	        else if (typeof options.onmouseoverDo === 'function') {
	            this.domElement.addEventListener('mouseover', options.onmouseoverDo.bind(this))
	        }
	    }
	};

	Video.prototype.__startStopOnClick = function () {
	    if (!this.domElement.paused) {
	        this.stop()
	    }
	    else {
	        this.play()
	    }
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Implaments logic related to displaying an image on cubes face
	 * @param {object} options
	 * @param {string} options.url - url to static image
	 * @param {boolean} options.autoplay - should autoplay function be started when face is on front
	 * @param {function} options.autoplayFunction - function to be executed when face containing image is on front
	 * @param {function} options.onclickDo - when image is clicked on the function will be executed.
	 * @param {function} options.onmouseoverDo - when image is mouseover/mouseout on function will be executed.
	 * */
	var StaticImage = module.exports = function (options) {
	    this.domElement = null;

	    this.autoplay = options.autoplay;
	    this.autoplayFunction = options.autoplayFunction;

	    this.autoplayOn = false;
	    this.__initialize(options);

	};
	StaticImage.prototype.onFront = function () {
	    if (this.autoplay) {
	        this.autoplayOn = true;
	        this.autoplayFunction()
	    }
	};

	StaticImage.prototype.offFront = function () {
	    if (this.autoplay && this.autoplayOn) {
	        this.autoplayOn = false;
	        this.autoplayFunction()
	    }
	};


	StaticImage.prototype.__initialize = function (options) {
	    this.domElement = document.createElement('img');
	    this.domElement.style.height = '100%';
	    this.domElement.style.width = '100%';
	    this.domElement.src = options.url;

	    if (options.hasOwnProperty('onclickDo')) {
	        this.domElement.addEventListener('click', options.onclickDo.bind(this))
	    }

	    if (this.hasOwnProperty('onmouseoverDo')) {
	        this.domElement.addEventListener('mouseover', options.onmouseoverDo.bind(this))
	    }
	};


/***/ }
/******/ ]);