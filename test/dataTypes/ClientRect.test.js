
describe('ClientRect', () => {
    const _ = require('underscore');
    const ClientRect = require('../../src/dataTypes/ClientRect');
    const Point = require('../../src/dataTypes/Point');
    const Vector = require('../../src/dataTypes/Vector');

    it('should be a function', () => {
        expect(ClientRect).toEqual(jasmine.any(Function));
    });

    describe('instance', () => {

        let clientRect, left, width, top, height;
        beforeEach(() => {
            top = 20;
            left = 10;
            width = 5;
            height = 7;

            clientRect = new ClientRect(left, 0, top, 0, width, height);
        });

        it('should has properties', () => {
            expect(clientRect.left).toEqual(10);
            expect(clientRect.right).toEqual(0);
            expect(clientRect.top).toEqual(20);
            expect(clientRect.bottom).toEqual(0);
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
    });
});