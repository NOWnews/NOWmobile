import express from 'express';
let router = express.Router();

const one = require('./one');
const listByCateogry = require('./listByCateogry');

router.route('/news/category/:taxId')
    .get(listByCateogry);

router.route('/news/:newsId')
    .get(one);

module.exports = router;
