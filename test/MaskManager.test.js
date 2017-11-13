
describe('MaskManager', () => {
    const _ = require('underscore');
    const MaskManager = require('../src/MaskManager');

    it('should be a function', () => {
        expect(MaskManager).toEqual(jasmine.any(Function));
    });

    describe('instance', () => {

        let maskManager, container, targetElement;
        beforeEach(() => {
            container = document.querySelector('body');
            targetElement = container; // does not matter what element
            maskManager = new MaskManager(container);
        });

        it('should has properties', () => {
            expect(maskManager.container).toBe(container);
        });

        it('should has specific interface', () => {
            expect(maskManager.revealMask).toEqual(jasmine.any(Function));
            expect(maskManager.hideActiveMask).toEqual(jasmine.any(Function));
        });

        describe('#revealMask():', () => {

            let maskElement;
            beforeEach(() => {
                maskElement = maskManager.revealMask(targetElement);
            });

            it('should return a mask element', () => {
                expect(maskElement instanceof Element).toBe(true);
            });

            it('should append a mask element to the container', () => {
                expect(container.contains(maskElement)).toBe(true);
            });

            it('should remove previous one', () => {
                maskManager.revealMask(targetElement);
                expect(container.contains(maskElement)).toBe(false);
            });
        });

        it('#hideActiveMask(): should remove a mask element from the container', () => {
            const maskElement = maskManager.revealMask(targetElement);
            expect(container.contains(maskElement)).toBe(true);

            maskManager.hideActiveMask();
            expect(container.contains(maskElement)).toBe(false);
        });

    });
});