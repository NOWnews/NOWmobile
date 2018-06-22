
import getV4Api from '../../util/getV4Api';
import getAdsApi from '../../util/getAdsApi';
import newsImgFormat from '../../util/newsImgFormat';

const debug = require('debug')('NOWmobile:controllers:news:channel');

module.exports = async (req, res, next) => {
    try {

        let { channelId } = req.params;

        let live = await getV4Api('live/info');

        let { specialChannels } = await getV4Api('specialchannels');

        let mainChannel = specialChannels;

        if (!channelId) {
            channelId = mainChannel[0].sn;
        }

        let { isOpen } = req.query;

        let { newsList, title } = await getV4Api(`specialchannels/${channelId}`);
        let channelName = title;

        // TODO ---- 廣告先暫時這樣處理 乾
        let ads = [
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
            nativeAds: ads || [],
            newsList,
            mainChannel,
            channelName,
            channelId,
            isOpen,
            live
        };

        if(req.query.data === 'PLAYJJ'){
            return res.json({ data });
        }

        return res.render('newslist/channel', data);

    } catch (err) {
        return next(err); 
    }
};
