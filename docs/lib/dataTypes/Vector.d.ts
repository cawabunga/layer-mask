import { Point } from './Point';
export declare class Vector {
    initial: Point;
    terminal: Point;
    constructor(point1: Point, point2: Point);
    getMiddlePoint(): Point;
}
