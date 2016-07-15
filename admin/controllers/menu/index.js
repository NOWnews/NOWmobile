import express from 'express';
let router = express.Router();

const pageList = require('./page.list');
const pageUpdate = require('./page.update');
const pageCreate = require('./page.create');
const actionCreate = require('./action.create');
const actionUpdate = require('./action.update');
const actionRemove = require('./action.remove');

// 驗證是否登入
const isLogin = require('../../middlewares/isLogin');

// 儲存在哪個 url
const saveUrlType = require('../../middlewares/saveUrlType');

router.route('/menu')
    .get(isLogin, saveUrlType, pageList);

router.route('/menu/create')
    .get(isLogin, saveUrlType, pageCreate)
    .post(isLogin, actionCreate);

router.route('/menu/update/:sn')
    .get(isLogin, saveUrlType, pageUpdate)
    .put(isLogin, actionUpdate);

router.route('/menu/delete/:sn')
    .delete(isLogin, actionRemove);

module.exports = router;
