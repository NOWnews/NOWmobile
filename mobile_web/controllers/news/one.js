
import getV4Api from '../../util/getV4Api';
import jsonld from '../../util/jsonld'

import newsImgFormat from '../../util/newsImgFormat';
import getContentAd from '../../util/getContentAd';

const debug = require('debug')('NOWmobile:controllers:news');

module.exports = async (req, res, next) => {
    try {

        let { newsId } = req.params;

        if (isNaN(newsId)) {
            return res.redirect('/');
        }

        let news = await getV4Api(`news/${newsId}`);
        let statusCode = news.statusCode || news.status || 200;
        if( statusCode !== 200 ){
             throw new Error(`news/${newsId}找不到新聞!!`);
        }

        let live = await getV4Api('live/info');


        let nextandprev = await getV4Api(`news/${newsId}/nextandprev`);

        let refNews = await getV4Api(`news/${newsId}/relations`);

        debug('news = %j', news);

        let keywords = _.map(news.Tags, (tag) => {
            return tag.name;
        });
        news.newsKeywords = keywords.join(',');

        let result = await Promise.all([
            getV4Api(`instant`),
            getV4Api('menus')
        ]);

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

        news = newsImgFormat(news);

        // 加上 jsonld
        news.jsonld = jsonld(news);

        news.headline = newsImgFormat(news.headline, true, 'thumbnail');
        news.refNews = newsImgFormat(news.refNews, true, 'thumbnail');
        newsList = newsImgFormat(newsList, true, 'thumbnail');

        // 文中廣告
        if (news.hasContentAd) {
            news.content = getContentAd(news);
        }

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

    } catch (err) {
        return next(err);
    }
};
