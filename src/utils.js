const $ = require('jquery');
const { ClientRect } = require('./dataTypes');

module.exports = {
    getPageDimensions,
    getWindowDimensions,
    isElementFixed,
    getAllBoundaries,
    addPadding,
    addPageOffset,
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