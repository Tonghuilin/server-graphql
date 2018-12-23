const tokenHelper    = require('./token');
const passwordHelper = require('./password');
const cookieHelper   = require('./cookie');
const commonHelper   = require('./common');

module.exports = {
    filterProps:    commonHelper.filterProps,
    dotify:         commonHelper.dotify,
    getExpired:     commonHelper.getExpired,
    checkAuth:      commonHelper.checkAuth,
    configResolver: commonHelper.configResolver,
    createToken:    tokenHelper.createToken,
    verifyToken:    tokenHelper.verifyToken,
    encryptPwd:     passwordHelper.encryptPwd,
    verifyPwd:      passwordHelper.verifyPwd,
    setCookie:      cookieHelper.setCookie,
    getCookie:      cookieHelper.getCookie,
};
