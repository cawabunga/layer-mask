const SVG = require('svg.js');
const _ = require('underscore');
const utils = require('./utils');
const { Point, Vector } = require('./dataTypes');

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
 */

class LayerMask {

    /**
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
        const canvasDimension = isFixed ? utils.getPageDimensions() : utils.getWindowDimensions();

        const rectangles = utils.getAllBoundaries(this.elements)
            .map(rect => utils.addPadding(rect, this.config.padding))
            .map(rect => utils.addPageOffset(rect, isFixed));

        return this.createTableMask(canvasDimension, isFixed, rectangles);
    }


    /**
     * @private
     * @param {Dimension} canvasDimension
     * @param {Boolean} isFixed
     * @param {Array.<ClientRect>} rectangles
     * @return {Element}
     */
    createCanvasMask(canvasDimension, isFixed, rectangles) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = canvasDimension.width;
        canvas.height = canvasDimension.height;
        context.fillRect(0, 0, canvasDimension.width, canvasDimension.height);

        rectangles.forEach(r => {
            context.clearRect(r.left, r.top, r.width, r.height);
        });

        canvas.classList.add(this.config.classes, this.config.classesCanvas);
        if (isFixed) {
            canvas.classList.add(this.config.classesFixed);
        }

        return canvas;
    }

    /**
     * @private
     * @param {Dimension} canvasDimension
     * @param {Boolean} isFixed
     * @param {Array.<ClientRect>} rectangles
     * @return {Element}
     */
    createPathSvgMask(canvasDimension, isFixed, rectangles) {
        const container = document.createElement('div');
        const draw = SVG(container).size(canvasDimension.width, canvasDimension.height);

        const group = draw.group();
        const rectPathStr = `M 0,0 h ${canvasDimension.width} v ${canvasDimension.height} h -${canvasDimension.width} z`;
        const paths = rectangles.reduce((memo, r) => {
            const path = `M ${r.left},${r.top} v ${r.height} h ${r.width} v -${r.height} z`;
            return memo.concat(path);
        }, [rectPathStr]);
        const path = group.path(paths.join(' '));
        path.fill({ color: '#f06', rule: 'nonzero' });

        draw.node.classList.add(this.config.classes, this.config.classesSvg);
        if (isFixed) {
            draw.node.classList.add(this.config.classesFixed);
        }

        return draw.node;
    }

    /**
     * @private
     * @param {Dimension} canvasDimension
     * @param {Boolean} isFixed
     * @param {Array.<ClientRect>} rectangles
     * @return {Element}
     */
    createMaskSvgMask(canvasDimension, isFixed, rectangles) {
        const container = document.createElement('div');
        const draw = SVG(container).size(canvasDimension.width, canvasDimension.height);

        const mask = draw.mask();
        mask.rect(canvasDimension.width, canvasDimension.height).fill('white');
        rectangles.forEach(r => {
            mask.rect(r.width, r.height).move(r.left, r.top);
        });

        const rect = draw.rect(canvasDimension.width, canvasDimension.height).fill('#f06');
        rect.maskWith(mask);

        draw.node.classList.add(this.config.classes, this.config.classesSvg);
        if (isFixed) {
            draw.node.classList.add(this.config.classesFixed);
        }

        return draw.node;
    }


    /**
     * @private
     * @param {Dimension} canvasDimension
     * @param {Boolean} isFixed
     * @param {Array.<ClientRect>} rectangles
     * @return {Element}
     */
    createTableMask(canvasDimension, isFixed, rectangles) {

        const rowPositions = _.chain(rectangles)
            .reduce((memo, r) => {
                return memo.concat([r.top, r.top + r.height]);
            }, [0])
            .uniq()
            .sort((a, b) => a - b)
            .value();

        const colPositions = _.chain(rectangles)
            .reduce((memo, r) => {
                return memo.concat([r.left, r.left + r.width]);
            }, [0])
            .uniq()
            .sort((a, b) => a - b)
            .value();

        const container = document.createElement('div');
        if (this.config.debug) {
            container.classList.add(this.config.classesDebug);
        }


        addChildren(container, rowPositions.length, 'div', (row, i) => {
            const rowInitial = rowPositions[i];
            const rowTerminal = rowPositions[i + 1];

            row.classList.add(this.config.classesTableRow);
            if (rowTerminal) {
                row.style.height = px(rowTerminal - rowInitial);
            }

            addChildren(row, colPositions.length, 'div', (cell, j) => {
                const colInitial = colPositions[j];
                const colTerminal = colPositions[j + 1];

                cell.classList.add(this.config.classesTableCell);
                if (colTerminal) {
                    cell.style.width = px(colTerminal - colInitial);
                }

                if (rowTerminal !== undefined && colTerminal !== undefined) {
                    const initialPoint = new Point(colInitial, rowInitial);
                    const terminalPoint = new Point(colTerminal, rowTerminal);
                    const vector = new Vector(initialPoint, terminalPoint);

                    if (utils.isVectorCollides(rectangles, vector)) {
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

}

function px(value) {
    return `${value}px`;
}

function addChildren(container, count, tagName = 'div', cb = undefined) {
    _.times(count, (i) => {
        const child = document.createElement(tagName);
        container.appendChild(child);
        if (cb) {
            cb(child, i);
        }
    });
}

module.exports = LayerMask;