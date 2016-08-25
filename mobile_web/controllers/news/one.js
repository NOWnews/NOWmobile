import faker from 'faker';
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

        let headline = yield getApi(`news/headline`);

        debug('news = %j', news);
        // debug('headline = %j', headline);

        if(req.query.data === 'PLAYJJ'){
            return res.json({ news, headline });
        }

        let phone = {
            url: faker.image.image(300, 250)
        };

        return res.render('news/one', {
            phone,
            news,
            headline
        });

    }).catch(next);
};
