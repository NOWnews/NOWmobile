import express from 'express';
let router = express.Router();

const fetch = require('node-fetch');

const debug = require('debug')('NOWmobile:controllers:photo:category');

module.exports = function(req, res, next) {
    let taxId = req.params.taxId;
    let photoBaseUrl = `${config.apiServer}/category/photo`;

    co(function*() {

        // TODO:: change api.
        // var mainCategory = yield fetch(photoBaseUrl, {
        let categoryBaseUrl = `${config.apiServer}/category/news`;
        var mainCategory = yield fetch(categoryBaseUrl, {
            timeout: 3000
        }).then(function(res) {
            return res.json();
        }).then(function(json) {
            return Promise.resolve(json);
        });

        if (!taxId) taxId = mainCategory[0].tid

        // TODO:: change api.
        // var photoList = yield fetch(`${photoBaseUrl}/${taxId}`, {
        var photoList = yield fetch(`${categoryBaseUrl}/${taxId}`, {
            timeout: 3000
        }).then(function(res) {
            return res.json();
        }).then(function(json) {
            return Promise.resolve(json);
        });

        if(req.query.data === 'PLAYJJ'){
            return res.json({photoList: photoList});
        } else {
            return res.render('photo/category', {photoList: photoList, mainCategory: mainCategory});
        }
    }).catch(next);

}
