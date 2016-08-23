import co from 'co';
import express from 'express';
import getApi from '../util/getApi';
let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:home');

router.route('/')
    .get((req, res, next) => {
        co(function*() {

            let headLineNewsPromise = getApi('news/headline');

            let mainCategoryPromise = getApi('category/news');

            let result = yield [
                headLineNewsPromise,
                mainCategoryPromise,
            ];

            let newsList = result[0];
            let mainCategory = result[1];

            if(req.query.data === 'PLAYJJ'){
                return res.json({ newsList });
            }

            return res.render('home/home', { newsList, mainCategory });

        }).catch(next);

    });

module.exports = router;
