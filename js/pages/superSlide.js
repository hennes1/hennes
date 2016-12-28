/**
 * Created by hennes on 2016/12/27.
 */
seajs.use(['jquery', 'bootstrap', 'superSlide', 'slimScroll', 'ZeroClipboard', 'common'], function () {

    var superSlide = function (e, options) {
        var opt = $.extend({
            titCell: ".hd ul",
            mainCell: ".bd ul",
            effect: "leftLoop",
            vis: "auto",
            scroll: 1,
            autoPlay: true,
            autoPage: true,
            interTime: 2500,
            trigger: "click"
        }, options || {});

        //调用slide
        $(e).slide(opt);
    };
    $(function () {
        //当前页
        Hennes.loadNav('../', 'header', 'side_nav3_6');

        //文字滚动
        superSlide('#tx_slide', {effect: "top", vis: 5});

        //图片滚动
        superSlide('#img_slide', {effect: "topMarquee", vis: 1, interTime: 50});

        //焦点图
        superSlide('#focus_slide');
    });
});