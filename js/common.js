/*!
 * @author：Hennes
 * @date  ：2016-11-02 18:02
 */
var Hennes = {
    //当前菜单
    currNav: function (ele) {
        var $curLay = $('#' + ele);
        $curLay.addClass('active');
        $('.aside .collapse').removeClass('in');
        $curLay.parents('.collapse').addClass('in');
    },
    /*
     * zClipboard：Flash复制插件
     * @btn：复制按钮
     * @target：要复制的目标元素，如：$(this).next('code')
     */
    zClipboard: function (btn, target) {
        if (typeof ZeroClipboard === 'undefined') {
            throw new Error('缺少ZeroClipboard插件，请引入');
        }
        //定义ZeroClipboard对像
        var zClip = new ZeroClipboard($(btn));
        zClip.on('ready', function (event) {
            //console.log('成功装入装入Flash！');

            //开始复制
            zClip.on('copy', function (event) {
                var clipboard = event.clipboardData,
                    text = $.trim(target.text()); //获取要复制的内容
                clipboard.setData('text/plain', text);
            })
                .on('aftercopy', function (event) {
                    layer.msg('复制成功', {time: 600}, function () {
                        layer.closeAll();
                    });
                });
        });

        //出错时销毁
        zClip.on('error', function (event) {
            ZeroClipboard.destroy();
        });
    },
    /*
     * rightMenu：右键菜单
     * @ele：当前元素
     * @menuData：菜单数据
    */
    rightMenu: function (ele, menuData) {
        if (typeof $.smartMenu === 'undefined') {
            throw new Error('缺少smartMenu插件及其样式，请引入');
        }
        $(ele).smartMenu(menuData, {
            name: "",
            offsetX: 2,
            offsetY: 2,
            textLimit: 16,
            beforeShow: function () {
                $.smartMenu.remove();
            },
            afterShow: $.noop
        });
    },
    /* 获取当前e元素id */
    getCurrentEleID: function (e) {
        return $(e).data("id");
    },
    /*
     * insertTrData：追加一行或删除
     * @e：当前点击元素
     * @parentEle：父级元素
     * @sonEle：子元素
     * @html：追加数据的html
     */
    insertTrData: function (e, parentEle, sonEle, html) {
        var $i = $(e).find('i'), $currLay = $(e).parents(parentEle), len = $currLay.find(sonEle).length;
        var jia = 'glyphicons-plus', jian = 'glyphicons-minus';

        if($i.hasClass(jia)) {
            var currHtml = '<tr class="detail-view"><td colspan="' + len + '">' + html + '</td></tr>';
            $('.detail-view').remove();
            $currLay.siblings('tr').removeClass('selected').find('td:first-child').find('i').removeClass(jian).addClass(jia);
            $currLay.removeClass('selected').after(currHtml);
            $i.removeClass(jia).addClass(jian);
        }else{
            $currLay.next('.detail-view').remove();
            $i.removeClass(jian).addClass(jia);
        }
    },
    /*
     * loadNav：加载头部和(或)侧边菜单
     * @root：路径
     * @topID：头部菜单id，目前id设置在主容器上
     * @sideID：侧边菜单链接处id
    */
    loadNav: function (root, topID, sideID) {
        var $headNav = $('#header_nav'), //头部菜单id
            $sideNav = $('#side_nav'); //侧边菜单id

        //如果有头部菜单
        if(topID === 'header'){
            $headNav.load(root + 'include/header.html', function () {
                $(this).removeClass('hd-loading');
                Hennes.titleTip();
            });
        }

        //侧边菜单
        if($sideNav.length === 1){
            if(typeof sideID === 'undefined'){
                return false;
            }else{
                Hennes.getMenuData(root, $sideNav, sideID);
            }
        }
    },
    getMenuData: function (root, e, id) {
        $.getJSON(root + 'json/menuData.json', function (data) {
            var html = '';
            if(typeof id !== 'undefined' && id !== '') {
                var sideHtml = html + '<div class="panel-group side-scroll" id="accordion">';
                $.each(data, function (i, group) {
                    sideHtml += '<div class="panel panel-default">'
                        + '     <div class="panel-heading">'
                        + '         <h4 class="panel-title">'
                        + '             <a data-toggle="collapse" data-parent="#accordion" href="#' + group.name + '">'
                        + '                 <i class="glyphicons ' + group.ico + ' fn-mr-10"></i>' + group.column + ''
                        + '             </a>'
                        + '         </h4>'
                        + '     </div>'
                        + '     <div id="' + group.name + '" class="panel-collapse collapse">'
                        + '         <div class="panel-body">'
                        + '             <ul class="nav navbar-nav">';
                    $.each(group.menu, function (n, nav) {
                        sideHtml += '  <li id="side_nav' + (i + 1) + '_' + (n + 1) + '">'
                            + '        <a href="' + nav.link + '">'
                            + '            <i class="glyphicons ' + nav.icoName + ' fn-mr-5"></i>'
                            + '            ' + nav.title + ''
                            + '        </a>'
                            + '    </li>';
                    });
                    sideHtml += '  </ul>'
                        + '     </div>'
                        + '  </div>'
                        + '</div>';
                });

                sideHtml += '</div>';

                e.removeClass('sd-loading').append(sideHtml);
                setTimeout(function () {
                    Hennes.currNav(id);
                    Hennes.setSideHeight();
                }, 600);
            }
            if(typeof id === 'undefined'){
                var loading = layer.load(0, {shade: false});
                $.each(data, function (i, series) {
                    $.each(series.menu, function (m, val) {
                        html += '<div class="col-sm-4 jump-panel">'
                            + '   <div class="panel panel-default">'
                            + '       <div class="panel-heading">'
                            + '           <h4 class="panel-title">'
                            + '                <i class="glyphicons ' + val.icoName + ' fn-mr-5"></i>' + val.title + ''
                            + '           </h4>'
                            + '       </div>'
                            + '       <div class="panel-body">'
                            + '           <div class="media">'
                            + '               <div class="media-left media-middle ' + val.icoColor + '">'
                            + '                 <i class="glyphicons ' + val.icoName + '"></i>'
                            + '               </div>'
                            + '               <div class="media-body">'
                            + '                   <p>' + val.description + '</p>'
                            + '               </div>'
                            + '           </div>'
                            + '       </div>'
                            + '       <div class="panel-footer pos-r text-right">'
                            + '           <button class="btn btn-primary btn-sm url-jump" data-url="pages/' + val.link + '" role="button">了解详情 »</button>'
                            + '       </div>'
                            + '   </div>'
                            + '</div>';
                    });
                });

                //添加数据
                e.append(html);

                //关闭loading
                layer.closeAll('loading');
            }
        });
    },
    /* chkBoxAndRd：复选框和单选框选取 */
    chkBoxAndRd: function () {
        $('[data-toggle="customCheck"] label').click(function (e) {
            var $self = $(this), $i = $self.find('i'), $ipt = $self.find('input');
            var check = 'glyphicons-check', unCheck = 'glyphicons-unchecked'; //选中与否的样式
            var iptType = $ipt.attr('type'); //判断是checkbox还是radio

            if(iptType === 'checkbox') {
                if ($i.hasClass(unCheck)) {
                    e.preventDefault();
                    $i.removeClass(unCheck).addClass(check);
                    $self.addClass('active');
                    $ipt.attr('checked', 'checked');
                } else {
                    e.preventDefault();
                    $i.removeClass(check).addClass(unCheck);
                    $self.removeClass('active');
                    $ipt.removeAttr('checked');
                }
            }else{
                e.preventDefault();
                $i.removeClass(unCheck).addClass(check);
                $self.addClass('active').siblings().removeClass('active').find('i').removeClass(check).addClass(unCheck);
                $ipt.attr('checked', 'checked');
                $self.siblings().find('input').removeAttr('checked');
            }
        });
    },
    //getName：获取下拉菜单中a标签的名字
    getName: function () {
        $('[role="menu"]>li>a').click(function () {
            var $name = $(this).parents('ul').prev('button').find('span').eq(0), $val = $(this).html();
            $name.html($val);
        });
    },
    //中文字符处理
    toUtf8: function (str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    },
    /*
     * outPutQRCode：输出二维码图片
     * @e：显示二维码的元素
     * @renderType：渲染方式（table | canvas）
     * @txt：要生成的信息内容
     * @width：二维码宽
     * @width：二维码高
     */
    outPutQRCode: function (e, renderType, txt, width, height) {
        //先清空
        $(e).empty();

        //中文格式转换
        var str = Hennes.toUtf8(txt);

        //生成二维码
        $(e).qrcode({
            render: renderType,
            width: width,
            height: height,
            text: str
        });
    },
    setSideHeight: function () {
        var winHg = $(window).height(), h = winHg - 60;
        var $sideScroll = $('.side-scroll');
        if($sideScroll.length > 0) {
            $sideScroll.css('height', h);
            $sideScroll.niceScroll({cursorcolor: '#888'});
            $sideScroll.getNiceScroll().resize();
        }
    },
    titleTip: function () {
        $('[data-toggle="tooltip"]').tooltip({container: 'body', trigger: 'hover'});
    }
};

