import express from 'express';
let router = express.Router();

const pageHome = require('./page.home');

// 驗證是否登入
const isLogin = require('../../middlewares/isLogin');
// 儲存在哪個 url
const saveUrlType = require('../../middlewares/saveUrlType');

router.route('/')
    .get(isLogin, pageHome);

router.route('/admin')
    .get(isLogin, pageHome);

module.exports = router;
