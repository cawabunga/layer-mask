import debounce from 'lodash/debounce';
import { forEach } from './utils/_';
import { LayerMask } from './LayerMask';

export class LayerMaskManager {
    _listeners: (() => void)[] = [];
    _container: HTMLElement;
    activeMaskElementOptions: undefined | {};
    currentLayerMask: undefined | LayerMask;
    activeMaskElement: undefined | HTMLElement;

    constructor(container: HTMLElement) {
        this._container = container;
        this.currentLayerMask = undefined;
        this.activeMaskElement = undefined;
        this.activeMaskElementOptions = undefined;
    }

    hasActiveMask(): boolean {
        return Boolean(this.currentLayerMask);
    }

    revealMask(layerMask: LayerMask, maskElementOptions: {} = {}): HTMLElement {
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
            parent.removeChild(this.activeMaskElement);
        }
        this.activeMaskElement = undefined;
        this.activeMaskElementOptions = undefined;
    }

    /**
     * @throws {Error} Will throw an error if the layer mask instance is not passed before.
     */
    addElementsToMask(elements: HTMLElement[]): void {
        if (!this.currentLayerMask) {
            throw new Error('layer mask is missing');
        }

        this.currentLayerMask.addElements(elements);
        this.refreshMask();
    }

    /**
     * @throws {Error} Will throw an error if the layer mask instance is not passed before.
     */
    removeElementsFromMask(elements: HTMLElement): void {
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
     * @throws {Error} Will throw an error if the layer mask instance is not passed before.
     */
    refreshMask(): HTMLElement {
        if (!this.currentLayerMask) {
            throw new Error('layer mask is missing');
        }

        return this.revealMask(
            this.currentLayerMask,
            this.activeMaskElementOptions,
        );
    }

    private _setActiveMaskElement(maskElement: HTMLElement) {
        this._container.appendChild(maskElement);
        this.activeMaskElement = maskElement;
    }

    private _setActiveMaskElementOptions(maskElementOptions: {}) {
        this.activeMaskElementOptions = maskElementOptions;

        forEach(maskElementOptions, (optionValue, optionKey) => {
            if (this.activeMaskElement) {
                this._applyOption(
                    this.activeMaskElement,
                    optionKey,
                    optionValue,
                );
            }
        });
    }

    private _applyOption(
        maskElement: HTMLElement,
        optionKey: string,
        optionValue: any,
    ): void {
        switch (optionKey) {
            case 'click':
                maskElement.addEventListener('click', optionValue);
                break;
        }
    }

    private _startResizeListener(): void {
        const handler = () => this.refreshMask();
        const debouncedHandler = debounce(handler, 150);
        window.addEventListener('resize', debouncedHandler, false);
        const detach = () => {
            window.removeEventListener('resize', debouncedHandler, false);
        };
        this._listeners.push(detach);
    }

    private _stopAllListeners() {
        const invoke = (fn: () => void) => fn();
        this._listeners.forEach(invoke);
        this._listeners = [];
    }
}
