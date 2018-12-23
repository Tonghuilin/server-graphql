const base = `    
    input SocialInput {
        wechat: String
        weibo: String
        qq: String
        email: String
    }
    type Social {
        wechat: String
        weibo: String
        qq: String
        email: String
    }
    type User {
        # auto generated
        id: ID!
        lastUpdatedAt: String
        lastLoggedIn: String
        
        # update with login
        createdAt: String

        username: String!
        firstName: String!
        lastName: String!
        mobile: String
        social: Social
        archived: Boolean @auth(requires: ADMIN)
        
        # enum Role defined in ./common.js
        role: Role @auth(requires: ADMIN)
    }
`;

const query = `
    getUser(id: ID, username: String): User
    getUsers(term: String): [User]
`;

const mutation = `
    createUser(
        username: String!
        password: String!
        firstName: String!
        lastName: String!
        mobile: String
        social: SocialInput
    ): User

    updateUser(
        id: ID!,
        firstName: String
        lastName: String
        mobile: String
        social: SocialInput
        archived: Boolean
        role: Role
    ): User

    deleteUser(id: ID!): User
`;

module.exports = {
    base,
    query,
    mutation,
};
