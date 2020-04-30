describe('Point', () => {
    const Point = require('../../src/dataTypes/Point');

    it('should be a function', () => {
        expect(Point).toEqual(jasmine.any(Function));
    });

    it('instance should has properties', () => {
        const point = new Point(10, 20);

        expect(point.x).toEqual(10);
        expect(point.y).toEqual(20);
    });
});
