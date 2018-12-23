const { User: UserModel }                   = require('../../model/user');
const { verifyPwd, createToken, setCookie } = require('../helper');

/**
 * verify password, update { lastLoggedIn }
 *
 * @param parent
 * @param username
 * @param password
 * @param res
 *
 * @returns {string}
 */
const token = async (parent, { username, password }, { res }) => {
    const user = await UserModel.findOne({ username }) || {};

    if (!user.password || !password) {
        throw new Error('user not exist or password not entered');
    }

    if (!verifyPwd(password, user.password)) {
        throw new Error('password not match');
    }

    const token = createToken(user);

    setCookie({ res }, { token });

    await UserModel.findByIdAndUpdate(user._id, { lastLoggedIn: Date.now() });

    return token;
};

module.exports = {
    token,
};
