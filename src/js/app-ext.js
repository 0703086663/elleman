/**
 * Created by vo sy dao on 10/03/2015.
 */
var $ = jQuery.noConflict();
// var apiUrl = 'https://baseapi.x/'
var apiUrl = "http://127.0.0.1:1337/";
jQuery(document).ready(function ($) {
  $(document).ready(function ($) {
    $industryOpt = $("#industry");
    $industryOpt.multiselect({
      addSearchBox: true,
      addActionBox: true,
      animateSearch: "normal", // Can be 'normal', 'slow', 'fast', or int number
      searchBoxText: "Bạn đang làm ngành nghề nào?",
      showCheckboxes: false,
      preferIdOverName: true,
      overwriteName: true,
      showSelectedItems: true,
      submitDataAsArray: true,
    });
  });

  // Start open popup
  $("#btn-open-newsletter-popup").click(function () {
    $("#newsletter-popup").show();
  });
  // End open popup

  // Start submit form
  $("#newsletter_submit_form").click(function () {
    var form = $("form.newsletter-popup__form");
    form.submit();
    $("#first_email_input").show();
    $("#newsletter_submit_email").show();
    $("#newsletter_submit_favorite").hide();
    $("#checkbox_form_group").hide();
    $("#industry_listinng").hide();
    $("#newsletter_submit_form").hide();
  });
  //   End submit form

  $("img.lazy").lazyload();
  $(".old-magazine-btn").click(function () {
    $("#old-magazine-histories").show();
  });
  $("#close_memories_popup").click(function () {
    $("#old-magazine-histories").hide();
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

  //************* SEARCH *************
  $.widget("custom.bgdcomplete", $.ui.autocomplete, {
    _renderMenu: function (ul, items) {
      var that = this;
      var i = 0;
      $.each(items, function (index, item) {
        if (i < 10) {
          that._renderItemData(ul, item);
        }
        i++;
      });
      $(ul).find("li:odd").addClass("odd");
    },
    _renderItem: function (ul, item) {
      var i = 0;
      if (item.image !== "") {
        return $("<li>")
          .append(
            "<a href='" +
              item.link +
              "'><img src='" +
              item.image +
              "' width='30px' class='img'/>&nbsp;<span class='content'>" +
              item.label +
              "</span></a>"
          )
          .appendTo(ul);
      } else {
        return $("<li>")
          .append(
            "<a href='" +
              item.link +
              "' class='search-with'>" +
              item.label +
              "</a>"
          )
          .appendTo(ul);
      }
    },
  });

  if ($("#search_autocomplete").length > 0) {
    $("#search_autocomplete").bgdcomplete({
      source: source,
      position: {
        my: "right top",
        at: "right bottom",
      },
    });
  }

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
  //************* END SEARCH *************
  /** Begin register newsletter */
  $("#industry_listinng").hide();
  $("#newsletter_submit_form").hide();
  $("#checkbox_form_group").hide();
  $("#newsletter_submit_favorite").hide();
  $("#newsletter_submit_email").click(function () {
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (testEmail.test($("#subscriber_email").val())) {
      $("#first_email_input").hide();
      $("#newsletter_submit_email").hide();
      $("#newsletter_submit_favorite").show();
      $("#checkbox_form_group").show();
    } else
      $("#subscriber_email").css({
        background: "yellow",
        border: "1px red solid",
      });
  });
  $("#newsletter_submit_favorite").click(function () {
    $("#newsletter_submit_favorite").hide();
    $("#checkbox_form_group").hide();
    $("#industry_listinng").show();
    $("#newsletter_submit_form").show();
  });

  function getCookie(name) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  $("#newsletter_popup, #overlay_newsletter_popup").click(function () {
    closeOverlayMenu();
    openPopupForm();
  });

  $("#close_newsletter_popup").click(function () {
    closePopupForm();
  });

  function closePopupForm() {
    $("#newsletter-popup").hide();
  }

  $("#open_overlay_menu").click(function () {
    openOverlayMenu();
  });

  function openOverlayMenu() {
    $("#mobile_menu_overlay").show();
    $(".right-overlay-items ul").removeClass("navigation");
  }

  $("#close_overlay_menu").click(function () {
    closeOverlayMenu();
  });

  function closeOverlayMenu() {
    $("#mobile_menu_overlay").hide();
  }

  function openPopupForm() {
    //   document.getElementById("newsletter-popup").style.width = "100%";
    $("#newsletter-popup").show();
  }

  function showTimePP() {
    setTimeout(openPopupForm, 4000);
  }

  $(document).ready(function () {
    if (getCookie("popup_visted") === undefined) {
      setTimeout(showTimePP, 26000);
      setCookie("popup_visted", true, { expires: 10 });
    }
  });
  $("#reg_js_img").hide();
  $.ajaxSetup({
    beforeSend: function () {
      $("#newsletter_submit_form").hide();
      $("#reg_js_img").show();
    },
    error: function (xhr, status, error) {
      $("#reg_js_img").hide();
      $("#industry_listinng").hide();
      $("#first_email_input").show();
      $("#newsletter_submit_form").show();

      $("#subscriber_email").css("border", "solid 2px red");
      swal(xhr.responseText);
    },
  });

  $("form.newsletter-popup__form").validate({
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
  });

  $("form.newsletter-popup__form").submit(function (e) {
    var isvalid = $(this).valid();
    var url = apiUrl + "subscribers";
    if (isvalid) {
      var jsonData = _getFormData($(this));
      if (jsonData) {
        getUniqueAudience(url, jsonData);
      }
    }
    return false;
  });
  /**
   * Author: Ngan Nguyen
   * Function createNewAudience / for create new user subscribe add new record in baseapi.elle.vn microsite and mailchimp api
   * Param string api / an define api url
   * Param json subscriber / an user Object
   * return message
   */
  function createNewAudience(api, subscriber) {
    //TODO configable.
    var message = "";
    $("#newsletter-popup-message").html(message);
    $.post(api, subscriber).done(function (data) {
      if (data.error == undefined) {
        message = "Chúc mừng bạn đã đăng ký nhận bản tin thành công!";
        $("#newsletter-popup-message").html(message);
        $("#newsletter-popup-message").show();
        $("form.newsletter-popup__form").html("");
      } else {
        message =
          '<span style="color:red;font-size:12px;margin-bottom:5px;">Vui lòng kiểm tra lại kết nối internet của bạn.</span>';
        $("#newsletter-popup-message").html(message);
      }
    });
  }

  /**
   * Author: Ngan Nguyen
   * Function updateAudience / for update user subscribe
   * Param string api
   * Param id
   * Param json subscriber
   * return message
   */

  function updateAudience(api, id, subscriber) {
    //TODO configable.

    var message = "";
    $("#newsletter-popup-message").html(message);
    $.ajax({
      url: api + "/" + id,
      type: "PUT",
      data: subscriber,
      success: function (data) {
        if (data.error == undefined) {
          message = "Chúc mừng bạn đã cập nhật bản tin thành công!";
          $("#newsletter-popup-message").html(message);
          $("#newsletter-popup-message").show();
          $("form.newsletter-popup__form").html("");
        } else {
          message =
            '<span style="color:red;font-size:12px;margin-bottom:5px;">Vui lòng kiểm tra lại kết nối internet của bạn. </span>';
          $("#newsletter-popup-message").html(message);
        }
      },
    });
  }

  /**
   * Author: Ngan Nguyen
   * Function getUniqueAudience / for if get user subscribe with unique email
   * Param string api
   * Param json subscriber
   * return json subscriber plus subscriber ID
   */
  function getUniqueAudience(api, subscriber) {
    $.get(api + "?email=" + subscriber.email).done(function (data) {
      if (data.error == undefined) {
        if (data.length === 0) {
          subscriber.elle = false;
          subscriber.elleman = true;
          subscriber.elledecoration = false;
          createNewAudience(api, subscriber);
        } else {
          subscriber.elledecoration = data[0].elledecoration;
          subscriber.elleman = true;
          subscriber.elle = data[0].elle;
          subscriber.beauty = data[0].beauty;
          subscriber.horoscope = data[0].horoscope;
          updateAudience(api, data[0]._id, subscriber);
        }
      } else {
        return;
      }
    });
  }

  function _getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {
      fashion: false,
      all_in_one: false,
      grooming: false,
      entertainment: false,
      celebrities: false,
      status: "subscribed",
    };
    let industry_arr = [];
    $.map(unindexed_array, function (n, i) {
      if (n["value"] == "on") {
        n["value"] = true;
      }

      if (n["name"] === "industry_newsletter[]") {
        industry_arr.push(n["value"]);
      } else {
        indexed_array[n["name"]] = n["value"];
      }
    });
    indexed_array["industry"] = industry_arr.join();
    if (indexed_array["industry"]) {
      return indexed_array;
    } else {
      swal("Vui lòng chọn lĩnh vực !");
      return false;
    }
  }
  /** End register newsletter */

  $(".frm-style").submit(function (e) {
    e.preventDefault();
    var $this = $(this);
    var style = $this.closest("form").find("#styles").val();
    var item = $this.closest("form").find("#items").val();
    if (style == "tat-ca" && item == "tat-ca") {
      swal({
        title: "Lỗi",
        text: "Vui lòng chọn món đồ hoặc phong cách !",
        type: "error",
        timer: 5000,
      });
    } else {
      var url = "/style-guide/" + item + "/" + style;
      window.location.href = url;
    }
  });
  //show form style after load page
  $(".search-main").css("display", "block");

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

  // ringier_post_view();

  line_menu();
});

function ringier_post_view() {
  var cls = $("body").attr("class");
  var postid = 0;
  if (cls.indexOf("postid") != -1) {
    var index = cls.indexOf("postid");
    cls = cls.substr(index);
    postid = cls.substr(0, cls.indexOf(" "));
    postid = postid.split("-");
    postid = parseInt(postid[1]);
  } else if (cls.indexOf("page-id") != -1) {
    var index = cls.indexOf("page-id");
    cls = cls.substr(index);
    postid = cls.substr(0, cls.indexOf(" "));
    postid = postid.split("-");
    postid = parseInt(postid[2]);
  }

  if (postid) {
    $.ajax({
      type: "get",
      url: em_ajax.ajaxurl,
      data: {
        action: "ajax_post_view",
        post_id: postid,
      },
    });
  }
}

// event handling run line on the menu
function line_menu() {
  var cate_active = $("ul.navigation  li.active  a").text();
  switch (cate_active) {
    case "":
      $(".lavalamp-object").addClass("line");
      break;
  }
}

function draw_column_chart(data, $obj) {
  $obj.highcharts({
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      crosshair: true,
      title: {
        text: "Tháng",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "ELLE Meter",
      },
      max: 10,
    },
    tooltip: {
      headerFormat:
        '<span style="font-size:10px">Tháng {point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">ELLE Meter: </td>' +
        '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
        pointWidth: 10,
        color: "#F00",
      },
    },
    series: data,
    legend: {
      enabled: false,
    },
  });
}

function load_paging_network(obj) {
  var category = obj.attr("data-cate_id");
  var post_type = obj.attr("data-post_type");
  var date_rank = obj.attr("data-date_rank");
  var page = 1;
  var limit = 5;

  $.ajax({
    type: "get",
    url: em_ajax.ajaxurl,
    dataType: "json",
    data: {
      category: category,
      object_type: post_type,
      date_rank: date_rank,
      page: page,
      limit: limit,
      action: elleman_ajax_chart_paging,
    },
    beforeSend: function () {},
    success: function (data) {},
  });
}
