
const auth = require('./auth');
const user = require('./user');
const home = require('./home');

module.exports = function(app) {


    app.use('/', home);

    app.use('/', auth);
    app.use('/', user);



    return function(req, res, next) {
        return next();
    };
};
