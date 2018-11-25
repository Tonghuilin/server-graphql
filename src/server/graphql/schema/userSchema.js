const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql/type');

const userType = new GraphQLObjectType({
   name: 'user',
   description: 'user item',
   fields: () => ({
       id: {
           name:        'id',
           type:        GraphQLString,
           description: 'The unique id',
           resolve:     (obj) => obj._id.toString(),
       },
       firstName: {
           type: GraphQLString,
           description: 'First name of the user',
       },
       lastName: {
           type: GraphQLString,
           description: 'Last name of the user',
       },
       username: {
           type: GraphQLString,
           description: 'Username of the user',
       },
       password: {
           type: GraphQLString,
           description: 'Password of the user',
       },
       mobile: {
           type: GraphQLInt,
           description: 'Mobile number of the user',
       },
   }),
});
