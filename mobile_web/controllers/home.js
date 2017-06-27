import co from 'co';
import express from 'express';
import getApi from '../util/getApi';
import getV4Api from '../util/getV4Api';
import jsonLd from '../util/homeJsonLd'

let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:home');


router.route('/')
    .get((req, res, next) => {
        co(function*() {

            let result = yield [
                getV4Api('menus'),
                getV4Api('instant'),
            ];

            let live = yield getApi('kmt/chairman2017');

            debug('live = %j', live);

            let mainCategory = result[0];
            //TODO 現在沒有 ads
            let { newsList, ads } = result[1];

            if(req.query.data === 'PLAYJJ'){
                return res.json({ newsList });
            }

            // 加上 jsonld
            debug('homeJsonLd...',jsonLd());
            let homeJsonLd = jsonLd();
            let isHomePage = true;

            return res.render('home/home', {
                isHomePage,
                homeJsonLd,
                live,
                nativeAds: [],
                newsList,
                mainCategory,
                specialType: 'headline',
            });

        }).catch(next);

    });

module.exports = router;
