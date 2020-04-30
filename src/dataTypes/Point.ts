import { uniq } from '../utils/_';

export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static mapX(points: Point[]): number[] {
        const positions = points.map((p) => p.x);
        return uniq(positions).sort((a, b) => a - b);
    }

    static mapY(points: Point[]): number[] {
        const positions = points.map((p) => p.y);
        return uniq(positions).sort((a, b) => a - b);
    }
}
