import fs from 'fs';

module.exports = (req, res, next) => {
    return res.sendfile('robots.txt', { root: 'mobile_web/files' });
};