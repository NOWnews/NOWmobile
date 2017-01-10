import express from 'express';
let router = express.Router();

import googleSitemap from './googleSitemap';
import googleSitemapSSL from './googleSitemapSSL';

router.route('/sitemap.xml')
    .get(googleSitemap);

router.route('/sitemapSSL.xml')
    .get(googleSitemapSSL);

module.exports = router;