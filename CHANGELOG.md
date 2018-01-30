# Change Log
NOWmobile 的所有改變將在此 CHANGELOG 文件中記錄。

格式基於 [Keep a Changelog](http://keepachangelog.com/zh-TW/0.3.0/)
而項目則基於 [Semantic Versioning](http://semver.org/lang/zh-TW/).

## [Unreleased]
## 1.1.25 - 2018-01-30
### Fixed
- remove crowdynews to ads.txt 增加移除信任名單 @wn

## 1.1.24 - 2018-01-29
### Fixed
- 直接在全域的 googletag 加上 SafeFrame @wn

### Changed
- 拿掉舊的 Freakout code @wb

## 1.1.23 - 2018-01-25
### Add
- 增加 1/28直播 code @wn

## 1.1.22 - 2018-01-24
### Add
- 增加 Freakout code @wb

## 1.1.21 - 2018-01-18
### Changed
- 拿掉 SafeFrame 限制 @wb
- 調整 Header 十週年 Logo @esbb48
- 恢復廣告小農 @appleoxxo

## 1.1.20 - 2018-01-11
### Changed
- crowdynews 跟 popin 交換位置，crowdynews在下，popin 在上 @wb
- 暫時下掉廣告小農 @wb
- 加強安全性，拿掉 cors, cookie js 拿掉第三方 cdn @wb

## 1.1.19 - 2018-01-08
### Fixed
- 直接在全域的 googletag 加上 SafeFrame @wb
- dfp 加上 SafeFrame @wb
- 拿掉 crowdynews @wb

## 1.1.19 - 2018-01-04
### Add
- 加上媒體小農 @esbb48

### Changed
- 自由欄位的位置與主站統一  @wb

## 1.1.18 - 2018-01-02
### Add
- 加上十週年 logo @wb

## 1.1.17 - 2017-12-28
### Add
- 加上 safari icon @wb

## 1.1.16 - 2017-12-15
### Changed
- 移除哀悼樣式 包含 logo @appleoxxo

## 1.1.15 - 2017-12-14
### Add
- 哀悼樣式 @wb
- 廣告 ad1 server 不穩定 @wb
- 修改Logo @appleoxxo

## 1.1.14 - 2017-12-13
### Changed
- 新增能接受的 utm query string 參數, utm_content 和 utm_term @appleoxxo

## 1.1.13 - 2017-12-07
### Changed
- 依照業務需求修改 ads.txt @wb

## 1.1.12 - 2017-11-30
### Fixed
- 調整發布後，再次送審會404的問題 @wb

## 1.1.11 - 2017-11-23
### Add
- 加入內文圖說 style @wb
- 廣告加入防呆機制 @wb
- 加入 autotrack @esbb48

## 1.1.10 - 2017-11-09
### Changed
- 依照業務需求修改 ads.txt @wb

## 1.1.10 - 2017-11-02
### Added
- 依照業務需求加入 ads.txt @wb
- 增加文中 DFP `/5799246/Nownews_all_article_300x250_artm` 廣告 @esbb48

### Changed
- 將 `function(){}` 改為 `()=>{}` @SimonSun
- 將 `co(function*(){})` 改為 `async()=>{}` @SimonSun
- 使用 Node.js V8.7 @SimonSun
- 升級所有 npm 套件 @SimonSun
- 拿掉 `co` 套件 @SimonSun

## 1.1.9 - 2017-10-28
### Added
- 使用 pm2 config 控管 @esbb48

## 1.1.8 - 2017-10-19
### Added
- 加上18禁標語 @wb

### Changed
- 調整單純化 package.json build 的 cli @esbb48

### Fixed
- 調整 search bar 的文字顏色 @wb

## 1.1.7 - 2017-10-12
### Added
- crowdynews 重新上線 @esbb48

## 1.1.6 - 2017-10-02
### Added
- 增加精選子網站 @esbb48
### Changed
- 調整 CI @esbb48

### Fixed
- Line 圖片預覽問題，Line 不收過 image 縮圖 api 的圖 @esbb48

## 1.1.5 - 2017-09-21
### Fixed
- 找不到新聞時的錯誤處理 修復上一次沒檢查到在production環境時 api-web /news/:sn 的端點會拋與develop不同的訊息 @appleoxxo
- 修正找不到新聞時的錯誤處理 @appleoxxo
- 修正內頁 列表新聞圖 @wb

## 1.1.4 - 2017-09-14
### changed
- 雀巢追蹤碼現在由後台直接上即可，因此拉掉 @wb

### Fixed
- 新的 api 沒有 nodeId, 所以 news.nodeId 改成現行的 news.sn @wb

## 1.1.4 - 2017-09-13
### changed
- 有可能 api cache 還沒清掉，會沒有 sizeFormat 做的防護 @wb
- 拿掉投票的網站連結 icon @wb
- 調整 mobile 直接吃內網的ip @wb
- config 加上縮圖 api 網址 @wb
- 優化專題頁面邏輯 @wb
- 加上 iOS9 通用鏈接（Universal Links）的 crash @wb

### Fixed
- 修正 jsonld 的錯誤 @wb
- 修正主圖是長圖的問題 @wb

## 1.1.3 - 2017-08-21
### changed
- 修正 imgapi 位址 @wb


## 1.1.2 - 2017-08-17
### changed
- 調整pagespeed 以及結構化資料 @wayne1025

## 1.1.1 - 2017-07-18
### Fixed
- 調整 og:url @esbb48

## 1.1.0 - 2017-07-07
### Fixed
- `mobile_web/views/trace/nestle.html` 只留符合現在手機版的 code @Webber
- 從 ad2004 那邊的打回來的時間太久，暫時先把 timeout 時間拉到 20000
- 修正 freeContent 問題
- mobile icon 圖片縮小
- 加上關鍵字
- 加上 404 頁面


## 1.0.17.43 - 2017-06-12
### Changed
- `mobile_web/views/trace/nestle.html` 加入六月新的雀巢追蹤碼 `n/2017/06/14/2478938`, `n/2017/06/28/2489722` @Webber

## 1.0.17.42 - 2017-05-16
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `n/2017/05/17/2501997` @Webber

## 1.0.17.41 - 2017-04-25
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2017/04/27/2492215` @Webber

## 1.0.17.40 - 2017-04-17
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2017/04/20/2435365` @Webber

## 1.0.17.39 - 2017-04-11
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2017/04/13/2450343` @Webber

## 1.0.17.38 - 2017-04-06
### Changed
- `mobile_web/controllers/sitemap/newsSitemap.js` 隱蔽沒有連結的文章 @Webber

## 1.0.17.37 - 2017-03-31
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2017/04/06/2453590` @Webber

## 1.0.17.36 - 2017-03-30
### Changed
- 加入新的 microAD 與調整原本新聞內頁相關新聞的廣告位置 @SimonSun

## 1.0.17.35 - 2017-03-30
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2017/03/30/2454529` @Webber

## 1.0.17.34 - 2017-03-21
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2017/03/23/2414095` @Webber

## 1.0.17.33 - 2017-03-17
### Changed
- 修改 DAN_PMP 廣告 @SimonSun

## 1.0.17.32 - 2017-03-14
### Changed
- 修改 DAN_PMP 廣告 @SimonSun

## 1.0.17.31 - 2017-03-14
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2017/03/16/2414061` @Webber

## 1.0.17.30 - 2017-03-01
### Added
- 加入微告台灣(microAD)原生廣告 @SimonSun
- 加入果實追蹤碼(先暫時隱藏) @SimonSun

## 1.0.17.29 - 2017-03-01
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2017/03/09/2414015` @Webber

## 1.0.17.28 - 2017-02-20
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2017/02/23/2406917` @Webber

## 1.0.17.27 - 2017-01-26
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2017/02/09/2385451` @Webber

## 1.0.17.26 - 2017-01-26
### Changed
- 增加活動結束在【君的誕辰】活動頁上 @ALi

## 1.0.17.25 - 2017-01-25
### Changed
- 關閉送愛瘋七活動 @Webber

## 1.0.17.24 - 2017-01-25
### Changed
- 加入送愛瘋七活動頁面 @Webber
- 修改君的誕成活動頁面 @Webber

## 1.0.17.23 - 2017-01-17
### Changed
- 修改 facebook og描述 增加og author 修改關鍵字濾掉多餘 贅字 雀巢埋code 2375551 @WayneLin

## 1.0.17.22 - 2017-01-13
### Changed
- 修改 修改FB留言板的data-href https 變成http @WayneLin

## 1.0.17.21 - 2017-01-13
### Changed
- 修改 mobile web google news 用的新聞sitemap 出版商的名稱改為靜態 @WayneLin

## 1.0.17.20 - 2017-01-11
### Added
- 加入一個 `newsSitemap.xml` 要提交給 mobile web google news 用的 @SimonSun

## 1.0.17.19 - 2016-12-28
### Changed
- `mobile_web/views/ad/cover/onead.html`, `mobile_web/views/ad/one/oneAd.html` 調整 scheme `http` 變 `https` @ALi

## 1.0.17.18 - 2016-12-28
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2016/12/30/2353993` @SimonSun

## 1.0.17.17 - 2016-12-27
### Changed
- 加入 Your Birthday Event @Ali

## 1.0.17.16 - 2016-12-21
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2016/12/16/2346168` @Webber

## 1.0.17.15 - 2016-12-13
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2016/12/16/2337414` @SimonSun

## 1.0.17.14 - 2016-12-12
### Changed
- 調整成果 DAN PMP 廣告 `mobile_web/views/ad/one/salesfrontier-html-pmp.html` & `salesfrontier-js-pmp.html` @SimonSun

## 1.0.17.13 - 2016-12-08
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2016/12/09/2328307` @SimonSun

## 1.0.17.12 - 2016-11-30
### Changed
- `mobile_web/views/news/one.html`, `mobile_web/views/video/one.html` 撤掉金馬活動 @Webber
- `mobile_web/gulpfile.js` 修正 gulp 無法抓取圖片內資料夾圖片的問題 @Webber

## 1.0.17.11 - 2016-11-30
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2016/12/02/2322024` @SimonSun

## 1.0.17.10 - 2016-11-23
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2016/11/25/2306982` @SimonSun

## 1.0.17.9 - 2016-11-17
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2016/11/18/2285457` @SimonSun

## 1.0.17.8 - 2016-11-16
### Added
- 金馬活動加上序號的功能 @Webber

## 1.0.17.7 - 2016-11-15
### Added
- 加入金馬活動頁面
  - 加入圖片 `mobile_web/source/img/gift` @Webber
  - 加入活動頁 `mobile_web/views/eventsPage/gift.html` @Webber
  - 修正新聞內頁 `mobile_web/views/news/one.html`, `mobile_web/views/video/one.html` @Webber

## 1.0.17.6 - 2016-11-15
### Added
- 加入成果 DAN PMP 廣告 `mobile_web/views/ad/one/salesfrontier-html-pmp.html` & `salesfrontier-js-pmp.html`，位置會在內頁置底，會蓋在原本 dfp 之上  @SimonSun

## 1.0.17.5 - 2016-11-15
### Changed
- 雀巢追蹤碼格式調整 @SimonSun

## 1.0.17.4 - 2016-11-11
### Hotfix
- `mobile_web/views/news/one.html` 修正 shareaholic Bug @Webber
- `mobile_web/views/video/one.html` 修正 shareaholic Bug @Webber

## 1.0.17.3 - 2016-11-11
### Changed
- `mobile_web/views/news/one.html` 內頁加上 FB Like 按鈕 @Webber
- `mobile_web/views/video/one.html` 內頁加上 FB Like 按鈕 @Webber

## 1.0.17.2 - 2016-11-08
### Changed
- `mobile_web/views/trace/nestle.html` 變更廣編的追蹤碼 @SimonSun

## 1.0.17.1 - 2016-11-08
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2016/11/11/2261170` @SimonSun

## 1.0.17.0 - 2016-11-03
### Changed
- `mobile_web/controllers/news/one.js` 不分類的網址轉導到首頁 @Webber
- `mobile_web/middlewares/redirect.js` 主站的影音新聞可以轉導到 mobile 版 @Webber
- Mobile 內頁 SEO 調整
  * 內頁 h2 換 h1，樣式 24px @Webber
  * 內頁首圖img alt塞文字 @Webber
  * 加入麵包屑 @Webber
  * 內容加section 屬性 article屬性 @Webber

## 1.0.16.4 - 2016-11-03
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2016/11/04/2262347` @SimonSun

## 1.0.16.3 - 2016-10-26
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2016/10/28/2261161` @SimonSun

## 1.0.16.2 - 2016-10-26
### Changed
- 修正 firefox 無法使用附近的人在看什麼的 bug @Webber

## 1.0.16.1 - 2016-10-26
### Changed
- `mobile_web/source/js/main.js` 修改成`你的瀏覽器不支援，暫時無法使用此功能!`的文字 @Webber

## 1.0.16.0 - 2016-10-24
### Added
- `mobile_web/controllers/news/one.js` 記錄新聞內頁的query(from & line)  @Webber
- `mobile_web/views/blocks/related-content.html` 頭條跟延伸閱讀的連結給參數  @Webber
- `mobile_web/views/news/one.html` 上下頁的連結給參數  @Webber

## 1.0.15.0 - 2016-10-21
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2016/10/21/2156980` @SimonSun

### Added
- 加入 `附近的人在看什麼` 功能 @WebberWu

## 1.0.14.2 - 2016-10-12
### Added
- `mobile_web/views/trace/kbro.html` 加入凱擘的追蹤碼 `/n/2016/10/11/2267535` @SimonSun

### Changed
- `config.js` 的 staging mode 連接到 `v3.api.nownews.com` @SimonSun

## 1.0.14.1 - 2016-10-11
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2016/10/14/2225141` @SimonSun

## 1.0.14 - 2016-10-06
### Changed
- `mobile_web/views/trace/NOWpageview.html` 因應PV系統找尋附近新聞 post 端點新增回傳nodeId @Wayne

## 1.0.13 - 2016-10-06
### Changed
- `mobile_web/views/trace/NOWpageview.html` GPS 定位功能開啟 @Webber

## 1.0.12 - 2016-10-06
### Changed
- `mobile_web/views/trace/nestle.html` 加入新的雀巢追蹤碼 `/n/2016/10/07/2225185` @SimonSun

## 1.0.11 - 2016-10-04
### Changed
- `mobile_web/views/trace/NOWpageview.html` GPS 定位暫時隱蔽 @Webber

## 1.0.10 - 2016-09-30
### Changed
- `mobile_web/views/trace/NOWpageview.html` 修正 GPS 定位的 code @Webber

## 1.0.9 - 2016-09-30
### Added
- `mobile_web/views/trace/NOWpageview.html` 加入偵測 GPS 定位的 code @Webber

## 1.0.8 - 2016-09-30
### Changed
- `mobile_web/source/css/main.css` 調整輪播跟第一則新聞的間距 @Webber

## 1.0.7 - 2016-09-29
### Changed
- `mobile_web/views/news/one.html` 加入新的雀巢追蹤碼 `/n/2016/09/30/2229413` @SimonSun

## 1.0.6 - 2016-09-23
### Changed
- `mobile_web/views/news/one.html` 修正雀巢追蹤碼 @SimonSun

## 1.0.5 - 2016-09-22
### Changed
- 新聞內頁的 Title 改成長標 `mobile_web/views/news/one.html` @Webber

## 1.0.4 - 2016-09-21
### Added
- 新增雀巢的追蹤碼到 `mobile_web/views/trace/nestle.html` @SimonSun

### Changed
- `mobile_web/views/news/one.html` 加入雀巢追蹤碼 @SimonSun

## 1.0.3 - 2016-09-20
### Added
- 新開中信房屋的內頁版位，在文末一開始的位置 @webber

## 1.0.2 - 2016-09-20
### Changed
- 修正果實提供 onead MIC 的 code @webber

## 1.0.1 - 2016-09-20
### Added
- package.json 縮排改成四格 @webber
- 加入 CHANGELOG 文件做紀錄 @webber
- 第一個版本正式上線 @webber
