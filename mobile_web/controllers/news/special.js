
import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';

let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:news:category');

module.exports = (req, res, next) => {
    let { specialType } = req.params;

    if (!specialType) {
        return next();
    }

    co(function*() {

        let result = yield [
            getApi(`category/news`),
            getApi(`news/${specialType}`),
        ];

        let mainCategory = result[0];
        let newsList = result[1];

        if(req.query.data === 'PLAYJJ'){
            return res.json({ newsList });
        }

        return res.render('home/home', {
            newsList,
            mainCategory,
            specialType,
        });

    }).catch(next);

};
