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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @name Point
 */
var Point =

/**
 * @param {number} x
 * @param {number} y
 */
function Point(x, y) {
  _classCallCheck(this, Point);

  this.x = x;
  this.y = y;
};

module.exports = Point;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    ClientRect: __webpack_require__(4),
    Point: __webpack_require__(0),
    Vector: __webpack_require__(5)
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(8);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MaskManager = function () {

    /**
     * @param {Element} container
     */
    function MaskManager(container) {
        _classCallCheck(this, MaskManager);

        this._container = container;
        this.currentLayerMask = undefined;
        this.activeMaskElement = undefined;
    }

    /**
     * @public
     * @param {LayerMask} layerMask
     * @return {Element}
     */


    _createClass(MaskManager, [{
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

    return MaskManager;
}();

module.exports = MaskManager;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uniq = __webpack_require__(10);

/**
 * @name ClientRect
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

    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
    this.width = width;
    this.height = height;
  }

  /**
   * @public
   * @param {Point} point
   * @return {boolean}
   */


  _createClass(ClientRect, [{
    key: 'isPointCollides',
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
     * @static
     * @param {Array.<ClientRect>} rectangles
     * @returns {Array.<number>}
     */

  }], [{
    key: 'mapVertexesToAxisX',
    value: function mapVertexesToAxisX(rectangles) {
      var abscissas = rectangles.reduce(function (memo, r) {
        return memo.concat([r.left, r.left + r.width]);
      }, [0]);
      return uniq(abscissas).sort(function (a, b) {
        return a - b;
      });
    }

    /**
     * @static
     * @param {Array.<ClientRect>} rectangles
     * @returns {Array.<number>}
     */

  }, {
    key: 'mapVertexesToAxisY',
    value: function mapVertexesToAxisY(rectangles) {
      var ordinates = rectangles.reduce(function (memo, r) {
        return memo.concat([r.top, r.top + r.height]);
      }, [0]);
      return uniq(ordinates).sort(function (a, b) {
        return a - b;
      });
    }
  }]);

  return ClientRect;
}();

module.exports = ClientRect;

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    LayerMask: __webpack_require__(2),
    MaskManager: __webpack_require__(3)
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = __webpack_require__(9);

var LayerMask = function () {
    _createClass(LayerMask, null, [{
        key: 'defaults',


        /**
         * @typedef {Object} LayerMaskConfig
         *
         * @property {boolean} [debug]
         * @property {number} [padding]
         * @property {string} [classes]
         * @property {string} [classesCanvas]
         * @property {string} [classesSvg]
         * @property {string} [classesFixed]
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
                debug: false,
                padding: 0,
                classes: 'layer-mask',
                classesDebug: 'layer-mask--debug',
                classesTable: 'layer-mask-table',
                classesTableRow: 'layer-mask-table__row',
                classesTableCell: 'layer-mask-table__cell',
                classesTableCellHole: 'layer-mask-table__cell--hole',
                classesCanvas: 'layer-mask--canvas',
                classesSvg: 'layer-mask--svg',
                classesFixed: 'layer-mask--fixed'
            };
        }

        /**
         * @param {NodeList|Element} elements
         * @param {LayerMaskConfig} config
         */

    }]);

    function LayerMask(elements, config) {
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

            var isFixed = utils.isElementFixed(this.elements[0]);
            var canvasDimension = isFixed ? utils.getPageDimensions() : utils.getWindowDimensions();

            var rectangles = utils.getAllBoundaries(this.elements).map(function (rect) {
                return utils.addPadding(rect, _this.config.padding);
            }).map(function (rect) {
                return utils.addPageOffset(rect, isFixed);
            });

            return this.buildMask(canvasDimension, isFixed, rectangles);
        }

        /**
         * @private
         * @param {Dimension} canvasDimension
         * @param {Boolean} isFixed
         * @param {Array.<ClientRect>} rectangles
         * @return {Element}
         */

    }, {
        key: 'buildMask',
        value: function buildMask(canvasDimension, isFixed, rectangles) {
            throw new Error('not implemented');
        }
    }]);

    return LayerMask;
}();

module.exports = LayerMask;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = __webpack_require__(1),
    Point = _require.Point,
    Vector = _require.Vector,
    ClientRect = _require.ClientRect;

