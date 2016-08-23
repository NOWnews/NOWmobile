import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';

let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:news');

module.exports = (req, res, next) => {
    let { newsId } = req.params;

    co(function*() {
        let news = yield getApi(`news/${newsId}`);

        debug('news = %j', news);

        if(req.query.data === 'PLAYJJ'){
            return res.json({ news });
        }

        return res.render('news/one', { news });

    }).catch(next);
}
