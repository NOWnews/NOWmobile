import express from 'express';
let router = express.Router();

import robots from './robots';
import video from './video';
import favicon from './favicon';
import iosLink from './iosLink';
import adsTxt from './adsTxt';
import firebaseMessagingSw from './firebaseMessagingSw';
import manifest from './manifest';
import pwa from './pwa';
import registerSw from './registerSw';

router.route('/ads.txt')
    .get(adsTxt);

router.route('/robots.txt')
    .get(robots);

router.route('/video-js.swf')
    .get(video);

router.route('/favicon.ico')
    .get(favicon);

router.route('/apple-app-site-association')
    .get(iosLink);

router.route('/.well-known/apple-app-site-association')
    .get(iosLink);

router.route('/firebase-messaging-sw.js')
    .get(firebaseMessagingSw);

router.route('/manifest.json')
    .get(manifest);

router.route('/pwa.js')
    .get(pwa);

router.route('/register-sw.js')
    .get(registerSw);

module.exports = router;
