const { ApolloServer } = require('apollo-server-express');
const typeDefs         = require('./type-def');
const resolvers        = require('./resolver');

module.exports = (app) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => ({ req, res }),
    });

    server.applyMiddleware({
        app,
        path: process.env.GRAPHQL_PATH,
        cors: true,
    });

    return server;
};
