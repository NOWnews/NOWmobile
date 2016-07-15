
const debug = require('debug')('NOWmobile:controllers:admin:menu:action.update');
const models = require('../../../models');
const libs = require('../../../libs');

const co = require('co');

module.exports = (req, res, next) => {
    const updateFields = ['title', 'url', 'weight', 'desc', 'status'];
    let data = _.pick(req.body, updateFields);
    let sn = req.params.sn;

    // debug('req.body = %j', req.body);

    co(function*() {

        let rssModels = yield models.menu.findBySn(sn);

        updateFields.forEach(function(field) {


            rssModels.set(field, data[field]);
        });

        let updatedRssModels = yield rssModels.saveAsync();

        return res.redirect('/menu');
    })
    .catch(next);

};
