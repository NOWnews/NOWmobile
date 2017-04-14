import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';

const debug = require('debug')('NOWmobile:controllers:video');

module.exports = (req, res, next) => {

    let { liveId } = req.params;


    console.log()

    if (!liveId) {
        return next();
    }

    co(function*() {

        let live = yield getApi('kmt/chairman2017');

        if(req.query.data === 'PLAYJJ'){
            return res.json({ video });
        }

        return res.render('live/one', {
            live
        });

    }).catch(next);
};
