import about from './about';
import home from './home';
import news from './news';
import photo from './photo';
import video from './video';
import files from './files';


module.exports = function(app) {

    app.use('/', about);
    app.use('/', home);
    app.use('/', news);
    app.use('/', photo);
    app.use('/', video);
    app.use('/', files);

    return function(req, res, next) {
        return next();
    };
};
