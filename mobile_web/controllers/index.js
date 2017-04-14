import about from './about';
import home from './home';
import news from './news';
import photo from './photo';
import video from './video';
import ajaxPost from './ajaxPost';
import files from './files';
import sitemap from './sitemap';
import check from './check';
import event from './event';
import live from './live';


module.exports = function(app) {

    app.use('/', about);
    app.use('/', home);
    app.use('/', news);
    app.use('/', photo);
    app.use('/', video);
    app.use('/', ajaxPost);
    app.use('/', files);
    app.use('/', sitemap);
    app.use('/', check);
    app.use('/', event);
    app.use('/', live);

    app.post('/nestle', function(req, res, next){
        var fetch = require('node-fetch');
        var result;
        fetch('http://ads.adm4000.nownews.com:3001/nestle', { method: 'POST', body: req.body })
            .then(function(res) {
                return res.json();
            }).then(function(json) {
                return res.send('ok');
            });

    });

    return function(req, res, next) {
        return next();
    };
};
