import fs from 'fs';

module.exports = (req, res, next) => {
    return res.sendFile('register-sw.json', { root: 'mobile_web/files' });
};
