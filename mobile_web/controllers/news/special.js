
import co from 'co';
import getV4Api from '../../util/getV4Api';

const debug = require('debug')('NOWmobile:controllers:news:category');

module.exports = (req, res, next) => {

    let { specialType } = req.params;

    if (!specialType) {
        return next();
    }

    co(function*() {
        let live = yield getV4Api('live/info');

        let result = yield [
            getV4Api('menus'),
            getV4Api(`instant`),
        ];

        let mainCategory = result[0];
        let { newsList } = result[1];

        if(req.query.data === 'PLAYJJ'){
            return res.json({ newsList });
        }

        return res.render('home/home', {
            nativeAds: ads || [],
            newsList,
            mainCategory,
            specialType,
            live
        });

    }).catch(next);

};
