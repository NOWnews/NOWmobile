
const debug = require('debug')('NOWmobile:controllers:admin:menu:page.list');
const models = require('../../../models');
const libs = require('../../../libs');

const co = require('co');

module.exports = (req, res, next) => {
    co(function*() {

        let menuList = yield models.menu.find()
            .where('trashed').equals(false)
            .lean()
            .execAsync();

        return res.render('menu/list', {
            menuList
        });
    })
    .catch(next);
};
