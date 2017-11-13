
class MaskManager {

    /**
     * @param {Element} container
     */
    constructor(container) {
        this.container = container;
        this.currentLayerMask = undefined;
        this.activeMaskElement = undefined;
    }

    /**
     * @public
     * @param {LayerMask} layerMask
     * @return {Element}
     */
    revealMask(layerMask) {
        if (this.activeMaskElement) {
            this.hideActiveMask();
        }

        this.currentLayerMask = layerMask;

        const maskElement = layerMask.createMask();
        this.setActiveMask(maskElement);

        return maskElement;
    }

    /**
     * @public
     * @throws {Error} Will throw an error if the mask element is not defined.
     */
    hideActiveMask() {
        if (!this.activeMaskElement) {
            throw new Error('mask element is missing');
        }

        this.activeMaskElement.remove();
        this.activeMaskElement = undefined;
    }

    /**
     * @public
     * @throws {Error} Will throw an error if the layer mask instance is not passed before.
     * @return {Element}
     */
    refreshMask() {
        if (!this.currentLayerMask) {
            throw new Error('layer mask is missing');
        }

        return this.revealMask(this.currentLayerMask);
    }

    /**
     * @private
     * @param {Element} maskElement
     */
    setActiveMask(maskElement) {
        this.container.appendChild(maskElement);
        this.activeMaskElement = maskElement;
    }

}

module.exports = MaskManager;