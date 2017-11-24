(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["layerMask"] = factory();
	else
		root["layerMask"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = __webpack_require__(1);

/**
 * @name Point
 */

var Point = function () {

  /**
   * @param {number} x
   * @param {number} y
   */
  function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }

  /**
   * @static
   * @param {Array.<Point>} points
   * @returns {Array.<number>}
   */


  _createClass(Point, null, [{
    key: 'mapX',
    value: function mapX(points) {
      var positions = points.map(function (p) {
        return p.x;
      });
      return _.uniq(positions).sort(function (a, b) {
        return a - b;
      });
    }

    /**
     * @static
     * @param {Array.<Point>} points
     * @returns {Array.<number>}
     */

  }, {
    key: 'mapY',
    value: function mapY(points) {
      var positions = points.map(function (p) {
        return p.y;
      });
      return _.uniq(positions).sort(function (a, b) {
        return a - b;
      });
    }
  }]);

  return Point;
}();

module.exports = Point;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = {
    uniq: uniq,
    flatten: flatten,
    forEach: forEach
};

/**
 * @param {Array} array
 * @return {Array}
 */
function uniq(array) {
    return array.reduce(function (memo, item) {
        var includes = ~memo.indexOf(item);
        return includes ? memo : memo.concat(item);
    }, []);
}

/**
 * @param {Array.<Array>} array
 * @return {Array}
 */
function flatten(array) {
    var _ref;

    return (_ref = []).concat.apply(_ref, _toConsumableArray(array));
}

/**
 * @param collection
 * @param {function} iteratee
 */
function forEach(collection, iteratee) {
    for (var i = 0; i < collection.length; i++) {
        iteratee(collection[i], i, collection);
    }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    ClientRect: __webpack_require__(5),
    Point: __webpack_require__(0),
    Vector: __webpack_require__(6)
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = __webpack_require__(1);
var domUtils = __webpack_require__(8);

var _require = __webpack_require__(2),
    Point = _require.Point,
    Vector = _require.Vector,
    ClientRect = _require.ClientRect;

var LayerMask = function () {
    _createClass(LayerMask, null, [{
        key: 'defaults',


        /**
         * @typedef {Object} LayerMaskConfig
         *
         * @property {number} [padding]
         * @property {boolean} [singular] say to build the only one hole in the mask that cover all target elements
         * @property {string} [rootClass]
         * @property {Array.<string>} [modifiers] modifiers that appended to root class. Predefined: "debug", "click-through" and "spotlight"
         * @property {string} [classesTable]
         * @property {string} [classesTableRow]
         * @property {string} [classesTableCell]
         * @property {string} [classesTableCellHole]
         * @property {string} [classesDebug]
         *
         *
         * @static
         * @return {LayerMaskConfig}
         */
        get: function get() {
            return {
                padding: 0,
                singular: false,
                rootClass: 'layer-mask',
                modifiers: [],
                classesTable: 'layer-mask-table',
                classesTableRow: 'layer-mask-table__row',
                classesTableCell: 'layer-mask-table__cell',
                classesTableCellHole: 'layer-mask-table__cell--hole'
            };
        }

        /**
         * @param {NodeList|Element|Array.<Element>} elements
         * @param {LayerMaskConfig} [config = {}]
         */

    }]);

    function LayerMask(elements) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, LayerMask);

        this.config = Object.assign({}, this.constructor.defaults, config);
        this.elements = elements.length ? [].slice.call(elements) : [elements];
    }

    /**
     * @public
     * @return {Element}
     */


    _createClass(LayerMask, [{
        key: 'createMask',
        value: function createMask() {
            var _this = this;

            var isFixed = domUtils.isElementFixed(this.elements[0]);
            var canvasDimension = isFixed ? domUtils.getWindowDimensions() : domUtils.getPageDimensions();

            var sourceRectangles = domUtils.getAllBoundaries(this.elements);
            var rectangles = (!this.config.singular ? sourceRectangles : [ClientRect.combine(sourceRectangles)]).map(function (rect) {
                return domUtils.addPadding(rect, _this.config.padding);
            }).map(function (rect) {
                return domUtils.addPageOffset(rect, isFixed);
            });

            var containerElement = this.buildContainer(canvasDimension, isFixed);
            this.appendMask(containerElement, rectangles, canvasDimension);

            return containerElement;
        }

        /**
         * @private
         * @param {Dimension} canvasDimension
         * @param {Boolean} isFixed
         * @return {Element}
         */

    }, {
        key: 'buildContainer',
        value: function buildContainer(canvasDimension, isFixed) {
            var _this2 = this;

            var container = document.createElement('div');

            container.style.width = canvasDimension.width + 'px';
            container.style.height = canvasDimension.height + 'px';

            domUtils.addClasses(container, this.config.rootClass);

            this.getModifiers(isFixed).forEach(function (modifier) {
                var cssClass = _this2.createModifierCssClass(modifier);
                domUtils.addClasses(container, cssClass);
            });

            return container;
        }

        /**
         * @private
         * @param {string} modifier
         * @return {string}
         */

    }, {
        key: 'createModifierCssClass',
        value: function createModifierCssClass(modifier) {
            return this.config.rootClass + '--' + modifier;
        }

        /**
         * @private
         * @param {boolean} isFixed
         * @return {Array.<string>}
         */

    }, {
        key: 'getModifiers',
        value: function getModifiers(isFixed) {
            var modifiers = [].concat(this.config.modifiers);

            if (isFixed) {
                modifiers.push('fixed');
            }

            return modifiers;
        }

        /**
         * @private
         * @param {Element} container
         * @param {Array.<ClientRect>} rectangles
         * @param {Dimension} canvasDimension
         * @return {Element}
         */

    }, {
        key: 'appendMask',
        value: function appendMask(container, rectangles, canvasDimension) {
            var _ref,
                _this3 = this;

            domUtils.addClasses(container, this.config.classesTable);

            var p0 = new Point(0, 0);
            var pN = new Point(canvasDimension.width, canvasDimension.height);

            var vertexes = ClientRect.getVertexes(rectangles);
            var points = (_ref = [p0, pN]).concat.apply(_ref, _toConsumableArray(vertexes));

            var colPositions = Point.mapX(points);
            var rowPositions = Point.mapY(points);

            var rowsCount = rowPositions.length - 1;
            var colsCount = colPositions.length - 1;

            var rows = this.buildTable(rowsCount, colsCount);

            _.forEach(rows, function (rowEl, i) {
                domUtils.addClasses(rowEl, _this3.config.classesTableRow);

                var rowInitial = rowPositions[i];
                var rowTerminal = rowPositions[i + 1];

                rowEl.style.height = rowTerminal - rowInitial + 'px';

                _.forEach(rowEl.childNodes, function (cellEl, j) {
                    domUtils.addClasses(cellEl, _this3.config.classesTableCell);

                    var colInitial = colPositions[j];
                    var colTerminal = colPositions[j + 1];

                    cellEl.style.width = colTerminal - colInitial + 'px';

                    // Check collision
                    var initialPoint = new Point(colInitial, rowInitial);
                    var terminalPoint = new Point(colTerminal, rowTerminal);
                    var vector = new Vector(initialPoint, terminalPoint);

                    if (rectangles.some(function (r) {
                        return r.isVectorCollides(vector);
                    })) {
                        domUtils.addClasses(cellEl, _this3.config.classesTableCellHole);
                    }
                });
            });

            _.forEach(rows, function (el, i) {
                container.appendChild(el);
            });

            return container;
        }

        /**
         * @private
         * @param {number} rowsCount
         * @param {number} colsCount
         * @return {Array.<Element>}
         */

    }, {
        key: 'buildTable',
        value: function buildTable(rowsCount, colsCount) {
            var rows = [];

            for (var i = 0; i < rowsCount; i++) {
                var rowEl = document.createElement('div');
                rows.push(rowEl);

                for (var j = 0; j < colsCount; j++) {
                    var cellEl = document.createElement('div');
                    rowEl.appendChild(cellEl);
                }
            }

            return rows;
        }
    }]);

    return LayerMask;
}();

