import { Point } from './Point';

export class Vector {
    initial: Point;
    terminal: Point;

    constructor(point1: Point, point2: Point) {
        this.initial = point1;
        this.terminal = point2;
    }

    getMiddlePoint(): Point {
        const x = (this.initial.x + this.terminal.x) / 2;
        const y = (this.initial.y + this.terminal.y) / 2;
        return new Point(x, y);
    }
}
