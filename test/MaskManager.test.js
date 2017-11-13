
describe('MaskManager', () => {
    const _ = require('underscore');
    const MaskManager = require('../src/MaskManager');

    it('should be a function', () => {
        expect(MaskManager).toEqual(jasmine.any(Function));
    });

    describe('instance', () => {

        let maskManager, container, layerMaskMock, layerMaskElement;

        beforeEach(() => {
            container = document.querySelector('body');
            maskManager = new MaskManager(container);

            layerMaskElement = document.createElement('div');
            layerMaskMock = {
                createMask: () => document.createElement('div')
            };
        });

        it('should has properties', () => {
            expect(maskManager.container).toBe(container);
        });

        it('should has specific interface', () => {
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

        it('#hideActiveMask(): should remove a mask element from the container', () => {
            const maskElement = maskManager.revealMask(layerMaskMock);
            expect(container.contains(maskElement)).toBe(true);

            maskManager.hideActiveMask();
            expect(container.contains(maskElement)).toBe(false);
        });

    });
});