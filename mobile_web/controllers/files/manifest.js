import fs from 'fs';

module.exports = (req, res, next) => {
    return res.sendFile('manifest.json', { root: 'mobile_web/files' });
};
