const graphqlHTTP    = require('express-graphql');
const { logRequest } = require('../helper/logger');
const { schema }     = require('../graphql/schema/schema');

const graphqlController = graphqlHTTP((req) => {
    logRequest(req);
    return ({
        schema,
    });
});

module.exports = {
    graphqlController,
};
