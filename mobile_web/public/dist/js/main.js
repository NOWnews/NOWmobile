$(function() {
    $('.single-item').slick({
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false
    });

    $('.slick-photos').slick({
        adaptiveHeight: true
    });
    $('.slick-photos').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('#photo-one-bar span').html(nextSlide + 1);
    });

    // 文章文字大小調整
    $('.font-size-controllers .font-link').on('click', function() {
        var fontClass = $(this).attr('class').match(/font-size-[a-z]+/g);
        var beforeClass = $('.news-body').attr('class').match(/font-size-[a-z]+/g) || [];
        $('.news-body').removeClass(beforeClass[0]).addClass(fontClass[0]);
    });

    function switchHeaderBarTo(selecter) {
        $(selecter).removeClass('mui--hide');
        $('#header-bar').addClass('mui--hide');
    }

    function switchToHeaderBar(selecter) {
        $(selecter).addClass('mui--hide');
        $('#header-bar').removeClass('mui--hide');
    }

    // 搜尋開啟
    $('#header-bar .fa-search-area').on('click', function() {
        switchHeaderBarTo('#search-bar');
    });

    // 搜尋關閉
    $('#search-bar .fa-close-area').on('click', function() {
        $('#search-input').val('');
        switchToHeaderBar('#search-bar');
    });

    // 漢堡選單開啟
    $('#header-bar .fa-bars-area').on('click', function() {
        switchHeaderBarTo('#menu-nav-bar');
        $('#menu-nav').removeClass('mui--hide');
    });

    // 漢堡選單關閉
    $('#menu-nav-bar .fa-close-area').on('click', function() {
        switchToHeaderBar('#menu-nav-bar');
        $('#menu-nav').addClass('mui--hide');
    });

    // 開關 channel nav
    $('#channel-nav-block > .mui-panel').on('click', function() {
        $('#channel-nav').toggleClass('mui--hide');
        $('#channel-content').toggleClass('mui--hide');
        $(this).find('.channel-name').toggleClass('mui--hide');
        $(this).find('i').toggleClass('fa-rotate-270');
        return;
    });

    var beforeScrollTop = 0,
        scrollCheckTimer = null,
        scrollDelay = 200;

    // 偵測 scroll 事件
    var $adsBottom = $('.ads-block.fixed-bottom');
    var adsBottomOpacity = $adsBottom.css('opacity');
    var adsBottomDom = $adsBottom.length > 0;
    var scrollStopped;
    var adsBottomScrollFunc = function() {
        var fadeInCallback = function() {
            if (typeof scrollStopped !== 'undefined') {
                clearInterval(scrollStopped);
                $adsBottom.addClass('mui--hide');
            }

            scrollStopped = setTimeout(function() {
                $adsBottom.animate({
                    opacity: 1
                }, 'fast');
                $adsBottom.removeClass('mui--hide');
            }, 800);
        };
        fadeInCallback.call(this);
    };

    if (adsBottomDom) {
        $('.custom-space').css('height', 50);
        $(window).on('scroll', adsBottomScrollFunc);
    }

    // nav 的 category 置中
    function navCategoryCenter() {
        var $nav = $('.category-select > ul');
        var isActivePosition = $nav.find('.isActive').offset().left;
        var mobileWidthHalf = $(window).width() / 2;
        var itemWidthHalf = $nav.find('li').outerWidth() / 2;
        $nav.scrollLeft(isActivePosition - mobileWidthHalf + itemWidthHalf);
    }
    var navDom = $('.category-select > ul').length > 0;
    if (navDom) {
        navCategoryCenter();
    }

    // 內頁的 social
    $( window ).load(function() {
        // social 在 safari 會出現 img, 所以要隱藏起來
        $('img[src="http://load.s3.amazonaws.com/pixel.gif"]').hide();
        var socialDom = $('#social-link').length > 0;
        if (socialDom) {
            setTimeout(function(){
                var socialHeight = $('#social-link').height();
                $('.custom-space').css('height', socialHeight);
            }, 0);
        }
    });

    // 滑到底去抓新聞
    var win = $(window);
    var page = 1;
    var hasListWrapperDom = $('#list-wrapper').length > 0;
    if (hasListWrapperDom){
        win.scroll(function() {
            if ($(document).height() - win.height() === win.scrollTop()) {
                $('#loading').removeClass('mui--hide');
                page++;
                $.ajax({
                    url: '/ajaxPost?page=' + page + '&url=' + location.pathname,
                    dataType: 'html',
                    success: function(html) {
                        $('#list-wrapper').append(html);
                        $('#loading').addClass('mui--hide');
                    }
                });

            }
        });
    }

});
