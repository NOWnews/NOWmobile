import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';
import getV4Api from '../../util/getV4Api';

const debug = require('debug')('NOWmobile:controllers:video');

module.exports = (req, res, next) => {
    let { videoId } = req.params;

    if (!videoId) {
        return next();
    }

    co(function*() {
        let live = yield getV4Api('live/info');

        let video = yield getApi(`videos/${videoId}`);
        video.title = video.title.replace(/▲/, '');

        let { newsList } = yield getApi(`news/headline`);

        if(req.query.data === 'PLAYJJ'){
            return res.json({ video });
        }

        return res.render('video/one', {
            video,
            headline: newsList,
            type: 'video',
            live
        });

    }).catch(next);
};
