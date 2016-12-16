/*!
 * showCarousel：封装Carousel
 * @author：Hennes
 * @date  ：2016-12-01 19:55
 */
(function ($) {
    $.fn.showCarousel = function (options) {
        var Opts = $.extend({
            asBg: true, //背景图滚动，默认为背景
            asText: false, //文字和介绍，默认为无
            slide: [
                {
                    image: undefined,
                    active: false,
                    bgColor: undefined,
                    url: undefined,
                    title: undefined,
                    content: undefined
                }
            ]
        }, options || {});

        return this.each(function () {
            var that = this, id = $(that).attr('id');
            var $slide = $('<div class="carousel-inner" />'), $numPoint = $('<ol class="carousel-indicators"/>');

            //上一个 下一个
            var $PrevAndNext = $('<a class="left carousel-control" href="#'+ id +'" data-slide="prev"><span class="glyphicons glyphicons-chevron-left"></span><span class="sr-only">Previous</span><a class="right carousel-control" href="#'+ id +'" data-slide="next"><span class="glyphicons glyphicons-chevron-right"></span><span class="sr-only">Next</span></a>');

            $slide.appendTo($(that));
            $numPoint.appendTo($(that));
            $PrevAndNext.appendTo($(that));

            var showBg = Opts.asBg, showTx = Opts.asText;

            //判断数据
            var appendHtml = function (data) {
                var html = '';
                var txHtml = '<div class="carousel-caption">'
                        + '       <h1>' + data.title + '</h1>'
                        + '       <p>' + data.content + '</p>'
                        + '       <p><a class="btn btn-lg btn-primary" href="' + data.url + '" role="button">' + data.title + '</a></p>'
                        + '   </div>';
                var imgBg = '<div class="item" style="background: ' + data.bgColor + ' url(' + data.image + ') 50% 0 no-repeat;">';
                var image = '<img src="' + data.image + '">';

                //作为背景
                if (showBg === true) {
                    if(showTx === false){ //无文字
                        html = imgBg +'</div>';
                    }else{ //有文字
                        html = imgBg +''+ txHtml +'</div>';
                    }
                }else{ //作为图片
                    if(showTx === false){ //无文字
                        html = '<div class="item">'+ image +'</div>';
                    }else{ //有文字
                        html = '<div class="item">'+ image +''+ txHtml +'</div>';
                    }
                }
                return html;
            };

            var actived = 0; // 判断第几个激活

            $.each(Opts.slide, function (i, val) {
                var cls = val.active === true ? 'active' : '';
                if (val.active === true) actived = i;

                //装载小圆点
                var $li = $('<li data-target="#' + id + '" data-slide-to="' + i + '" />').attr('class', cls).appendTo($numPoint);

                //装载滚动内容
                var slideData = appendHtml(val);
                $(slideData).addClass(cls).appendTo($slide);
            });
        });
    }
})(jQuery);

var HennesSingle = {
    //当前菜单
    currHd: function (ele) {
        var $curLay = $('#' + ele);
        $curLay.addClass('active');
    },
    //页面数据
    singleData: function (e) {
        var $wrap = $(e), html = '';

        $.getJSON('../json/singleData.json', function (data) {
            $.each(data, function (i, row) {
                html += '<div class="section-item section-item'+ (i+1) +'">'
                    +' <div class="container">'
                    + '<div class="page-header">'
                    +'     <h3>'+ row.column +'</h3>'
                    +' </div>'
                    +' <div class="row">';
                $.each(row.list, function (m, val) {
                    html += '<div class="col-xs-6 col-sm-6 col-md-3 col-item">'
                        + '    <div class="thumbnail">'
                        + '        <a href="'+ val.url +'" class="col-img-a">'
                        + '            <img src="../images/grey.gif" data-original="'+ val.image +'" alt="" class="lazy">'
                        + '             <div class="info">'
                        + '                 <span>最近直播：'+ val.time +'</span>'
                        + '             </div>'
                        + '        </a>'
                        + '        <div class="caption">'
                        + '            <h4><a href="'+ val.url +'">'+ val.title +'</a></h4>'
                        + '            <p class="text-muted">'
                        + '                主讲人：'+ val.lector +'<a href="'+ val.url +'" class="pull-right text-primary" target="_blank">'+ val.other +'</a>'
                        + '            </p>'
                        + '        </div>'
                        + '    </div>'
                        + ' </div>';
                });

                html += '   </div>'
                    + '  </div>'
                    + '</div>';
            });

            //添加数据
            $wrap.append(html).removeClass('loading');

            // lazy
            $('img.lazy').lazyload({
                effect: 'fadeIn'
            }).css({ background: 'none'});
        });
    },
    //加载头部
    loadSingleHead: function (e, headID) {
        $(e).load('../include/singleHead.html', function () {
            setTimeout(function () {
                HennesSingle.currHd(headID);
            }, 300);
        });
    },
    //加载底部
    loadSingleFoot: function () {
        $('.footer').load('../include/singleFoot.html');
    }
};