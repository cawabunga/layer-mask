describe('utils', () => {
    const _ = require('../src/utils/_');

    it('should be an object', () => {
        expect(_).toEqual(
            jasmine.objectContaining({
                uniq: jasmine.any(Function),
                flatten: jasmine.any(Function),
                forEach: jasmine.any(Function),
                withoutSingle: jasmine.any(Function),
            }),
        );
    });

    it('#withoutSingle(): should remove first occurrence of the element', () => {
        const arr = [1, 1, 2, 3];
        const result = _.withoutSingle(arr, [1]);

        expect(result).not.toBe(arr);
        expect(result).toEqual([1, 2, 3]);
    });
});
