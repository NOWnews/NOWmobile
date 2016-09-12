import about from './about';
import home from './home';
import news from './news';
import photo from './photo';
import video from './video';
import ajaxPost from './ajaxPost';
import files from './files';
import sitemap from './sitemap';
import check from './check';


module.exports = function(app) {

    // 因為 m.nownews.com// 會造成錯誤，先用這種寫法避開
    app.use('//', function (req, res, next) {res.redirect('/');});

    app.use('/', about);
    app.use('/', home);
    app.use('/', news);
    app.use('/', photo);
    app.use('/', video);
    app.use('/', ajaxPost);
    app.use('/', files);
    app.use('/', sitemap);
    app.use('/', check);

    return function(req, res, next) {
        return next();
    };
};
