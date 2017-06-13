import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';
import getV4Api from '../../util/getV4Api';

let router = express.Router();


const debug = require('debug')('NOWmobile:controllers:news:category');

module.exports = (req, res, next) => {
    let { taxId } = req.params;

    if (!taxId) {
        return next();
    }

    co(function*() {
        let live = yield getApi('kmt/chairman2017');

        let result = yield [
            getV4Api('menus'),
            getV4Api(`cat/${taxId}`),
        ];

        let mainCategory = result[0];
        let { newsList, ads } = result[1];

        if(req.query.data === 'PLAYJJ'){
            return res.json({ newsList });
        }
        return res.render('home/home', {
            nativeAds: ads || [],
            newsList,
            mainCategory,
            taxId,
            live
        });

    }).catch(next);

};
