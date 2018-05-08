/**
 * @todo Firebase Web Notofication Service Worker
 * @AviviD Likr 2018
 */
'use strict';

const cacheName = 'devm.nownews.com-pwa';
const startPage = 'https://devm.nownews.com';
const offlinePage = 'https://devm.nownews.com';
const fallbackImage = 'https://devm.nownews.com/icon_512.png';
const filesToCache = [startPage, offlinePage, fallbackImage];
const neverCacheUrls = ['/nocache'];

//FCM initial
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');
firebase.initializeApp({
    'messagingSenderId': self.SENDER_ID ? self.SENDER_ID : '912321621860'
});
const messaging = firebase.messaging();

//AviviD initial
var AviviD = {
    version: "2.2",
    web_id: 'error',
    IMPRESSION_LOG_RECEIVER: "https://load-balancer.likr.com.tw/pushServer/impression_log_receiver.php",
    CLICK_LOG_RECEIVER: "https://load-balancer.likr.com.tw/pushServer/click_log_receiver.php",
    GET_AD_API: "https://load-balancer.likr.com.tw/pushServer/get_ad.php",
    REDIRECT_TO_SELECT_CH_API: "https://www.likr.com.tw/pushEndPoint/redirect_to_select_ch.php",
};

//Install Events
console.log('Started', self);
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

// Activate
self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if ( key !== cacheName ) {
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

// Fetch
self.addEventListener('fetch', function(e) {

    // Return if the current request url is in the never cache list
    if ( ! neverCacheUrls.every(checkNeverCacheList, e.request.url) ) {
        return;
    }

    // Return if request url protocal isn't http or https
    if ( ! e.request.url.match(/^(http|https):\/\//i) )
        return;

    // Return if request url is from an external domain.
    if ( new URL(e.request.url).origin !== location.origin )
        return;

    // For POST requests, do not use the cache. Serve offline page if offline.
    if ( e.request.method !== 'GET' ) {
        e.respondWith(
            fetch(e.request).catch( function() {
                return caches.match(offlinePage);
            })
        );
        return;
    }

    // Revving strategy
    if ( e.request.mode === 'navigate' && navigator.onLine ) {
        e.respondWith(
            fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            })
        );
        return;
    }

    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        }).catch(function() {
            return caches.match(offlinePage);
        })
    );
});

// Check if current url is in the neverCacheUrls list
function checkNeverCacheList(url) {
    if ( this.match(url) ) {
        return false;
    }
    return true;
}

