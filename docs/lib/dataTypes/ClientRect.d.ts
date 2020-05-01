import { Point } from './Point';
import { Vector } from './Vector';
/**
 * @descr It is similar to an abstract Rectangle class, but with inverted Y axis
 */
export declare class ClientRect {
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;
    constructor(left: number, right: number, top: number, bottom: number);
    static from(hostClientRect: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    }): ClientRect;
    isPointCollides(point: Point): boolean;
    isVectorCollides(vector: Vector): boolean;
    getVertexes(): Point[];
    static getVertexes(rectangles: ClientRect[]): Point[];
    static combine(rectangles: ClientRect[]): ClientRect;
}
