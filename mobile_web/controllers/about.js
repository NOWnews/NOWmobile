import express from 'express';
let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:about');

router.route('/about')
    .get((req, res, next) => {
        let timelines = [
            {
                date: '2008年4月',
                event: 'NOWnews.com正式上線。'
            }, {
                date: '2009年10月',
                event: '領先市場首推出綜合性新聞媒體分眾平台-「美人幫」女性資訊平台，提供食衣住行育樂全方面時尚流行資訊。'
            }, {
                date: '2011年4月',
                event: '宣告進入3.0時代，成立全台最大公民記者平台-「WEnews」，首創智慧型手機上稿，隨時隨地結合全民記者發布全台各地新聞，共同開創新聞全方位互動新紀元。'
            }, {
                date: '2013年7月',
                event: '發行紙本《今日新聞報》，於各大捷運站發行；8月起更與遠東航空合作供機上乘客閱讀，網路媒體O2O領先業界。'
            }, {
                date: '2014年3月',
                event: '榮獲《數位時代》雜誌評選百大網站第18名，網友每月平均停留時間與單次使用時間，居所有新聞網站之冠。'
            }, {
                date: '2015年8月',
                event: '獲得遊戲橘子投資，成為橘子集團成員之一，雙方策略合作共創多元創意內容。'
            }, {
                date: '2017年4月',
                event: '獨家製作國民黨黨魁候選人線上直播，邀請時任黨主席等選將現身說法，首創網路平台打造電視台規格直播節目。',
            }
        ];

        return res.render('about/about', { timelines });

    });

module.exports = router;
