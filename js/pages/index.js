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
            var $index = $('#index_list');

            //加载数据
            Hennes.getMenuData('', $index);
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
                left: 'auto',
                top: '50%',
                marginTop: 'auto',
                marginLeft: 'auto',
                opacity: 0,
                zIndex: 10
            }).animate({
                left: '50%',
                top: '50%',
                opacity: 1,
                marginTop: -t,
                marginLeft: -l
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