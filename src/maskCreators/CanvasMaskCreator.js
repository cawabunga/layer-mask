const LayerMask = require('./LayerMask');

/**
 * Actually it is not working, could not click through the holes
 */
class CanvasMaskCreator extends LayerMask {

    /**
     * @private
     * @param {Dimension} canvasDimension
     * @param {Boolean} isFixed
     * @param {Array.<ClientRect>} rectangles
     * @return {Element}
     */
    buildMask(canvasDimension, isFixed, rectangles) {
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

}

module.exports = CanvasMaskCreator;