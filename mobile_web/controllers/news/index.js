import express from 'express';
let router = express.Router();

import one from './one';
import listByCateogry from './listByCateogry';

router.route('/news/category/:taxId')
    .get(listByCateogry);

router.route('/news/:newsId')
    .get(one);

module.exports = router;
