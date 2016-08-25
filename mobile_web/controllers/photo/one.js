import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';

let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:photo');

module.exports = (req, res, next) => {
    let { photoId } = req.params;

    if (!photoId) return next();

    co(function*() {

        let photo = yield getApi(`photos/${photoId}`);

        if(req.query.data === 'PLAYJJ'){
            return res.json({ photo, headline });
        }

        return res.render('photo/one', {
            photo,
        });

    }).catch(next);
};
