
import co from 'co';

const debug = require('debug')('NOWmobile:admin:controllers:user:action.remove');
const models = require('../../../models');

module.exports = (req, res, next) => {

    let sn = req.params.sn;

    // debug('data = %j', data);

    co(function*() {

        let userObj = yield models.user.findBySn(sn);

        debug('userObj = %j', userObj);

        userObj.set('trashed', true);
        let removedUserObj = yield userObj.saveAsync();
        debug('removedUserObj = %j', removedUserObj);

        return res.json(removedUserObj);
    })
    .catch(next);
};
