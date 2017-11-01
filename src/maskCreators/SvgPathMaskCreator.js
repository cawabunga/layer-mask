const SVG = require('svg.js');
const LayerMask = require('./LayerMask');

/**
 * Actually it is not working, could not click through the holes
 */
class SvgPathMaskCreator extends LayerMask {

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

}

module.exports = SvgPathMaskCreator;