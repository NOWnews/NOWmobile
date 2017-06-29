import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';
import getV4Api from '../../util/getV4Api';

let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:photo');

module.exports = (req, res, next) => {

    let { photoId } = req.params;

    if (!photoId) {
        return next();
    }

    co(function*() {
        let live = yield getV4Api('live/info');

        let photo = yield getApi(`photos/${photoId}`);
        photo.title = photo.title.replace(/▲/, '');
        photo.cite = photo.cite.replace(/▲/, '');
        photo.collectionImages = _.map(photo.collectionImages, (photo) => {
            photo.cite = photo.cite.replace(/▲/, '');
            return photo;
        });

        if(req.query.data === 'PLAYJJ'){
            return res.json({ photo });
        }

        return res.render('photo/one', {
            isPhotoOne: true,
            photo,
            live
        });

    }).catch(next);
};
