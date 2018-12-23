const { getPage, getPages, createPage, updatePage, deletePage } = require('./page');
const { getUser, getUsers, createUser, updateUser, deleteUser } = require('./user');
const { token }                                                 = require('./auth');
const { configResolver }                                        = require('../helper');

module.exports = {
    Query:    {
        getPage,
        getUser,
        getPages,
        getUsers,
    },
    Mutation: {
        createPage,
        createUser,
        updatePage: configResolver({ auth: true }, updatePage),
        updateUser: configResolver({ auth: true }, updateUser),
        deletePage: configResolver({ auth: true }, deletePage),
        deleteUser: configResolver({ auth: true }, deleteUser),
        token,
    },
};
