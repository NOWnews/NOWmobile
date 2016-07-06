
const debug = require('debug')('NOWmobile:admin:controllers:auth:action.logout');

module.exports = function(req, res, next) {

    debug('req.session.user = %j', req.session.user);

    req.session = null;
    res.locals.user = null;

    return res.redirect('/auth/login');
};
