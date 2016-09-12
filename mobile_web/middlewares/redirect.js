/*
 * 這個 middleware 是因為怕有人從舊的網址進入，所以要 redirect 到新網址
 */

module.exports = (app) => {

    return (req, res, next) => {

        // 舊的 url 網址格式
        let matches = req.path.match(/\/n\/([0-9]{4})\/([0-9]{2})\/([0-9]{2})\/([0-9]+)/);

        let queryString = '';
        if(req.query && req.query.from) {
            queryString = `?from=${req.query.from}`;
        }

        if(req.query && req.query.utm_source) {
            queryString = `?utm_source=${req.query.from}&utm_medium=${req.query.utm_medium}&utm_campaign=${req.query.utm_campaign}`;
        }

        // 有符合到舊的格式就直接 redirect
        if(matches !== null && matches.length > 0) {
            let originUrl = matches[0];
            let nodeId = matches[4];
            console.log(`原網址 "${originUrl}" -------> 導轉 "/news/${nodeId}"`);
            return res.redirect(`/news/${nodeId}${queryString}`);
        }

        return next();
    };
};
