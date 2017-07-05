import about from './about';
import home from './home';
import news from './news';
// import ajaxPost from './ajaxPost';
import files from './files';
import sitemap from './sitemap';
import live from './live';


module.exports = function(app) {

    app.use('/', live);
    app.use('/', about);
    app.use('/', home);
    app.use('/', news);
    // app.use('/', ajaxPost);
    app.use('/', files);
    app.use('/', sitemap);

    // 確認 mobile server 是否活著
    app.use('/check', function(req, res, next){
        return res.send('mobile web still alive :)');
    });

    // 剩下的導去 404 頁面
    app.use('*', function(req, res, next){
        return res.render('error/404');
    });

    return function(req, res, next) {
        return next();
    };
};
