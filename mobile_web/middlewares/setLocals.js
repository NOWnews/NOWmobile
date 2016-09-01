/*
 * 這個 middleware 是因為怕有人從舊的網址進入，所以要 redirect 到新網址
 */

module.exports = () => {

    return (req, res, next) => {

        res.locals.NODE_ENV = process.env.NODE_ENV;
        return next();
    };
};
