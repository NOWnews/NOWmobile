import express from 'express';
let router = express.Router();

import listByCateogry from './listByCateogry';

router.route('/photo/')
    .get(listByCateogry);

router.route('/photo/category/:taxId')
    .get(listByCateogry);


module.exports = router;
