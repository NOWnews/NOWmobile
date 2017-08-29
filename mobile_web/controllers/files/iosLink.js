import fs from 'fs';

module.exports = (req, res, next) => {
    return res.sendFile('apple-app-site-association.crash', { root: 'mobile_web/files' });
};
