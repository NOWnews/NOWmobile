
import co from 'co';
import getV4Api from '../../util/getV4Api';
import getAdsApi from '../../util/getAdsApi';
import jsonLd from '../../util/catJsonLd'

const debug = require('debug')('NOWmobile:controllers:news:category');

module.exports = (req, res, next) => {
    let { categoryName } = req.params;

    if (!categoryName) {
        return next();
    }

    co(function*() {
        let live = yield getV4Api('live/info');

        let result = yield [
            getV4Api('menus'),
            getV4Api(`cat/${categoryName}?limit=30`),
        ];

        let mainCategory = result[0];
        let { newsList, ads } = result[1];

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
            return res.json({ newsList, ads });
        }

        // 加上 jsonld
        let catJsonLd = jsonLd(categoryName, newsList[0]);

        return res.render('newslist/default', {
            catJsonLd,
            nativeAds: ads || [],
            newsList,
            mainCategory,
            categoryName,
            live
        });

    }).catch(next);

};
