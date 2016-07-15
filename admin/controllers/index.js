
const auth = require('./auth');
const user = require('./user');
const home = require('./home');
const menu = require('./menu');

module.exports = function(app) {


    app.use('/', home);

    app.use('/', auth);
    app.use('/', user);
    app.use('/', menu);



    return function(req, res, next) {
        return next();
    };
};
