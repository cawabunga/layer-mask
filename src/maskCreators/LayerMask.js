const utils = require('../utils');

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
        const canvasDimension = isFixed ? utils.getPageDimensions() : utils.getWindowDimensions();

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
        throw new Error('not implemented');
    }

}

module.exports = LayerMask;