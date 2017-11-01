
import fetch from 'node-fetch';
import iconv from 'iconv-lite';
import Promise from 'bluebird';
const debug = require('debug')('NOWmobile:util:getAdsApi');

module.exports = async (ownerId) => {
    try {
        let fetchUrl = `http://ad1.nownews.com/ads.php?ownerid=${ownerId}`;

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
                // 如果廣告關閉
                if (ad === '') {
                    return Promise.resolve({err: '沒有廣告'});
                }

                // 如果廣告沒有其他東西
                if (ad.indexOf('"title"') < 0 && ad.indexOf('"img"') < 0 && ad.indexOf('"url"') < 0) {
                    return Promise.resolve({err: '廣告格式錯誤'});
                }

                return Promise.resolve(JSON.parse(ad));
            });

            return Promise.resolve(ad);
    } catch (err) {
        return Promise.reject(err);
    }
};