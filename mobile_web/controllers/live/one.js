import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';

const debug = require('debug')('NOWmobile:controllers:video');

module.exports = (req, res, next) => {

    let { liveId } = req.params;

    if (!liveId) {
        return next();
    }

    co(function*() {
        let videoBaseUrl = `category/videos`;
        // let mainCategory = yield getApi(videoBaseUrl);



        let videoList = yield getApi(`${videoBaseUrl}/8297`);

        // 濾掉 title 上的 ▲
        videoList = _.map(videoList, (video) => {
            video.title = video.title.replace(/▲/, '');
            return video;
        });

        console.log(videoList,'L30');


        if(req.query.data === 'PLAYJJ'){
            return res.json({ video });
        }

        return res.render('live/one', {
            type: 'video',
            videoList
        });

    }).catch(next);
};
