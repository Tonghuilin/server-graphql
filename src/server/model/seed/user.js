const { ObjectID } = require('mongodb');
const { User }     = require('../user');
const SHA256       = require('crypto-js/sha256');

const makeUsers = (num = 0) => {
    const arr = Array(num).fill(0);

    const ids   = arr.map(() => new ObjectID());
    const dates = arr.map(() => ([new Date(), new Date()]));

    return ids.map((id, index) => ({
        _id:           id,
        firstName:     `First name ${index}`,
        lastName:      `Last name ${index}`,
        username:      `Username ${index}`,
        password:      SHA256(`password${index}`).toString(),
        mobile:        `1381234567${index}`,
        createdAt:     dates[index][0],
        lastUpdatedAt: dates[index][1]
    }));
};

const cleanUsers    = () => User.remove({});
const populatePages = (pages) => cleanUser().then(() => User.insertMany(pages));

module.exports = {
    makeUsers,
    cleanUsers,
    populatePages,
};
