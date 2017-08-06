import co from 'co';
import express from 'express';
import getV4Api from '../../util/getV4Api';
import newsImgFormat from '../../util/newsImgFormat';

let router = express.Router();
const debug = require('debug')('NOWmobile:controllers:news:topic');

module.exports = (req, res, next) => {
    let { topicId } = req.params;

    co(function*() {
        let live = yield getV4Api('live/info');

        let { specialTopics } = yield getV4Api('specialtopics');

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

    }).catch(next);

};
