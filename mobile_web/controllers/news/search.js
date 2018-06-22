
import Promise from 'bluebird';
import getV4Api from '../../util/getV4Api';
import getAdsApi from '../../util/getAdsApi';
import newsImgFormat from '../../util/newsImgFormat';

const debug = require('debug')('NOWmobile:controllers:news:search');

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
                ad: await getAdsApi('38')
            },{
                sn: 2,
                ad: await getAdsApi('39')
            },{
                sn: 3,
                ad: await getAdsApi('40')
            },{
                sn: 4,
                ad: await getAdsApi('41')
            },{
                sn: 5,
                ad: await getAdsApi('42')
            },{
                sn: 6,
                ad: await getAdsApi('43')
            },{
                sn: 7,
                ad: await getAdsApi('44')
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
