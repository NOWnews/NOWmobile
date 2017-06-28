const debug = require('debug')('NOWmobile:libs:jsonld');


module.exports = function(news) {
    const data = [
      {
        "@context": "http://schema.org",
    	  "@type": "NewsArticle",
    	  "datePublished": news.startedAt,
    	  "dateModified": news.startedAt,
    	  "mainEntityOfPage":{
    	    "@type":"WebPage",
    	    "@id": `http://m.nownews.com${news.parseUrl}`
    	  },
    	  "articleBody": news.content,
    	  "headline": news.title,
    	  "image": {
    	    "@type": "ImageObject",
    	    "url": news.MainPhoto.url,
    	    "width": 696,
    	    "height": 530
    	  },
    	  "author": {
    	    "@type": "Person",
    	    "name": news.newsBy
    	  },
    	   "publisher": {
    	    "@type": "Organization",
    	    "name": "NOWnews今日新聞",
    	    "logo": {
    	      "@type": "ImageObject",
    	      "url": "http://m.nownews.com/static/img/mobile-logo.png",
    	      "width": 220,
    	      "height": 52
    	    }
    	  },
    	  "description": news.summary
      },
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@id": "https://m.nownews.com",
            "name": "NOWnews今日新聞",
            "image": "http://m.nownews.com/static/img/mobile-logo.png"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": `http://m.nownews.com/news/category/${news.MainMenu.categoryName}`,
            "name": news.MainMenu.name,
            "image": "https://legacy.nownews.com/NOWnews_default/default_terry.jpg"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@id": `http://m.nownews.com/news/${news.sn}`,
            "name": news.title,
            "image": news.MainPhoto.url
          }
        }]
      }
    ]
    let stringJsonLd = JSON.stringify(data) ;
    return stringJsonLd;
};