//Receive Message
messaging.setBackgroundMessageHandler(function(payload) {
    console.log('BackgroundMessage : ', payload);

    //receive payload
    var message = payload.data;
    console.log('Message Data : ', message);

    return messaging.getToken()
        .then(function(currentToken) {
            if (currentToken)
            {
                // ��硋�� token
                AviviD.token = currentToken;
                console.log("currentToken : " + currentToken);

                // ��硋�珦howNotification����鞈���
                var pushData = getNotificationData(currentToken, message);
                console.log('pushData : ', pushData);

                // 瑼Ｘ䰻message�批捆�糓�炏甇�虜
                if(verifyMessage(message))
                {
                    // (撱��𢠃�见�� && 撱嗡撓����滨�箇征) ? ��枏�硋誨��� : 銝齿�枏誨���
                    var ad_enable = message.ad_enable;
                    var isEmptyExtend = emptyExtend(pushData.content);
                    var get_ad = (ad_enable == "1" && isEmptyExtend) ? 1 : 0;

                    //AviviD settings
                    var fetchParams = {
                        web_id: message.web_id,
                        category_id: message.category_id,
                        token: currentToken,
                        push_id: message.push_id,
                        msg_source: message.msg_source,
                        sw_source: self.location.origin,
                    };

                    var impressionLogReceiverUrlObject = createUrlObject(AviviD.IMPRESSION_LOG_RECEIVER, fetchParams);
                    console.log('IMPRESSION_LOG_RECEIVER urlObject :', impressionLogReceiverUrlObject);
                    //send impression log
                    fetch(impressionLogReceiverUrlObject).then(function(res) {
                        if (res.status !== 200) {
                            throw new Error('IMPRESSION_LOG_RECEIVER error code: ' + res.status);
                        }
                        return res.json();
                    }).then(function(data) {
                        return console.log('IMPRESSION_LOG_RECEIVER res:', data);
                    }).catch(function(err) {
                        return console.error('IMPRESSION_LOG_RECEIVER error:', err);
                    });

                    if(get_ad)
                    {
                        var getADUrlObject = createUrlObject(AviviD.GET_AD_API, fetchParams);
                        console.log('GET_AD_API urlObject :', getADUrlObject);
                        return fetch(getADUrlObject)
                            .then(function(res) {
                                if (res.status !== 200) {
                                    throw new Error('GET_AD_API error code: ' + res.status);
                                }
                                return res.json();
                            }).then(function(data) {
                                console.log('GET_AD_API data: ', data);
                                var ad_status = data.status;
                                var ad_resText = data.resText;

                                // 0:瘝鍦誨��� , 1:��匧誨���, 2:��枏�硋枂�𥲤
                                switch (ad_status) {
                                    case '1':
                                        var ad_url = data.url;
                                        var ad_image = data.image;
                                        var ad_actions = data.actions;

                                        var ad_pushData = JSON.parse(JSON.stringify(pushData));

                                        ad_pushData.content.data.button1_url = ad_url;
                                        ad_pushData.content.image = ad_image;
                                        ad_pushData.content.actions = ad_actions;
                                        // ad_content.actions = [
                                        //     { action: 'button1', title: ad_title }
                                        // ];
                                        console.log('GET_AD_API remake pushData : ', ad_pushData);
                                        return self.registration.showNotification(ad_pushData.title, ad_pushData.content);
                                        break;
                                    case '0':
                                    case '2':
                                    default:
                                        console.log('GET_AD_API: ad_status: ', ad_status , ' ; ad_resText: ', ad_resText);
                                        return self.registration.showNotification(pushData.title, pushData.content);
                                }
                            }).catch(function(err) {
                                console.error('GET_AD_API error:', err);
                                return self.registration.showNotification(pushData.title, pushData.content);
                            });
                    }
                    else
                    {
                        console.log("Don't need fetch GET_AD_API.")
                        return self.registration.showNotification(pushData.title, pushData.content);
                    }
                }
                else
                {
                    console.error('Message: Missing Parameters.');
                    return self.registration.showNotification(pushData.title, pushData.content);
                }
            }
            else
            {
                console.error('getToken: No Instance ID token available. Request permission to generate one.');
                return;
            }
        })
        .catch(function(err) {
            console.error('getToken: ', err);
            return;
        });
});

//Click Event
self.addEventListener('notificationclick', function(event) {
    //receive payload
    console.log('notificationClickEvent: ', event);
    var clickData = event.notification.data;
    console.log('clickData: ', clickData);

    //prepare click log param
    var action = event.action ? event.action : "normal";
    var fetchParams = {
        web_id: clickData.web_id ? clickData.web_id : AviviD.web_id,
        category_id: clickData.category_id,
        token: clickData.token,
        push_id: clickData.push_id,
        msg_source: clickData.msg_source,
        action: action,
        sw_source: self.location.origin,
    };
    var clickLogReceiverUrlObject = createUrlObject(AviviD.CLICK_LOG_RECEIVER, fetchParams);
    console.log('CLICK_LOG_RECEIVER urlObject :', clickLogReceiverUrlObject);

    //send click log
    fetch(clickLogReceiverUrlObject).then(function(res) {
        if (res.status !== 200) {
            throw new Error('CLICK_LOG_RECEIVER error code: ' + res.status);
        }
        return res.json();
    }).then(function(data) {
        return console.log('CLICK_LOG_RECEIVER res:', data);
    }).catch(function(err) {
        return console.error('CLICK_LOG_RECEIVER error:', err);
    });

    //click action
    var url;
    switch(action)
    {
        case "button1":
        case "button2":
            event.notification.close();
            url = getClickUrl(action, clickData);
            break;
        default:
            if(!isHasActionButton(clickData)) event.notification.close();
            url = getClickUrl(action, clickData);
    }

    //�蘨閮樌og銝滩歲頧�
    if(url == "close") return;

    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
            .then(function(windowClients) {
                console.log('WindowClients', windowClients);
                for (var i = 0; i < windowClients.length; i++) {
                    var client = windowClients[i];
                    console.log('WindowClient', client);
                    if (client.url === url && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow(url);
                }
            })
    );
});

