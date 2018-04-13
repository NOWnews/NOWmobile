import fs from 'fs';

module.exports = (req, res, next) => {
    return res.sendFile('firebase-messaging-sw.js', { root: 'mobile_web/files' });
};
