const {
          GraphQLObjectType,
          GraphQLString,
          GraphQLInt,
      }                              = require('graphql/type');
const { Page: PageMongoose }         = require('../../model/page');
const { getProjection, filterProps } = require('./helper');

/**
 * Page fields
 *
 * @type {{id: {name: string, type, description: string}, title: {name: string, type, description: string}, author:
 *     {name: string, type, description: string}, summary: {name: string, type, description: string}, createdAt: {name:
 *     string, type, description: string}, lastUpdatedAt: {name: string, type, description: string}}}
 */
const pageFields = {
    id:           {
        name:        'id',
        type:        GraphQLString,
        description: 'The unique id',
        resolve: (obj) => obj._id.toString(),
    },
    title:         {
        name:        'title',
        type:        GraphQLString,
        description: 'The page title',
    },
    author:        {
        name:        'author',
        type:        GraphQLString,
        description: 'The author of the page',
    },
    summary:       {
        name:        'summay',
        type:        GraphQLString,
        description: 'The page summary',
    },
    createdAt:     {
        name:        'createdAt',
        type:        GraphQLString,
        description: 'Created timestamp',
    },
    lastUpdatedAt: {
        name:        'lastUpdatedAt',
        type:        GraphQLString,
        description: 'Last updated timestamp',
    },
};

/**
 * Page type
 *
 * @type {GraphQLObjectType}
 */
const pageType = new GraphQLObjectType({
    name:        'page',
    description: 'page item',
    fields:      () => pageFields,
});

/**
 * Page query resolver
 *
 * @param root
 * @param id
 * @param title
 * @param author
 * @param createdAt
 * @param lastUpdatedAt
 * @param source
 * @param fieldASTs
 * @returns {Promise<*>}
 */
const pageQueryResolver = async (root, { id, title, author, createdAt, lastUpdatedAt }, source, fieldASTs) => {
    const projections = getProjection(fieldASTs);
    const conditions  = filterProps(
        {
            id,
            title:  new RegExp(title),
            author: new RegExp(author),
            createdAt,
            lastUpdatedAt,
        },
    );

    return await PageMongoose.find(conditions, projections);
};

/**
 * Page create/update resolver
 *
 * @param root
 * @param id
 * @param title
 * @param author
 * @param summary
 * @param body
 * @returns {Promise<*>}
 */
const pageCreateUpdateResolver = async (root, { id, title, author, summary, body }, source, fieldASTs) => {
    const fields     = filterProps({ title, author, summary, body });
    const projection = getProjection(fieldASTs);

    // Update
    if (id) {
        const updatedPage = await PageMongoose.findOneAndUpdate(
            { _id: id },
            { ...fields, lastUpdatedAt: Date.now() },
            { projection, new: true },
        );
        return updatedPage;
    }

    // Create
    const createdPages = await PageMongoose.create([fields], { projection });
    return createdPages[0];
};

const pageRemoveResolver = async (root, { id }, source, fieldASTs) => {
    const projection = getProjection(fieldASTs);

    return await PageMongoose.findOneAndDelete({ _id: id }, { projection });
};

module.exports = {
    pageType,
    pageFields,
    pageQueryResolver,
    pageCreateUpdateResolver,
    pageRemoveResolver,
};
