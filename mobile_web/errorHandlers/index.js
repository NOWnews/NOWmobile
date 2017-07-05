
module.exports = function(app) {

    app.use(function(err, req, res, next) {
        var errObject = {
            message: err.message,
            stack: err.stack.split('\n')
        };

        console.log('-------------- ERROR --------------');
        console.log(errObject);
        console.log('-------------- ERROR --------------');

        res.status(404);
        // return res.send('系統忙碌中');
        return res.render('error/404');
    });

    return function(req, res, next) {
        return next();
    };
};
