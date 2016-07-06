import express from 'express';
let router = express.Router();

const models = require('../../models');
const redis = require('../../redis');

router.route('/')
    .get(function(req, res, next) {
        return res.send('Hello');
    });

module.exports = router;
