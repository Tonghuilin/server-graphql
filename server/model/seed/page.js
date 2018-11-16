const { ObjectID } = require('mongodb');
const { Page }     = require('../page');

const makePages = (num = 0) => {
    const arr = Array(num).fill(0);

    const ids   = arr.map(() => new ObjectID());
    const dates = arr.map(() => ([new Date(), new Date()]));

    return ids.map((id, index) => ({
        _id:           id,
        title:         `page ${index}`,
        author:        `author ${index}`,
        summary:       `test summary ${index}`,
        body:          `body content ${index}`,
        createdAt:     dates[index][0],
        lastUpdatedAt: dates[index][1]
    }));
};

const cleanPages = () =>
    Page.remove({});

const populatePages = (pages) =>
    cleanPages().then(() => Page.insertMany(pages));

module.exports = {
    makePages,
    populatePages,
    cleanPages,
};
