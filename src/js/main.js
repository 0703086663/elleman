// var apiUrl = 'https://baseapi.x/'
var apiUrl = "https://32b0-125-235-238-172.ngrok-free.app/";

$(document).ready(function () {
  $("#btn-open-newsletter-popup").click(function () {
    $("#newsletter-popup").show();
  });

  $("#close_newsletter_popup").click(function () {
    $("#newsletter-popup").hide();
  });

  // Search indistry
  $("#filter-industry").on("input", function () {
    var searchText = $(this).val().toLowerCase();
    $("#industry option").each(function () {
      var optionText = $(this).text().toLowerCase();
      var optionValue = $(this).val();
      if (optionText.includes(searchText)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  // Overwrite select event default
  $("#industry option").mousedown(function (e) {
    e.preventDefault();
    $(this).prop("selected", !$(this).prop("selected"));
    return false;
  });

  // Check all button click event
  $("#check-all-industry").on("click", function () {
    $("#industry option").prop("selected", true);
  });

  // Uncheck all button click event
  $("#uncheck-all-industry").on("click", function () {
    $("#industry option").prop("selected", false);
  });

  // Invert select button click event
  $("#invert-select-industry").on("click", function () {
    $("#industry option").each(function () {
      $(this).prop("selected", !$(this).prop("selected"));
    });
  });

  $(".newsletter-popup__form").submit(function (event) {
    event.preventDefault();

    var url = apiUrl + "subscribers";
    var formData = $(this).serializeArray();
    var formattedData = {};

    formData.forEach(function (item) {
      var fieldValue = item.value.replace(/\s+/g, "_");
      fieldValue = fieldValue === "on" ? true : fieldValue;

      if (formattedData[item.name]) {
        formattedData[item.name] += "," + fieldValue;
      } else {
        formattedData[item.name] = fieldValue;
      }
    });

    getUniqueAudience(url, formattedData);

    console.log(formattedData);
  });
});

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
