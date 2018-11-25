// Config server
require('./server.config');

const express      = require('express');
const bodyParser   = require('body-parser');
const { mongoose } = require('./db/mongoose');
const { logger }   = require('./core/logger');

// Controllers
const { graphqlController } = require('./controller/graphqlController');
const { viewController }    = require('./controller/viewController');

// Define server
const PORT = process.env.PORT;
const app  = express();



// Graphql
app.use('/graphql', graphqlController);

app.get('/page', viewController);

// Start
app.listen(process.env.PORT, () => {
    logger.info(`Started up at PORT: ${PORT}`);
});

module.exports = {
    app,
};
