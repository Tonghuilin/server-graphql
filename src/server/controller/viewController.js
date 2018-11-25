const { logRequest } = require('../helper/logger');

const viewController = (req, res) => {
    logRequest(req);
    res.render('index', { title: 'THL' });
};

module.exports = {
    viewController,
};
