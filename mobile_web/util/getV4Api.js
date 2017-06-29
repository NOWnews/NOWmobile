import fetch from 'node-fetch';
const debug = require('debug')('NOWmobile:util:getV4Api');

module.exports = (url) => {
    let fetchUrl = `${config.apiV4Server}/${url}`;

    // 如果 url 有中文字，建議 encode 會比較沒有問題
    fetchUrl = encodeURI(fetchUrl);

    debug('Url = ', fetchUrl);

    return fetch(fetchUrl, {
            timeout: 100000,
            headers: {
                'X-NOWnews-API': 'YouCanSeeMeJohnCena'
            }
        })
        .then((res) => res.json())
        .then((json) => Promise.resolve(json));
};
