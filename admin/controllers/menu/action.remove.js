
const debug = require('debug')('NOWmobile:controllers:admin:menu:action.remove');
const models = require('../../../models');

const co = require('co');

module.exports = (req, res, next) => {

    let sn = req.params.sn;

    // debug('data = %j', data);

    co(function*() {

        let menuObj = yield models.rss.findBySn(sn);

        debug('menuObj = %j', menuObj);

        menuObj.set('trashed', true);
        let removedMenuObj = yield menuObj.saveAsync();
        debug('removedMenuObj = %j', removedMenuObj);

        return res.json(removedMenuObj);
    })
    .catch(next);
};
