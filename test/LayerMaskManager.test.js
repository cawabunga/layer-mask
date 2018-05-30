
describe('LayerMaskManager', () => {
    const LayerMaskManager = require('../src/LayerMaskManager');

    it('should be a function', () => {
        expect(LayerMaskManager).toEqual(jasmine.any(Function));
    });

    describe('instance', () => {

        let maskManager, container, layerMaskMock, layerMaskElement;

        beforeEach(() => {
            container = document.querySelector('body');
            maskManager = new LayerMaskManager(container);

            layerMaskElement = document.createElement('div');
            layerMaskMock = {
                createMask: () => document.createElement('div')
            };
        });

        it('should has properties', () => {
            expect(maskManager.hasOwnProperty('currentLayerMask')).toBe(true);
            expect(maskManager.hasOwnProperty('activeMaskElement')).toBe(true);
        });

        it('should has specific interface', () => {
            expect(maskManager.hasActiveMask).toEqual(jasmine.any(Function));
            expect(maskManager.revealMask).toEqual(jasmine.any(Function));
            expect(maskManager.hideActiveMask).toEqual(jasmine.any(Function));
        });

        describe('#revealMask():', () => {

            it('should return a just created mask element', () => {
                spyOn(layerMaskMock, 'createMask').and.returnValue(layerMaskElement);
                const result = maskManager.revealMask(layerMaskMock);

                expect(result).toBe(layerMaskElement);
            });

            it('should append a mask element to the container', () => {
                spyOn(layerMaskMock, 'createMask').and.returnValue(layerMaskElement);
                maskManager.revealMask(layerMaskMock);

                expect(container.contains(layerMaskElement)).toBe(true);
            });

            it('should remove the previous mask element', () => {
                const el1 = maskManager.revealMask(layerMaskMock);
                const el2 = maskManager.revealMask(layerMaskMock);

                expect(container.contains(el1)).toBe(false);
                expect(container.contains(el2)).toBe(true);
            });
        });

        describe('#hideActiveMask():', () => {

            it('should throw when if hide invoked with missing mask element', () => {
                const fn = () => maskManager.hideActiveMask();
                expect(fn).toThrow();
            });

            it('should remove a mask element from the container', () => {
                const maskElement = maskManager.revealMask(layerMaskMock);
                expect(container.contains(maskElement)).toBe(true);

                maskManager.hideActiveMask();
                expect(container.contains(maskElement)).toBe(false);
            });

        });

        describe('#refreshMask():', () => {

            it('should throw if refresh invoked before the mask was set', () => {
                const fn = () => maskManager.refreshMask();
                expect(fn).toThrow();
            });

            it('should return a just created mask element', () => {
                maskManager.revealMask(layerMaskMock);

                spyOn(layerMaskMock, 'createMask').and.returnValue(layerMaskElement);
                const result = maskManager.refreshMask();

                expect(result).toBe(layerMaskElement);
            });

            it('should recreate the mask element', () => {
                const maskElement1 = maskManager.revealMask(layerMaskMock);
                expect(container.contains(maskElement1)).toBe(true);

                const maskElement2 = maskManager.refreshMask();
                expect(container.contains(maskElement1)).toBe(false);
                expect(container.contains(maskElement2)).toBe(true);
            });

        });

        describe('mask element options', () => {

            it('should attach click event handler', () => {
                const spy = jasmine.createSpy('click');
                const element = maskManager.revealMask(layerMaskMock, { click: spy });

                expect(spy).not.toHaveBeenCalled();
                element.click();
                expect(spy).toHaveBeenCalled();
            });

        });

        it('#hasActiveMask(): should determine is there revealed mask', () => {
            expect(maskManager.hasActiveMask()).toBe(false);

            maskManager.revealMask(layerMaskMock);
            expect(maskManager.hasActiveMask()).toBe(true);

            maskManager.hideActiveMask();
            expect(maskManager.hasActiveMask()).toBe(false);
        });

    });
});