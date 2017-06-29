import about from './about';
import home from './home';
import news from './news';
// import photo from './photo';
// import video from './video';
import ajaxPost from './ajaxPost';
import files from './files';
import sitemap from './sitemap';
import check from './check';
import event from './event';
import live from './live';


module.exports = function(app) {

    app.use('/', live);
    app.use('/', about);
    app.use('/', home);
    app.use('/', news);
    // app.use('/', photo);
    // app.use('/', video);
    app.use('/', ajaxPost);
    app.use('/', files);
    app.use('/', sitemap);
    app.use('/', check);
    app.use('/', event);

    app.use('*', function(req, res, next){
        return res.render('error/404');
    });

    return function(req, res, next) {
        return next();
    };
};
