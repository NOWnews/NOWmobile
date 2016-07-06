
import co from 'co';

const debug = require('debug')('NOWmobile:admin:controllers:user:action.update');
const models = require('../../../models');
const libs = require('../../../libs');

module.exports = function (req, res, next) {
    const updateFields = ['name'];
    let data = _.pick(req.body, updateFields);
    let sn = req.params.sn;

    co(function*() {

        let updatedUser = req.session.user;
        let user = yield models.user.findBySn(sn);

        updateFields.forEach(function(field) {
            user.set(field, data[field]);
        });

        if(updatedUser) {
            user.set('updatedBy', updatedUser._id);
        }

        let startUpdatedUser = yield user.saveAsync();

        return res.redirect(`/user`);
    })
    .catch(next);

};