$(function () {
    //改变body的滚动条样式
    $('html').niceScroll({
        cursorcolor: '#888',
        cursorwidth: '10px',
        cursorborder: 'none',
        zindex: 1031
    });

    Hennes.setSideHeight();

    $(window).on('resize', function () {
        Hennes.setSideHeight();
    });

    //侧边菜单 show | hide
    $(document).on('click', '.toggle-btn', function () {
        var $m = $('#H_main'), $s = $('#side_nav'), bl = $m.hasClass('show-side');
        if(bl){
            $m.stop().animate({marginLeft: 0}, 300, function () {
                $m.removeAttr('style').removeClass('show-side');
            });
            $s.stop().animate({left: '-170px'}, 300);
        }else{
            $m.stop().animate({marginLeft: '160px'}, 300, function () {
                $m.removeAttr('style').addClass('show-side');
            });
            $s.stop().animate({left: 0}, 300);
        }
    });

    //侧边菜单伸展执行
    $(document).on('click', 'a[data-toggle="collapse"]', function () {
        Hennes.setSideHeight();
    });

    //如果引入了ZeroClipboard和layer插件，则添加复制按钮
    if (typeof ZeroClipboard !== 'undefined') {
        var copyBtn = '<a href="javascript:void(0);" class="btn btn-default btn-xs flash-copy">复制</a>';
        $('.highlight').find('code').before(copyBtn);

        $('.flash-copy').each(function () {
            Hennes.zClipboard(this, $(this).next('code'));
        });
    }

    //悬浮下拉
    $(document).on('mouseenter mouseleave', '[data-tab="hoverdown"]', function (event) {
        var self = $(this);
        (event.type == 'mouseenter') ? self.addClass('open') : self.removeClass('open');
    });

    //select控件
    var $select = $(".select");
    if($select.length > 0){
        var bl = false;
        $select.each(function () {
            bl = $(this).data('search');
            if(bl == true){
                $(this).select2({placeholder: '请选择', minimumResultsForSearch: Infinity});
            }else{
                $(this).select2({ placeholder: '请选择'});
            }
        });
    }

    //tooltip
    Hennes.titleTip();
});