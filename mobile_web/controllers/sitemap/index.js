import express from 'express';
let router = express.Router();

import googleSitemap from './googleSitemap';
import googleSitemapSSL from './googleSitemapSSL';
import newsSitemap from './newsSitemap';

router.route('/sitemap.xml')
    .get(googleSitemap);

router.route('/sitemapSSL.xml')
    .get(googleSitemapSSL);

router.route('/newsSitemap.xml')
    .get(newsSitemap);

module.exports = router;