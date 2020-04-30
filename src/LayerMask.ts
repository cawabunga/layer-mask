import { forEach, withoutSingle } from './utils/_';
import * as domUtils from './utils/dom';
import { Point, Vector, ClientRect } from './dataTypes/index';
import type { Dimension } from './utils/dom';

type LayerMaskConfig = {
    padding: number;
    singular: boolean; // say to build the only one hole in the mask that cover all target elements
    rootClass: string;
    modifiers: string[]; // modifiers that appended to root class. Predefined: "debug", "click-through" and "spotlight"
    classesTable: string;
    classesTableRow: string;
    classesTableCell: string;
    classesTableCellHole: string;
    classesDebug?: string;
};

type ElementList = NodeList | HTMLElement | Element[];

export class LayerMask {
    elements: HTMLElement[];
    private config: LayerMaskConfig;

    static get defaults(): LayerMaskConfig {
        return {
            padding: 0,
            singular: false,
            rootClass: 'layer-mask',
            modifiers: [],
            classesTable: 'layer-mask-table',
            classesTableRow: 'layer-mask-table__row',
            classesTableCell: 'layer-mask-table__cell',
            classesTableCellHole: 'layer-mask-table__cell--hole',
        };
    }

    constructor(
        elements: ElementList,
        config: void | Partial<LayerMaskConfig> = {},
    ) {
        this.config = Object.assign({}, LayerMask.defaults, config);
        this.elements = [];
        this.addElements(elements);
    }

    /**
     * @public
     * @param {NodeList|Element|Array.<Element>} elements
     */
    addElements(elements: ElementList): void {
        let localElements;
        if (elements instanceof HTMLElement) {
            localElements = [elements];
        } else {
            localElements = [].slice.call(elements);
        }
        this.elements = this.elements.concat(localElements);
    }

    /**
     * @public
     * @param {NodeList|Element|Array.<Element>} elements
     */
    removeElements(elements: ElementList) {
        let localElements;
        if (elements instanceof HTMLElement) {
            localElements = [elements];
        } else {
            localElements = [].slice.call(elements);
        }
        this.elements = withoutSingle(this.elements, ...localElements);
    }

    createMask(): HTMLElement {
        const isFixed = domUtils.isElementFixed(this.elements[0]);
        const canvasDimension = isFixed
            ? domUtils.getWindowDimensions()
            : domUtils.getPageDimensions();

        const sourceRectangles = domUtils.getAllBoundaries(this.elements);
        const rectangles = (!this.config.singular
            ? sourceRectangles
            : [ClientRect.combine(sourceRectangles)]
        )
            .map((rect) => domUtils.addPadding(rect, this.config.padding))
            .map((rect) => domUtils.addPageOffset(rect, isFixed));

        const containerElement = this.buildContainer(canvasDimension, isFixed);
        this.appendMask(containerElement, rectangles, canvasDimension);

        return containerElement;
    }

    buildContainer(canvasDimension: Dimension, isFixed: boolean): HTMLElement {
        const container = document.createElement('div');

        container.style.width = `${canvasDimension.width}px`;
        container.style.height = `${canvasDimension.height}px`;

        domUtils.addClasses(container, this.config.rootClass);

        this.getModifiers(isFixed).forEach((modifier) => {
            const cssClass = this.createModifierCssClass(modifier);
            domUtils.addClasses(container, cssClass);
        });

        return container;
    }

    private createModifierCssClass(modifier: string): string {
        return `${this.config.rootClass}--${modifier}`;
    }

    private getModifiers(isFixed: boolean): string[] {
        const modifiers = ([] as string[]).concat(this.config.modifiers);

        if (isFixed) {
            modifiers.push('fixed');
        }

        return modifiers;
    }

    appendMask(
        container: HTMLElement,
        rectangles: ClientRect[],
        canvasDimension: Dimension,
    ): HTMLElement {
        domUtils.addClasses(container, this.config.classesTable);

        const p0 = new Point(0, 0);
        const pN = new Point(canvasDimension.width, canvasDimension.height);

        const vertexes = ClientRect.getVertexes(rectangles);
        const points = [p0, pN].concat(...vertexes);

        const colPositions = Point.mapX(points).filter((number) => number >= 0);
        const rowPositions = Point.mapY(points).filter((number) => number >= 0);

        const rowsCount = rowPositions.length - 1;
        const colsCount = colPositions.length - 1;

        const rows = this.buildTable(rowsCount, colsCount);

        forEach(rows, (rowEl, i) => {
            domUtils.addClasses(rowEl, this.config.classesTableRow);

            const rowInitial = rowPositions[i];
            const rowTerminal = rowPositions[i + 1];

            rowEl.style.height = `${rowTerminal - rowInitial}px`;

            forEach(rowEl.childNodes, (cellEl, j) => {
                domUtils.addClasses(cellEl, this.config.classesTableCell);

                const colInitial = colPositions[j];
                const colTerminal = colPositions[j + 1];

                cellEl.style.width = `${colTerminal - colInitial}px`;

                // Check collision
                const initialPoint = new Point(colInitial, rowInitial);
                const terminalPoint = new Point(colTerminal, rowTerminal);
                const vector = new Vector(initialPoint, terminalPoint);

                if (rectangles.some((r) => r.isVectorCollides(vector))) {
                    domUtils.addClasses(
                        cellEl,
                        this.config.classesTableCellHole,
                    );
                }
            });
        });

        forEach(rows, (el, i) => {
            container.appendChild(el);
        });

        return container;
    }

    private buildTable(rowsCount: number, colsCount: number): HTMLElement[] {
        const rows = [];

        for (let i = 0; i < rowsCount; i++) {
            const rowEl = document.createElement('div');
            rows.push(rowEl);

            for (let j = 0; j < colsCount; j++) {
                const cellEl = document.createElement('div');
                rowEl.appendChild(cellEl);
            }
        }

        return rows;
    }
}
