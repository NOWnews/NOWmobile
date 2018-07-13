import getV4Api from '../../util/getV4Api';

const debug = require('debug')('NOWmobile:controllers:subweb:list');

module.exports = async (req, res, next) => {
    try {
        let list = [
            { img: 'sight', text: '今日觀點 Sight', url: 'https://sight.nownews.com/' },
            { img: 'bobee', text: '保庇Bobee', url: 'https://bobee.nownews.com/' },
            { img: 'trend', text: 'Trend', url: 'https://trend.nownews.com/' },
            { img: 'chinapost', text: 'China Post', url: 'https://chinapost.nownews.com' },
            { img: 'petsmao', text: '寵毛網', url: 'https://petsmao.nownews.com/' },
            { img: 'games', text: 'Games', url: 'http://nownews.nicegame.com.tw/' },
        ];

        let mainCategory = await getV4Api('menus');

        return res.render('subweb/list', {
            list,
            mainCategory,
            specialType: 'subweb',
        });
    } catch (err) {
        return next(err);
    }
};