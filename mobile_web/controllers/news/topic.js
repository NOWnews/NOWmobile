import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';
import getV4Api from '../../util/getV4Api';
let router = express.Router();
const debug = require('debug')('NOWmobile:controllers:news:topic');

module.exports = (req, res, next) => {
    let { topicId } = req.params;

    co(function*() {
        let live = yield getV4Api('live/info');

        let { specialTopics } = yield getV4Api('specialtopics');

        _.map(specialTopics, (topic) => {
            if(topic.url.indexOf('http') < 0){
                topic.url = '/news/' + topic.url.split('/').pop();
            }
            return topic;
        });

        let { isOpen } = req.query;
        let channelName = '專題';
        let data = {
            nativeAds: [],
            specialTopics,
            channelName,
            topicId,
            isOpen,
            live
        };

        if(req.query.data === 'PLAYJJ'){
            return res.json({ data });
        }

        return res.render('news/topic', data);

    }).catch(next);

};
