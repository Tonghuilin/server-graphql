const request = require('supertest');
const { app } = require('../server');
const {
          makePages,
          populatePages,
          cleanPages,
          findPage,
      }       = require('../model/seed/page');

describe('Server', () => {
    describe('/graphql', () => {
        describe('Page', () => {
            let pagePool;

            beforeEach(() => {
                pagePool = makePages(3);
                return populatePages(pagePool);
            });

            afterEach(() => {
                cleanPages();
            });

            it('GET: should return an array of requested pages', (done) => {
                const title = pagePool[0].title;
                const query = `
                    {
                        page(title:"${title}") {
                            title
                        }
                    }
                `;

                request(app)
                    .get('/graphql')
                    .query({ query })
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }

                        expect(res.body.data.page[0].title).toBe(title);
                        done();
                    });
            });

            it('POST: should create a new page', (done) => {
                const query     = `mutation ($title: String, $author: String) {
                    createPage(title: $title, author: $author) {
                        id
                        title
                        author
                        createdAt
                        lastUpdatedAt
                    }
                }`;
                const variables = {
                    title:  'New Page',
                    author: 'Chi',
                };

                request(app)
                    .post('/graphql')
                    .send({ query, variables })
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }

                        const { id, title, author, createdAt, lastUpdatedAt } = res.body.data.createPage;
                        expect(id).toBeTruthy();
                        expect(title).toBe(variables.title);
                        expect(author).toBe(variables.author);
                        expect(createdAt).toBeTruthy();
                        expect(lastUpdatedAt).toBeTruthy();
                        done();
                    });
            });

            it('POST: should update a new page', (done) => {
                const testPage = pagePool[0];

                const query     = `mutation ($id: String!, $author: String) {
                    updatePage(id: $id, author: $author) {
                        id
                        title
                        author
                        createdAt
                        lastUpdatedAt
                    }
                }`;
                const variables = {
                    id:     testPage._id,
                    author: 'Chi',
                };

                request(app)
                    .post('/graphql')
                    .send({ query, variables })
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                        }

                        const { id, title, author } = res.body.data.updatePage;
                        expect(id).toBe(testPage._id.toString());
                        expect(title).toBe(testPage.title);
                        expect(author).toBe(variables.author);
                        done();
                    });
            });

            it('POST: should return null if the page is not found', (done) => {
                const id = 'not exist';

                const query     = `mutation ($id: String!, $author: String) {
                    updatePage(id: $id, author: $author) {
                        id
                        title
                        author
                        createdAt
                        lastUpdatedAt
                    }
                }`;
                const variables = { id, author: 'Chi' };

                request(app)
                    .post('/graphql')
                    .send({ query, variables })
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                        }

                        const updatePage = res.body.data.updatePage;
                        expect(updatePage).toBeNull();
                        done();
                    });
            });

            it('should remove the page by id', (done) => {
                const testPage = pagePool[0];

                const query     = `mutation($id: String!) {
                    removePage(id: $id) {
                        id
                        title
                    }
                }`;
                const variables = { id: testPage._id };

                request(app)
                    .post('/graphql')
                    .send({ query, variables })
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                        }

                        const removedPage = res.body.data.removePage;
                        expect(removedPage.id).toBe(testPage._id.toString());

                        findPage({ _id: testPage._id }).then((foundPage) => {
                            expect(foundPage.length).toBe(0);
                            done();
                        }).catch(done);
                    });
            });
        });
    });
});
