
const debug = require('debug')('NOWmobile:controllers:admin:menu:page.update');
const models = require('../../../models');
const libs = require('../../../libs');
const redis = require('../../../redis');

const co = require('co');

module.exports = (req, res, next) => {
    let sn = req.params.sn;

    co(function*() {

        let menuObj = yield models.menu.findOne()
            .where('sn').equals(sn)
            .where('trashed').equals(false)
            .lean()
            .execAsync();

        let formData = {
            title: '更新選單',
            action: `/menu/update/${sn}`,
            method: 'put',
            formColumn: [{
                title: '標題',
                name: 'title',
                type: 'text',
                value: menuObj.title
            },
            {
                title: '描述',
                name: 'desc',
                type: 'text',
                value: menuObj.desc
            },
            {
                title: '權重(請填數字)',
                name: 'weight',
                type: 'text',
                value: menuObj.weight
            },
            {
                title: 'Url',
                name: 'url',
                type: 'text',
                value: menuObj.url
            },
            {
                title: '狀態',
                name: 'status',
                data: [{
                    title: '下架',
                    value: 'false',
                    selected: !menuObj.status ? 'selected' : ''
                },{
                    title: '上架',
                    value: 'true',
                    selected: menuObj.status ? 'selected' : ''
                }],
                type: 'select'
            }]
        };

        return res.render('menu/update', {
            formData
        });
    })
    .catch(next);
};
