
import co from 'co';
import express from 'express';
import getV4Api from '../util/getV4Api';
let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:ajaxPost');


router.route('/ajaxPost')
    .get((req, res, next) => {
        let page = req.query.page;
        let url = req.query.url;
        let taxId = req.query.url.split('/').pop();

        co(function*() {
            let result = null;
            let template = null;

            // 不直接給是因為回傳的物件裡面還有 ads
            let { newsList } = yield getV4Api(`cat/${taxId}?limit=30&page=${page}`);
            result = { newsList };
            template = 'newsPost';

            if(req.query.data === 'PLAYJJ'){
                return res.json(result);
            }

            return res.render(`ajaxPost/${template}`, result);

        }).catch(next);

    });

module.exports = router;
