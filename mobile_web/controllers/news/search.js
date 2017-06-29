import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';
import getV4Api from '../../util/getV4Api';

let router = express.Router();


const debug = require('debug')('NOWmobile:controllers:news:search');

module.exports = (req, res, next) => {
    let { keyword } = req.query;

    co(function*() {

        let live = yield getV4Api('live/info');

        let result = yield [
            getV4Api('menus'),
            getV4Api(`search/${keyword}?timeRange=lastYear`),
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
