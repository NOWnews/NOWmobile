import express from 'express';
let router = express.Router();

import listByCategory from './listByCategory';

router.route('/video')
    .get(listByCategory);

router.route('/video/category/:taxId')
    .get(listByCategory);


module.exports = router;
