
import co from 'co';

const debug = require('debug')('NOWmobile:admin:middlewares:isLogin');

module.exports = function(req, res, next) {

    debug('req.session.user = %j', req.session.user);

    if(!req.session || !req.session.user) {
        return res.redirect('/auth/login');
    }

    res.locals.user = req.session.user;

    return next();
};
