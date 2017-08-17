
import co from 'co';
import getV4Api from '../../util/getV4Api';
import jsonld from '../../util/jsonld'

import newsImgFormat from '../../util/newsImgFormat';

const debug = require('debug')('NOWmobile:controllers:news');

module.exports = (req, res, next) => {
    let { newsId } = req.params;

    if (isNaN(newsId)) {
        return res.redirect('/');
    }

    co(function*() {

        let live = yield getV4Api('live/info');

        let news = yield getV4Api(`news/${newsId}`);

        let nextandprev = yield getV4Api(`news/${newsId}/nextandprev`);

        let refNews = yield getV4Api(`news/${newsId}/relations`);

        debug('news = %j', news);

        let keywords = _.map(news.Tags, (tag) => {
            return tag.name;
        });
        news.newsKeywords = keywords.join(',');

        let result = yield [
            getV4Api(`instant`),
            getV4Api('menus')
        ];

        // record query params
        let queryParams = '';
        if(req.query.from){
            queryParams = `?from=${req.query.from}`;
        }
        if(req.query.utm_source){
            queryParams = `?utm_source=${req.query.utm_source}&utm_medium=${req.query.utm_medium}&utm_campaign=${req.query.utm_campaign}`;
        }

        let { newsList } = result[0];

        let mainCategory = result[1];

        // 加上 上下頁的新聞
        news.next = nextandprev.next;
        news.prev = nextandprev.prev;

        // 加上 相關新聞
        news.refNews = refNews;

        // 加上 jsonld
        news.jsonld = jsonld(news);

        news = newsImgFormat(news);
        news.headline = newsImgFormat(news.headline, true);
        news.refNews = newsImgFormat(news.refNews, true);
        newsList = newsImgFormat(newsList, true);
        let isOnePage = true;
        let data = {
            news,
            mainCategory,
            headline: newsList,
            queryParams: queryParams,
            live
        };

        // temp for app device
        if(req.query.device === 'app'){

            if(news.type==='PHOTO'){
            return res.render('news/temp-one-photo', data);
            }

            if(news.type==='VIDEO'){
                if(news.MainVideo.url.indexOf('youtube') > -1){
                    news.MainVideo.videoFrom = 'YOUTUBE';
                }
                if(news.MainVideo.url.indexOf('facebook') > -1){
                    news.MainVideo.videoFrom = 'FB';
                    news.MainVideo.vid = news.MainVideo.url.split('/')[5];
                }
                if(news.MainVideo.url.indexOf('instagram') > -1){
                    news.MainVideo.videoFrom = 'IG';
                }
                if(news.MainVideo.url.indexOf('mlb') > -1){
                    news.MainVideo.videoFrom = 'MLB';
                }
                return res.render('news/temp-one-video', data);
            }

            return res.render('news/temp-one', data);
        }

        // temp for app device end


        if(req.query.data === 'PLAYJJ'){
            return res.json( data );
        }

        if(news.type==='PHOTO'){
            return res.render('news/one-photo', data);
        }

        if(news.type==='VIDEO'){
            if(news.MainVideo.url.indexOf('youtu') > -1){
                news.MainVideo.videoFrom = 'YOUTUBE';
            }
            if(news.MainVideo.url.indexOf('facebook') > -1){
                news.MainVideo.videoFrom = 'FB';
                news.MainVideo.vid = news.MainVideo.url.split('/')[5];
            }
            if(news.MainVideo.url.indexOf('instagram') > -1){
                news.MainVideo.videoFrom = 'IG';
            }
            if(news.MainVideo.url.indexOf('mlb') > -1){
                news.MainVideo.videoFrom = 'MLB';
            }
            return res.render('news/one-video', data);
        }

        return res.render('news/one', {
            news,
            mainCategory,
            headline: newsList,
            queryParams: queryParams,
            live,
            isOnePage
        });

    }).catch(next);
};
