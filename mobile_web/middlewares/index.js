
import express from 'express';
import compression from 'compression';
import logger from 'morgan';
import cors from 'cors';
import nunjucks from 'nunjucks';

import duplicate from './duplicate';
import redirect from './redirect';
import setLocals from './setLocals';

module.exports = function(app) {

    app.use(compression());
    app.use(cors());

    // view engine 設定與 views 擺放位置設定
    app.set('view engine', 'html');
    nunjucks.configure( rootPath + '/mobile_web/views/', {
        autoescape: true,
        express: app,
        watch: true
    });

    // 靜態檔案位置

    let staticFilePath = (process.env.NODE_ENV === 'production') ? 'public/dist' : 'source';
    app.use('/static', express.static(`${rootPath}/mobile_web/${staticFilePath}`, {
        etag: 2000,
        maxAge: 86400000 * 10   // one day
    }));
    // app.use('/icons', express.static(`${rootPath}/mobile_web/${staticFilePath}/img/icons`, {
    //     maxAge: 3153600000  // one day
    // }));
    app.use(redirect(app));
    app.use(duplicate(app));
    app.use(logger('dev'));
    app.use(setLocals());

    return function(req, res, next) {
        return next();
    };
};
