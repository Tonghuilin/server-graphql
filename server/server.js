// Config server
require('./server.config');

const express      = require('express');
const bodyParser   = require('body-parser');
const { mongoose } = require('./db/mongoose');
const { logger }   = require('./core/logger');

// Controllers
const { controlGraphql } = require('./middleware/graphql');

// Define server
const PORT = process.env.PORT;
const app  = express();

// Apply middleware
app.use('/graphql', controlGraphql);

// Start
app.listen(process.env.PORT, () => {
    logger.info(`Started up at PORT: ${PORT}`);
});

module.exports = {
    app,
};
