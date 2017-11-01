const Point = require('./Point');

/**
 * @name Vector
 */
class Vector {

    /**
     * @param {Point} point1
     * @param {Point} point2
     */
    constructor(point1, point2) {
        this.initial = point1;
        this.terminal = point2;
    }

    /**
     * @public
     * @return {Point}
     */
    getMiddlePoint() {
        const x = (this.initial.x + this.terminal.x) / 2;
        const y = (this.initial.y + this.terminal.y) / 2;
        return new Point(x, y);
    }
}

module.exports = Vector;