
const debug = require('debug')('NOWmobile:controllers:admin:menu:page.create');
const models = require('../../../models');
const libs = require('../../../libs');
const redis = require('../../../redis');

const co = require('co');

module.exports = (req, res, next) => {
    let formData = {
        title: '建立選單',
        action: '/menu/create',
        method: 'post',
        formColumn: [{
            title: '標題',
            name: 'title',
            type: 'text'
        },
        {
            title: '描述',
            name: 'desc',
            type: 'text'
        },
        {
            title: '權重(請填數字)',
            name: 'weight',
            type: 'text',
            value: 0
        },
        {
            title: 'Url',
            name: 'url',
            type: 'text'
        },
        {
            title: '狀態',
            name: 'status',
            data: [{
                title: '下架',
                value: 'false',
                attr: 'selected'
            },{
                title: '上架',
                value: 'true'
            }],
            type: 'select'
        }]
    };
    return res.render('menu/create', {
        formData
    });
};
