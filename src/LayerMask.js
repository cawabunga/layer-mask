const utils = require('./utils');
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
        const isFixed = utils.isElementFixed(this.elements[0]);
        const canvasDimension = isFixed ? utils.getWindowDimensions() : utils.getPageDimensions();

        const rectangles = utils.getAllBoundaries(this.elements)
            .map(rect => utils.addPadding(rect, this.config.padding))
            .map(rect => utils.addPageOffset(rect, isFixed));

        return this.buildMask(canvasDimension, isFixed, rectangles);
    }

    /**
     * @private
     * @param {Dimension} canvasDimension
     * @param {Boolean} isFixed
     * @param {Array.<ClientRect>} rectangles
     * @return {Element}
     */
    buildMask(canvasDimension, isFixed, rectangles) {
        const colPositions = ClientRect.mapVertexesToAxisX(rectangles);
        const rowPositions = ClientRect.mapVertexesToAxisY(rectangles);

        const container = document.createElement('div');

        container.style.width = this.px(canvasDimension.width);
        container.style.height = this.px(canvasDimension.height);

        if (this.config.debug) {
            container.classList.add(this.config.classesDebug);
        }

        this.addChildren(container, rowPositions.length, 'div', (row, i) => {
            const rowInitial = rowPositions[i];
            const rowTerminal = rowPositions[i + 1];

            row.classList.add(this.config.classesTableRow);
            if (rowTerminal) {
                row.style.height = this.px(rowTerminal - rowInitial);
            }

            this.addChildren(row, colPositions.length, 'div', (cell, j) => {
                const colInitial = colPositions[j];
                const colTerminal = colPositions[j + 1];

                cell.classList.add(this.config.classesTableCell);
                if (colTerminal) {
                    cell.style.width = this.px(colTerminal - colInitial);
                }

                if (rowTerminal !== undefined && colTerminal !== undefined) {
                    const initialPoint = new Point(colInitial, rowInitial);
                    const terminalPoint = new Point(colTerminal, rowTerminal);
                    const vector = new Vector(initialPoint, terminalPoint);

                    if (rectangles.some(r => r.isVectorCollides(vector))) {
                        cell.classList.add(this.config.classesTableCellHole);
                    }
                }
            });
        });

        container.classList.add(this.config.classes, this.config.classesTable);
        if (isFixed) {
            container.classList.add(this.config.classesFixed);
        }

        return container;
    }

    /**
     * @private
     * @param {number} value
     * @return {string}
     */
    px(value) {
        return `${value}px`;
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