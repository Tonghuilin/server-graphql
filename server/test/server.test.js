const request                      = require('supertest');
const { app }                      = require('../server');
const { makePages, populatePages } = require('../model/seed/page');

describe('Server', () => {
    describe('GET /graphql', () => {
        let pages;

        beforeEach(() => {
            pages = makePages(3);
            return populatePages(pages);
        });

        it('should return page', (done) => {
            const title = pages[0].title;

            request(app)
                .get('/graphql')
                .query({
                    query: `{page(title:"${title}"){title}}`,
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done();
                    };
                    console.log(title, JSON.stringify(res.body, 4));
                    done();
                });
        });
    });
});
