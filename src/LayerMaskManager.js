const _ = require('./utils/_');
const debounce = require('lodash.debounce');

class LayerMaskManager {
    /**
     * @param {Element} container
     */
    constructor(container) {
        this._listeners = [];
        this._container = container;
        this.currentLayerMask = undefined;
        this.activeMaskElement = undefined;
        this.activeMaskElementOptions = undefined;
    }

    /**
     * @public
     * @return {Boolean}
     */
    hasActiveMask() {
        return Boolean(this.currentLayerMask);
    }

    /**
     * @public
     * @param {LayerMask} layerMask
     * @param {Object} [maskElementOptions = {}]
     * @return {Element}
     */
    revealMask(layerMask, maskElementOptions = {}) {
        if (this.activeMaskElement) {
            this.hideActiveMask();
        }

        this.currentLayerMask = layerMask;

        const maskElement = layerMask.createMask();
        this._setActiveMaskElement(maskElement);
        this._setActiveMaskElementOptions(maskElementOptions);

        this._startResizeListener();

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

        this._stopAllListeners();

        this.currentLayerMask = undefined;

        const parent = this.activeMaskElement.parentElement;
        if (parent) {
            parent.removeChild(this.activeMaskElement)
        }
        this.activeMaskElement = undefined;
        this.activeMaskElementOptions = undefined;
    }

    /**
     * @public
     * @throws {Error} Will throw an error if the layer mask instance is not passed before.
     */
    addElementsToMask(elements) {
        if (!this.currentLayerMask) {
            throw new Error('layer mask is missing');
        }

        this.currentLayerMask.addElements(elements);
        this.refreshMask();
    }

    /**
     * @public
     * @throws {Error} Will throw an error if the layer mask instance is not passed before.
     */
    removeElementsFromMask(elements) {
        if (!this.currentLayerMask) {
            throw new Error('layer mask is missing');
        }

        this.currentLayerMask.removeElements(elements);

        if (this.currentLayerMask.elements.length) {
            this.refreshMask();
        } else {
            this.hideActiveMask();
        }
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

        return this.revealMask(
            this.currentLayerMask,
            this.activeMaskElementOptions,
        );
    }

    /**
     * @private
     * @param {Element} maskElement
     */
    _setActiveMaskElement(maskElement) {
        this._container.appendChild(maskElement);
        this.activeMaskElement = maskElement;
    }

    /**
     * @private
     * @param {Object} maskElementOptions
     */
    _setActiveMaskElementOptions(maskElementOptions) {
        this.activeMaskElementOptions = maskElementOptions;

        _.forEach(maskElementOptions, (optionValue, optionKey) => {
            this._applyOption(this.activeMaskElement, optionKey, optionValue);
        });
    }

    /**
     * @private
     * @param {Element} maskElement
     * @param {string} optionKey
     * @param {*} optionValue
     */
    _applyOption(maskElement, optionKey, optionValue) {
        switch (optionKey) {
            case 'click':
                maskElement.addEventListener('click', optionValue);
                break;
        }
    }

    /**
     * @private
     */
    _startResizeListener() {
        const handler = () => this.refreshMask();
        const debouncedHandler = debounce(handler, 150);
        window.addEventListener('resize', debouncedHandler, false);
        const detach = () => {
            window.removeEventListener('resize', debouncedHandler, false);
        };
        this._listeners.push(detach);
    }

    /**
     * @private
     */
    _stopAllListeners() {
        const invoke = (fn) => fn();
        this._listeners.forEach(invoke);
        this._listeners = [];
    }
}

module.exports = LayerMaskManager;
