import express from 'express';
let router = express.Router();

const co = require('co');
const fetch = require('node-fetch');

const debug = require('debug')('NOWmobile:controllers:home');
const models = require('../../models');
const redis = require('../../redis');

router.route('/')
    .get(function(req, res, next) {
        co(function*() {
            var headLineNews = yield fetch(`${config.apiServer}/headline`, {
                timeout: 3000
            }).then(function(res) {
                return res.json();
            }).then(function(json) {
                return Promise.resolve(json);
            });
            var mainCategory = yield fetch(`${config.apiServer}/category`, {
                timeout: 3000
            }).then(function(res) {
                return res.json();
            }).then(function(json) {
                return Promise.resolve(json);
            });
            debug('headLineNews = %j', headLineNews);
            if(req.query.data === 'PLAYJJ'){
                return res.json({newsList: headLineNews});
            } else {
                return res.render('home/home', {newsList: headLineNews, mainCategory: mainCategory});
            }
        });

    });

module.exports = router;
