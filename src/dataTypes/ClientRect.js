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
     * @param {number} width
     * @param {number} height
     */
    constructor(left, right, top, bottom, width, height) {
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
    isPointCollides(point) {
        const left = this.left;
        const right = this.left + this.width;
        const top = this.top;
        const bottom = this.top + this.height;
        return left <= point.x && point.x <= right && top <= point.y && point.y <= bottom;
    }

    /**
     * @public
     * @param {Vector} vector
     * @return {boolean}
     */
    isVectorCollides(vector) {
        return this.isPointCollides(vector.initial)
            && this.isPointCollides(vector.terminal)
            && this.isPointCollides(vector.getMiddlePoint());
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
     */
    static getVertexes(rectangles) {
        const vertexes = rectangles.map(r => r.getVertexes());
        return _.flatten(vertexes);
    }

}

module.exports = ClientRect;