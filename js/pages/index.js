/**
 * Created by hennes on 2016/11/26.
 */

seajs.config({base: './js/'});

seajs.use(['jquery', 'bootstrap', 'layer', 'common'], function () {
    //弹层CSS路径
    layer.config({
        path: './js/plugins/layer/'
    });

    $(function () {
        //当前页
        Hennes.loadNav('', 'header');

        //page data
        $(window).on('load', function (e) {
            var loading = layer.load(0, {shade: false});
            var $index = $('#index_list'), html = '';

            $.getJSON('json/indexData.json?v=' + new Date, function (data) {
                for (var i = 0, len = data.length; i < len; i++) {
                    for (var m = 0; m < data[i].menu.length; m++) {
                        html += '<div class="col-sm-4 jump-panel">'
                            + '   <div class="panel panel-default">'
                            + '       <div class="panel-heading">'
                            + '           <h4 class="panel-title">'
                            + '                <i class="glyphicons ' + data[i].menu[m].icoName + ' fn-mr-5"></i>' + data[i].menu[m].title + ''
                            + '           </h4>'
                            + '       </div>'
                            + '       <div class="panel-body">'
                            + '           <div class="media">'
                            + '               <div class="media-left media-middle ' + data[i].menu[m].icoColor + '">'
                            + '                 <i class="glyphicons ' + data[i].menu[m].icoName + '"></i>'
                            + '               </div>'
                            + '               <div class="media-body">'
                            + '                   <p>' + data[i].menu[m].description + '</p>'
                            + '               </div>'
                            + '           </div>'
                            + '       </div>'
                            + '       <div class="panel-footer pos-r text-right">'
                            + '           <button class="btn btn-primary btn-sm url-jump" data-url="pages/' + data[i].menu[m].link + '" role="button">了解详情 »</button>'
                            + '       </div>'
                            + '   </div>'
                            + '</div>';
                    }
                }

                //添加数据
                $index.append(html);

                //关闭loading
                layer.closeAll('loading');
            });
        });

        //跳转页效果
        $(document).on('click', '.url-jump', function () {
            var $self = $(this),
                $panel = $self.parents('.jump-panel'),
                url = $self.data('url');
            var l = $panel.width() / 2, t = $panel.height() / 2, n = 0;
            var $foot = $('.panel-footer', $panel),
                $pfLoad = $('<div class="pf-loading" />'),
                $bg = $('<div />');

            $self.addClass('disabled');
            $('.head-nav').css({zIndex: 3});
            $bg.remove().appendTo($('body')).css({
                backgroundColor: '#fff',
                position: 'fixed',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: 5
            }).animate({opacity: .95});
            $panel.css({
                position: 'fixed',
                left: '50%',
                top: '50%',
                marginTop: -t,
                marginLeft: -l,
                zIndex: 10
            });
            $pfLoad.remove().appendTo($foot);

            var Bar = setInterval(function () {
                if (n < 100) {
                    n++;
                    $pfLoad.css('width', n + '%');
                } else {
                    clearInterval(Bar);
                    $panel.animate({opacity: 0}, function () {
                        window.location.href = url;
                    });
                }
            }, 10);
        });
    });
});