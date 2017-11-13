describe('utils', () => {
    const utils = require('../src/utils');

    it('should be an object', () => {
        expect(utils).toEqual(jasmine.objectContaining({
            getPageDimensions:   jasmine.any(Function),
            getWindowDimensions: jasmine.any(Function),
            isElementFixed:      jasmine.any(Function),
            getAllBoundaries:    jasmine.any(Function),
            addPadding:          jasmine.any(Function),
            addPageOffset:       jasmine.any(Function),
        }));
    });

    describe('isElementFixed()', () => {
        it('should return false for not fixed elements', () => {
            const staticEl = document.createElement('div');
            const relativeEl = document.createElement('div');
            const absoluteEl = document.createElement('div');

            staticEl.style.position = 'static';
            relativeEl.style.position = 'relative';
            absoluteEl.style.position = 'absolute';

            expect(utils.isElementFixed(staticEl)).toBe(false);
            expect(utils.isElementFixed(relativeEl)).toBe(false);
            expect(utils.isElementFixed(absoluteEl)).toBe(false);
        });

        it('should return true for fixed element', () => {
            const fixedEl = document.createElement('div');
            fixedEl.style.position = 'fixed';
            expect(utils.isElementFixed(fixedEl)).toBe(true);
        });

        it('should return true if it has fixed parent', () => {
            const rootEl = document.createElement('div');
            const fixedEl = document.createElement('div');
            const childEl = document.createElement('div');

            rootEl.appendChild(fixedEl);
            fixedEl.appendChild(childEl);

            fixedEl.style.position = 'fixed';

            expect(utils.isElementFixed(childEl)).toBe(true);
        });
    });

});