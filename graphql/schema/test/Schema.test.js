const { filterArgs } = require('../Schema');

describe('Graphql Schema.js', () => {
    describe('.filterArgs', () => {
        const testArgs = {
            a: 1,
            b: 2,
            c: undefined,
            d: null,
        };

        it('should make no change if no validators', () => {
            expect(filterArgs(testArgs)).toEqual(testArgs);
        });

        it('should filter out invalid args', () => {
            const validators = (val, key) => (typeof val !== 'undefined') && key !== 'a';

            expect(filterArgs(testArgs, validators)).toEqual({
                b: 2,
                d: null,
            });
        });
    });
});
