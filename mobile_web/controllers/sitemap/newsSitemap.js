
import sm from 'sitemap';
import co from 'co';
import Promise from 'bluebird';
import _ from 'lodash';

import getV4Api from '../../util/getV4Api';

// 違法字元轉換成正確 xml 字源格式對照表
const entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

// 替換掉違法字元的 function
const escapeHtml = function (string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
};

// module.exports = (req, res, next) => {

//     co(function*() {

//         // 從 api 取得 sitemap 的資料
//         let sitemapData = yield getV4Api('sitemap/newsSitemap');

//         if(!sitemapData || sitemapData.length === 0) {
//             return yield Promise.reject(new Error('sitemap api 找不到資料.....'));
//         }

//         let xmlContents = '';
//         _.forEach(sitemapData, (data) => {
//             // 沒有 Url 則不顯示
//             if (!data.url) {
//                 console.error(`時間: ${data.publication_date}, 標題: ${data.title} --- 找不到連結`);
//                 return;
//             }
//             xmlContents += `
//                 <url>
//                     <loc>${data.url}</loc>
//                     <news:news>
//                         <news:publication>
//                             <news:name>NOWnews今日新聞</news:name>
//                             <news:language>${data.language}</news:language>
//                         </news:publication>
//                         <news:genres>${data.genres}</news:genres>
//                         <news:publication_date>${data.publication_date}</news:publication_date>
//                         <news:title>${escapeHtml(data.title)}</news:title>
//                     </news:news>
//                 </url>
//             `;
//         });

//         let xml = `
//             <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
//                 ${xmlContents}
//             </urlset>
//         `;

//         res.header('Content-Type', 'application/xml');
//         return res.send(xml);
//     })
//     .catch(next);
// };

module.exports = async (req, res, next) => {
    try {
        // 從 api 取得 sitemap 的資料
        let sitemapData = await getV4Api('sitemap/newsSitemap');

        if(!sitemapData || sitemapData.length === 0) {
            return Promise.reject(new Error('sitemap api 找不到資料.....'));
        }

        let xmlContents = '';
        _.forEach(sitemapData, (data) => {
            // 沒有 Url 則不顯示
            if (!data.url) {
                console.error(`時間: ${data.publication_date}, 標題: ${data.title} --- 找不到連結`);
                return;
            }
            xmlContents += `
                <url>
                    <loc>${data.url}</loc>
                    <news:news>
                        <news:publication>
                            <news:name>NOWnews今日新聞</news:name>
                            <news:language>${data.language}</news:language>
                        </news:publication>
                        <news:genres>${data.genres}</news:genres>
                        <news:publication_date>${data.publication_date}</news:publication_date>
                        <news:title>${escapeHtml(data.title)}</news:title>
                    </news:news>
                </url>
            `;
        });

        let xml = `
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
                ${xmlContents}
            </urlset>
        `;

        res.header('Content-Type', 'application/xml');
        return res.send(xml);
    } catch (err) {
        return next(err);
    }
};