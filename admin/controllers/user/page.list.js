
import co from 'co';

const debug = require('debug')('NOWmobile:admin:controllers:user:page.list');
const models = require('../../../models');
const libs = require('../../../libs');

module.exports = function (req, res, next) {

    co(function*() {

        let users = yield models.user.find()
            .where('trashed').equals(false)
            .execAsync();

        return res.render('user/list', {
            users
        });
    })
    .catch(next);
};