module.exports = LayerMask;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LayerMaskManager = function () {

    /**
     * @param {Element} container
     */
    function LayerMaskManager(container) {
        _classCallCheck(this, LayerMaskManager);

        this._container = container;
        this.currentLayerMask = undefined;
        this.activeMaskElement = undefined;
    }

    /**
     * @public
     * @param {LayerMask} layerMask
     * @return {Element}
     */


    _createClass(LayerMaskManager, [{
        key: 'revealMask',
        value: function revealMask(layerMask) {
            if (this.activeMaskElement) {
                this.hideActiveMask();
            }

            this.currentLayerMask = layerMask;

            var maskElement = layerMask.createMask();
            this.setActiveMask(maskElement);

            return maskElement;
        }

        /**
         * @public
         * @throws {Error} Will throw an error if the mask element is not defined.
         */

    }, {
        key: 'hideActiveMask',
        value: function hideActiveMask() {
            if (!this.activeMaskElement) {
                throw new Error('mask element is missing');
            }

            this.activeMaskElement.remove();
            this.activeMaskElement = undefined;
        }

        /**
         * @public
         * @throws {Error} Will throw an error if the layer mask instance is not passed before.
         * @return {Element}
         */

    }, {
        key: 'refreshMask',
        value: function refreshMask() {
            if (!this.currentLayerMask) {
                throw new Error('layer mask is missing');
            }

            return this.revealMask(this.currentLayerMask);
        }

        /**
         * @private
         * @param {Element} maskElement
         */

    }, {
        key: 'setActiveMask',
        value: function setActiveMask(maskElement) {
            this._container.appendChild(maskElement);
            this.activeMaskElement = maskElement;
        }
    }]);

    return LayerMaskManager;
}();

