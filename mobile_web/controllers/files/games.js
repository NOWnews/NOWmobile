import fs from 'fs';

module.exports = (req, res, next) => {
    return res.sendFile('games.jpg', { root: 'mobile_web/files' });
};
