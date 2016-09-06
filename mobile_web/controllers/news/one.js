import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';

let router = express.Router();
let _ = require('lodash');

const debug = require('debug')('NOWmobile:controllers:news');

module.exports = (req, res, next) => {
    let { newsId } = req.params;

    co(function*() {

        let news = yield getApi(`news/${newsId}`);

        let result = yield [
            getApi(`news/headline`),
            getApi('category/news')
        ]

        let headline = result[0];
        let mainCategory = result[1];

        debug('news = %j', news);
        // debug('headline = %j', headline);

        if(req.query.data === 'PLAYJJ'){
            return res.json({ news, headline });
        }

        return res.render('news/one', {
            news,
            mainCategory,
            headline
        });

    }).catch(next);
};
