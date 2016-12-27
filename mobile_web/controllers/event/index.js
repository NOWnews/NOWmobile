import express from 'express';
let router = express.Router();

import yourBirthdayNews from './yourBirthdayNews';

router.route('/event/yourBirthdayNews')
    .get(yourBirthdayNews);

module.exports = router;
