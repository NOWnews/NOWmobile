
import co from 'co';
import getV4Api from '../../util/getV4Api';
import getAdsApi from '../../util/getAdsApi';
import newsImgFormat from '../../util/newsImgFormat';

const debug = require('debug')('NOWmobile:controllers:news:channel');

module.exports = (req, res, next) => {
    let { channelId } = req.params;

    co(function*() {
        let live = yield getV4Api('live/info');

        let { specialChannels } = yield getV4Api('specialchannels');

        let mainChannel = specialChannels;

        if (!channelId) {
            channelId = mainChannel[0].sn;
        }

        let { isOpen } = req.query;

        let { newsList, title } = yield getV4Api(`specialchannels/${channelId}`);
        let channelName = title;

        // TODO ---- 廣告先暫時這樣處理 乾
        let ads = [
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

    }).catch(next);

};
