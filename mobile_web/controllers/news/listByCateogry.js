import express from 'express';
let router = express.Router();

const fetch = require('node-fetch');

const debug = require('debug')('NOWmobile:controllers:news:category');

module.exports = function(req, res, next) {
    let categoryId = req.params.categoryId;

    if (!categoryId) return next();

    co(function*() {
        // TODO:: wait api.
        // let url = `${config.apiServer}/category/news/${categoryId}`;

        let url = `${config.apiServer}/headline`;

        var newsList = yield fetch(url, {
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

        debug('newsList = %j', newsList);

        if(req.query.data === 'PLAYJJ'){
            return res.json({newsList: newsList});
        } else {
            return res.render('news/category', {newsList: newsList, mainCategory: mainCategory});
        }
    }).catch(next);

}
