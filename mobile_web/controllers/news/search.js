import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';

let router = express.Router();


const debug = require('debug')('NOWmobile:controllers:news:search');

module.exports = (req, res, next) => {
    let { keyword } = req.query;

    co(function*() {

        let live = yield getApi('kmt/chairman2017');

        let result = yield [
            getApi('category/news'),
            getApi(`search?keyword=${keyword}`),
        ];

        let mainCategory = result[0];
        let { newsList, ads } = result[1];

        if(req.query.data === 'PLAYJJ'){
            return res.json({ newsList });
        }

        return res.render('news/category', {
            nativeAds: ads || [],
            mainCategory,
            newsList,
            keyword,
            isSearch: true,
            live
        });

    }).catch(next);

};
