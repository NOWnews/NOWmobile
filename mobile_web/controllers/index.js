
const home = require('./home');
const news = require('./news');
const photo = require('./photo');


module.exports = function(app) {

    app.use('/', home);
    app.use('/', news);
    app.use('/', photo);

    return function(req, res, next) {
        return next();
    };
};
