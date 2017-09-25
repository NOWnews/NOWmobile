# NOWmobile

```
#                    ___====-_  _-====___
#              _--^^^#####//      \\#####^^^--_
#           _-^##########// (    ) \\##########^-_
#          -############//  |\^^/|  \\############-
#        _/############//   (@::@)   \\############\_
#       /#############((     \\//     ))#############\
#      -###############\\    (oo)    //###############-
#     -#################\\  / VV \  //#################-
#    -###################\\/      \//###################-
#   _#/|##########/\######(   /\   )######/\##########|\#_
#   |/ |#/\#/\#/\/  \#/\##\  |  |  /##/\#/  \/\#/\#/\#| \|
#   `  |/  V  V  `   V  \#\| |  | |/#/  V   '  V  V  \|  '
#      `   `  `      `   / | |  | | \   '      '  '   '
#                       (  | |  | |  )
#                      __\ | |  | | /__
#                     (vvv(VVV)(VVV)vvv)
#                                          -- 神獸鎮守
#                                              BUG退散
```

## 系統資訊

Node.js v6.2.2


## 開發方式

### 後台

dev: `npm run admin`

### 手機版 nownews

dev: `npm start`

prod: `npm run mobile:prod`


### 手機版 nownews 的確認端點

`/check`

## Server 啟動方式

```
npm install
npm run mobile:prod.build
export NODE_ENV=production
pm2 start ./bin/mobile_web.js
```

## 頁面架構

1. 關於我們頁面
   * extends base.html
   * main about/about.html
2. 內頁
   * 一般新聞
     * extends base.html
     * main news/one.html
     * trace
       * trace/NOWpageview.html
       * trace/kbro.html
       * trace/oneData.html
     * socialblock seo/head-social-one.html
     * ad
       * ad/one/ad300x250_1.html
       * ad/one/dan_pmp_scrolling.html
       * ad/one/cthouseAd.html
       * ad/one/oneAd.html
       * ad/one/ad300x250_2.html
       * ad/one/popin.html
   * 圖片新聞
     * extends base.html
     * main news/one.html
     * trace
       * trace/NOWpageview.html
       * trace/kbro.html
       * trace/oneData.html
     * socialblock seo/head-social-one.html
     * ad
       * ad/one/ad300x250_1.html
       * ad/one/dan_pmp_scrolling.html
       * ad/one/cthouseAd.html
       * ad/one/oneAd.html
       * ad/one/ad300x250_2.html
       * ad/one/popin.html
   * 影片新聞
     * extends base.html
     * main news/one.html
     * trace
       * trace/NOWpageview.html
       * trace/kbro.html
       * trace/oneData.html
     * socialblock seo/head-social-one.html
     * ad
       * ad/one/ad300x250_1.html
       * ad/one/dan_pmp_scrolling.html
       * ad/one/cthouseAd.html
       * ad/one/oneAd.html
       * ad/one/ad300x250_2.html
       * ad/one/popin.html
3. 分類頁
  * ...
