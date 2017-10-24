import fetch from 'node-fetch';
import Promise from 'bluebird';
const debug = require('debug')('NOWmobile:util:getV4Api');

// module.exports = (url) => {
//     let fetchUrl = `${config.get('apiV4Server.host')}/${url}`;

//     // 如果 url 有中文字，建議 encode 會比較沒有問題
//     fetchUrl = encodeURI(fetchUrl);

//     debug('Url = ', fetchUrl);

//     return fetch(fetchUrl, {
//             timeout: 100000,
//             headers: {
//                 'X-NOWnews-API': 'YouCanSeeMeJohnCena'
//             }
//         })
//         .then((res) => res.json())
//         .then((json) => Promise.resolve(json));
// };

module.exports = async (url) => {
    try {
        let fetchUrl = `${config.get('apiV4Server.host')}/${url}`;

        // 如果 url 有中文字，建議 encode 會比較沒有問題
        fetchUrl = encodeURI(fetchUrl);

        debug('Url = ', fetchUrl);

        let data = await fetch(fetchUrl, {
                timeout: 100000,
                headers: {
                    'X-NOWnews-API': 'YouCanSeeMeJohnCena'
                }
            })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                return Promise.resolve(json)
            });

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};
