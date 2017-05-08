import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';
import geoip from 'geoip-lite';
import chineseConv from 'chinese-conv';

const debug = require('debug')('NOWmobile:controllers:live');

module.exports = (req, res, next) => {

    let { liveId } = req.params;

    if (!liveId) {
        return next();
    }

    co(function*() {
        let videoBaseUrl = `category/videos`;

        let live = yield getApi('kmt/chairman2017');

        debug('live = %j', live);

        let videoList = yield getApi(`${videoBaseUrl}/8297`);
        let { newsList } = yield getApi(`news/headline`);

        debug('video List = %j', videoList);
        debug('news List = %j', newsList);

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

        // 測試用 ---------------------------------------------------------------
        if(req.query.data === 'CN'){
            data.live.title = chineseConv.sify(data.live.title);
            data.videoList = _.map(data.videoList, (video) => {
                video.title = chineseConv.sify(video.title);
                return video;
            });
            data.news.refNews = _.map(data.news.refNews, (news) => {
                news.title = chineseConv.sify(news.title);
                news.category.name = chineseConv.sify(news.category.name);
                return news;
            });
            return res.render('live/cn', data);
        }
        // ---------------------------------------------------------------

        // 確認 IP 是否為大陸
        let dirtyIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || "";
        let ip = dirtyIp.split(',').shift();
        let geo = geoip.lookup(ip);
        if (geo && geo.country === 'CN') {
            data.live.title = chineseConv.sify(data.live.title);
            data.videoList = _.map(data.videoList, (video) => {
                video.title = chineseConv.sify(video.title);
                return video;
            });
            data.news.refNews = _.map(data.news.refNews, (news) => {
                news.title = chineseConv.sify(news.title);
                news.category.name = chineseConv.sify(news.category.name);
                return news;
            });
            return res.render('live/cn', data);
        }

        // 如果有 redirect，就導轉過去
        if ( live.redirect ) {
            return res.redirect(live.redirect);
        }
        return res.render('live/one', data);

    }).catch(next);
};
