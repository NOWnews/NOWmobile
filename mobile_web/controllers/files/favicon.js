import fs from 'fs';

module.exports = (req, res, next) => {
    return res.sendFile('favicon.ico', { root: 'mobile_web/files' });
};
