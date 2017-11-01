import Promise from 'bluebird';
import express from 'express';
import getV4Api from '../util/getV4Api';
import getAdsApi from '../util/getAdsApi';
import jsonLd from '../util/homeJsonLd'
import newsImgFormat from '../util/newsImgFormat';

let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:home');

router.route('/')
    .get(async (req, res, next) => {
        try {
            let result = await Promise.all([
                getV4Api('menus'),
                getV4Api('indexpage'),
            ]);

            let live = await getV4Api('live/info');

            debug('live = %j', live);

            let mainCategory = result[0];
            //TODO 現在沒有 ads
            let { carousels, ads } = result[1];

            let newsList = carousels;

            // TODO ---- 廣告先暫時這樣處理 乾
            ads = [
                {
                    sn: 1,
                    ad: await getAdsApi('2995')
                },{
                    sn: 2,
                    ad: await getAdsApi('2996')
                },{
                    sn: 3,
                    ad: await getAdsApi('2997')
                },{
                    sn: 4,
                    ad: await getAdsApi('2998')
                },{
                    sn: 5,
                    ad: await getAdsApi('2999')
                },{
                    sn: 6,
                    ad: await getAdsApi('3000')
                },{
                    sn: 7,
                    ad: await getAdsApi('3001')
                }];
            // ------------------------

            newsList = newsImgFormat(newsList, true);

            if(req.query.data === 'PLAYJJ'){
                return res.json({ newsList });
            }

            // 加上 jsonld
            debug('homeJsonLd...',jsonLd());
            let homeJsonLd = jsonLd();
            let isHomePage = true;

            return res.render('newslist/default', {
                isHomePage,
                homeJsonLd,
                live,
                nativeAds: ads || [],
                newsList,
                mainCategory,
                specialType: 'headline',
            });
        } catch (err) {
            return next(err);
        }
    });

module.exports = router;
