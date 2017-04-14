import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';

const debug = require('debug')('NOWmobile:controllers:video');

module.exports = (req, res, next) => {
    let { liveId } = req.params;

    if (!liveId) {
        return next();
    }

    co(function*() {

        if(req.query.data === 'PLAYJJ'){
            return res.json({ video });
        }

        return res.render('live/one', {
            type: 'video'
        });

    }).catch(next);
};
