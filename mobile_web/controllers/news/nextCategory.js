
import co from 'co';
import getV4Api from '../../util/getV4Api';
import newsImgFormat from '../../util/newsImgFormat';
const debug = require('debug')('NOWmobile:controllers:news:nextCategory');


module.exports = (req, res, next) => {
    let { page, url } = req.query;
    let categoryName = url.split('/').pop();

    co(function*() {
        let result = null;
        let template = null;

        // 不直接給是因為回傳的物件裡面還有 ads
        let { newsList } = yield getV4Api(`cat/${categoryName}?limit=30&page=${page}`);
        newsList = newsImgFormat(newsList, true);
        result = { newsList };

        if(req.query.data === 'PLAYJJ'){
            return res.json(result);
        }

        return res.render('newslist/next-category', result);

    }).catch(next);

};
