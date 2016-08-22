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

    // 搜尋按鈕控制 - 開啟搜尋
    $('.header-btn > .fa-search').on('click', function(){
        $('#search-bar').removeClass("mui--hide")
        $('#header-bar').addClass("mui--hide")
    });

    // 搜尋按鈕控制 - 關閉搜尋
    $('.header-btn > .fa-close').on('click', function(){
        $('#search-bar').addClass("mui--hide")
        $('#header-bar').removeClass("mui--hide")
    });
});
