describe('LayerMask', () => {
    const { LayerMask } = require('../src/LayerMask');

    let body;
    beforeEach(() => {
        body = document.querySelector('body');
    });

    it('should be a function', () => {
        expect(LayerMask).toEqual(jasmine.any(Function));
    });

    it('should has default configuration property', () => {
        expect(LayerMask.defaults.padding).toBe(0);
        expect(LayerMask.defaults.rootClass).toEqual('layer-mask');
        expect(LayerMask.defaults.modifiers).toEqual([]);
        expect(LayerMask.defaults.classesTable).toEqual('layer-mask-table');
        expect(LayerMask.defaults.classesTableRow).toEqual(
            'layer-mask-table__row',
        );
        expect(LayerMask.defaults.classesTableCell).toEqual(
            'layer-mask-table__cell',
        );
        expect(LayerMask.defaults.classesTableCellHole).toEqual(
            'layer-mask-table__cell--hole',
        );
    });

    describe('instance', () => {
        let layerMask, targetElement, position;
        beforeEach(() => {
            targetElement = document.createElement('div');

            targetElement.style.position = 'absolute';
            targetElement.style.top = '100px';
            targetElement.style.left = '150px';
            targetElement.style.width = '40px';
            targetElement.style.height = '70px';
            targetElement.style.background = 'green';

            body.appendChild(targetElement);
            layerMask = new LayerMask(targetElement);
        });

        afterEach(() => {
            targetElement.remove();
            targetElement = undefined;
        });

        it('should has specific interface', () => {
            expect(layerMask.addElements).toEqual(jasmine.any(Function));
            expect(layerMask.removeElements).toEqual(jasmine.any(Function));
            expect(layerMask.createMask).toEqual(jasmine.any(Function));
            expect(layerMask.elements).toEqual(jasmine.any(Array));
            expect(layerMask.config).toEqual(jasmine.any(Object));
        });

        it('should add specified modifier classes', () => {
            layerMask.config.modifiers.push('my-modifier');
            const maskEl = layerMask.createMask();

            expect(maskEl.classList.contains('layer-mask--my-modifier')).toBe(
                true,
            );
        });

        it('should add elements to array', () => {
            const myEl = document.createElement('div');
            layerMask.addElements([myEl, myEl]);

            expect(layerMask.elements).toEqual([targetElement, myEl, myEl]);
        });

        it('should remove elements from array', () => {
            const myEl = document.createElement('div');
            layerMask.addElements([myEl, myEl]);
            layerMask.removeElements(myEl);

            expect(layerMask.elements).toEqual([targetElement, myEl]);
        });

        describe('#createMask():', () => {
            let container;

            beforeEach(() => {
                container = layerMask.createMask();
                body.appendChild(container);
            });

            afterEach(() => {
                container.remove();
                container = undefined;
            });

            it('should return an element', () => {
                expect(container instanceof Element).toBe(true);
            });

            it('should add css classes to the container', () => {
                expect(container.classList.contains('layer-mask')).toBe(true);
                expect(container.classList.contains('layer-mask-table')).toBe(
                    true,
                );
            });

            it('should split up a page into rows', () => {
                expect(container.children.length).toEqual(3);
            });

            it('should split up page into cells', () => {
                const rows = container.children;
                expect(rows[0].children.length).toEqual(3);
            });

            it('rows and cells should have css classes', () => {
                const row = container.children[0];
                const cell = row.children[0];

                expect(row.classList.contains('layer-mask-table__row')).toBe(
                    true,
                );
                expect(cell.classList.contains('layer-mask-table__cell')).toBe(
                    true,
                );
            });

            it('there should be a cell that covers the target element', () => {
                const row = container.children[1];
                const cell = row.children[1];

                const clientRect0 = targetElement.getBoundingClientRect();
                const clientRect = cell.getBoundingClientRect();

                expect(clientRect0.left).toEqual(clientRect.left);
                expect(clientRect0.top).toEqual(clientRect.top);
                expect(clientRect0.width).toEqual(clientRect.width);
            });

            it('cell that covers the element should has class', () => {
                const row = container.children[1];
                const cell = row.children[1];

                expect(
                    cell.classList.contains('layer-mask-table__cell--hole'),
                ).toBe(true);
            });
        });

        describe('#createMask(): fixed element', () => {
            let container;

            beforeEach(() => {
                targetElement.style.position = 'fixed';
                container = layerMask.createMask();
                body.appendChild(container);
            });

            afterEach(() => {
                container.remove();
                container = undefined;
            });

            it('should add css classes to the container', () => {
                expect(container.classList.contains('layer-mask--fixed')).toBe(
                    true,
                );
            });

            it('there should be a cell that covers the target element', () => {
                const row = container.children[1];
                const cell = row.children[1];

                const clientRect0 = targetElement.getBoundingClientRect();
                const clientRect = cell.getBoundingClientRect();

                expect(clientRect0.left).toEqual(clientRect.left);
                expect(clientRect0.top).toEqual(clientRect.top);
                expect(clientRect0.width).toEqual(clientRect.width);
                expect(clientRect0.height).toEqual(clientRect.height);
            });
        });

        describe('#createMask(): singular', () => {
            let maskEl, targetElement2;

            beforeEach(() => {
                targetElement2 = document.createElement('div');
                body.appendChild(targetElement2);

                targetElement2.style.background = 'green';
                targetElement.style.position = 'absolute';
                targetElement.style.top = '100px';
                targetElement.style.left = '60px';
                targetElement.style.width = '40px';
                targetElement.style.height = '70px';

                targetElement2.style.background = 'red';
                targetElement2.style.position = 'absolute';
                targetElement2.style.top = '50px';
                targetElement2.style.left = '100px';
                targetElement2.style.width = '120px';
                targetElement2.style.height = '40px';

                layerMask = new LayerMask([targetElement, targetElement2], {
                    singular: true,
                });
                maskEl = layerMask.createMask();

                body.appendChild(maskEl);
            });

            afterEach(() => {
                targetElement2.remove();
                targetElement2 = undefined;

                maskEl.remove();
                maskEl = undefined;
            });

            it('should has only single hole', () => {
                const holeElements = maskEl.querySelectorAll(
                    '.layer-mask-table__cell--hole',
                );
                expect(holeElements.length).toBe(1);
            });

            it('the hole should cover all target elements', () => {
                const hole = maskEl.querySelector(
                    '.layer-mask-table__cell--hole',
                );
                const offset = hole.getBoundingClientRect();

                expect(offset.top).toEqual(50);
                expect(offset.left).toEqual(60);
                expect(offset.width).toEqual(160);
                expect(offset.height).toEqual(120);
            });
        });
    });
});
