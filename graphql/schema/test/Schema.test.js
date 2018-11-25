const { filterProps } = require('../helper');

describe('Graphql helper.js', () => {
    describe('.filterArgs', () => {
        const testArgs = {
            a: 1,
            b: 2,
            c: undefined,
            d: null,
        };

        it('should make no change if no validators', () => {
            expect(filterProps(testArgs)).toEqual(testArgs);
        });

        it('should filter out invalid args', () => {
            const validators = (val, key) => (typeof val !== 'undefined') && key !== 'a';

            expect(filterProps(testArgs, validators)).toEqual({
                b: 2,
                d: null,
            });
        });
    });
});
