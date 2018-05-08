import fs from 'fs';

module.exports = (req, res, next) => {
    return res.sendFile('icon_512.png', { root: 'mobile_web/files' });
};
