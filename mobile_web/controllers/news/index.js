import express from 'express';
let router = express.Router();

import channel from './channel';
import listByCateogry from './listByCateogry';
import one from './one';
import search from './search';
import special from './special';

router.route('/news/special/:specialType')
    .get(special);

router.route('/news/channel')
    .get(channel);

router.route('/news/channel/:channelId')
    .get(channel);

router.route('/news/category/:taxId')
    .get(listByCateogry);

router.route('/news/search')
    .get(search);

router.route('/news/:newsId')
    .get(one);

module.exports = router;
