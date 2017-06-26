import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';

let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:news');

module.exports = (req, res, next) => {
    let { newsId } = req.params;

    if (isNaN(newsId)) {
        return res.redirect('/');
    }

    co(function*() {

        let live = yield getApi('kmt/chairman2017');

        let news = yield getApi(`news/${newsId}`);

        debug('news = %j', news);

        // 過濾關鍵字
        if (news.keywords && news.keywords.length > 0) {
            let byeText = ['首頁', '速報', '八卦', '政治', 'google編輯嚴選', 'yahoo名人娛樂', '香港雅虎', '電影', '色區', '生活看板', '社會看板', '國際看板' ,'大陸看板' ,'花生網', '旗艦報', '娛樂報', '花生新鮮事', '花生新鮮事旅遊', '地方', '旅遊看板', '科技看板', '要聞', '花生熱話題', '名人時尚看板', '大咖', '娛樂看板', '娛樂', '電視'];
            let byeTextFormat = ',' + byeText.join('|,') + '|' + byeText.join('|');
            let myRegExp = new RegExp(byeTextFormat, 'g');
            news.keywords = news.keywords.replace(myRegExp, '').replace(/^,/, '');
        }

        let result = yield [
            getApi(`news/headline`),
            getApi('category/news')
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

        let data = {
            news,
            mainCategory,
            headline: newsList,
            queryParams: queryParams,
            live
        };

        if(req.query.data === 'PLAYJJ'){
            return res.json( data );
        }


        // temp for app device
        if(req.query.device === 'app'){
            return res.render('news/temp-one', data);
        }
        // temp for app device end

        return res.render('news/one', data);

    }).catch(next);
};
