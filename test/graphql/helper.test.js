const { dotify } = require('../../src/graphql/helper/helper');

describe('graphql/helper.js', () => {
    describe('dotify', () => {
        test('should pass test', () => {
            const testCase = {
                username: undefined,
                firstName: 'chi',
                lastName:  'yan',
                social:    {
                    qq:     '1234',
                    wechat: 'yanchi',
                },
            };

            expect(dotify(testCase)).toEqual({
                firstName:       'chi',
                lastName:        'yan',
                'social.qq':     '1234',
                'social.wechat': 'yanchi',
            });
        });
    });
});
