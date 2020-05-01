export declare class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
    static mapX(points: Point[]): number[];
    static mapY(points: Point[]): number[];
}
