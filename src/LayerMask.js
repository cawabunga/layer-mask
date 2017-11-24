const _ = require('./utils/_');
const domUtils = require('./utils/dom');
const { Point, Vector, ClientRect } = require('./dataTypes');

class LayerMask {

    /**
     * @typedef {Object} LayerMaskConfig
     *
     * @property {number} [padding]
     * @property {boolean} [singular] say to build the only one hole in the mask that cover all target elements
     * @property {string} [rootClass]
     * @property {Array.<string>} [modifiers] modifiers that appended to root class. Predefined: "debug", "click-through" and "spotlight"
     * @property {string} [classesTable]
     * @property {string} [classesTableRow]
     * @property {string} [classesTableCell]
     * @property {string} [classesTableCellHole]
     * @property {string} [classesDebug]
     *
     *
     * @static
     * @return {LayerMaskConfig}
     */
    static get defaults() {
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

    /**
     * @param {NodeList|Element|Array.<Element>} elements
     * @param {LayerMaskConfig} [config = {}]
     */
    constructor(elements, config = {}) {
        this.config = Object.assign({}, this.constructor.defaults, config);
        this.elements = elements.length ? [].slice.call(elements) : [elements];
    }

    /**
     * @public
     * @return {Element}
     */
    createMask() {
        const isFixed = domUtils.isElementFixed(this.elements[0]);
        const canvasDimension = isFixed ? domUtils.getWindowDimensions() : domUtils.getPageDimensions();

        const sourceRectangles = domUtils.getAllBoundaries(this.elements);
        const rectangles = (!this.config.singular ? sourceRectangles : [ClientRect.combine(sourceRectangles)])
            .map(rect => domUtils.addPadding(rect, this.config.padding))
            .map(rect => domUtils.addPageOffset(rect, isFixed));

        const containerElement = this.buildContainer(canvasDimension, isFixed);
        this.appendMask(containerElement, rectangles, canvasDimension);

        return containerElement;
    }

    /**
     * @private
     * @param {Dimension} canvasDimension
     * @param {Boolean} isFixed
     * @return {Element}
     */
    buildContainer(canvasDimension, isFixed) {
        const container = document.createElement('div');

        container.style.width = `${canvasDimension.width}px`;
        container.style.height = `${canvasDimension.height}px`;

        domUtils.addClasses(container, this.config.rootClass);

        this.getModifiers(isFixed).forEach(modifier => {
            const cssClass = this.createModifierCssClass(modifier);
            domUtils.addClasses(container, cssClass);
        });

        return container;
    }

    /**
     * @private
     * @param {string} modifier
     * @return {string}
     */
    createModifierCssClass(modifier) {
        return `${this.config.rootClass}--${modifier}`;
    }


    /**
     * @private
     * @param {boolean} isFixed
     * @return {Array.<string>}
     */
    getModifiers(isFixed) {
        const modifiers = [].concat(this.config.modifiers);

        if (isFixed) {
            modifiers.push('fixed');
        }

        return modifiers;
    }

    /**
     * @private
     * @param {Element} container
     * @param {Array.<ClientRect>} rectangles
     * @param {Dimension} canvasDimension
     * @return {Element}
     */
    appendMask(container, rectangles, canvasDimension) {
        domUtils.addClasses(container, this.config.classesTable);

        const p0 = new Point(0, 0);
        const pN = new Point(canvasDimension.width, canvasDimension.height);

        const vertexes = ClientRect.getVertexes(rectangles);
        const points = [p0, pN].concat(...vertexes);

        const colPositions = Point.mapX(points);
        const rowPositions = Point.mapY(points);

        const rowsCount = rowPositions.length - 1;
        const colsCount = colPositions.length - 1;

        const rows = this.buildTable(rowsCount, colsCount);

        _.forEach(rows, (rowEl, i) => {
            domUtils.addClasses(rowEl, this.config.classesTableRow);

            const rowInitial = rowPositions[i];
            const rowTerminal = rowPositions[i + 1];

            rowEl.style.height = `${rowTerminal - rowInitial}px`;

            _.forEach(rowEl.childNodes, (cellEl, j) => {
                domUtils.addClasses(cellEl, this.config.classesTableCell);

                const colInitial = colPositions[j];
                const colTerminal = colPositions[j + 1];

                cellEl.style.width = `${colTerminal - colInitial}px`;

                // Check collision
                const initialPoint = new Point(colInitial, rowInitial);
                const terminalPoint = new Point(colTerminal, rowTerminal);
                const vector = new Vector(initialPoint, terminalPoint);

                if (rectangles.some(r => r.isVectorCollides(vector))) {
                    domUtils.addClasses(cellEl, this.config.classesTableCellHole);
                }
            });
        });

        _.forEach(rows, (el, i) => {
            container.appendChild(el);
        });

        return container;
    }

    /**
     * @private
     * @param {number} rowsCount
     * @param {number} colsCount
     * @return {Array.<Element>}
     */
    buildTable(rowsCount, colsCount) {
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

module.exports = LayerMask;