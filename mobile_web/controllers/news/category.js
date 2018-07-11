
import Promise from 'bluebird';
import getV4Api from '../../util/getV4Api';
import getAdsApi from '../../util/getAdsApi';
import jsonLd from '../../util/catJsonLd'
import newsImgFormat from '../../util/newsImgFormat';

const debug = require('debug')('NOWmobile:controllers:news:category');

module.exports = async (req, res, next) => {
    try {
        let { categoryName } = req.params;

        if (!categoryName) {
            return next();
        }
        
        if (categoryName == "index") {
            categoryName= "index1";
        }

        let live = await getV4Api('live/info');

        let result = await Promise.all([
            getV4Api('menus'),
            getV4Api(`cat/${categoryName}?limit=30`),
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

        let data = {
            catJsonLd,
            nativeAds: ads || [],
            newsList,
            mainCategory,
            categoryName,
            live
        };

        if(req.query.data === 'PLAYJJ'){
            return res.json({ data });
        }

        // 加上 jsonld
        let catJsonLd = jsonLd(categoryName, newsList[0]);

        return res.render('newslist/default', data);
    } catch (err) {
        return next(err);
    }
};
