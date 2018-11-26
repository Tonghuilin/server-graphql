// Config server
require('./config');

const express      = require('express');
const bodyParser   = require('body-parser');
const { mongoose } = require('./db/mongoose');
const { logger }   = require('./helper/logger');

// Controllers
const { graphqlController } = require('./controller/graphqlController');

// Constants
const PORT       = process.env.PORT;

const app  = express();

// Graphql
app.use('/graphql', graphqlController);

// Start
app.listen(process.env.PORT, () => {
    logger.info(`Started up at PORT: ${PORT}`);
});

module.exports = {
    app,
};
