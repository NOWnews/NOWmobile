
import co from 'co';

const debug = require('debug')('NOWmobile:admin:controllers:user:action.create');
const models = require('../../../models');
const libs = require('../../../libs');

module.exports = function (req, res, next) {

    let data = req.body;

    if(data.password !== data.confirm) {
        return next(new Error('輸入密碼不一致'));
    }

    co(function*() {

        let newUser = yield models.user.createAsync({
            name: data.name,
            email: data.email,
            password: libs.hashPwd(data.password),
            createdBy: data.createdBy || '500000000000000000000001'
        });

        return res.redirect('/user');
    })
    .catch(next);
};
