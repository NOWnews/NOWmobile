import fs from 'fs';

module.exports = (req, res, next) => {
    return res.sendFile('video-js.swf', { root: 'mobile_web/files' });
};