module.exports = LayerMaskManager;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = __webpack_require__(1);
var Point = __webpack_require__(0);

/**
 * @name ClientRect
 * @descr It is similar to an abstract Rectangle class, but with inverted Y axis
 */

var ClientRect = function () {

    /**
     * @param {number} left
     * @param {number} right
     * @param {number} top
     * @param {number} bottom
     * @param {number} width
     * @param {number} height
     */
    function ClientRect(left, right, top, bottom, width, height) {
        _classCallCheck(this, ClientRect);

        if (left > right) {
            throw new TypeError('inconsistent rectangle: right value should be bigger than left value');
        }
        if (top > bottom) {
            throw new TypeError('inconsistent rectangle: bottom value should be bigger than top value');
        }
        if (right - left !== width) {
            throw new TypeError('inconsistent rectangle: invalid width value');
        }
        if (bottom - top !== height) {
            throw new TypeError('inconsistent rectangle: invalid height value');
        }

        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.width = width;
        this.height = height;
    }

    /**
     * @static
     * @param {Object.<top, left, bottom, right>} hostClientRect
     * @return {ClientRect}
     */


    _createClass(ClientRect, [{
        key: 'isPointCollides',


        /**
         * @public
         * @param {Point} point
         * @return {boolean}
         */
        value: function isPointCollides(point) {
            var left = this.left;
            var right = this.left + this.width;
            var top = this.top;
            var bottom = this.top + this.height;
            return left <= point.x && point.x <= right && top <= point.y && point.y <= bottom;
        }

        /**
         * @public
         * @param {Vector} vector
         * @return {boolean}
         */

    }, {
        key: 'isVectorCollides',
        value: function isVectorCollides(vector) {
            return this.isPointCollides(vector.initial) && this.isPointCollides(vector.terminal) && this.isPointCollides(vector.getMiddlePoint());
        }

        /**
         * @public
         * @returns {Array.<Point>} Points are in the clockwise order
         */

    }, {
        key: 'getVertexes',
        value: function getVertexes() {
            return [new Point(this.left, this.top), new Point(this.left + this.width, this.top), new Point(this.left + this.width, this.top + this.height), new Point(this.left, this.top + this.height)];
        }

        /**
         * @static
         * @param {Array.<ClientRect>} rectangles
         * @return {Array.<Point>}
         */

    }], [{
        key: 'from',
        value: function from(hostClientRect) {
            var left = hostClientRect.left,
                right = hostClientRect.right,
                top = hostClientRect.top,
                bottom = hostClientRect.bottom,
                width = hostClientRect.width,
                height = hostClientRect.height;

            return new this(left, right, top, bottom, width, height);
        }
    }, {
        key: 'getVertexes',
        value: function getVertexes(rectangles) {
            var vertexes = rectangles.map(function (r) {
                return r.getVertexes();
            });
            return _.flatten(vertexes);
        }

        /**
         * @static
         * @param {Array.<ClientRect>} rectangles
         * @return {ClientRect}
         */

    }, {
        key: 'combine',
        value: function combine(rectangles) {
            var vertexes = this.getVertexes(rectangles);

            var X = vertexes.map(function (v) {
                return v.x;
            });
            var Y = vertexes.map(function (v) {
                return v.y;
            });

            var left = Math.min.apply(Math, _toConsumableArray(X));
            var right = Math.max.apply(Math, _toConsumableArray(X));
            var top = Math.min.apply(Math, _toConsumableArray(Y));
            var bottom = Math.max.apply(Math, _toConsumableArray(Y));

            var width = right - left;
            var height = bottom - top;

            return new this(left, right, top, bottom, width, height);
        }
    }]);

    return ClientRect;
}();

