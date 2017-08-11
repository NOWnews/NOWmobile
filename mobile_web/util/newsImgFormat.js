
import _ from 'lodash';
const debug = require('debug')('NOWmobile:util:newsImgFormat');

module.exports = (news, isList) => {

    if (isList) {
        news = _.map(news, (item) => {
            // item.formatImg = item.MainPhoto.googleCDN || item.MainPhoto.thumbnail || 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg';
            item.formatImg = item.MainPhoto ? 'https://imgapiv2.nownews.com/?w=640&h=360&q=70&src=' + item.MainPhoto.url : 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg';
            return item;
        });
        return news;

    } else {
        news.formatImg = news.MainPhoto ? news.MainPhoto.googleCDN || news.MainPhoto.thumbnail || 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg' : 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg' ;
        return news;
    }

};
