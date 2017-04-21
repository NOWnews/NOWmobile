import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';

let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:photo:category');

module.exports = (req, res, next) => {
    let { taxId } = req.params;

    co(function*() {
        let live = yield getApi('kmt/chairman2017');

        let photoBaseUrl = `category/photos`;
        let mainCategory = yield getApi(photoBaseUrl);

        if (!taxId) {
            taxId = mainCategory[0].tid;
        }

        let photoList = yield getApi(`${photoBaseUrl}/${taxId}`);

        if(req.query.data === 'PLAYJJ'){
            return res.json({ photoList });
        }

        return res.render('photo/category', {
            photoList,
            mainCategory,
            taxId,
            live
        });

    }).catch(next);

};
