
const home = require('./home');
const news = require('./news');

module.exports = function(app) {

    app.use('/', home);
    app.use('/', news);

    return function(req, res, next) {
        return next();
    };
};
