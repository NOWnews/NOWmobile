
import getAdsApi from '../../util/getAdsApi';
const debug = require('debug')('NOWmobile:controllers:ads:newsone');

module.exports = async (req, res, next) => {
    try {
        let ad = await getAdsApi('2994');
        return res.json(ad);
    } catch(err) {
        return next(err);
    }
};
