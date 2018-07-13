import fs from 'fs';

module.exports = (req, res, next) => {
    return res.sendFile('trend.jpg', { root: 'mobile_web/files' });
};
