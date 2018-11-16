const graphqlHTTP    = require('express-graphql');
const { logRequest } = require('../core/logger');
const { schema }     = require('../../graphql/schema/Schema');

const controlGraphql = graphqlHTTP((req) => {
    logRequest(req);
    return ({
        schema,
    });
});

module.exports = {
    controlGraphql,
};
