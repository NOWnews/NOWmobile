import express from 'express';
let router = express.Router();

const co = require('co');
const fetch = require('node-fetch');

const debug = require('debug')('NOWmobile:controllers:news');
const models = require('../../models');
const redis = require('../../redis');

router.route('/news/:newsId')
    .get(function(req, res, next) {
        let newsId = req.params.newsId;
        co(function*() {
            var news = yield fetch(`${config.apiServer}/news/${newsId}` , {
                timeout: 3000
            }).then(function(res) {
                return res.json();
            }).then(function(json) {
                return Promise.resolve(json);
            });
            debug('news = %j', news);
            if(req.query.data === 'PLAYJJ'){
                return res.json({news: news});
            } else {
                return res.render('one/news', {news: news});
            }
        });

    });

module.exports = router;
