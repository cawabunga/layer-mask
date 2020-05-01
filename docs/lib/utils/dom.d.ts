import { ClientRect } from '../dataTypes/ClientRect';
export declare type Dimension = {
    width: number;
    height: number;
};
export declare function getPageDimensions(): Dimension;
export declare function getWindowDimensions(): Dimension;
export declare function isElementFixed(element: HTMLElement): boolean;
export declare function getAllBoundaries(elements: HTMLElement[]): ClientRect[];
export declare function addPadding(rectangular: ClientRect, padding: number): ClientRect;
export declare function addPageOffset(rectangular: ClientRect, isFixed: boolean): ClientRect;
export declare function addClasses(element: HTMLElement, classes: string): void;
