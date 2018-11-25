const omit           = require('lodash/fp/omit');
const { User }       = require('../user');
const { cleanUsers } = require('../seed/user');

describe('Model: user', () => {
    const testUser = {
        firstName: 'Chi',
        lastName:  'Yan',
        password:  'password'
    };

    afterEach(() => {
        cleanUsers();
    });

    it('should create a user', (done) => {
        const user = new User(testUser);

        user.save().then((savedUser) => {
            const { firstName, lastName, password, mobile, createdAt, lastUpdatedAt } = savedUser;

            expect(firstName).toBe(testUser.firstName);
            expect(lastName).toBe(testUser.lastName);
            expect(password).toBe(testUser.password);
            expect(mobile).toBeFalsy();
            expect(createdAt).toBeTruthy();
            expect(lastUpdatedAt).toBeTruthy();

            done();
        }).catch(done);
    });

    it('should not create a user if required fields are missing', (done) => {
        const user = new User(omit('password', testUser));

        user.save().then(() => {
            fail('User missing password should not be saved');
            done();
        }).catch((err) => {
            expect(err).toBeTruthy();
            done();
        });
    });
});
