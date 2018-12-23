const isObject        = require('lodash/isObject');
const { getCookie }   = require('./cookie');

/**
 * default validator of filterProps
 *
 * @param val
 * @returns {boolean}
 */
const notUndefined = (val) => typeof val !== 'undefined';

/**
 *
 * @param {object}    obj
 * @param {function}  validator      (val, key) => boolean
 * @returns {{}}
 */
const filterProps = (obj = {}, validator = notUndefined) => Object.keys(obj).reduce(
    (filtered, key) => {
        const val = obj[key];
        return validator(val, key) ? { ...filtered, [key]: val } : filtered;
    }, {});

/**
 *
 * @param obj
 * @param basePath
 * @returns {{}}
 */
const dotify = (obj = {}, basePath = '') => {
    return Object.keys(obj).reduce((result, key) => {
        const val = obj[key];

        if (!val) {
            return result;
        }

        if (!isObject(val)) {
            return { ...result, [basePath + key]: val };
        }

        const nextBasePath = basePath ? `${key}.` : `${basePath}${key}.`;
        return { ...result, ...dotify(val, nextBasePath) };
    }, {});
};

/**
 *
 * @param lifespan
 * @returns {number}
 */
const getExpired = (lifespan = 0) => Number(Date.now()) + Number(lifespan);

/**
 *
 * @param req
 * @param id
 * @returns {Promise<void>}
 */
const checkAuth = async ({ req }, { id }) => {
    const { token } = getCookie({ req });
    const me        = await require('./token').verifyToken(token);

    const isMe    = me && me._id.toHexString() === id;
    const isAdmin = me.role === 'ADMIN';

    if (isMe || isAdmin ) {
        return;
    }

    throw new Error('Sorry, it is not you OR you do not have permission.');
};

/**
 * config resolver, e.g. add permission check
 *
 * @param option
 * @param resolver
 * @returns {Function}
 */
const configResolver = (option, resolver) => async (parent, params, context, info) => {
    const opt = { auth: false, ...option };

    if (opt.auth) {
        await checkAuth(context, params);
    }

    return resolver(parent, params, context, info);
};

module.exports = {
    filterProps,
    dotify,
    getExpired,
    checkAuth,
    configResolver,
};
