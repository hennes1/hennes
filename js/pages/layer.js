/**
 * Created by hennes on 2016/11/26.
 */
seajs.use(['jquery', 'bootstrap', 'layer', 'ZeroClipboard', 'common'], function () {
    //弹层CSS路径
    layer.config({
        path: '../js/plugins/layer/'
    });

    $(function () {
        //当前页
        Hennes.loadNav('../', 'header', 'side_nav3_3');

        //跳转到“基础参数”
        $('b.text-primary').click(function () {
            $('html, body').animate({scrollTop: 0}, 300);
        });

        var $tx = $('#J_test'), txVal = $tx.val();

        $('button[data-target]').on('click', function () {
            var $self = $(this), id = $self.data('target'), $target = $('#' + id), $tr = $self.parents('tr');
            var h = $self.data('height'), hgt = (h === '' || typeof h === 'undefined') ? 'auto' : h + 'px';
            if($target.length > 0) {
                layer.open({
                    type: 1,
                    title: id + '代码示例',
                    move: false,
                    area: ['800px', hgt],
                    content: $target,
                    success: function (layero, index) {
                        $tr.addClass('selected');
                    },
                    cancel: function () {
                        $tr.removeClass('selected');
                    }
                });
            }
        });

        //在线调试
        var popDebug = function(){
            layer.open({
                type: 1,
                title: '<b>在线调试</b>',
                id: 'Lay_layer_debug',
                content: $('#test_lay'),
                area: ['480px'],
                skin: 'goTo-debug-max',
                shade: false,
                offset: 'rb',
                resize: false,
                success: function(layero, index){
                    layero.find('.layui-layer-close1').html('<cite />');
                    layer.style(index, {
                        marginLeft: -10,
                        marginTop: -10
                    });
                },
                end: function () {
                    smallDebug();
                    if ($tx.val() == '') $tx.val(txVal);
                }
            });
            J_test.focus();
        };

        //最小窗口
        var smallDebug = function () {
            layer.open({
                type: 1,
                title: '<b>在线调试</b>',
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
                    popDebug();
                    if ($tx.val() == '') $tx.val(txVal);
                }
            });
        };
        smallDebug();

        //相册
        layer.photos({
            photos: '#layer_photos'
        });
    });
});