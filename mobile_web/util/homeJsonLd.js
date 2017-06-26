const debug = require('debug')('NOWmobile:libs:homeJsonLd');


module.exports = function(news) {
    const data = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "name": "行動版|NOWnews今日新聞",
      "alternateName": ["NOWnews今日新聞","NOWnews"],
      "url": "https://m.nownews.com",
      "keywords": ["NOWnews","NOWnews今日新聞"],
    },
    {
      "@context": "http://schema.org",
        "@id": "https://m.nownews.com",
        "@type": "Organization",
        "name": "行動版｜NOWnews今日新聞",
        "url": "http://www.nownews.com/",
        "logo": "https://dev.nownews.com/logo.png",
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "telephone": "+886-2-87978775",
                "contactType": "customer service",
                "areaServed": [ "TW" ]
            }
        ],
        "sameAs": [
            "https://zh.wikipedia.org/zh-tw/NOWnews_%E4%BB%8A%E6%97%A5%E6%96%B0%E8%81%9E",
            "https://www.youtube.com/user/NOWnewscom",
            "https://www.facebook.com/nownews",
            "https://www.instagram.com/nownews/",
            "http://weibo.com/nownews",
            "https://twitter.com/NOWnews_TW"
        ]
    },
    {
      "@context":"http://schema.org",
      "@type":"BreadcrumbList",
      "itemListElement":[
       {
        "@type":"ListItem",
        "position":1,
        "item":{
         "@id":"http://www.nownews.com",
         "name":"行動版｜NOWnews今日新聞"
        }
       }
      ]
    }
  ];

    let stringJsonLd = [] ;
    data.forEach(function(d){
      stringJsonLd.push(JSON.stringify(d));
    });
    return stringJsonLd;
};
