const debug = require('debug')('NOWmobile:libs:getContentAd');


module.exports = function(news) {

  if (!String.prototype.insert) {
    String.prototype.insert = function (index, string) {
      return index > 0 ? this.substring(0, index) + string + this.substring(index, this.length) : string + this;
    };
  }
  const slot = '/5799246/Nownews_all_article_300x250_artm';
  const adString = `
    <script>
      googletag.cmd.push(function() {
        googletag.defineSlot('${slot}', [300, 250], 'div-gpt-ad-1508398836058-0').addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.pubads().collapseEmptyDivs();
        googletag.enableServices();
      });
    </script>
    <!-- ${slot} -->
    <div id='div-gpt-ad-1508398836058-0' style='text-align: center'>
      <script>
      googletag.cmd.push(function() { googletag.display('div-gpt-ad-1508398836058-0'); });
    </script>
    </div>
  `;

  return news.content.insert(news.contentAdIndex, adString);
};
