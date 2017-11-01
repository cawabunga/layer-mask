const $ = require('jquery');
const { ClientRect } = require('./dataTypes');

module.exports = {
    getPageDimensions,
    getWindowDimensions,
    isElementFixed,
    getAllBoundaries,
    addPadding,
    addPageOffset,
    isVectorCollides,
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
    element = $(element);
    const elements = element.add(element.parents());
    let isFixed = false;
    elements.each(function () {
        if ($(this).css("position") === "fixed") {
            isFixed = true;
            return false;
        }
    });
    return isFixed;
}

/**
 * @param {Array.<Element>} elements
 * @return {ClientRect}
 */
function getSingularBoundary(elements) {
    const rects = elements.map(function (element) {
        return element.getBoundingClientRect();
    });

    const leftValues = rects.map(function (rect) {
        return rect.left;
    });
    const rightValues = rects.map(function (rect) {
        return rect.right;
    });
    const topValues = rects.map(function (rect) {
        return rect.top;
    });
    const bottomValues = rects.map(function (rect) {
        return rect.bottom;
    });

    const left = Math.min(...leftValues);
    const right = Math.max(...rightValues);
    const top = Math.min(...topValues);
    const bottom = Math.max(...bottomValues);
    const width = right - left;
    const height = bottom - top;

    return new ClientRect(left, right, top, bottom, width, height);
}

/**
 * @param {Array.<Element>} elements
 * @return {Array.<ClientRect>}
 */
function getAllBoundaries(elements) {
    return elements.map(element => {
        return element.getBoundingClientRect();
    });
}

/**
 * @param {ClientRect} rectangular
 * @param {number} padding
 * @return {ClientRect}
 */
function addPadding(rectangular, padding) {
    const left = rectangular.left - padding;
    const right = rectangular.right + padding;
    const top = rectangular.top - padding;
    const bottom = rectangular.bottom + padding;
    const width = rectangular.width + 2 * padding;
    const height = rectangular.height + 2 * padding;

    return new ClientRect(left, right, top, bottom, width, height);
}

/**
 * @param {ClientRect} rectangular
 * @param {boolean} isFixed
 * @return {ClientRect}
 */
function addPageOffset(rectangular, isFixed) {
    const scrollDimensions = getScrollDimensions();

    const left = rectangular.left + (isFixed ? 0 : scrollDimensions.width);
    const right = rectangular.right + (isFixed ? 0 : scrollDimensions.width);
    const top = rectangular.top + (isFixed ? 0 : scrollDimensions.height);
    const bottom = rectangular.bottom + (isFixed ? 0 : scrollDimensions.height);
    const width = rectangular.width;
    const height = rectangular.height;

    return new ClientRect(left, right, top, bottom, width, height);
}

/**
 * @param {Array.<ClientRect>} rectangles
 * @param {Point} point
 * @return {boolean}
 */
function isPointCollides(rectangles, point) {
    return rectangles.reduce((memo, rectangle) => {
        const left = rectangle.left;
        const right = rectangle.left + rectangle.width;
        const top = rectangle.top;
        const bottom = rectangle.top + rectangle.height;
        return memo || (left <= point.x && point.x <= right && top <= point.y && point.y <= bottom);
    }, false);
}

/**
 * @param {Array.<ClientRect>} rectangles
 * @param {Vector} vector
 * @return {boolean}
 */
function isVectorCollides(rectangles, vector) {
    return isPointCollides(rectangles, vector.initial)
        && isPointCollides(rectangles, vector.terminal)
        && isPointCollides(rectangles, vector.getMiddlePoint());
}