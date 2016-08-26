$(function(){
    $('.single-item').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false
    });
    // 文章文字大小調整
    $('.font-size-controllers .font-link').on('click', function(){
        var fontClass = $(this).attr('class').match(/font-size-[a-z]+/g);
        var beforeClass = $('.news-body').attr('class').match(/font-size-[a-z]+/g) || [];
        $('.news-body').removeClass(beforeClass[0]).addClass(fontClass[0]);
    });

    function switchHeaderBarTo (selecter) {
        $(selecter).removeClass('mui--hide');
        $('#header-bar').addClass('mui--hide');
    }

    function switchToHeaderBar (selecter) {
        $(selecter).addClass('mui--hide');
        $('#header-bar').removeClass('mui--hide');
    }

    // 搜尋開啟
    $('#header-bar .fa-search').on('click', function(){
        switchHeaderBarTo('#search-bar')
    });

    // 搜尋關閉
    $('#search-bar .fa-close').on('click', function(){
        switchToHeaderBar('#search-bar')
    });

    // 漢堡選單開啟
    $('#header-bar .fa-bars').on('click', function(){
        switchHeaderBarTo('#menu-nav-bar')
        $('#menu-nav').removeClass('mui--hide');
    });

    // 漢堡選單關閉
    $('#menu-nav-bar .fa-close').on('click', function(){
        switchToHeaderBar('#menu-nav-bar')
        $('#menu-nav').addClass('mui--hide');
    });

    // 開關 channel nav
    $('#channel-nav-block > .mui-panel').on('click', function(){
        $('#channel-nav').toggleClass('mui--hide');
        $('#channel-content').toggleClass('mui--hide');
        $(this).find('.channel-name').toggleClass('mui--hide');
        $(this).find('i').toggleClass('fa-rotate-270');
        return
    });


    var beforeScrollTop = 0,
        scrollCheckTimer = null,
        scrollDelay = 200;  
    // 偵測 scroll 事件
    $(window).on('scroll', function(){

        clearTimeout(scrollCheckTimer);

        $('.ads-block.fixed-bottom').removeClass('mui--hide');

        scrollCheckTimer = setTimeout(function(){
            console.log("!!off");
            $('.ads-block.fixed-bottom').addClass('mui--hide');
        } , scrollDelay );

    });

});
