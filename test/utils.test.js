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

        let styleElement, element;

        beforeAll(() => {
            styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.innerHTML = '.fixed { position: fixed; }';
            document.getElementsByTagName('head')[0].appendChild(styleElement);
        });

        afterAll(() => {
            styleElement.remove();
        });

        beforeEach(() => {
            element = document.createElement('div');
            document.body.appendChild(element);
        });

        afterEach(() => {
            element.remove();
            element = undefined;
        });

        it('should return false for not fixed elements', () => {
            const staticEl = document.createElement('div');
            const relativeEl = document.createElement('div');
            const absoluteEl = document.createElement('div');

            element.appendChild(staticEl);
            element.appendChild(relativeEl);
            element.appendChild(absoluteEl);

            staticEl.style.position = 'static';
            relativeEl.style.position = 'relative';
            absoluteEl.style.position = 'absolute';

            expect(utils.isElementFixed(staticEl)).toBe(false);
            expect(utils.isElementFixed(relativeEl)).toBe(false);
            expect(utils.isElementFixed(absoluteEl)).toBe(false);
        });

        it('should return true for fixed element', () => {
            element.style.position = 'fixed';
            expect(utils.isElementFixed(element)).toBe(true);
        });

        it('should return true if it has fixed parent', () => {
            const fixedEl = document.createElement('div');
            const childEl = document.createElement('div');

            element.appendChild(fixedEl);
            fixedEl.appendChild(childEl);

            fixedEl.style.position = 'fixed';

            expect(utils.isElementFixed(childEl)).toBe(true);
        });

        it('should also process css classes', () => {
            element.classList.add('fixed');
            expect(utils.isElementFixed(element)).toBe(true);
        });
    });

});