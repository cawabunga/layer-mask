import { ClientRect } from './dataTypes/index';
import type { Dimension } from './utils/dom';
declare type LayerMaskConfig = {
    padding: number;
    singular: boolean;
    rootClass: string;
    modifiers: string[];
    classesTable: string;
    classesTableRow: string;
    classesTableCell: string;
    classesTableCellHole: string;
    classesDebug?: string;
};
declare type ElementList = NodeList | HTMLElement | Element[];
export declare class LayerMask {
    elements: HTMLElement[];
    private config;
    static get defaults(): LayerMaskConfig;
    constructor(elements: ElementList, config?: void | Partial<LayerMaskConfig>);
    /**
     * @public
     * @param {NodeList|Element|Array.<Element>} elements
     */
    addElements(elements: ElementList): void;
    /**
     * @public
     * @param {NodeList|Element|Array.<Element>} elements
     */
    removeElements(elements: ElementList): void;
    createMask(): HTMLElement;
    buildContainer(canvasDimension: Dimension, isFixed: boolean): HTMLElement;
    private createModifierCssClass;
    private getModifiers;
    appendMask(container: HTMLElement, rectangles: ClientRect[], canvasDimension: Dimension): HTMLElement;
    private buildTable;
}
export {};
