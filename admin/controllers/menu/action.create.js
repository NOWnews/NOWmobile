
const debug = require('debug')('NOWmobile:controllers:admin:menu:action.create');
const models = require('../../../models');
const libs = require('../../../libs');

const co = require('co');

module.exports = (req, res, next) => {

    let data = req.body;
    let user = res.locals.user;

    data.weight = data.weight.replace(/(^[\s]*)|([\s]*$)/g, '');

    // debug('data = %j', data);
    // debug('user = %j', user);

    co(function*() {
        var menuObj = {
            title: data.title,
            desc: data.desc,
            weight: data.weight,
            status: data.status,
            url: data.url,
            createdBy: user._id
        };

        yield models.menu.createAsync(menuObj);

        return res.redirect('/menu');
    })
    .catch(next);
};
