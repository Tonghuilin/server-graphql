// Config server
require('./server.config');

const path         = require('path');
const express      = require('express');
const bodyParser   = require('body-parser');
const { mongoose } = require('./db/mongoose');
const { logger }   = require('./helper/logger');

// Controllers
const { graphqlController } = require('./controller/graphqlController');
const { viewController }    = require('./controller/viewController');

// Constants
const PORT       = process.env.PORT;
const STATIC_DIR = path.join(process.cwd(), 'public/asset');
const VIEW_DIR   = path.join(process.cwd(), 'src/view');

const app  = express();

// Graphql
app.use('/graphql', graphqlController);

app.use('/static', express.static(STATIC_DIR));

app.set('view engine', 'ejs');
app.set('views', VIEW_DIR);

app.get('/', viewController);

// Start
app.listen(process.env.PORT, () => {
    logger.info(`Started up at PORT: ${PORT}`);
});

module.exports = {
    app,
};
