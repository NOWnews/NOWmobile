import co from 'co';
import getV4Api from '../../util/getV4Api';

const debug = require('debug')('NOWmobile:controllers:subweb:list');

// module.exports = (req, res, next) => {
//     co(function*() {

//         let list = [
//           { img: 'chinapost', text: 'China Post', url: 'https://chinapost.nownews.com' },
//           { img: 'sight', text: '今日觀點 Sight', url: 'https://sight.nownews.com/' },
//           { img: 'pinknow', text: '粉樂NOW', url: 'https://pinknow.nownews.com/' },
//           { img: 'bobee', text: '保庇Bobee', url: 'https://bobee.nownews.com/' },
//           { img: 'ifunnow', text: 'iFunNOW', url: 'https://ifunnow.nownews.com/' },
//           { img: 'playnow', text: 'PlayNOW', url: 'https://playnow.nownews.com/' },
//           { img: 'petsmao', text: '寵毛網', url: 'https://petsmao.nownews.com/' },
//           { img: 'sport', text: 'Sport', url: 'https://sport.nownews.com/' }
//         ];

//         let mainCategory = yield getV4Api('menus');

//         return res.render('subweb/list', {
//             list,
//             mainCategory,
//             specialType: 'subweb',
//         });
//     }).catch(next);

// };

module.exports = async (req, res, next) => {
    try {
        let list = [
          { img: 'chinapost', text: 'China Post', url: 'https://chinapost.nownews.com' },
          { img: 'sight', text: '今日觀點 Sight', url: 'https://sight.nownews.com/' },
          { img: 'pinknow', text: '粉樂NOW', url: 'https://pinknow.nownews.com/' },
          { img: 'bobee', text: '保庇Bobee', url: 'https://bobee.nownews.com/' },
          { img: 'ifunnow', text: 'iFunNOW', url: 'https://ifunnow.nownews.com/' },
          { img: 'playnow', text: 'PlayNOW', url: 'https://playnow.nownews.com/' },
          { img: 'petsmao', text: '寵毛網', url: 'https://petsmao.nownews.com/' },
          { img: 'sport', text: 'Sport', url: 'https://sport.nownews.com/' }
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