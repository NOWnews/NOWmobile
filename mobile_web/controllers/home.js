import express from 'express';
let router = express.Router();

const co = require('co');
const fetch = require('node-fetch');

const debug = require('debug')('NOWmobile:controllers:home');
const models = require('../../models');
const redis = require('../../redis');

router.route('/')
    .get(function(req, res, next) {
        let v3Api = 'http://61.67.121.26:5000/headline';
        co(function*() {
            var headLineNews = yield fetch(v3Api, {
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
                return res.render('home/home', {newsList: headLineNews});
            }
        });

    });

module.exports = router;
