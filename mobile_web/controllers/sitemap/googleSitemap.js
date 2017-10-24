import sm from 'sitemap';
import Promise from 'bluebird';
import _ from 'lodash';

import getV4Api from '../../util/getV4Api';

// module.exports = (req, res, next) => {

//     co(function*() {

//         // 從 api 取得 sitemap 的資料
//         let sitemapData = yield getV4Api('sitemap/google');

//         if(!sitemapData || sitemapData.length === 0) {
//             return yield Promise.reject(new Error('sitemap api 找不到資料.....'));
//         }

//         // sitemap 資料處理
//         let urls = _.map(sitemapData, (data) => {
//             return {
//                 url: data.url,
//                 changefreq: data.changefreq,
//                 priority: data.priority,
//                 lastmodISO: data.lastmod
//             };
//         });

//         // sitemap 資料初始化
//         let optinos = {
//             hostname: 'https://m.nownews.com',
//             cacheTime: 600000,
//             urls: urls
//         };

//         let sitemap = sm.createSitemap(optinos);

//         // 轉換成 sitemap xml
//         let sitemapXML = yield new Promise(function(resolve, reject) {
//             sitemap.toXML(function(err, xml) {
//                 if (err) {
//                     return reject(err);
//                 }
//                 return resolve(xml);
//             });
//         });

//         res.header('Content-Type', 'application/xml');
//         return res.send(sitemapXML);
//     })
//     .catch(next);
// };

module.exports = async (req, res, next) => {
    try {
        // 從 api 取得 sitemap 的資料
        let sitemapData = await getV4Api('sitemap/google');

        if(!sitemapData || sitemapData.length === 0) {
            return Promise.reject(new Error('sitemap api 找不到資料.....'));
        }

        // sitemap 資料處理
        let urls = _.map(sitemapData, (data) => {
            return {
                url: data.url,
                changefreq: data.changefreq,
                priority: data.priority,
                lastmodISO: data.lastmod
            };
        });

        // sitemap 資料初始化
        let optinos = {
            hostname: 'https://m.nownews.com',
            cacheTime: 600000,
            urls: urls
        };

        let sitemap = sm.createSitemap(optinos);

        // 轉換成 sitemap xml
        let sitemapXML = await new Promise(function(resolve, reject) {
            sitemap.toXML(function(err, xml) {
                if (err) {
                    return reject(err);
                }
                return resolve(xml);
            });
        });

        res.header('Content-Type', 'application/xml');
        return res.send(sitemapXML);
    } catch (err) {
        return next(err);
    }
};
