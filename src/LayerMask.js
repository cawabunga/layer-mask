const domUtils = require('./utils/dom');
const { Point, Vector, ClientRect } = require('./dataTypes');

class LayerMask {

    /**
     * @typedef {Object} LayerMaskConfig
     *
     * @property {boolean} [debug]
     * @property {number} [padding]
     * @property {string} [classes]
     * @property {string} [classesCanvas]
     * @property {string} [classesSvg]
     * @property {string} [classesFixed]
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
            debug: false,
            padding: 0,
            classes: 'layer-mask',
            classesDebug: 'layer-mask--debug',
            classesTable: 'layer-mask-table',
            classesTableRow: 'layer-mask-table__row',
            classesTableCell: 'layer-mask-table__cell',
            classesTableCellHole: 'layer-mask-table__cell--hole',
            classesCanvas: 'layer-mask--canvas',
            classesSvg: 'layer-mask--svg',
            classesFixed: 'layer-mask--fixed',
        };
    }

    /**
     * @param {NodeList|Element} elements
     * @param {LayerMaskConfig} config
     */
    constructor(elements, config) {
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

        const rectangles = domUtils.getAllBoundaries(this.elements)
            .map(rect => domUtils.addPadding(rect, this.config.padding))
            .map(rect => domUtils.addPageOffset(rect, isFixed));

        const containerElement = this.buildContainer(canvasDimension, isFixed);
        this.appendMask(containerElement, rectangles);

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

        domUtils.addClasses(container, this.config.classes);
        if (isFixed) {
            domUtils.addClasses(container, this.config.classesFixed);
        }
        if (this.config.debug) {
            domUtils.addClasses(container, this.config.classesDebug);
        }

        return container;
    }

    /**
     * @private
     * @param {Element} container
     * @param {Array.<ClientRect>} rectangles
     * @return {Element}
     */
    appendMask(container, rectangles) {
        domUtils.addClasses(container, this.config.classesTable);

        const colPositions = ClientRect.mapVertexesToAxisX(rectangles);
        const rowPositions = ClientRect.mapVertexesToAxisY(rectangles);

        this.addChildren(container, rowPositions.length, 'div', (row, i) => {
            const rowInitial = rowPositions[i];
            const rowTerminal = rowPositions[i + 1];

            domUtils.addClasses(row, this.config.classesTableRow);
            if (rowTerminal) {
                row.style.height = `${rowTerminal - rowInitial}px`;
            }

            this.addChildren(row, colPositions.length, 'div', (cell, j) => {
                const colInitial = colPositions[j];
                const colTerminal = colPositions[j + 1];

                domUtils.addClasses(cell, this.config.classesTableCell);
                if (colTerminal) {
                    cell.style.width = `${colTerminal - colInitial}px`;
                }

                if (rowTerminal !== undefined && colTerminal !== undefined) {
                    const initialPoint = new Point(colInitial, rowInitial);
                    const terminalPoint = new Point(colTerminal, rowTerminal);
                    const vector = new Vector(initialPoint, terminalPoint);

                    if (rectangles.some(r => r.isVectorCollides(vector))) {
                        domUtils.addClasses(cell, this.config.classesTableCellHole);
                    }
                }
            });
        });

        return container;
    }

    /**
     * @private
     * @param {Element} container
     * @param {number} count
     * @param {string} tagName
     * @param {?Function} [cb]
     */
    addChildren(container, count, tagName, cb = undefined) {
        for (let i = 0; i < count; i++) {
            const child = document.createElement(tagName);
            container.appendChild(child);
            if (cb) {
                cb(child, i);
            }
        }
    }

}

module.exports = LayerMask;