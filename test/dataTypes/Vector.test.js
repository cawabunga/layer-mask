describe('Vector', () => {
    const Vector = require('../../src/dataTypes/Vector');
    const Point = require('../../src/dataTypes/Point');

    it('should be a function', () => {
        expect(Vector).toEqual(jasmine.any(Function));
    });

    describe('instance', () => {
        let vector, p1, p2;
        beforeEach(() => {
            p1 = new Point(10, 30);
            p2 = new Point(14, 16);
            vector = new Vector(p1, p2);
        });

        it('should has properties', () => {
            expect(vector.initial).toBe(p1);
            expect(vector.terminal).toBe(p2);
        });

        it('should return a middle point', () => {
            const point = vector.getMiddlePoint();

            expect(point instanceof Point).toBe(true);
            expect(point.x).toEqual(12);
            expect(point.y).toEqual(23);
        });
    });
});
