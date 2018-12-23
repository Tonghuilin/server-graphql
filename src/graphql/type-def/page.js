const base = `
    type Page {
        id: ID!
        title: String!
        author: ID!
        summary: String
        body: String
        createdAt: String
        lastUpdatedAt: String
        archived: Boolean
    }
`;

const query = `
    getPage(id: ID!): Page
    getPages(term: String, author: ID): [Page]
`;

const mutation = `
    createPage(title: String!, author: ID!, summary: String, body: String): Page
    updatePage(id: ID!, title: String, summary: String, body: String, archive: Boolean): Page
    deletePage(id: ID!): Page
`;

module.exports = {
    base,
    query,
    mutation,
};
