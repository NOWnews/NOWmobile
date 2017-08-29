import express from 'express';
let router = express.Router();

import robots from './robots';
import video from './video';
import favicon from './favicon';
import iosLink from './iosLink';

router.route('/robots.txt')
    .get(robots);

router.route('/video-js.swf')
    .get(video);

router.route('/favicon.ico')
    .get(favicon);

router.route('/apple-app-site-association.crash')
    .get(iosLink);

router.route('/.well-known/apple-app-site-association.crash')
    .get(iosLink);

module.exports = router;
