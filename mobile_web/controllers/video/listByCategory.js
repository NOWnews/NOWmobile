import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';

let router = express.Router();


const debug = require('debug')('NOWmobile:controllers:news:video');

module.exports = (req, res, next) => {
    let { taxId } = req.params;

    if (!taxId) return next();

    co(function*() {
        let categoryBaseUrl = 'category/video';

        let result = yield [
            getApi(categoryBaseUrl),
            getApi(`${categoryBaseUrl}/${taxId}`),
        ];

        let mainCategory = result[0];
        let newsList = result[1];


        if(req.query.data === 'PLAYJJ'){
            return res.json({ newsList });
        }

        return res.render('video/category', {
            newsList,
            mainCategory,
            taxId,
        });

    }).catch(next);

}