var LayerMask = __webpack_require__(7);

var TableMaskCreator = function (_LayerMask) {
    _inherits(TableMaskCreator, _LayerMask);

    function TableMaskCreator() {
        _classCallCheck(this, TableMaskCreator);

        return _possibleConstructorReturn(this, (TableMaskCreator.__proto__ || Object.getPrototypeOf(TableMaskCreator)).apply(this, arguments));
    }

    _createClass(TableMaskCreator, [{
        key: 'buildMask',


        /**
         * @private
         * @param {Dimension} canvasDimension
         * @param {Boolean} isFixed
         * @param {Array.<ClientRect>} rectangles
         * @return {Element}
         */
        value: function buildMask(canvasDimension, isFixed, rectangles) {
            var _this2 = this;

            var colPositions = ClientRect.mapVertexesToAxisX(rectangles);
            var rowPositions = ClientRect.mapVertexesToAxisY(rectangles);

            var container = document.createElement('div');
            if (this.config.debug) {
                container.classList.add(this.config.classesDebug);
            }

            this.addChildren(container, rowPositions.length, 'div', function (row, i) {
                var rowInitial = rowPositions[i];
                var rowTerminal = rowPositions[i + 1];

                row.classList.add(_this2.config.classesTableRow);
                if (rowTerminal) {
                    row.style.height = _this2.px(rowTerminal - rowInitial);
                }

                _this2.addChildren(row, colPositions.length, 'div', function (cell, j) {
                    var colInitial = colPositions[j];
                    var colTerminal = colPositions[j + 1];

                    cell.classList.add(_this2.config.classesTableCell);
                    if (colTerminal) {
                        cell.style.width = _this2.px(colTerminal - colInitial);
                    }

                    if (rowTerminal !== undefined && colTerminal !== undefined) {
                        var initialPoint = new Point(colInitial, rowInitial);
                        var terminalPoint = new Point(colTerminal, rowTerminal);
                        var vector = new Vector(initialPoint, terminalPoint);

                        if (rectangles.some(function (r) {
                            return r.isVectorCollides(vector);
                        })) {
                            cell.classList.add(_this2.config.classesTableCellHole);
                        }
                    }
                });
            });

            container.classList.add(this.config.classes, this.config.classesTable);
            if (isFixed) {
                container.classList.add(this.config.classesFixed);
            }

            return container;
        }

        /**
         * @private
         * @param {number} value
         * @return {string}
         */

    }, {
        key: 'px',
        value: function px(value) {
            return value + 'px';
        }

        /**
         * @private
         * @param {Element} container
         * @param {number} count
         * @param {string} tagName
         * @param {?Function} [cb]
         */

    }, {
        key: 'addChildren',
        value: function addChildren(container, count, tagName) {
            var cb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

            for (var i = 0; i < count; i++) {
                var child = document.createElement(tagName);
                container.appendChild(child);
                if (cb) {
                    cb(child, i);
                }
            }
        }
    }]);

    return TableMaskCreator;
}(LayerMask);

module.exports = TableMaskCreator;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1),
    ClientRect = _require.ClientRect;

module.exports = {
    getPageDimensions: getPageDimensions,
    getWindowDimensions: getWindowDimensions,
    isElementFixed: isElementFixed,
    getAllBoundaries: getAllBoundaries,
    addPadding: addPadding,
    addPageOffset: addPageOffset
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
    return {
        height: document.body.scrollHeight,
        width: document.body.scrollWidth
    };
}

/**
 * @return {Dimension}
 */
function getWindowDimensions() {
    return {
        height: window.innerHeight,
        width: window.innerWidth
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
 * @return {boolean}
 */
function isElementFixed(element) {
    var parents = getParentElements(element);
    var elements = [element].concat(parents);
    return elements.some(function (element) {
        return element.style.position === 'fixed';
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
        return element.getBoundingClientRect();
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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @param {Array} array
 * @return {Array}
 */
var uniq = function uniq(array) {
    return array.reduce(function (memo, item) {
        var includes = ~memo.indexOf(item);
        return includes ? memo : memo.concat(item);
    }, []);
};

module.exports = uniq;

/***/ })
/******/ ]);
});