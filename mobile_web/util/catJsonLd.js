const debug = require('debug')('NOWmobile:libs:jsonld');

module.exports = (categoryName, news) => {
    const data = [
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
                        "image": "https://m.nownews.com/logo.png"
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                        "@id": `https://m.nownews.com/news/category/${categoryName}`,
                        "name": news ? news.MainMenu.name : categoryName,
                        "image": "https://legacy.nownews.com/NOWnews_default/default.png"
                    }
                }
            ]
        }
    ]
    let stringJsonLd = JSON.stringify(data) ;
    return stringJsonLd;
};
