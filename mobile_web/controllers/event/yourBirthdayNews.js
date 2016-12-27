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
            summary: '來來來，想看看你的生日屬於哪一則新聞呢? 快來抽iPhone，讓 NOWnews 陪你玩個小遊戲，只要輸入你的生日，我們就會找到你生日代表哪一則新聞唷，也不要忘記順便參與粉絲團活動，有好禮送給你唷。想看到全球華人最具影響力的新聞，請隨時關注全球華人最具影響力的新聞平台 NOWnews',
            keywords: '抽iPhone7,跨年,煙火'
        }

        let data = {
            news,
            mainCategory,
            queryParams: queryParams
        };
        return res.render('eventsPage/yourBirthdayNews.html', data);
    }).catch(next);
};
