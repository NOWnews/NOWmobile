
import express from 'express';
import compression from 'compression';
import logger from 'morgan';
// import cookieParser from 'cookie-parser';
// import cookieSession from 'cookie-session';
// import bodyParser from 'body-parser';
import cors from 'cors';
import nunjucks from 'nunjucks';

import redirect from './redirect';

module.exports = function(app) {

    app.use(compression());
    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(cookieParser());
    app.use(cors());

    // express session setting
    app.set('trust proxy', 1);
    // app.use(cookieSession({
    //     name: 'mobile',
    //     keys: ['NOWmobile', 'mobile']
    // }));

    // view engine 設定與 views 擺放位置設定
    app.set('view engine', 'html');
    nunjucks.configure( rootPath + '/mobile_web/views/', {
        autoescape: true,
        express: app,
        watch: true
    });

    // 靜態檔案位置
    app.use('/static', express.static( rootPath + '/mobile_web/public/dist'));

    // overwrite put and delete method
    // app.use(methodOverride(function(req, res) {
    //     if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    //         var method = req.body._method;
    //         delete req.body._method;
    //         return method;
    //     }
    // }));

    app.use(redirect(app));
    app.use(logger('dev'));

    return function(req, res, next) {
        return next();
    };
};
