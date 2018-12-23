const { gql } = require('apollo-server-express');

const commonType = require('./common');
const pageType   = require('./page');
const userType   = require('./user');
const auth       = require('./auth');

module.exports = gql`
    ${commonType.base}
    ${pageType.base}
    ${userType.base}
    
    type Query {
        ${pageType.query}
        ${userType.query}
    }
    
    type Mutation {
        ${pageType.mutation}
        ${userType.mutation}
        ${auth.mutation}
    }
`;
