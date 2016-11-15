# Change Log
NOWmobile 的所有改變將在此 CHANGELOG 文件中記錄。

格式基於 [Keep a Changelog](http://keepachangelog.com/zh-TW/0.3.0/)
而項目則基於 [Semantic Versioning](http://semver.org/lang/zh-TW/).

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
