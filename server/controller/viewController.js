const { logRequest } = require('../core/logger');

const viewController = (req, res) => {
    logRequest(req);
console.log(req.path);
    res.send('123');
};

module.exports = {
    viewController,
};
