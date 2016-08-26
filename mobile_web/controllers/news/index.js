import express from 'express';
let router = express.Router();

import channel from './channel';
import listByCategory from './listByCategory';
import one from './one';
import special from './special';

router.route('/news/special/:specialType')
    .get(special);

router.route('/news/channel')
    .get(channel);

router.route('/news/channel/:channelId')
    .get(channel);

router.route('/news/category/:taxId')
    .get(listByCategory);

router.route('/news/:newsId')
    .get(one);

module.exports = router;
