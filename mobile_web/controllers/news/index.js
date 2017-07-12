
import express from 'express';
let router = express.Router();

import channel from './channel';
import topic from './topic';
import category from './category';
import one from './one';
import search from './search';

// 分類頁
router.route('/news/category/:categoryName')
    .get(category);

// 特輯分類頁
router.route('/news/channel')
    .get(channel);

router.route('/news/channel/:channelId')
    .get(channel);

// 專題頁
router.route('/news/topic')
    .get(topic);

// 新聞搜尋
router.route('/news/search')
    .get(search);

// 內頁 ( 包含影音，照片 )
router.route('/news/:newsId')
    .get(one);

module.exports = router;
