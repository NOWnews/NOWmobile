import co from 'co';
import Promise from 'bluebird';
import getApi from '../../util/getApi';
const debug = require('debug')('NOWmobile:controllers:event:yourBirthdayNews');

module.exports = (req, res, next) => {
    co(function*() {

        let mainCategory = yield getApi('category/news');

        // record query params
        let queryParams = '';
        if(req.query.from){
            queryParams = `?from=${req.query.from}`;
        }
        if(req.query.utm_source){
            queryParams = `?utm_source=${req.query.utm_source}&utm_medium=${req.query.utm_medium}&utm_campaign=${req.query.utm_campaign}`;
        }

        let news = {
            title: '君的誕辰',
            category: {
                name: '粉絲團活動'
            },
            image: {
                thumbnail: '/static/img/yourBirthdayNews.jpg'
            },
            summary: '想看到全球華人最具影響力的新聞，請隨時關注全球華人最具影響力的新聞平台 NOWnews'
        }

        let data = {
            news,
            mainCategory,
            queryParams: queryParams
        };
        return res.render('eventsPage/yourBirthdayNews.html', data);
    }).catch(next);
};
