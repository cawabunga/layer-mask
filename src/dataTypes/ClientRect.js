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
}

module.exports = ClientRect;