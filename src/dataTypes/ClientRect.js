const uniq = require('../utils/uniq');

/**
 * @name ClientRect
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
     * @static
     * @param {Array.<ClientRect>} rectangles
     * @returns {Array.<number>}
     */
    static mapVertexesToAxisX(rectangles) {
        const abscissas = rectangles.reduce((memo, r) =>  memo.concat([r.left, r.left + r.width]), [0]);
        return uniq(abscissas).sort((a, b) => a - b);
    }

    /**
     * @static
     * @param {Array.<ClientRect>} rectangles
     * @returns {Array.<number>}
     */
    static mapVertexesToAxisY(rectangles) {
        const ordinates = rectangles.reduce((memo, r) =>  memo.concat([r.top, r.top + r.height]), [0]);
        return uniq(ordinates).sort((a, b) => a - b);
    }

}

module.exports = ClientRect;