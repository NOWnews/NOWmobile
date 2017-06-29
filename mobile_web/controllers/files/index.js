import express from 'express';
let router = express.Router();

import robots from './robots';
import video from './video';
import favicon from './favicon';

router.route('/robots.txt')
    .get(robots);

router.route('/video-js.swf')
    .get(video);

router.route('/favicon.ico')
    .get(favicon);

module.exports = router;
