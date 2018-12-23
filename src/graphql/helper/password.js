const sha256 = require('crypto-js/sha256');

/**
 * encrypt password
 *
 * @param pwd
 * @returns {string}
 */
const encryptPwd = (pwd = '') => pwd ? sha256(pwd) : '';

/**
 * verify password
 *
 * @param pwd
 * @param encrypted
 * @returns {string|boolean}
 */
const verifyPwd = (pwd = '', encrypted = '') => pwd && encrypted && encryptPwd(pwd).toString() === encrypted;

module.exports = {
    encryptPwd,
    verifyPwd,
};
