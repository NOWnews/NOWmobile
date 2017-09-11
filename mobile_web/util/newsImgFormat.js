
import _ from 'lodash';
const debug = require('debug')('NOWmobile:util:newsImgFormat');

module.exports = (news, isList, size = 'large') => {
    const defaultImgUrl = 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg';
    const imgapi = config.get('imgApi.host');
    const listSize = {
        large: `${imgapi}?w=640&q=70&src=`,
        thumbnail: `${imgapi}?w=300&q=90&src=`
    };
    const oneSize = `${imgapi}?w=640&q=70&src=`;
    const imgRegexString = /^(http|https):\/\/(s|img|legacy).nownews.com\//;
    let checkImgDomain = (url) => {

    };

    if (isList) {
        news = _.map(news, (item) => {

            if (!item.MainPhoto) {
                item.MainPhoto = {
                    formatImg: `${listSize[size]}${defaultImgUrl}`,
                    originalImg: defaultImgUrl
                };
                return item;
            }

            if (size ===  'large') {
                item.MainPhoto.formatImg = item.MainPhoto.sizeFormat.w640q70;
            } else {
                item.MainPhoto.formatImg = item.MainPhoto.sizeFormat.w300q70;
            }

            item.MainPhoto.originalImg = item.MainPhoto.url

            return item;
        });
    } else {
        if (!news.MainPhoto) {
            news.MainPhoto = {
                formatImg: `${listSize[size]}${defaultImgUrl}`,
                originalImg: defaultImgUrl
            };
            return news;
        }
        news.MainPhoto.formatImg = news.MainPhoto.sizeFormat.w640q70;
        news.MainPhoto.originalImg = news.MainPhoto.url;
    }

    return news;

};
