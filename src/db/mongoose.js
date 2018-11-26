const mongoose   = require('mongoose');
const { logger } = require('../helper/logger');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
        .then(() => logger.info('Connected to mongoose'))
        .catch(err => logger.info('Failed to connect to mongoose', err));

module.exports = {
    mongoose,
};
