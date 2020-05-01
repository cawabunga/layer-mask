import { LayerMask } from './LayerMask';
export declare class LayerMaskManager {
    _listeners: (() => void)[];
    _container: HTMLElement;
    activeMaskElementOptions: undefined | {};
    currentLayerMask: undefined | LayerMask;
    activeMaskElement: undefined | HTMLElement;
    constructor(container: HTMLElement);
    hasActiveMask(): boolean;
    revealMask(layerMask: LayerMask, maskElementOptions?: {}): HTMLElement;
    /**
     * @throws {Error} Will throw an error if the mask element is not defined.
     */
    hideActiveMask(): void;
    /**
     * @throws {Error} Will throw an error if the layer mask instance is not passed before.
     */
    addElementsToMask(elements: HTMLElement[]): void;
    /**
     * @throws {Error} Will throw an error if the layer mask instance is not passed before.
     */
    removeElementsFromMask(elements: HTMLElement): void;
    /**
     * @throws {Error} Will throw an error if the layer mask instance is not passed before.
     */
    refreshMask(): HTMLElement;
    private _setActiveMaskElement;
    private _setActiveMaskElementOptions;
    private _applyOption;
    private _startResizeListener;
    private _stopAllListeners;
}
