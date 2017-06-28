/*
 * 這個 middleware 是因為怕有人從舊的網址進入，所以要 redirect 到新網址
 */

import chalk from 'chalk';

module.exports = (app) => {

    return (req, res, next) => {

        // 桌面的 url 網址格式
        let newsMatches = req.path.match(/\/news\/([0-9]{8})\/([0-9]+)/);
        // 桌面的分類頁
        let categoryMatchs = req.path.match(/\/cat\/([0-9.\-A-Za-z]+)/);
        // 桌面的特輯頁
        let channelMatchs = req.path.match(/^\/channel\/([0-9]+)/);

        let queryString = '';
        if(req.query && req.query.from) {
            queryString = `?from=${req.query.from}`;
        }

        if(req.query && req.query.utm_source) {
            queryString = `?utm_source=${req.query.utm_source}&utm_medium=${req.query.utm_medium}&utm_campaign=${req.query.utm_campaign}`;
        }

        // 有符合桌面版新聞內頁格式就直接 redirect
        if(newsMatches !== null && newsMatches.length > 0) {
            let originUrl = newsMatches[0];
            let nodeId = newsMatches[2];
            console.log(chalk.blue.bold(`原網址 "${originUrl}" -------> 導轉 "/news/${nodeId}"`));
            return res.redirect(`/news/${nodeId}${queryString}`);
        }

        // 有符合桌面版分類格式就直接 redirect
        if(categoryMatchs !== null && categoryMatchs.length > 0) {
            let originUrl = categoryMatchs[0];
            let categoryName = categoryMatchs[1];
            console.log(chalk.blue.bold(`原網址 "${originUrl}" -------> 導轉 "/news/category/${categoryName}"`));
            return res.redirect(`/news/category/${categoryName}${queryString}`);
        }

        // 有符合桌面版特輯格式就直接 redirect
        if(channelMatchs !== null && channelMatchs.length > 0) {
            let originUrl = channelMatchs[0];
            let channelId = channelMatchs[1];
            console.log(chalk.blue.bold(`原網址 "${originUrl}" -------> 導轉 "/news/channel/${channelId}"`));
            return res.redirect(`/news/channel/${channelId}${queryString}`);
        }

        return next();
    };
};
