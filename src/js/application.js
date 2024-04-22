var $ = jQuery.noConflict();
window.dataLayer = window.dataLayer || [];
$(document).ready(function ($) {
    $('.affilate__slider').owlCarousel({
        loop: true,
        lazyLoad: true,
        autoHeight: true,
        margin: 10,
        nav: false,
        items: 1,
        animateOut: 'fadeOut'
    });
    $("#main__slider-home").owlCarousel({
        loop: true,
        nav: true,
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 7000,
        // autoplaySpeed: 5000,
        nav: true,
        dots: false,
        animateOut: 'fadeOut'
    });


    $('.slide-network').show();
    ///////slide main//////////
    var sync1 = $("#sync1");
    var sync2 = $("#sync2");

    sync1.owlCarousel({
        singleItem: true,
        slideSpeed: 800,
        navigation: false,
        pagination: false,
        afterAction: syncPosition,
        responsiveRefreshRate: 200
    });

    sync2.owlCarousel({
        items: 3,
        itemsDesktop: [1199, 3],
        pagination: false,
        navigation: true,
        responsiveRefreshRate: 100,
        afterInit: function (el) {
            el.find(".owl-item").eq(0).addClass("synced");
        }
    });

    function syncPosition(el) {
        var current = this.currentItem;
        $("#sync2")
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced")
        if ($("#sync2").data("owlCarousel") !== undefined) {
            center(current)
        }
    }

    $("#sync2").on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).data("owlItem");
        sync1.trigger("owl.goTo", number);
    });

    function center(number) {
        var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
        var num = number;
        var found = false;
        for (var i in sync2visible) {
            if (num === sync2visible[i]) {
                var found = true;
            }
        }

        if (found === false) {
            if (num > sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", num - sync2visible.length + 2)
            } else {
                if (num - 1 === -1) {
                    num = 0;
                }
                sync2.trigger("owl.goTo", num);
            }
        } else if (num === sync2visible[sync2visible.length - 1]) {
            sync2.trigger("owl.goTo", sync2visible[1])
        } else if (num === sync2visible[0]) {
            sync2.trigger("owl.goTo", num - 1)
        }
    }


    ///////////// lava lamp ///////////////
    // $('.navigation').lavalamp({
    //     easing: 'easeOutBack'
    // });
    // $(window).resize(function () {
    //     $('.navigation').lavalamp('update');
    // });

    var ex_nav = $('.bottom-header');
    var sticky = function () {
        if ($(window).scrollTop() >= 120) {
            ex_nav.addClass('sticky');
        } else {
            ex_nav.removeClass('sticky');
        }
    }
    sticky();

    $(window).scroll(sticky);

    ex_nav.find('a').click(function (e) {
        var href = $(this).attr('href');
        var pos = $(href).position().top;
        $('html,body').animate({
            scrollTop: pos
        }, 700, 'easeInOutExpo'); // end animate
        e.preventDefault();
    }); // End click
    /////////////////// tab-views//////////////////
    /*$("#tabs li").click(function() {
        //  First remove class "active" from currently active tab
        $("#tabs li").removeClass('active');
 
        //  Now add class "active" to the selected/clicked tab
        $(this).addClass("active");
 
        //  Hide all tab content
        $(".tab_content").hide();
 
        //  Here we get the href value of the selected tab
        var selected_tab = $(this).find("a").attr("href");
 
        //  Show the selected tab content
        $(selected_tab).fadeIn();
 
        //  At the end, we add return false so that the click on the link is not executed
        return false;
    });*/

    //////////////////////////////////
    $('.box-scroll').mCustomScrollbar();
    if ($('.infinite__surface-container').length != 0) {
        window.ias = new InfiniteAjaxScroll('.infinite__surface-container', {
            item: '.infinite__article',
            next: '.pager__next',
            pagination: '.infinite__pager',
            spinner: '.loader',
        });
        ias.on('last', function () {
            let el = document.querySelector('.no-more');
            el.style.opacity = '1';
        });
        let pageIndex = 0;
        // update title and url then scrolling through pages
        ias.on('page', (e) => {
            window.dataLayer.push({
                'event': 'scrollEngagement',
                'eventCategory': 'Infinite',
                'eventAction': 'scroll',
                'eventLabel': 'Infinite scroll inline article page',
                'pagePath': e.url,
                'pageTitle': e.title + " | Infinite | elleman",
                'visitorType': 'Infinite Viewer'
            });
            document.title = e.title;

            let state = history.state;

            history.replaceState(state, e.title, e.url);
        });
    }
    ////////// select-2 //////////////
    $('.select-2').select2({
        minimumResultsForSearch: 99,
    });
});