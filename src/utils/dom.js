const { ClientRect } = require('../dataTypes');

module.exports = {
    getPageDimensions,
    getWindowDimensions,
    isElementFixed,
    getAllBoundaries,
    addPadding,
    addPageOffset,
    addClasses,
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
    const contentDimension = getContentDimensions();
    const windowDimension = getWindowDimensions();

    return {
        height: Math.max(contentDimension.height, windowDimension.height),
        width: Math.max(contentDimension.width, windowDimension.width),
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
    const parents = getParentElements(element);
    const elements = [element].concat(parents);
    return elements.some(element => css(element, 'position') === 'fixed');
}

/**
 * @param {Element} element
 * @return {Array.<Element>}
 */
function getParentElements(element) {
    const parents = [];

    let child = element;
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
 * @param {Element} element
 * @param {string} classes
 */
function addClasses(element, classes) {
    const classArr = classes.split(' ');
    element.classList.add(...classArr);
}