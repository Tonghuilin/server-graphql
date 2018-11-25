const request = require('supertest');
const { app } = require('../server');

describe('Server', () => {
    describe('/{view}', () => {
        it('should', (done) => {
            request(app)
                .get('/page')
                .expect(200)
                .end((err, res) => {
                    console.log(res.body);
                    done();
                });
        });
    });
});
