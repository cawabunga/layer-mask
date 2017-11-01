const SVG = require('svg.js');
const utils = require('./utils');

/**
 * @typedef {Object} LayerMaskConfig
 *
 * @property {number} [padding]
 * @property {string} [classes]
 * @property {string} [classesCanvas]
 * @property {string} [classesSvg]
 * @property {string} [classesFixed]
 */

class LayerMask {

    /**
     * @static
     * @return {LayerMaskConfig}
     */
    static get defaults() {
        return {
            padding: 0,
            classes: 'layer-mask',
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
        this.config = Object.assign({}, config, this.constructor.defaults);
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

        return this.createPathSvgMask(canvasDimension, isFixed, rectangles);
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

}

module.exports = LayerMask;