/**
 * Created by hennes on 2016/11/26.
 */

$(function () {
    //当前页
    Hennes.loadNav('../', 'header', 'side_nav3_3');

    //跳转到“基础参数”
    $('b.text-primary').click(function () {
        $('html, body').animate({scrollTop: 0}, 300);
    });

    //滚动监听
    $('body').scrollspy({
        target: '#site_dir'
    });
    $('#site_dir').on('activate.bs.scrollspy', function(item) {
        var a = $(item.target).position().top, $lay = $('.layui-layer-content');
        if(a > 0){
            $lay.animate({scrollTop: a - 200}, 50);
        }else{
            $lay.animate({scrollTop: 0}, 50);
        }
    });

    var $tx = $('#J_test'), txVal = $tx.val();

    //定义弹窗，默认最小化右下角打开
    var layerOpen = function (options) {
        var opt = $.extend({
            type: 1,
            title: '<b>在线调试</b>',
            id: '',
            content: '',
            area: ['auto'],
            move: '.layui-layer-title',
            skin: 'goTo-debug-min',
            shade: false,
            offset: 'rb',
            resize: false,
            success: function(layero, index){
                layer.style(index, {
                    marginLeft: -10,
                    marginTop: -10
                });
            },
            end: function () {
                layerOpen({
                    id: 'Lay_layer_debug',
                    content: $('#test_lay'),
                    area: ['480px'],
                    skin: 'goTo-debug-max',
                    success: function(layero, index){
                        layero.find('.layui-layer-close1').html('<cite />');
                        layer.style(index, {
                            marginLeft: -10,
                            marginTop: -10
                        });
                    },
                    end: function () {
                        layerOpen();
                        if ($tx.val() == '') $tx.val(txVal);
                    }
                });
                if ($tx.val() == '') $tx.val(txVal);
            },
            cancel: null
        }, options || {});
        layer.open(opt);
    };

    //目录跳转层
    var dir = function () {
        layerOpen({
            title: '目录',
            area: ['180px', '320px'],
            content: $('#site_dir'),
            skin: 'dir-layer',
            offset: 'r',
            success: function(layero, index){
                layer.style(index, {
                    marginLeft: -10
                });
            },
            end: null,
            cancel: null
        });
    };
    dir();

    //显示当前状态
    $('.site-dir li a').on('click', function () {
        var $self = $(this),
            $li = $self.parent('li'),
            id = $self.attr('href').replace('#', '').replace('.', '_'),
            $curr = $('#' + id);
        $self.parents('.site-dir').find('li').removeClass('active');
        $li.addClass('active');
        $('html,body').animate({scrollTop: $curr.offset().top - $curr.height()}, 500);
    });

    $('button[data-target]').on('click', function () {
        var $self = $(this), id = $self.data('target'), $target = $('#lay_' + id), $tr = $self.parents('tr');
        var h = $self.data('height'), hgt = (h === '' || typeof h === 'undefined') ? 'auto' : h + 'px';
        if($target.length > 0) {
            layerOpen({
                title: id + '代码示例',
                move: false,
                area: ['800px', hgt],
                shade: 0.3,
                content: $target,
                skin: '',
                offset: 'auto',
                success: function (layero, index) {
                    $tr.addClass('selected');
                },
                end: null,
                cancel: function () {
                    $tr.removeClass('selected');
                }
            });
        }
    });

    //最小窗口
    layerOpen();

    //相册
    layer.photos({
        photos: '#layer_pht'
    });
});