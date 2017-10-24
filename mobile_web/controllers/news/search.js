
import co from 'co';
import Promise from 'bluebird';
import getV4Api from '../../util/getV4Api';
import getAdsApi from '../../util/getAdsApi';
import newsImgFormat from '../../util/newsImgFormat';

const debug = require('debug')('NOWmobile:controllers:news:search');

// module.exports = (req, res, next) => {
//     let { keyword } = req.query;

//     co(function*() {

//         let live = yield getV4Api('live/info');

//         let result = yield [
//             getV4Api('menus'),
//             getV4Api(`search/${keyword}?timeRange=lastYear`),
//         ];

//         let mainCategory = result[0];
//         let { newsList, ads } = result[1];

//         // TODO ---- 廣告先暫時這樣處理 乾
//         ads = [
//             {
//                 sn: 1,
//                 ad: yield getAdsApi('2995')
//             },{
//                 sn: 2,
//                 ad: yield getAdsApi('2996')
//             },{
//                 sn: 3,
//                 ad: yield getAdsApi('2997')
//             },{
//                 sn: 4,
//                 ad: yield getAdsApi('2998')
//             },{
//                 sn: 5,
//                 ad: yield getAdsApi('2999')
//             },{
//                 sn: 6,
//                 ad: yield getAdsApi('3000')
//             },{
//                 sn: 7,
//                 ad: yield getAdsApi('3001')
//             }];
//         // ------------------------

//         newsList = newsImgFormat(newsList, true);

//         if(req.query.data === 'PLAYJJ'){
//             return res.json({ newsList });
//         }

//         return res.render('newslist/search', {
//             nativeAds: ads || [],
//             mainCategory,
//             newsList,
//             keyword,
//             isSearch: true,
//             live
//         });

//     }).catch(next);

// };

module.exports = async (req, res, next) => {
    try {
        let { keyword } = req.query;

        let live = await getV4Api('live/info');

        let result = await Promise.all([
            getV4Api('menus'),
            getV4Api(`search/${keyword}?timeRange=lastYear`),
        ]);

        let mainCategory = result[0];
        let { newsList, ads } = result[1];

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

        return res.render('newslist/search', {
            nativeAds: ads || [],
            mainCategory,
            newsList,
            keyword,
            isSearch: true,
            live
        });

    } catch (err) {
        return next(err);
    }
};
