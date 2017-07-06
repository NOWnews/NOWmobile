import co from 'co';
import express from 'express';
import getV4Api from '../util/getV4Api';
import getAdsApi from '../util/getAdsApi';
import jsonLd from '../util/homeJsonLd'

let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:home');


router.route('/')
    .get((req, res, next) => {
        co(function*() {

            let result = yield [
                getV4Api('menus'),
                getV4Api('indexpage'),
            ];

            let live = yield getV4Api('live/info');

            debug('live = %j', live);

            let mainCategory = result[0];
            //TODO 現在沒有 ads
            let { carousels, ads } = result[1];

            let newsList = carousels

            // TODO ---- 廣告先暫時這樣處理 乾
            ads = [
                {
                    sn: 1,
                    ad: yield getAdsApi('2995')
                },{
                    sn: 2,
                    ad: yield getAdsApi('2996')
                },{
                    sn: 3,
                    ad: yield getAdsApi('2997')
                },{
                    sn: 4,
                    ad: yield getAdsApi('2998')
                },{
                    sn: 5,
                    ad: yield getAdsApi('2999')
                },{
                    sn: 6,
                    ad: yield getAdsApi('3000')
                },{
                    sn: 7,
                    ad: yield getAdsApi('3001')
                }];
            // ------------------------

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
                nativeAds: ads || [],
                newsList,
                mainCategory,
                specialType: 'headline',
            });

        }).catch(next);

    });

module.exports = router;
