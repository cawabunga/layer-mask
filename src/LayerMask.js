const _ = require('./utils/_');
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