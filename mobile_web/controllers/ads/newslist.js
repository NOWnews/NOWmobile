
import getAdsApi from '../../util/getAdsApi';
const debug = require('debug')('NOWmobile:controllers:ads:newslist');

module.exports = async (req, res, next) => {
    try {
        let ads = [
            await getAdsApi('2995'),
            await getAdsApi('2996'),
            await getAdsApi('2997'),
            await getAdsApi('2998'),
            await getAdsApi('2999'),
            await getAdsApi('3000'),
            await getAdsApi('3001'),
        ];

        return res.json(ads);
    } catch(err) {
        return next(err);
    }
};
