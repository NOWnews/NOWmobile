
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
        return imgRegexString.test(url);
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

            // TODO 有可能 api cache 還沒清掉，會沒有 sizeFormat 做的防護
            if (!item.MainPhoto.sizeFormat) {
                item.MainPhoto.formatImg = checkImgDomain(item.MainPhoto.url)? `${listSize[size]}${item.MainPhoto.url}`: item.MainPhoto.url;
                item.MainPhoto.originalImg = item.MainPhoto.url;
                return item;
            }

            if (size ===  'large') {
                item.MainPhoto.formatImg = item.MainPhoto.sizeFormat.w640q70;
            } else {
                item.MainPhoto.formatImg = item.MainPhoto.sizeFormat.w300q70;
            }

            item.MainPhoto.originalImg = item.MainPhoto.url;

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

        // TODO 有可能 api cache 還沒清掉，會沒有 sizeFormat 做的防護
        if (!news.MainPhoto.sizeFormat) {
            news.MainPhoto.formatImg = checkImgDomain(news.MainPhoto.url)? `${listSize[size]}${news.MainPhoto.url}`: news.MainPhoto.url;
            news.MainPhoto.originalImg = news.MainPhoto.url;
            return news;
        }

        news.MainPhoto.formatImg = news.MainPhoto.sizeFormat.w640q70;
        news.MainPhoto.originalImg = news.MainPhoto.url;

    }

    return news;

};
