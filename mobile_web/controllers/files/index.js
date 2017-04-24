import express from 'express';
let router = express.Router();

import robots from './robots';
import video from './video';

router.route('/robots.txt')
    .get(robots);

router.route('/video-js.swf')
    .get(video);

module.exports = router;
