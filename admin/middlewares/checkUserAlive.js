
import co from 'co';

const debug = require('debug')('NOWmobile:admin:middlewares:checkAdminAlive');
const models = require('../../models');
const libs = require('../../libs');

module.exports = function(req, res, next) {

    let data = req.body;

    co(function*() {

        // 找尋這個使用者是否已經註冊過了
        let user = yield models.user.findOne()
            .where('email').equals(data.email)
            .where('trashed').equals(false)
            .execAsync();

        // 如果存在就拋出錯誤訊息
        if(user) {
            return Promise.reject(new Error('使用者已經存在'));
        }

        // 不存在就繼續往下跑
        return next();
    })
    .catch(next);

};
