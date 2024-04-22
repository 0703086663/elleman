var $ = jQuery.noConflict();

jQuery(document).ready(function ($) {
  $("img.lazy").lazyload();

  // var carousel = $(".slides").owlCarousel({
  //     items: 1,
  //     loop: true,
  //     autoplay: true,
  //     autoplayTimeout: 5000,
  //     autoplaySpeed: 1200,
  //     nav: true,
  //     dots: false,
  //     margin: 0,
  //     stagePadding: 0,
  //     animateIn: 'fadeInRight',
  //     animateOut: 'fadeOutLeft'
  // });

  var mv_carousel = $("#mp-carousel").owlCarousel({
    loop: true,
    nav: true,
    items: 5,
    loop: true,
    autoplay: false,
    autoplayTimeout: 4000,
    autoplaySpeed: 1600,
    dots: false,
    responsive: {
      0: {
        items: 2,
        autoplay: true,
      },
      600: {
        items: 3,
        autoplay: true,
      },
      1000: {
        items: 5,
        autoplay: false,
      },
    },
  });

  $(".box-scroll").each(function (i) {
    new SimpleBar(this, {
      autoHide: false,
    });
  });

  $(".site-scroll-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      600
    );
    return false;
  });

  $(".number-cm a").click(function () {
    var url = "#" + $(this).data("url");
    $("html, body").animate(
      {
        scrollTop: $(url).offset().top,
      },
      500
    );
  });

  $(".slides .desc")
    .find("a")
    .on("click", function () {
      var url = $(this).attr("href");
      window.location.href = url;
    });

  $(".menu-toggle").click(function (e) {
    e.preventDefault();
    $("body").toggleClass("sidemenu lock");
  });

  $("#overlay").click(function (e) {
    $("body").removeClass("sidemenu lock");
  });

  $("[data-modal-opener]").click(function (e) {
    e.preventDefault();
    var target = $(this).attr("href");
    $(target).addClass("active");
    $("body").addClass("lock");
    $("body").removeClass("sidemenu");
  });

  $("[data-modal-close]").click(function (e) {
    e.preventDefault();
    $(".modal.active").removeClass("active");
    $("body").removeClass("sidemenu");
    $("body").removeClass("lock");
  });

  $(".box-detail")
    .find("a:has(img)")
    .addClass("auto_fancybox")
    .attr("rel", "fancy_gallery");

  $("a.auto_fancybox, a.fancybox").fancybox({
    helpers: {
      title: {
        type: "over",
      },
      overlay: {
        speedOut: 0,
      },
    },
    padding: 10,
    prevEffect: "fade",
    nextEffect: "fade",
    afterShow: function () {
      $(".fancybox-wrap").swipe({
        swipe: function (event, direction) {
          if (direction === "left" || direction === "up") {
            $.fancybox.prev(direction);
          } else {
            $.fancybox.next(direction);
          }
        },
      });
    },
  });

  $("#search_form").validate({
    rules: {
      s: "required",
    },
    messages: {
      s: "Vui lòng nhập từ khóa",
    },
    errorPlacement: function (error, element) {
      element
        .attr("data-original-title", error.text())
        .attr("data-toggle", "tooltip")
        .attr("data-placement", "bottom");
      $(element).tooltip("show");
    },
    unhighlight: function (element) {
      $(element)
        .removeAttr("data-toggle")
        .removeAttr("data-original-title")
        .removeAttr("data-placement")
        .removeClass("error");
      $(element).unbind("tooltip");
    },
  });

  $(".search_form_404").validate({
    rules: {
      s: "required",
    },
    messages: {
      s: "Vui lòng nhập từ khóa",
    },
    errorPlacement: function (error, element) {
      element
        .attr("data-original-title", error.text())
        .attr("data-toggle", "tooltip")
        .attr("data-placement", "bottom");
      $(element).tooltip("show");
    },
    unhighlight: function (element) {
      $(element)
        .removeAttr("data-toggle")
        .removeAttr("data-original-title")
        .removeAttr("data-placement")
        .removeClass("error");
      $(element).unbind("tooltip");
    },
  });

  //register email newletter
  $("#frm_newsletter").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      email: {
        required: "Vui lòng nhập email",
        email: "Email không hợp lệ.",
      },
    },
    ignore: "",
    errorPlacement: function (error, element) {
      element
        .attr("data-original-title", error.text())
        .attr("data-toggle", "tooltip")
        .attr("data-placement", "top");
      $(element).tooltip("show");
    },
    unhighlight: function (element) {
      $(element)
        .removeAttr("data-toggle")
        .removeAttr("data-original-title")
        .removeAttr("data-placement")
        .removeClass("error");
      $(element).unbind("tooltip");
    },
    submitHandler: function (form) {
      var options = {
        url: em_ajax.ajaxurl,
        type: "get",
        dataType: "json",
        clearForm: true,
        resetForm: true,
        beforeSubmit: function (formData, jqForm, options) {
          $("input, button[type=submit]", form).attr("disabled", true).css({
            opacity: "0.5",
          });
        },
        success: function (data, statusText, xhr) {
          if (data.success == 0) {
            swal({
              title: "Lỗi !",
              text: "Đăng ký bản tin không thành công. Vui lòng bấm Ctrl+F5 để thử lại.",
              type: "error",
              timer: 5000,
            });
          } else if (data.success == -2) {
            swal({
              title: "Lỗi !",
              text: data.msg,
              type: "error",
              timer: 5000,
            });
            window.location = data.link;
          } else if (data.success == -1) {
            swal({
              title: "Lỗi !",
              text: data.msg,
              type: "error",
              timer: 5000,
            });
          } else {
            $.get(
              em_ajax.ajaxurl +
                "?action=send_mail_newsletter_welcome&email=" +
                data.email
            );
            swal({
              title: "Thành công",
              text: "Bạn đã đăng ký thành công bản tin của chúng tôi. \n Xin cám ơn bạn đã quan tâm đến ELLE MAN.",
              type: "success",
              timer: 5000,
            });
          }
          $("input, button[type=submit]", form).attr("disabled", false).css({
            opacity: 1,
          });
        },
      };
      $(form).ajaxSubmit(options);
      return false;
    },
  });

  window.fbAsyncInit = function () {
    FB.init({
      appId: em_ajax.app_fb_id,
      xfbml: true,
      version: "v2.0",
    });
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
});
