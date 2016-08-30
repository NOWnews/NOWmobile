import co from 'co';
import express from 'express';
import getApi from '../util/getApi';
let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:ajaxPost');


router.route('/ajaxPost')
    .get((req, res, next) => {
        let page = req.query.page;
        let url = req.query.url;
        let taxId = req.query.url.split('/').pop();

        co(function*() {
            let newsList = null;
            let template = null;

            if ( url.indexOf('news') > -1 ) {
                newsList = {
                    newsList: yield getApi(`category/news/${taxId}?page=${page}`)
                };
                template = 'newsPost';
            } else if  (url.indexOf('video') > -1 ) {
                newsList = {
                    videoList: yield getApi(`category/videos/${taxId}?page=${page}`)
                };
                template = 'videosPost';
            } else if ( url.indexOf('photo') > -1 ) {
                newsList = {
                    photoList: yield getApi(`category/photos/${taxId}?page=${page}`)
                };
                template = 'photosPost';
            }

            if(req.query.data === 'PLAYJJ'){
                return res.json({ newsList });
            }

            // 如果沒資料就回傳掉
            if (!newsList && !template) {
                return;
            }

            // debug('newsList = %j', newsList);

            return res.render(`ajaxPost/${template}`, newsList);

        }).catch(next);

    });

module.exports = router;
