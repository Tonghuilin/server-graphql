const Cookie         = require('cookie');

const setCookie = ({ res }, { token }) => {
    const opt = {
        domain:   process.env.ROOT_URL,
        path:     process.env.GRAPHQL_PATH,
        expire:   require('./common').getExpired(process.env.TOKEN_LIFESPAN),
        httpOnly: true,
        secure:   process.env.NODE_ENV !== 'development',
    };

    const ck = Cookie.serialize('token', token, opt);
    res.setHeader('Set-Cookie', ck);
};

const getCookie = ({ req }) => Cookie.parse(req.headers.cookie);

module.exports = {
    setCookie,
    getCookie,
};
