describe('ClientRect', () => {
    const ClientRect = require('../../src/dataTypes/ClientRect');
    const Point = require('../../src/dataTypes/Point');
    const Vector = require('../../src/dataTypes/Vector');

    it('should be a function', () => {
        expect(ClientRect).toEqual(jasmine.any(Function));
    });

    it('should check consistency of boundary', () => {
        // Imaginary Canvas Size 50x50
        const fn1 = () => new ClientRect(5, 15, 20, 50);
        const fn2 = () => new ClientRect(5, 0, 20, 50);
        const fn3 = () => new ClientRect(5, 15, 20, 0);

        expect(fn1).not.toThrow();
        expect(fn2).toThrow();
        expect(fn3).toThrow();
    });

    it('.getVertexes(): should return all vertexes', () => {
        const c1 = new ClientRect(10, 210, 15, 265);
        const c2 = new ClientRect(20, 320, 25, 375);

        const result = ClientRect.getVertexes([c1, c2]);

        expect(result).toEqual(jasmine.any(Array));
        expect(result.length).toEqual(8);
    });

    it('.combine(): should combine multiple rectangles into big one', () => {
        // Imaginary Canvas Size 100x100
        const c1 = new ClientRect(20, 50, 25, 65);
        const c2 = new ClientRect(30, 40, 70, 90);

        const result = ClientRect.combine([c1, c2]);
        expect(result).toEqual(jasmine.any(ClientRect));

        expect(result.left).toEqual(20);
        expect(result.right).toEqual(50);
        expect(result.top).toEqual(25);
        expect(result.bottom).toEqual(90);
        expect(result.width).toEqual(30);
        expect(result.height).toEqual(65);
    });

    describe('instance', () => {
        let clientRect, left, width, top, height;
        beforeEach(() => {
            top = 20;
            left = 10;
            width = 5;
            height = 7;

            clientRect = new ClientRect(left, left + width, top, top + height);
        });

        it('should has properties', () => {
            expect(clientRect.left).toEqual(10);
            expect(clientRect.right).toEqual(15);
            expect(clientRect.top).toEqual(20);
            expect(clientRect.bottom).toEqual(27);
            expect(clientRect.width).toEqual(5);
            expect(clientRect.height).toEqual(7);
        });

        it('should has specific interface', () => {
            expect(clientRect.isPointCollides).toEqual(jasmine.any(Function));
            expect(clientRect.isVectorCollides).toEqual(jasmine.any(Function));
        });

        it('#isPointCollides(): checks for inner point', () => {
            const outsidePoint = new Point(0, 0);
            const insidePoint = new Point(left + 1, top + 1);
            const boundaryPoint = new Point(left, top);

            expect(clientRect.isPointCollides(outsidePoint)).toBe(false);
            expect(clientRect.isPointCollides(insidePoint)).toBe(true);
            expect(clientRect.isPointCollides(boundaryPoint)).toBe(true);
        });

        it('#isVectorCollides(): checks for vector inclusion', () => {
            const outsidePoint1 = new Point(0, 0);
            const outsidePoint2 = new Point(-1, -1);

            const insidePoint1 = new Point(left + 1, top + 1);
            const insidePoint2 = new Point(left + 2, top + 2);

            const boundaryPoint1 = new Point(left, top);
            const boundaryPoint2 = new Point(left + width, top + height);

            const outsideVector = new Vector(outsidePoint1, outsidePoint2);
            const insideVector = new Vector(insidePoint1, insidePoint2);
            const boundaryVector = new Vector(boundaryPoint1, boundaryPoint2);
            const mixedVector = new Vector(insidePoint1, outsidePoint1);

            expect(clientRect.isVectorCollides(outsideVector)).toEqual(false);
            expect(clientRect.isVectorCollides(insideVector)).toEqual(true);
            expect(clientRect.isVectorCollides(boundaryVector)).toEqual(true);
            expect(clientRect.isVectorCollides(mixedVector)).toEqual(false);
        });

        it('#getVertexes(): should return all 4 vertexes', () => {
            const vertexes = clientRect.getVertexes();

            expect(vertexes).toEqual(jasmine.any(Array));
            expect(vertexes.length).toEqual(4);

            expect(vertexes[0]).toEqual(
                jasmine.objectContaining({ x: 10, y: 20 }),
            );
            expect(vertexes[1]).toEqual(
                jasmine.objectContaining({ x: 15, y: 20 }),
            );
            expect(vertexes[2]).toEqual(
                jasmine.objectContaining({ x: 15, y: 27 }),
            );
            expect(vertexes[3]).toEqual(
                jasmine.objectContaining({ x: 10, y: 27 }),
            );
        });
    });
});
