const {
          GraphQLObjectType,
          GraphQLNonNull,
          GraphQLSchema,
          GraphQLList,
          GraphQLInt,
          GraphQLString
      } = require('graphql/type');

const { Page: PageMongoose } = require('../../server/model/page');

/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
const getProjection = (fieldASTs) => {
    const projections = fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
        return projections.concat(selection.name.value);
    }, []);

    return projections.join(' '); // mongoose;
};

const pageType = new GraphQLObjectType({
    name:        'page',
    description: 'page item',
    fields:      () => ({
        _id:           {
            type:        GraphQLString,
            description: 'The id of the todo'
        },
        title:         {
            type:        GraphQLString,
            description: 'The page name'
        },
        author:        {
            type:        GraphQLString,
            description: 'The author of the page'
        },
        summary:       {
            type:        GraphQLString,
            description: 'The page summary'
        },
        body:          {
            type:        GraphQLString,
            description: 'The page body content'
        },
        createdAt:     {
            type:        GraphQLInt,
            description: 'Created date'
        },
        lastUpdatedAt: {
            type:        GraphQLInt,
            description: 'Last updated date'
        },
    })
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            page: {
                type: new GraphQLList(pageType),
                args: {
                    _id: {
                        name: '_id',
                        type: GraphQLString,
                    },
                    title: {
                        name: 'title',
                        type: GraphQLString,
                    }
                },
                resolve: (root, { _id, title }, source, fieldASTs) => {
                    const projections = getProjection(fieldASTs);

                    const found = new Promise((resolve, reject) => {
                        PageMongoose.find({ title: new RegExp(title) }, projections, (err, page) => {
                            console.log(title, page, err);
                            err ? reject(err) : resolve(page);
                        })
                    });

                    return found;
                },
            }
        }
    }),
});

module.exports = {
    schema,
    getProjection,
};
