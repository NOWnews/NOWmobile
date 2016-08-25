import express from 'express';
let router = express.Router();

import listByCateogry from './listByCateogry';
import one from './one';

router.route('/photo/')
    .get(listByCateogry);

router.route('/photo/category/:taxId')
    .get(listByCateogry);

router.route('/photo/:photoId')
    .get(one);

module.exports = router;
