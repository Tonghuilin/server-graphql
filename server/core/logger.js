const info = (...args) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...args);
    }
};

const logger = {
    info,
};

/**
 * Log general request info
 * @param req   express request
 */
const logRequest = (req) => {
    const { method, headers, originalUrl, query } = req;
    info(`${method} ${headers.host} ${originalUrl}`);
};

module.exports = {
    logger,
    logRequest,
};
