import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';
let router = express.Router();
const debug = require('debug')('NOWmobile:controllers:news:channel');

module.exports = (req, res, next) => {
    let { channelId } = req.params;

    co(function*() {
        let channelBaseUrl = 'channels/news';

        let mainChannel = yield getApi(channelBaseUrl);

        if (!channelId) channelId = mainChannel[0].nodeId;

        let newsList = yield getApi(`${channelBaseUrl}/${channelId}`);

        if(req.query.data === 'PLAYJJ'){
            return res.json({ newsList });
        }

        return res.render('news/channel', { newsList, mainChannel });

    }).catch(next);

}
