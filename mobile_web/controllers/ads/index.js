
import express from 'express';
let router = express.Router();

import newsone from './newsone';
import newslist from './newslist';

router.route('/ads/newsone')
    .get(newsone);

router.route('/ads/newslist')
    .get(newslist);

module.exports = router;
