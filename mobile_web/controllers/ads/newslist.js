
import getAdsApi from '../../util/getAdsApi';
const debug = require('debug')('NOWmobile:controllers:ads:newslist');

module.exports = async (req, res, next) => {
    try {
        let ads = [
            await getAdsApi('38'),
            await getAdsApi('39'),
            await getAdsApi('40'),
            await getAdsApi('41'),
            await getAdsApi('42'),
            await getAdsApi('43'),
            await getAdsApi('44'),
        ];

        return res.json(ads);
    } catch(err) {
        return next(err);
    }
};
