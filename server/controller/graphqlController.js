const graphqlHTTP    = require('express-graphql');
const { logRequest } = require('../core/logger');
const { schema }     = require('../../graphql/schema/Schema');

const graphqlController = graphqlHTTP((req) => {
    logRequest(req);
    return ({
        schema,
    });
});

module.exports = {
    graphqlController,
};
