import express from 'express';
let router = express.Router();

const pageList = require('./page.list');
const pageUpdate = require('./page.update');
const pageCreate = require('./page.create');
const actionCreate = require('./action.create');
const actionUpdate = require('./action.update');
const actionRemove = require('./action.remove');

// 確認這個 user 是否存在的 middleware
const checkUserAlive = require('../../middlewares/checkUserAlive');

// 驗證是否登入
const isLogin = require('../../middlewares/isLogin');

// 儲存在哪個 url
const saveUrlType = require('../../middlewares/saveUrlType');

router.route('/user')
    .get(isLogin, saveUrlType, pageList);

router.route('/user/create')
    .get(isLogin, saveUrlType, pageCreate)
    .post(checkUserAlive, isLogin, actionCreate);

router.route('/user/update/:sn')
    .get(isLogin, saveUrlType, pageUpdate)
    .put(isLogin, actionUpdate);

router.route('/user/delete/:sn')
    .delete(isLogin, actionRemove);

module.exports = router;
