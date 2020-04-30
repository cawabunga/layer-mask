const _ = require('../utils/_');
const Point = require('./Point');

/**
 * @name ClientRect
 * @descr It is similar to an abstract Rectangle class, but with inverted Y axis
 */
class ClientRect {
    /**
     * @param {number} left
     * @param {number} right
     * @param {number} top
     * @param {number} bottom
     */
    constructor(left, right, top, bottom) {
        if (left > right) {
            throw new TypeError(
                'inconsistent rectangle: right value should be bigger than left value',
            );
        }
        if (top > bottom) {
            throw new TypeError(
                'inconsistent rectangle: bottom value should be bigger than top value',
            );
        }

        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.width = right - left;
        this.height = bottom - top;
    }

    /**
     * @static
     * @param {Object.<top, left, bottom, right>} hostClientRect
     * @return {ClientRect}
     */
    static from(hostClientRect) {
        const { left, right, top, bottom } = hostClientRect;
        return new this(left, right, top, bottom);
    }

    /**
     * @public
     * @param {Point} point
     * @return {boolean}
     */
    isPointCollides(point) {
        const left = this.left;
        const right = this.left + this.width;
        const top = this.top;
        const bottom = this.top + this.height;
        return (
            left <= point.x &&
            point.x <= right &&
            top <= point.y &&
            point.y <= bottom
        );
    }

    /**
     * @public
     * @param {Vector} vector
     * @return {boolean}
     */
    isVectorCollides(vector) {
        return (
            this.isPointCollides(vector.initial) &&
            this.isPointCollides(vector.terminal) &&
            this.isPointCollides(vector.getMiddlePoint())
        );
    }

    /**
     * @public
     * @returns {Array.<Point>} Points are in the clockwise order
     */
    getVertexes() {
        return [
            new Point(this.left, this.top),
            new Point(this.left + this.width, this.top),
            new Point(this.left + this.width, this.top + this.height),
            new Point(this.left, this.top + this.height),
        ];
    }

    /**
     * @static
     * @param {Array.<ClientRect>} rectangles
     * @return {Array.<Point>}
     */
    static getVertexes(rectangles) {
        const vertexes = rectangles.map((r) => r.getVertexes());
        return _.flatten(vertexes);
    }

    /**
     * @static
     * @param {Array.<ClientRect>} rectangles
     * @return {ClientRect}
     */
    static combine(rectangles) {
        const vertexes = this.getVertexes(rectangles);

        const X = vertexes.map((v) => v.x);
        const Y = vertexes.map((v) => v.y);

        const left = Math.min(...X);
        const right = Math.max(...X);
        const top = Math.min(...Y);
        const bottom = Math.max(...Y);

        return new this(left, right, top, bottom);
    }
}

module.exports = ClientRect;
