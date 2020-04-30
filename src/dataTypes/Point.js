const _ = require('../utils/_');

/**
 * @name Point
 */
class Point {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * @static
     * @param {Array.<Point>} points
     * @returns {Array.<number>}
     */
    static mapX(points) {
        const positions = points.map((p) => p.x);
        return _.uniq(positions).sort((a, b) => a - b);
    }

    /**
     * @static
     * @param {Array.<Point>} points
     * @returns {Array.<number>}
     */
    static mapY(points) {
        const positions = points.map((p) => p.y);
        return _.uniq(positions).sort((a, b) => a - b);
    }
}

module.exports = Point;
