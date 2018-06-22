
import fetch from 'node-fetch';
import iconv from 'iconv-lite';
import Promise from 'bluebird';
const debug = require('debug')('NOWmobile:util:getAdsApi');

module.exports = async (ownerId) => {
    try {
        let fetchUrl = `https://ad2018.nownews.com/ad/${ownerId}`;

        // 如果 url 有中文字，建議 encode 會比較沒有問題
        fetchUrl = encodeURI(fetchUrl);

        debug('Url = ', fetchUrl);

        let ad = await fetch(fetchUrl, {
                // 因為 ad2004 回傳很慢...
                timeout: 20000
            })
            .then((res) => {
                return res.buffer();
            })
            .then((buffer) => {
                return Promise.resolve(iconv.decode(buffer, 'big5'));
            })
            .then((ad) => {
                let result = {img: '', title: '', url: ''};
                try {
                    // 如果廣告關閉
                    if (ad === '') {
                        return Promise.resolve({err: '沒有廣告'});
                    }

                    // 如果廣告沒有其他東西
                    if (ad.indexOf('"title"') < 0 && ad.indexOf('"img"') < 0 && ad.indexOf('"url"') < 0) {
                        return Promise.resolve({err: '廣告格式錯誤'});
                    }

                    result = JSON.parse(ad);
                } catch (e) { }

                return Promise.resolve(result);
            });

            return Promise.resolve(ad);
    } catch (err) {
        return Promise.resolve({});
        // return Promise.reject(err);
    }
};