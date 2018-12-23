// Config server
require('./config');

const express      = require('express');
const { mongoose } = require('./db/mongoose');
const { logger }   = require('./helper/logger');

// Constants
const PORT = process.env.PORT;

const app = express();

// GraphQL
require('./graphql')(app);

// Start
app.listen(process.env.PORT, () => {
    logger.info(`[ENV] ${process.env.NODE_ENV}`);
    logger.info(`[PORT] ${PORT}`);
});

module.exports = {
    app,
};
