
import express from 'express';
import getV4Api from '../../util/getV4Api';
import newsImgFormat from '../../util/newsImgFormat';

let router = express.Router();
const debug = require('debug')('NOWmobile:controllers:news:topic');

module.exports = async (req, res, next) => {
    try {

        let { topicId } = req.params;

        let live = await getV4Api('live/info');

        let { specialTopics } = await getV4Api('specialtopics');

        let newsList = specialTopics;

        _.map(specialTopics, (topic) => {
            if(topic.url.indexOf('http') < 0){
                topic.url = '/news/' + topic.url.split('/').pop();
            }
            return topic;
        });

        newsList = newsImgFormat(newsList, true);

        let { isOpen } = req.query;
        let topicName = '專題';
        let data = {
            nativeAds: [],
            specialTopics,
            topicName,
            topicId,
            live,
            newsList
        };

        if(req.query.data === 'PLAYJJ'){
            return res.json({ data });
        }

        return res.render('newslist/topic', data);

    } catch (err) {
        return next(err);
    }
};
