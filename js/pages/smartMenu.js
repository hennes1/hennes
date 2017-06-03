/**
 * Created by hennes on 2016/11/26.
 */

$(function () {
    //当前页
    Hennes.loadNav('../', 'header', 'side_nav3_5');

    //定义右键菜单data
    var rightMenu_1 = {
            text: "功能按钮1",
            icoClass: 'glyphicons glyphicons-magic',
            func: function () {
                var id = Hennes.getCurrentEleID(this);
                layer.alert('你在ID为' + id + '的行中点击了');
            }
        },
        rightMenu_2 = {
            text: "功能按钮2",
            icoClass: 'glyphicons glyphicons-keys',
            func: function () {
                var id = Hennes.getCurrentEleID(this);
                layer.alert('你在ID为' + id + '的行中点击了');
            }
        },
        rightMenu_3 = {
            text: "功能按钮3",
            icoClass: 'glyphicons glyphicons-git-pull-request',
            func: function () {
                var id = Hennes.getCurrentEleID(this);
                layer.alert('你在ID为' + id + '的行中点击了');
            }
        },
        rightMenu_4 = {
            text: "功能按钮4",
            icoClass: 'glyphicons glyphicons-shop-window',
            func: function () {
                var id = Hennes.getCurrentEleID(this);
                layer.alert('你在ID为' + id + '的行中点击了');
            }
        };

    //定义装载菜单容器
    var loadMenuData = [
        [rightMenu_1, rightMenu_2, rightMenu_3, rightMenu_4]
    ];

    //调用右键菜单
    Hennes.rightMenu('table tbody tr', loadMenuData);

    //定义右键子菜单data
    var subRightMenu_1 = {
            text: "子菜单1",
            icoClass: 'glyphicons glyphicons-boat',
            func: function () {
                var id = Hennes.getCurrentEleID(this);
                layer.alert('你在ID为' + id + '的行中点击了');
            }
        },
        subRightMenu_2 = {
            text: "子菜单2",
            icoClass: 'glyphicons glyphicons-cardio',
            func: function () {
                var id = Hennes.getCurrentEleID(this);
                layer.alert('你在ID为' + id + '的行中点击了');
            }
        };

    //定义装载子菜单容器
    var loadSubMenuData = [
        [subRightMenu_1, subRightMenu_2]
    ];

    //显示|隐藏详情
    $('.i-detail-btn').click(function () {
        var self = this, id = $(self).parents('tr').data('id');
        var html = '', loading;
        var currSelected = $(self).find('i').hasClass('glyphicons-plus');

        if(currSelected) loading = layer.load(0, {shade: false});

        $.getJSON('../json/smartData.json?v=' + new Date, function (data) {
            html += '<table class="table table-bordered table-striped table-hover">'
                + '  <thead>'
                + '      <tr>'
                + '          <th width="45%">拿手武功</th>'
                + '          <th width="45%">得意弟子</th>'
                + '          <th width="10%">关系</th>'
                + '      </tr>'
                + '  </thead>'
                + '  <tbody>';
            $.each(data, function (i, res) {
                var leaderId = res.leader;
                if (leaderId == id) {
                    $.each(res.other, function (n, val) {
                        html += '<tr data-id="s_' + leaderId + '_' + (n + 1) + '">'
                            + '     <td>' + val.skills + '</td>'
                            + '     <td>' + val.disciple + '</td>'
                            + '     <td>' + val.relation + '</td>'
                            + ' </tr>';
                    });
                }
            });
            html += '</tbody>';

            //插入数据
            Hennes.insertTrData(self, 'tr', 'td', html);

            //关闭loading
            layer.closeAll('loading');

            //调用右键子菜单
            Hennes.rightMenu('.detail-view tbody tr', loadSubMenuData);
        });
    });

    //给table选中的行高亮（子行除外）
    $(document).on('click', '#info_list tr', function (e) {
        var $self = $(this);
        if (!$self.hasClass('detail-view')) {
            $self.hasClass('selected') ? $self.removeClass('selected') : $self.addClass('selected');
        }
    });
});