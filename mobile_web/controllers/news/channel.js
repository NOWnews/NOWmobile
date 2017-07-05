
import co from 'co';
import getV4Api from '../../util/getV4Api';
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

        let data = {
            nativeAds: [],
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

        return res.render('news/channel', data);

    }).catch(next);

};
