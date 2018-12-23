const request = require('supertest');
const { app } = require('../src/server');

describe('Server', () => {
    describe('/page', () => {
        it('should', (done) => {
            request(app)
                .get('/page')
                // .expect(200)
                .end((err, res) => {
                    console.log(err, res.body);
                    done();
                });
        });
    });
});
