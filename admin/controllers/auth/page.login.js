
const debug = require('debug')('NOWmobile:admin:controllers:auth:page.login');

module.exports = function(req, res, next) {
    return res.render('auth/login');
};
