
import _ from 'lodash';
const debug = require('debug')('NOWmobile:util:newsImgFormat');

module.exports = (news, isList) => {

    if (isList) {
        news = _.map(news, (item) => {
            item.formatImg = item.MainPhoto.googleCDN || item.MainPhoto.thumbnail || 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg';
            return item;
        });
        return news;

    } else {
        news.formatImg = news.MainPhoto.googleCDN || news.MainPhoto.thumbnail || 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg';
        return news;
    }

};
