import co from 'co';
import Promise from 'bluebird';
const debug = require('debug')('NOWmobile:controllers:event:yourBirthdayNews');

module.exports = (req, res, next) => {
    co(function*() {
        return res.send(200);
    }).catch(next);
};
