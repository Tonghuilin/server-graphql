const set            = require('lodash/fp/set');
const { Page }       = require('../page');
const { cleanPages } = require('../seed/page');

describe('Model: page', () => {
    const testPage = {
        title:  'Page One',
        author: 'cyan'
    };

    afterEach(() => {
        cleanPages();
    });

    it('should create a page if all required fields are given', (done) => {
        const page = new Page(testPage);

        page.save().then((savedPage) => {
            const { title, author, summary, body, createdAt, lastUpdatedAt } = savedPage;

            expect(title).toEqual(testPage.title);
            expect(author).toEqual(testPage.author);

            expect(summary).toBeFalsy();
            expect(body).toBeFalsy();

            expect(createdAt).toBeTruthy();
            expect(lastUpdatedAt).toBeTruthy();
            expect(createdAt).toEqual(lastUpdatedAt);

            done();
        }).catch(done);
    });

    it('should return error if a required field is not given', (done) => {
        const page = new Page(set('title', '', testPage));

        page.save().then(() => {
            fail('The new page should not be saved.');
            done();
        }).catch((err) => {
            expect(err).toBeTruthy();
            done();
        });
    });
});
