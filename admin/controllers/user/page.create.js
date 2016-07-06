
const debug = require('debug')('NOWmobile:admin:controllers:user:page.create');
const models = require('../../../models');
const libs = require('../../../libs');

module.exports = function (req, res, next) {
    let formData = {
        title: '新增管理者',
        action: '/user/create',
        method: 'post',
        formColumn: [{
            title: '姓名',
            name: 'name',
            type: 'text'
        },
        {
            title: 'E-mail',
            name: 'email',
            type: 'email'
        },
        {
            title: '密碼',
            name: 'password',
            type: 'password'
        },
        {
            title: '確認密碼',
            name: 'confirm',
            type: 'password'
        }]
    };
    return res.render('user/create', {
        formData
    });
};
