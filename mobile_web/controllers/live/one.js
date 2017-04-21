import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';
import geoip from 'geoip-lite';

const debug = require('debug')('NOWmobile:controllers:video');

module.exports = (req, res, next) => {

    let { liveId } = req.params;

    if (!liveId) {
        return next();
    }

    co(function*() {
        let videoBaseUrl = `category/videos`;

        let live = yield getApi('kmt/chairman2017');

        let videoList = yield getApi(`${videoBaseUrl}/8297`);
        let { newsList } = yield getApi(`news/headline`);

        // 濾掉 title 上的 ▲
        videoList = _.map(videoList, (video) => {
            video.title = video.title.replace(/▲/, '');
            return video;
        });

        let news = {
            refNews: newsList
        }

        let data = {
            videoList,
            news,
            live,
            video: {
                title: live.title,
                categories: {
                    name: '直播'
                }
            }
        };

        if(req.query.data === 'PLAYJJ'){
            return res.json({ video });
        }

        // 確認 IP 是否為大陸
        let dirtyIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || "";
        let ip = dirtyIp.split(',').shift();
        let geo = geoip.lookup(ip);
        if (geo && geo.country === 'CN') {
            return res.render('live/cn', data);
        }

        return res.render('live/cn', data);
        // return res.render('live/one', data);

    }).catch(next);
};
