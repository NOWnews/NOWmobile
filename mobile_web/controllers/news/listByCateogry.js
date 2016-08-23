import express from 'express';
let router = express.Router();

const fetch = require('node-fetch');

const debug = require('debug')('NOWmobile:controllers:news:category');

module.exports = function(req, res, next) {
    let taxId = req.params.taxId;

    if (!taxId) return next();

    co(function*() {
        let categoryBaseUrl = `${config.apiServer}/category/news`;

        var newsList = yield fetch(`${categoryBaseUrl}/${taxId}`, {
            timeout: 3000
        }).then(function(res) {
            return res.json();
        }).then(function(json) {
            return Promise.resolve(json);
        });

        var mainCategory = yield fetch(categoryBaseUrl, {
            timeout: 3000
        }).then(function(res) {
            return res.json();
        }).then(function(json) {
            return Promise.resolve(json);
        });

        debug('newsList = %j', newsList);

        if(req.query.data === 'PLAYJJ'){
            return res.json({newsList: newsList});
        } else {
            return res.render('news/category', {newsList: newsList, mainCategory: mainCategory});
        }
    }).catch(next);

}
