const { User: UserModel }    = require('../../model/user');
const { encryptPwd, dotify } = require('../helper');

/**
 * get one
 *
 * @param parent
 * @param id
 * @param username
 * @returns {Query}
 */
const getUser = (parent, { id, username }) => {
    if (id) {
        return UserModel.findById(id);
    }
    return UserModel.findOne({ username });
};

/**
 * get many
 *
 * @param parent
 * @param term
 * @returns {*}
 */
const getUsers = (parent, { term }) => {
    const termReg = new RegExp(term, 'i');

    return UserModel.find({
        $or: [
            { username: { $regex: termReg } },
            { firstName: { $regex: termReg } },
            { lastName: { $regex: termReg } },
            { mobile: { $regex: termReg } },
        ],
    });
};

/**
 * create one
 *
 * @param parent
 * @param username
 * @param password
 * @param firstName
 * @param lastName
 * @param mobile
 * @param social
 *
 * @returns {*}
 */
const createUser = (
    parent,
    {
        username,
        password,
        firstName,
        lastName,
        mobile,
        social,
    },
) => {
    return UserModel.create({
        username,
        password: encryptPwd(password),
        firstName,
        lastName,
        mobile,
        social,
    });
};

/**
 * update one
 *
 * @param parent
 * @param id
 * @param firstName
 * @param lastName
 * @param mobile
 * @param email
 * @param social
 * @param archived
 *
 * @returns {Query}
 */
const updateUser = (
    parent,
    {
        id,
        firstName,
        lastName,
        mobile,
        social,
        archived,
        role,
    },
) => {
    const content = dotify({
        firstName,
        lastName,
        mobile,
        social,
        archived,
        role,
    });
    return UserModel.findByIdAndUpdate(id, content, { new: true });
};

/**
 * delete one
 *
 * @param parent
 * @param id
 *
 * @returns {Query}
 */
const deleteUser = (parent, { id }) => {
    return UserModel.findOneAndRemove({ _id: id });
};

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};
