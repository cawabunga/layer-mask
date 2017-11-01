const SVG = require('svg.js');
const LayerMask = require('./LayerMask');

/**
 * Actually it is not working, could not click through the holes
 */
class SvgMaskCreator extends LayerMask {

    /**
     * @private
     * @param {Dimension} canvasDimension
     * @param {Boolean} isFixed
     * @param {Array.<ClientRect>} rectangles
     * @return {Element}
     */
    buildMask(canvasDimension, isFixed, rectangles) {
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

module.exports = SvgMaskCreator;