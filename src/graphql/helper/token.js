const jws            = require('jws');
const format         = require('date-fns/format');
const { getExpired } = require('./common');
const { logger }     = require('../../helper/logger');

const { User: UserModel } = require('../../model/user');

/**
 * jwt common header
 *
 * @type {{alg: string, iss: string, scopes: string[], xsrfToken: string}}
 */
const JWT_HEADER = {
    alg:       'HS256',
    iss:       process.env.ROOT_URL,
    scopes:    [process.env.GRAPHQL_PATH],
    xsrfToken: 'd9b9714c-7ac0-42e0-8696-2dae95dbc33e',
};

/**
 * check expiration
 *
 * @param date
 * @returns {boolean}
 */
const active = (date = '') => Date.now() < Number(date);

/**
 * create JWT header
 *
 * @param commonHeader
 * @param user
 *
 * @returns {{alg: string, iss: string, scopes: string[], xsrfToken: string, sub: *, exp: *}}
 */
const createJwtHeader = (commonHeader, user) => ({
    ...commonHeader,
    sub: user.username,
    exp: getExpired(process.env.TOKEN_LIFESPAN),
});

/**
 * get JWT payload
 *
 * @param user
 * @returns {{id: *, username: *, archived: (archived|{type, default})}}
 */
const getJwtPayload = (user) => ({
    id:       user._id,
    username: user.username,
    archived: user.archived,
});

/**
 * create auth token, would fail if user is expired
 *
 * @param user
 * @returns {*}
 */
const createToken = (user) => {
    if (user.archived) {
        throw new Error('failed to create token: user expired');
    }

    return jws.sign({
        header:     createJwtHeader(JWT_HEADER, user),
        payload:    getJwtPayload(user),
        privateKey: process.env.JWT_SECRET,
    });
};

/**
 * verify the token info
 *
 * @param header
 * @param payload
 * @param privateKey
 * @returns {boolean}
 */
const verifyTokenCompletion = ({ header, payload, privateKey }) => {
    const misMatchPrivateKey      = privateKey !== process.env.JWT_SECRET;
    const misMatchIssuer          = header.iss !== JWT_HEADER.iss;
    const misMatchHeaderToPayLoad = header.sub !== payload.username;
    const isExpired               = !active(header.exp);
    const isArchived              = Boolean(payload.archived);

    return (misMatchPrivateKey || misMatchIssuer || misMatchHeaderToPayLoad || isExpired || isArchived);
};

/**
 * verify the payload to the user in db
 *
 * @param payload
 * @param user
 * @returns {boolean}
 */
const verifyPayload = ({ payload }, user) => user && (user._id === payload.id || !user.archived);

/**
 * verify token, return false OR payload
 *
 * @param token
 * @returns {boolean|{}}
 */
const verifyToken = async (token = '') => {
    if (!token) {
        logger.info(`[Token] ${token || 'not found'}`);
        return false;
    }

    const { header, payload: payloadJSON, privateKey } = jws.decode(token);
    const payload                                      = JSON.parse(payloadJSON);

    if (!verifyTokenCompletion({ header, payload, privateKey })) {
        logger.info(`[Received header] ${JSON.stringify(header)}`);
        logger.info(`[expired at] ${format(header.exp, 'YYYY-MM-DD HH:mm:ss')}`);
        return false;
    }

    const user = await UserModel.findById(payload.id);

    if (!verifyPayload({ payload }, user)) {
        logger.info(`[Received payload] ${JSON.stringify(payload)}`);
        logger.info(`[Found user] ${JSON.stringify(user)}`);
        return false;
    }

    return user;
};

module.exports = {
    createToken,
    verifyToken,
};
