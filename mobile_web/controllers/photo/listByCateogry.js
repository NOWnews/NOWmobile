import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';

let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:photo:category');

module.exports = (req, res, next) => {
    let { taxId } = req.params;

    co(function*() {

        // TODO:: change api.
        // let photoBaseUrl = `category/photo`;
        // let mainCategory = yield getApi(photoBaseUrl)

        let categoryBaseUrl = `category/news`;

        let mainCategory = yield getApi(categoryBaseUrl);

        if (!taxId) taxId = mainCategory[0].tid;

        // TODO:: change api.
        // let photoList = yield getApi(`${photoBaseUrl}/${taxId}`);
        let photoList = yield getApi(`${categoryBaseUrl}/${taxId}`);

        if(req.query.data === 'PLAYJJ'){
            return res.json({ photoList });
        }

        return res.render('photo/category', {
            photoList,
            mainCategory,
            taxId,
        });

    }).catch(next);

}
