import fs from 'fs';

module.exports = (req, res, next) => {
    return res.sendFile('apple-app-site-association', { root: 'mobile_web/files' });
};
