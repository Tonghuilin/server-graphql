const env = process.env.NODE_ENV || 'development';

process.env.ROOT_URL     = 'localhost';
process.env.PORT         = 4000;
process.env.GRAPHQL_PATH = '/gql';

process.env.TOKEN_LIFESPAN = 7 * 24 * 60 * 60 * 1000; // a week
process.env.JWT_SECRET   = 'abc123';

if (env === 'development') {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/ThlApp';
} else if (env === 'test') {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/ThlAppTest';
}
