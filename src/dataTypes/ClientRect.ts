import { flatten } from '../utils/_';
import { Point } from './Point';
import { Vector } from './Vector';

/**
 * @descr It is similar to an abstract Rectangle class, but with inverted Y axis
 */
export class ClientRect {
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;

    constructor(left: number, right: number, top: number, bottom: number) {
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

    static from(hostClientRect: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    }): ClientRect {
        const { left, right, top, bottom } = hostClientRect;
        return new this(left, right, top, bottom);
    }

    isPointCollides(point: Point): boolean {
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

    isVectorCollides(vector: Vector): boolean {
        return (
            this.isPointCollides(vector.initial) &&
            this.isPointCollides(vector.terminal) &&
            this.isPointCollides(vector.getMiddlePoint())
        );
    }

    getVertexes(): Point[] {
        return [
            new Point(this.left, this.top),
            new Point(this.left + this.width, this.top),
            new Point(this.left + this.width, this.top + this.height),
            new Point(this.left, this.top + this.height),
        ];
    }

    static getVertexes(rectangles: ClientRect[]): Point[] {
        const vertexes = rectangles.map((r) => r.getVertexes());
        return flatten(vertexes);
    }

    static combine(rectangles: ClientRect[]): ClientRect {
        const vertexes = this.getVertexes(rectangles);

        const X = vertexes.map((v) => v.x);
        const Y = vertexes.map((v) => v.y);

        const left = Math.min.apply(null, X);
        const right = Math.max.apply(null, X);
        const top = Math.min.apply(null, Y);
        const bottom = Math.max.apply(null, Y);

        return new this(left, right, top, bottom);
    }
}
