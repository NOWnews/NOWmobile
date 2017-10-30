import fs from 'fs';

module.exports = (req, res, next) => {
    return res.sendFile('ads.txt', { root: 'mobile_web/files' });
};
