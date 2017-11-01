const LayerMask = require('./LayerMask');

class MaskManager {

    /**
     * @param {Element} container
     */
    constructor(container) {
        this.container = container;
        this.activeMask = undefined;
    }

    /**
     * @public
     * @param {NodeList|Element} elements
     * @param {LayerMaskConfig} layerMaskConfig
     * @return {Element}
     */
    revealMask(elements, layerMaskConfig = {}) {
        if (this.activeMask) {
            this.hideActiveMask();
        }

        const layerMask = new LayerMask(elements, layerMaskConfig);
        const maskElement = layerMask.createMask();
        this.setActiveMask(maskElement);

        return maskElement;
    }

    /**
     * @public
     */
    hideActiveMask() {
        this.activeMask.remove();
        this.activeMask = undefined;
    }

    /**
     * @private
     * @param {Element} maskElement
     */
    setActiveMask(maskElement) {
        this.container.appendChild(maskElement);
        this.activeMask = maskElement;
    }

}

module.exports = MaskManager;