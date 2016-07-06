

const debug = require('debug')('NOWmobile:admin:controllers:home:page.home');
const models = require('../../../models');
const libs = require('../../../libs');

module.exports = function (req, res, next) {
    // debug('res.locals = %j', res.locals);

    return res.render('home/index');
};
