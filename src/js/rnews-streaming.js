(function ($) {
    $.isPending = false;
    $.index = 0;
    $.args = new Array();
    $.fn.rNewsStreaming = function (options) {
        var self = $(this);
        var defaults = {
            "ori_id": "",
            "related_ids": "",
            "url": "",
            "data": {},
            "deviation": 200,
            "scrollTarget": 'article',
            "targetOnScreen": 'article',
            'streamType': ''
        };
        var opts = $.extend({}, defaults, options);
        var post_data = opts.data;
        var related_ids = opts.related_ids;
        var element_id;
        $.args["post-" + opts.ori_id] = {
            link: window.location.href,
            title: document.title
        };
        $(window).scroll(function () {
            var objTarget = $(opts.scrollTarget, self).last();

            // element article visible on screen
            element_id = isScrolledIntoView(opts.targetOnScreen);
            if (element_id) {
                if ($.args[element_id] != undefined) {
                    locaion_link = $.args[element_id]['link'];
                    if (locaion_link != window.location.href) {
                        window.history.pushState("", "", locaion_link);
                        document.title = $.args[element_id]['title'];
                    }
                }
            }

            if (!$.isPending &&
                $(window).scrollTop() >= (objTarget.position().top + objTarget.height() - opts.deviation)
            ) {
                if (related_ids.length > $.index) {
                    post_data.id = related_ids[$.index];
                    $.ajax({
                        type: "post",
                        url: opts.url,
                        dataType: 'json',
                        data: post_data,
                        beforeSend: function (xhr) {
                            $.isPending = true;
                        },
                        success: function (response) {
                            $.index++;
                            if (response) {
                                $.isPending = false;
                                if (opts.streamType == 'next' && response.next_id != undefined) {
                                    related_ids.push(response.next_id);
                                }

                                var page_link = response.permalink;
                                $.args["post-" + response.ID] = {
                                    link: page_link,
                                    title: response.post_title
                                };
                                page_link = page_link.substring(page_link.indexOf("elleman.vn/") + 10);
                                ga('send', 'pageview', {
                                    'page': page_link,
                                    'title': response.post_title + " - Elleman.vn"
                                });
                                var html =
                                    '<div class="line-sepa"></div>' +
                                    '<div class="block-detail" itemscope itemtype="http://schema.org/Article" id="post-' + response.ID + '">' +
                                    '<h1>' + response.post_title + '</h1>' +
                                    '<div class="info-detail">' +
                                    '<div class="date">' + response.post_date + '</div>' +
                                    '<div class="number-cm"><i class="ico ico-cm"></i><fb:comments-count href="' + response.permalink + '"/></fb:comments-count> bình luận</div>' +
                                    '<div class="like-fb"> <div class="fb-like" data-send="false" data-layout="button_count" data-width="78" data-show-faces="false" data-href="' + response.permalink + '"> </div> </div>' +
                                    '<div class="social-detail pull-right">' +
                                    '<ul>' +
                                    '<li style="padding-right: 4px;"> <a target="_blank" title="Chia sẻ qua Facebook" href="https://www.facebook.com/sharer/sharer.php?u=' + response.permalink + '" rel="nofollow"> <i class="ico ico-face-dt"></i> </a> </li>' +
                                    '<li style="padding-right: 4px;"> <a target="_blank" title="Chia sẻ qua Twitter" href="https://twitter.com/intent/tweet?source=webclient&text=' + response.permalink + '+' + response.post_title + '" rel="nofollow"> <i class="ico ico-twi-dt"></i></a></li>' +
                                    '<li style="padding-right: 4px;"> <a target="_blank" title="Chia sẻ qua Google+" href="https://plus.google.com/share?url={' + response.permalink + '}" rel="nofollow"> <i class="ico ico-gg-dt"></i> </a> </li>' +
                                    '<li> <a target="_blank" title="Chia sẻ qua email" href="mailto:?Subject=' + response.post_title + '&body=' + response.content_mail + '" rel="nofollow"> <i class="ico ico-mail-dt"></i> </a> </li>' +
                                    '</ul>' +
                                    '</div> <div class="clearfix"></div></div>' +
                                    '<div class="detail-main">';
                                if (response.post_related) {
                                    html += '<div class="col-xs-12 col-md-4">' +
                                        '<div class="title-small">Xem thêm </div>' +
                                        '<ul class="list-verti">';
                                    $.each(response.post_related, function (key, value) {
                                        html += '<li>' +
                                            '<a href="' + value.permalink + '" title="' + value.post_title + '" class="bg-verti">' +
                                            '<img src="' + value.images.thumbnail + '" alt="' + value.post_title + '" width="146" height="146" class="lazy">' +
                                            '</a>' +
                                            '<a href="' + value.permalink + '" class="title-small-verti" title="' + value.post_title + '">' +
                                            value.post_title +
                                            '</a>' +
                                            '</li>';
                                    });
                                    html += '</ul></div>';

                                }

                                html += ' <div class="col-xs-12 col-md-8 box-detail">' +
                                    '<h2>' + response.post_excerpt + '</h2>' +
                                    '<p>' + response.post_content + '</p>' +
                                    '<div class="info-detail">' +
                                    '<div class="number-cm"><i class="ico ico-cm"></i><fb:comments-count href="' + response.permalink + '"/></fb:comments-count> bình luận</div>' +
                                    '<div class="like-fb"> <div class="fb-like" data-send="false" data-layout="button_count" data-width="78" data-show-faces="false" data-href="' + response.permalink + '"> </div> </div>' +
                                    '<div class="social-detail pull-right">' +
                                    '<ul>' +
                                    '<li style="padding-right: 4px;"> <a target="_blank" title="Chia sẻ qua Facebook" href="https://www.facebook.com/sharer/sharer.php?u=' + response.permalink + '" rel="nofollow"> <i class="ico ico-face-dt"></i> </a> </li>' +
                                    '<li style="padding-right: 4px;"> <a target="_blank" title="Chia sẻ qua Twitter" href="https://twitter.com/intent/tweet?source=webclient&text=' + response.permalink + '+' + response.post_title + '" rel="nofollow"> <i class="ico ico-twi-dt"></i></a></li>' +
                                    '<li style="padding-right: 4px;"> <a target="_blank" title="Chia sẻ qua Google+" href="https://plus.google.com/share?url={' + response.permalink + '}" rel="nofollow"> <i class="ico ico-gg-dt"></i> </a> </li>' +
                                    '<li> <a target="_blank" title="Chia sẻ qua email" href="mailto:?Subject=' + response.post_title + '&body=' + response.content_mail + '" rel="nofollow"> <i class="ico ico-mail-dt"></i> </a> </li>' +
                                    '</ul>' +
                                    '</div> <div class="clearfix"></div></div>';
                                if (response.str_tag) {
                                    html += '<div class="tag-name">' +
                                        '<span class="note">TAG:</span>';
                                    $.each(response.str_tag, function (k_tag, v_tag) {
                                        html += '<a href="/tag/' + v_tag.slug + '" >' + v_tag.name + '</a>';
                                    });
                                    html += '</div>';
                                }
                                html += '</div></div>' +
                                    '</div>';
                                self.append(html);
                                $('#post-' + response.ID).fadeIn(500, function () {
                                    try {
                                        FB.XFBML.parse();
                                        // gapi.plusone.go();
                                    } catch (ex) { }

                                    (adsbygoogle = window.adsbygoogle || []).push({});
                                });
                            }
                        }
                    });
                }
            }
        });

        //googleAds();
    }

    function isScrolledIntoView(elem) {
        if ($(elem).length == 0) {
            return false;
        }
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var id = 0;
        $.each($(elem), function (index, element) {
            var elemTop = $(element).last().offset().top;
            var elemBottom = elemTop + $(element).height();
            if ((docViewBottom >= elemTop && docViewTop <= elemBottom)) {
                id = $(element).attr('id');
            }
        });
        return id;
    }

}(jQuery));