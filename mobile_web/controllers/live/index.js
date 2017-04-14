import express from 'express';
let router = express.Router();

import one from './one';

router.route('/live/:liveId')
    .get(one);

module.exports = router;