self.addEventListener('notificationclose', function(event) {
    console.log('notificationCloseEvent: ', event);
    var clickData = event.notification.data;
    console.log('clickData: ', clickData);

    var fetchParams = {
        web_id: clickData.web_id ? clickData.web_id : AviviD.web_id,
        category_id: clickData.category_id,
        token: clickData.token,
        push_id: clickData.push_id,
        msg_source: clickData.msg_source,
        action: 'close',
        sw_source: self.location.origin,
    };
    var clickLogReceiverUrlObject = createUrlObject(AviviD.CLICK_LOG_RECEIVER, fetchParams);
    console.log('CLICK_LOG_RECEIVER urlObject :', clickLogReceiverUrlObject);

    //send click log
    fetch(clickLogReceiverUrlObject).then(function(res) {
        if (res.status !== 200) {
            throw new Error('CLICK_LOG_RECEIVER error code: ' + res.status);
        }
        return res.json();
    }).then(function(data) {
        return console.log('CLICK_LOG_RECEIVER res:', data);
    }).catch(function(err) {
        return console.error('CLICK_LOG_RECEIVER error:', err);
    });
});

//瑼Ｘ䰻撱嗡撓����齿糓�炏�箇征
function emptyExtend(content)
{
    if(typeof(content.image) == "undefined" && typeof(content.actions) == "undefined")
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

function getClickUrl(action, data)
{
    var action = action ? action : "normal";
    var url;

    if(action == 'button1')
    {
        url = data.button1_url;
    }
    else if(action == 'button2')
    {
        url = data.button2_url;
    }
    else
    {
        url = data.click_url;
    }

    switch(url)
    {
        case 'select_ch':
            var web_id = data.web_id ? data.web_id : AviviD.web_id,
                url = AviviD.REDIRECT_TO_SELECT_CH_API+'?web_id='+web_id+'&category_id='+data.category_id+'&token='+encodeURIComponent(data.token)+'&push_id='+data.push_id;
            break;
        default:
            break;
    }
    console.log("Click Action : " + action +", URL : " + url);
    return url;
}


function isHasActionButton(data)
{
    if(typeof data !== "object")
    {
        return 0;
    }
    else if(data.button1_url || data.button2_url)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

function getNotificationData(token, data)
{
    var defaultData = {
        title: "甇∟�𦒘蝙�鍂靘�摰Ｘ綫�偘蝟餌絞",
        content: {
            body: "暺墧�𡃏���𧢲凒憭朞����",
            icon: "https://www.likr.com.tw/pushEndPoint/images/avivid/image/icon.png",
            requireInteraction: true,
            data: {
                click_url: "https://www.likr.com.tw/",
                web_id: AviviD.web_id,
                token: token,
                push_id: "",
                msg_source: "error"
            }
        }
    };

    if(!data.push_id)
    {
        console.error('notificationDataError: data.push_id not existed, use defaultData.');
        return defaultData;
    }

    var NotificationData = {};
    NotificationData.title = data.title ? data.title : defaultData.title;

    var content = {};
    content.body = data.body ? data.body : defaultData.content.body;
    content.icon = data.icon ? data.icon : defaultData.content.icon;
    content.image = data.image ? data.image : "";
    content.requireInteraction = data.requireInteraction == "false" ? false : true;
    content.renotify = data.renotify == "true" ? true : false;
    content.silent = data.silent == "true" ? true : false;
    content.tag = data.tag ? data.tag : "";
    content.data = {
        web_id: data.web_id ? data.web_id : AviviD.web_id,
        category_id: data.category_id ? data.category_id : "",
        token: token,
        push_id: data.push_id,
        click_url: data.click_url ? data.click_url : defaultData.content.data.click_url,
        button1_url: data.button1_url,
        button2_url: data.button2_url,
        msg_source: data.msg_source
    };

    var actions = [];
    if(data.button1_title)
    {
        actions.push({action: 'button1', title: data.button1_title, icon: data.button1_icon ? data.button1_icon : ""});
    }

    if(data.button2_title)
    {
        actions.push({action: 'button2', title: data.button2_title, icon: data.button2_icon ? data.button2_icon : ""});
    }

    if(actions.length > 0) content.actions = actions;
    if(!content.image) delete content.image;
    NotificationData.content = content;

    return NotificationData;
}

function verifyMessage(data)
{
    if(data.web_id && data.push_id && data.msg_source)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

function createUrlObject(url, params)
{
    var urlObject = new URL(url);
    Object.keys(params).forEach(key => urlObject.searchParams.append(key, params[key]));
    return urlObject;
}