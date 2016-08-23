import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';

let router = express.Router();


const debug = require('debug')('NOWmobile:controllers:news:category');

module.exports = (req, res, next) => {
    let { taxId } = req.params;

    if (!taxId) return next();

    co(function*() {
        let categoryBaseUrl = 'category/news';

        let newsListPromise = getApi(`${categoryBaseUrl}/${taxId}`);

        let mainCategoryPromise = getApi(categoryBaseUrl);

        let result = yield [
            newsListPromise,
            mainCategoryPromise,
        ];

        let newsList = result[0];
        let mainCategory = result[1];


        if(req.query.data === 'PLAYJJ'){
            return res.json({ newsList });
        }

        return res.render('news/category', { newsList, mainCategory });

    }).catch(next);

}
