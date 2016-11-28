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
        if (typeof layer === 'undefined') {
            throw new Error('缺少layer弹层插件，请引入');
        }
        //定义ZeroClipboard对像
        var zClip = new ZeroClipboard($(btn));
        zClip.on('ready', function (event) {
            //console.log('成功装入装入Flash！');

            //开始复制
            zClip.on('copy', function (event) {
                var clipboard = event.clipboardData,
                    text = target.text(); //获取要复制的内容
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
     * timeFrameOption：日期时间段插件
     * @settings：调用参数
    */
    timeFrameOption: function (settings) {
        if(typeof daterangepicker === 'undefined' || typeof moment === 'undefined'){
            throw new Error('缺少DateRangePicker插件或moment插件及其样式，请引入');
        }
        var option = {};
        var defaultSetting = {
            open : "right", //默认箭头在左，即右打开
            format: "YYYY-MM-DD", //默认为短日期，长日期：YYYY-MM-DD HH:mm:ss
            timeSelect: false, //默认不显示下拉时间
            dateType: false, //默认双日历
            monSelect: false, //默认不显示下拉月
            customType: false, //默认不显示“自定义”
            timeIncrement: 1,
            applyLabel: "确定",
            cancelLabel: "取消",
            startDate: moment().startOf('day'),
            endDate: moment().endOf('day'),
            minDate: false, //最小日期，即在此之前的不可选择；默认为0，即不定义；格式同format
            maxDate: false, //最大日期，类minDate
            daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
        };
        $.extend(defaultSetting, settings);

        option = {
            "singleDatePicker": defaultSetting.dateType,
            "showDropdowns": defaultSetting.monSelect,
            "timePicker": defaultSetting.timeSelect, //是否显示小时和分钟
            "autoApply": defaultSetting.timeSelect,
            "timePicker24Hour": defaultSetting.timeSelect, //是否使用24小时制来显示时间
            "timePickerSeconds": defaultSetting.timeSelect,
            "showCustomRangeLabel": defaultSetting.customType,
            "timePickerIncrement": defaultSetting.timeIncrement, //时间的增量，单位为分钟
            "locale": {
                "format": defaultSetting.format,
                "separator": " ～ ",
                "applyLabel": defaultSetting.applyLabel,
                "cancelLabel": defaultSetting.cancelLabel,
                "fromLabel": "起始时间",
                "toLabel": "结束时间",
                "customRangeLabel": "自定义",
                "weekLabel": "W",
                "daysOfWeek": defaultSetting.daysOfWeek,
                "monthNames": defaultSetting.monthNames,
                "firstDay": 1
            },
            "ranges": {
                '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '今日': [moment(), moment()],
                '近7日': [moment().subtract(6, 'days'), moment()],
                '近30日': [moment().subtract(29, 'days'), moment()],
                '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                '本月': [moment().startOf('month'), moment().endOf('month')],
                '全时期': [moment().startOf('year'), moment().endOf('year')]
            },
            "opens": defaultSetting.open,
            "alwaysShowCalendars": true,
            "startDate": defaultSetting.startDate,
            "endDate": defaultSetting.endDate,
            "minDate": defaultSetting.minDate,
            "maxDate": defaultSetting.maxDate
        };

        return option;
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
        var $i = $(e).find('i'),
            $currLay = $(e).parents(parentEle),
            len = $currLay.find(sonEle).length;

        if($i.hasClass('glyphicons-plus')) {
            var currHtml = '<tr class="detail-view"><td colspan="' + len + '">' + html + '</td></tr>';
            $('.detail-view').remove();
            $currLay.siblings('tr').removeClass('selected').find('td:first-child').find('i').removeClass('glyphicons-minus').addClass('glyphicons-plus');
            $currLay.removeClass('selected').after(currHtml);
            $i.removeClass('glyphicons-plus').addClass('glyphicons-minus');
        }else{
            $currLay.next('.detail-view').remove();
            $i.removeClass('glyphicons-minus').addClass('glyphicons-plus');
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
        if($headNav.length === 1){
            if(topID === 'header'){
                $headNav.load(root + 'include/header.html', function () {
                    $(this).removeClass('hd-loading');
                });
            }
            if(typeof topID !== 'undefined') {
                $headNav.load(root + 'include/header.html', function () {
                    $(this).removeClass('hd-loading');
                    Hennes.currNav(topID);
                });
            }
        }

        //侧边菜单
        if($sideNav.length === 1){
            if(typeof sideID === 'undefined'){
                return false;
            }else{
                $.getJSON(root + 'json/indexData.json', function (data) {
                    var html = '';
                    html += '<div class="panel-group" id="accordion">';
                    for(var i = 0, len = data.length; i < len; i++) {
                        html += '<div class="panel panel-default">'
                             +'     <div class="panel-heading">'
                             +'         <h4 class="panel-title">'
                             +'             <a data-toggle="collapse" data-parent="#accordion" href="#'+ data[i].name +'">'
                             +'                 <i class="glyphicons '+ data[i].ico +' fn-mr-10"></i>'+ data[i].column +''
                             +'             </a>'
                             +'         </h4>'
                             +'     </div>'
                             +'     <div id="'+ data[i].name +'" class="panel-collapse collapse">'
                             +'         <div class="panel-body">'
                             +'             <ul class="nav navbar-nav">';
                                            for(var n = 0; n < data[i].menu.length; n++){
                                                html += '  <li id="side_nav'+ (i+1) +'_'+ (n+1) +'">'
                                                     +'        <a href="/hennes/pages/'+ data[i].menu[n].link +'">'
                                                     +'            <i class="glyphicons '+ data[i].menu[n].icoName +' fn-mr-10"></i>'
                                                     +'            '+ data[i].menu[n].title +''
                                                     +'        </a>'
                                                     +'    </li>';
                                            }
                        html += '           </ul>'
                             +'         </div>'
                             +'     </div>'
                             +' </div>';
                    }
                    html += '</div>';

                    $sideNav.removeClass('sd-loading').append(html);
                    setTimeout(function () {
                        Hennes.currNav(sideID);
                    }, 600);
                });
            }
        }
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
    /*
     * getName：获取下拉菜单中a标签的名字
     * @e：a标签的根父级元素id
     * @name：要显示名字的元素id
     */
    getName: function (e, name) {
        $('[role="menu"]>li>a').click(function () {
            var $name = $(this).parents(e).find(name), $val = $(this).html();
            $name.html($val);
        });
    }
};

$(function () {
    //如果引入了ZeroClipboard和layer插件，则添加复制按钮
    if (typeof ZeroClipboard !== 'undefined' && typeof layer !== 'undefined') {
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

    //给table选中的行高亮（子行除外）
    $(document).on('click', '.table tbody tr', function () {
        var $self = $(this);
        if (!$self.hasClass('detail-view')) {
            $self.hasClass('selected') ? $self.removeClass('selected') : $self.addClass('selected');
        }
    });

    //tooltip
    $('[data-toggle="tooltip"]').tooltip({container: 'body', placement: 'top', trigger: 'hover'});

    //popover
    var ContentMethod = function(txt) {
        return txt;
    };

    $('[data-toggle="popover"]').each(function () {
        var element = $(this), id = element.attr('id'), txt = element.html();
        element.popover({
            trigger: 'manual',
            //placement: 'right', //top, bottom, left or right
            title: txt,
            html: 'true',
            content: ContentMethod(txt)
        }).on("mouseenter", function () {
            var _this = this;
            $(this).popover("show");
            $(this).siblings(".popover").on("mouseleave", function () {
                $(_this).popover('hide');
            });
        }).on("mouseleave", function () {
            var _this = this;
            setTimeout(function () {
                if (!$(".popover:hover").length) {
                    $(_this).popover("hide");
                }
            }, 100);
        });
    });


});