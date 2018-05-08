import fs from 'fs';

module.exports = (req, res, next) => {
    return res.sendFile('icon_192.png', { root: 'mobile_web/files' });
};
