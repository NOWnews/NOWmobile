module.exports = (app) => {

    // 處理 404 頁面
    app.use( function (req, res, next) {
        res.status(404);
        return res.render('404');
    });

    // 處理底層的錯誤
    app.use( function(err, req, res, next) {

        let errObject = {
            message: err.message,
            stack: err.stack.split('\n')
        };

        return res.render('503', {
            error: errObject
        });
    });

    return function (req, res, next) {
        return next();
    };

};