module.exports = ClientRect;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = __webpack_require__(0);

/**
 * @name Vector
 */

var Vector = function () {

  /**
   * @param {Point} point1
   * @param {Point} point2
   */
  function Vector(point1, point2) {
    _classCallCheck(this, Vector);

    this.initial = point1;
    this.terminal = point2;
  }

  /**
   * @public
   * @return {Point}
   */


  _createClass(Vector, [{
    key: 'getMiddlePoint',
    value: function getMiddlePoint() {
      var x = (this.initial.x + this.terminal.x) / 2;
      var y = (this.initial.y + this.terminal.y) / 2;
      return new Point(x, y);
    }
  }]);

  return Vector;
}();

module.exports = Vector;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    LayerMask: __webpack_require__(3),
    LayerMaskManager: __webpack_require__(4)
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = __webpack_require__(2),
    ClientRect = _require.ClientRect;

module.exports = {
    getPageDimensions: getPageDimensions,
    getWindowDimensions: getWindowDimensions,
    isElementFixed: isElementFixed,
    getAllBoundaries: getAllBoundaries,
    addPadding: addPadding,
    addPageOffset: addPageOffset,
    addClasses: addClasses
};

/**
 * @typedef {Object} Dimension
 *
 * @property {number} width
 * @property {number} height
 */

/**
 * @return {Dimension}
 */
function getPageDimensions() {
    var contentDimension = getContentDimensions();
    var windowDimension = getWindowDimensions();

    return {
        height: Math.max(contentDimension.height, windowDimension.height),
        width: Math.max(contentDimension.width, windowDimension.width)
    };
}

/**
 * @return {Dimension}
 */
function getContentDimensions() {
    return {
        height: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
        width: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth)
    };
}

/**
 * @return {Dimension}
 */
function getWindowDimensions() {
    return {
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth
    };
}

/**
 * @return {Dimension}
 */
function getScrollDimensions() {
    return {
        height: window.pageYOffset || window.scrollY,
        width: window.pageXOffset || window.scrollX
    };
}

/**
 * @param {Element} element
 * @param {string} property
 * @return {string}
 */
function css(element, property) {
    return window.getComputedStyle(element).getPropertyValue(property);
}

/**
 * @param {Element} element
 * @return {boolean}
 */
function isElementFixed(element) {
    var parents = getParentElements(element);
    var elements = [element].concat(parents);
    return elements.some(function (element) {
        return css(element, 'position') === 'fixed';
    });
}

/**
 * @param {Element} element
 * @return {Array.<Element>}
 */
function getParentElements(element) {
    var parents = [];

    var child = element;
    while (child.parentElement) {
        parents.push(child.parentElement);
        child = child.parentElement;
    }

    return parents;
}

/**
 * @param {Array.<Element>} elements
 * @return {Array.<ClientRect>}
 */
function getAllBoundaries(elements) {
    return elements.map(function (element) {
        return ClientRect.from(element.getBoundingClientRect());
    });
}

/**
 * @param {ClientRect} rectangular
 * @param {number} padding
 * @return {ClientRect}
 */
function addPadding(rectangular, padding) {
    var left = rectangular.left - padding;
    var right = rectangular.right + padding;
    var top = rectangular.top - padding;
    var bottom = rectangular.bottom + padding;
    var width = rectangular.width + 2 * padding;
    var height = rectangular.height + 2 * padding;

    return new ClientRect(left, right, top, bottom, width, height);
}

/**
 * @param {ClientRect} rectangular
 * @param {boolean} isFixed
 * @return {ClientRect}
 */
function addPageOffset(rectangular, isFixed) {
    var scrollDimensions = getScrollDimensions();

    var left = rectangular.left + (isFixed ? 0 : scrollDimensions.width);
    var right = rectangular.right + (isFixed ? 0 : scrollDimensions.width);
    var top = rectangular.top + (isFixed ? 0 : scrollDimensions.height);
    var bottom = rectangular.bottom + (isFixed ? 0 : scrollDimensions.height);
    var width = rectangular.width;
    var height = rectangular.height;

    return new ClientRect(left, right, top, bottom, width, height);
}

/**
 * @param {Element} element
 * @param {string} classes
 */
function addClasses(element, classes) {
    var _element$classList;

    var classArr = classes.split(' ');
    (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(classArr));
}

/***/ })
/******/ ]);
});