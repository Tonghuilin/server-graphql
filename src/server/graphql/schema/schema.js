const pick                   = require('lodash/fp/pick');
const {
          GraphQLObjectType,
          GraphQLSchema,
          GraphQLList,
      }                      = require('graphql/type');
const {
          pageType,
          pageFields,
          pageQueryResolver,
          pageCreateUpdateResolver,
          pageRemoveResolver,
      }                      = require('./pageSchema');
const { User: UserMongoose } = require('../../model/user');

const schema = new GraphQLSchema({
    query:    new GraphQLObjectType({
        name:   'RootQueryType',
        fields: {
            page: {
                type:    new GraphQLList(pageType),
                args:    pageFields,
                resolve: pageQueryResolver,
            },
        },
    }),
    mutation: new GraphQLObjectType({
        name:   'RootMutationType',
        fields: {
            createPage: {
                type:    pageType,
                args:    pick(['title', 'author', 'summary'], pageFields),
                resolve: pageCreateUpdateResolver,
            },
            updatePage: {
                type:    pageType,
                args:    pick(['id', 'title', 'author', 'summary'], pageFields),
                resolve: pageCreateUpdateResolver,
            },
            removePage: {
                type:    pageType,
                args:    pick(['id'], pageFields),
                resolve: pageRemoveResolver,
            },
        },
    }),
});

module.exports = {
    schema,
};
