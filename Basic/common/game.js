var vGame = {
    res: resData,
    initNum: resData[0].initArr, // 初始值：体力，熟练度，技能点
    initTimer: [5, 5], // 采集和制作默认时间：5秒
    skillNum : 0, // 储存熟练度增长值
    VITNum: resData[0].initArr[0], // 储存体力增长值
    w: $('body').width(),
    homePage: '.home-page',
    preLoad: '.pre-load',
    materialArray: [], // 临时储存获取的材料
    materialData: [],  // 储存获取的材料
    eventClick: function () {
        var eventType = (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) ? 'touchend' : 'click';
        return eventType;
    },
    loadPage: function (page) {
        // 默认显示第一页
        vGame.initPage(page);

        // 音乐
        //vGame.appendMusic();

        // 页面切换
        $('.page-btn').on(vGame.eventClick(), function (e) {
            var $self = $(this), id = $self.data('page');
            // 加载页面
            vGame.initPage(id);

            // 执行页面动画
            vGame.pageSlide(id);

            e.preventDefault();
        });
    },
    initPage: function (id) {
        var data = vGame.res, $page = $('#' + id), html = '';
        switch (id) {
            case 'page1': // 地图页
                var mapData = data[0].map;
                html += ' <div class="page-wrap">'
                    + ' <div class="page-inner">';
                $.each(mapData, function (i, v) {
                    html += '<div class="game-map-item game-map-item' + (i + 1) + '">'
                        + '     <a class="game-map-btn game-map-btn' + (i + 1) + '" data-name="' + v.name + '" data-face="' + v.large + '">' + v.name + '</a>'
                        + ' </div>';
                });
                html += '   </div>'
                    + '</div>';

                $page.empty().append(html);

                // 移除preLoad
                $(vGame.preLoad).remove();
                // 移除homePage
                $(vGame.homePage).remove();

                // 点击对应地图显示对应数据
                var vitTimer;
                $(document).on('click', '.game-map-btn', function (e) {
                    e.preventDefault();
                    $('body').addClass('no-scroll');
                    $('.monster-wrap').remove();
                    vGame.getMonsterList(this, mapData);

                    var $vitProgress = $('body').find('.VIT-progess'), VIT = parseInt($vitProgress.data('total')), currNum = parseInt($vitProgress.data('num'));
                    var stepNum = 1,  // 每采集一次减少的体力值
                        vitPerTime = 10; // 体力恢复时间为10秒

                    /* 体力值计算 */
                    var Vitality = function(vitPerTime) {
                        vitTimer = setInterval(function () {
                            currNum += 1;
                            // 如果当前体力小于等于总体力值
                            if(currNum <= VIT){
                                var percent = (currNum / VIT).toFixed(4) * 100;
                                $vitProgress.attr('data-num', currNum);
                                vGame.VITNum = currNum; // 更新储存的体力增长值
                                $vitProgress.animate({width: percent + '%'}, 'fast');
                            }else{
                                clearInterval(vitTimer);
                            }
                        }, vitPerTime * 1000);
                    };

                    // 调用体力值计算
                    Vitality(vitPerTime);

                    // 取消“采集”绑定
                    $(document).off(vGame.eventClick(), '.monster-gather');

                    // 点击“采集”时清除体力值计算，5秒采集结束后再计算
                    $(document).on(vGame.eventClick(), '.monster-gather', function (e) {
                        e.preventDefault();
                        var _this = this, $self = $(_this), $progress = $self.prev().find('.eq-item-progress-in');
                        $self.addClass('disabled').attr('disabled', true);

                        // 体力减少一点
                        currNum -= stepNum;
                        if(currNum >= 0) {
                            $vitProgress.attr('data-num', currNum);
                            vGame.VITNum = currNum; // 更新储存的体力增长值
                            //console.log(currNum);

                            // 采集速度5秒
                            $progress.animate({width: '100%'}, vGame.initTimer[0] * 1000, function () {
                                $progress.css('width', 0);
                                $self.removeClass('disabled').removeAttr('disabled');

                                // 体力进度条
                                var percent = (currNum / VIT).toFixed(4) * 100;
                                $vitProgress.css('width', percent + '%');

                                // 获取材料相关数据
                                vGame.getMaterial(_this);
                            });
                        }else{
                            layer.open({
                                content: '体力不足，休息一下吧！',
                                skin: 'msg',
                                time: 3
                            });
                            $self.removeClass('disabled').removeAttr('disabled');
                            return false;
                        }
                    });
                });

                // 返回
                $(document).on(vGame.eventClick(), '.back-index', function (e) {
                    e.preventDefault();
                    clearInterval(vitTimer);
                    $('body').removeAttr('class');
                    $('.monster-wrap').animate({left: vGame.w, opacity: 0}, 'fast', function () {
                        $('.monster-wrap').remove();
                    });

                    // 取消“采集”绑定
                    $(document).off(vGame.eventClick(), '.monster-gather');
                });
                vGame.pageSlide('page1');
                break;
            case 'page2': // 装备页
                var equipment = data[0].equipment;
                var skStep = vGame.skillNum, skNum = vGame.initNum[1], rate = (skStep / skNum) * 100;
                html += ' <div class="page-wrap">'
                    + '     <div class="page-inner">'
                    + '     <div class="eq-total">'
                    + '         <div class="eq-total-zb">'
                    + '             <span class="eq-total-name">技能点</span><b>'+ vGame.initNum[2] +'</b>'
                    + '         </div>'
                    + '         <div class="eq-total-step"><span>熟练度</span>'
                    + '              <div class="eq-item-progress-out">'
                    + '                 <div class="eq-item-progress-in" style="width:'+ rate +'%" data-num="'+ skStep +'" data-total="'+ skNum +'"></div>'
                    + '              </div>'
                    + '         </div>'
                    + '     </div>'
                    + '     <div class="eq-wrap">'
                    + '         <div class="eq-tab">'
                    + '             <span class="eq-tab-item eq-tab-item0 active" data-id="eq_category0" data-category="全部">全部</span>';
                    $.each(equipment, function (iCate, vCate) {
                        html += '   <span class="eq-tab-item eq-tab-item'+ (iCate + 1) +'" data-id="eq_category'+ (iCate + 1) +'" data-category="'+ vCate.category +'">'+ vCate.category +'</span>';
                    });
                    html += '   </div>'
                        + '     <div class="eq-list">'
                        + '         <div class="eq-inner" id="eq_category0"></div>';
                        $.each(equipment, function (iList, vList) {
                            html += '   <div class="eq-inner none" id="eq_category' + (iList + 1) + '"></div>';
                        });
                    html += '   </div>';

                html += '       </div>'
                    + '     </div>'
                    + '</div>';

                $page.empty().append(html);

                // 判断数组都>=0
                function checkEveryOne(currentValue, index, array) {
                    return currentValue >= 0;
                }

                // 材料不足时调用
                function deficiency() {
                    layer.open({
                        content: '材料不足',
                        skin: 'msg',
                        time: 1.5
                    });
                    return false;
                }

                // 加载第一个栏目数据
                vGame.getEqCategory(equipment, 'eq_category0');

                // 取消“制作”绑定
                $(document).off(vGame.eventClick(), '.eq-make-btn');

                // 制作
                $(document).on(vGame.eventClick(), '.eq-make-btn', function (e) {
                    e.preventDefault();
                    var _this = this, $self = $(_this),
                        category = $self.data('category'),
                        parts = $self.data('parts'),
                        $parents = $self.parents('.eq-item'),
                        $prev = $self.prev('.eq-item-info'),
                        $mItem = $prev.find('.eq-item-material-item'),
                        $skPoint = $('.eq-total-zb').find('b'),
                        $eqPart = $parents.find('.eq-part-num'),
                        $mastery = $('.eq-total-step').find('.eq-item-progress-in'),
                        pg2Num = parseInt($eqPart.text()),
                        skPoint = parseInt($skPoint.text()),
                        masteryNum = parseInt($mastery.attr('data-num')),
                        masteryTotal = parseInt($mastery.attr('data-total')),
                        mName = '', mStr = '[';

                    var oldData = vGame.materialData, //原始材料库(即地图中获取的材料)
                        oldLen = oldData.length;

                    // 获取全部材料名
                    $mItem.each(function (m) {
                        var mItemName = $mItem.eq(m).data('material'),
                            mItemTotal = parseInt($mItem.eq(m).find('.m-total').text());
                        mName += mItemName + ',';
                        mStr += '{"name":"'+ mItemName +'", "total":'+ mItemTotal +'},';
                    });
                    mName = mName.substring(0, mName.lastIndexOf(','));

                    mStr = mStr.substring(0, mStr.lastIndexOf(','));
                    mStr += ']';
                    //console.log('当前 ' + mStr);
                    var currData = JSON.parse(mStr); //当前材料库

                    // 检测原始材料库是否有材料
                    if(oldLen > 0){ // 有材料
                       if(oldLen >= currData.length){ //判断的原材料库中的种类>=当前材料库的种类
                           var newStr = '[';
                           for(var i = 0; i < currData.length; i ++){
                               $.each(oldData, function (iO, dO) {
                                   if(dO.name == currData[i].name){
                                       newStr += '{"name":"'+ dO.name +'", "total":'+ dO.num +'},';
                                   }
                               });
                           }
                           newStr = newStr.substring(0, newStr.lastIndexOf(','));
                           newStr += ']';
                           if(newStr != '' && newStr != ']') {
                               //console.log('新的 ' + newStr);
                               var newData = JSON.parse(newStr); //有当前材料的材料库

                               // 通过新材料库和当前材料库比较
                               // 最后用库中的数量 - 当前所需材料数量 >= 0，则表示可以制作
                               if(newData.length >= currData.length) {
                                   var numStr = '';
                                   for (var n = 0; n < currData.length; n++) {
                                       if (currData[n].name == newData[n].name) {
                                           var num = newData[n].total - currData[n].total;
                                           //console.log(num);
                                           numStr += num + ',';
                                       }
                                   }
                                   numStr = numStr.substring(0, numStr.lastIndexOf(','));
                                   var newNumArr = numStr.split(','), newIntArr = [];

                                   // 字符串数组转数字数组
                                   newNumArr.forEach(function(data, index, arr){
                                       newIntArr.push(data);
                                   });

                                   // 返回检测结果是否都为true
                                   var isReal = newIntArr.every(checkEveryOne);

                                   // 判断材料数量都为true，则进行相关交互计算
                                   if(isReal == true){
                                       $('.eq-make-btn').addClass('disabled').attr('disabled', true);
                                       vGame.progressLoading(vGame.initTimer[1], function () {
                                           // 当前装备 +1
                                           pg2Num += 1;
                                           //console.log('pg2Num: ' + pg2Num);
                                           $self.attr('data-num', pg2Num);
                                           $eqPart.removeClass('none').text(pg2Num);

                                           // 熟练度 +1
                                           masteryNum += 1;
                                           vGame.skillNum = masteryNum;
                                           //console.log('masteryNum: ' + masteryNum);
                                           var perNum = (masteryNum / masteryTotal).toFixed(4) * 100;
                                           $mastery.animate({width: perNum + '%'}, 'fast');
                                           $mastery.attr('data-num', masteryNum);

                                           // 如果熟练度 >= 10，则熟练度归0，技能点 +1
                                           if(masteryNum >= masteryTotal){
                                               $self.attr('data-num', 0);
                                               $mastery.attr('data-num', 0);
                                               vGame.skillNum = 0;
                                               $mastery.animate({width: '0%'}, 100);

                                               // 技能点 +1
                                               skPoint += 1;
                                               $skPoint.text(skPoint);
                                               resData[0].initArr[2] = skPoint; // 更新存储的技能点

                                               vGame.initTimer[1] -= 0.5; // 制作时间 -0.5s
                                               vGame.initTimer[0] -= 0.5; // 采集时间 -0.5s
                                               if(vGame.initTimer[1] <= 0) vGame.initTimer[1] = 0;
                                               if(vGame.initTimer[0] <= 0) vGame.initTimer[0] = 0;

                                               // 体力值 +10
                                               vGame.initNum[0] += 10;
                                               //console.log(vGame.initNum[0]);
                                           }

                                           // 如果技能点为0，则恢复默认5s制作或采集时间
                                           if(resData[0].initArr[2] == 0){
                                               vGame.initTimer[1] = 5;
                                               vGame.initTimer[0] = 5;
                                           }

                                           // 更新装备数据中装备num的数据
                                           var zbSum = 0;
                                           $.each(equipment, function (iQ, dQ) {
                                               if(dQ.category == category){
                                                   $.each(dQ.list, function (iQ2, dQ2) {
                                                       if(dQ2.name == parts){
                                                           dQ2.num = pg2Num;
                                                       }
                                                       zbSum += dQ2.num;
                                                   });
                                                   //console.log(zbSum);
                                                   dQ.num = zbSum;
                                               }

                                               // 更新成就中各装备（category）下的Lv值
                                               var amData = data[0].achievement;
                                               $.each(amData, function (iM, vM) {
                                                   if(dQ.category == vM.category){
                                                       vM.Lv = dQ.num;
                                                   }
                                               })
                                           });

                                           // 更新库存数据
                                           $.each(vGame.materialData, function (i, v) {
                                               if(mName.indexOf(v.name) > -1){
                                                   //console.log('库存已有：' + v.num + '个' + v.name);
                                                   $.each(currData, function (iM, vM) { // 当前材料数据
                                                       if(vM.name == v.name){
                                                           //console.log('此处需要：' + vM.total + '个' + vM.name);
                                                           $.each(equipment, function (iEq, vEq) {
                                                               if(vEq.category == category){
                                                                   $.each(vEq.list, function (iEq1, vEq1) {
                                                                       if(vEq1.name == parts){
                                                                           var newNum = v.num - vM.total;
                                                                           newNum = (newNum <= 0) ? 0 : newNum;
                                                                           vGame.materialData[i].num = newNum;

                                                                           // 获取材料在地图中的索引
                                                                           var currMap = vGame.res[0].map;
                                                                           $.each(currMap, function (n, o) {
                                                                               $.each(o.monster, function (n1, o1) {
                                                                                   var newMaterial = o1.material;
                                                                                   if(typeof newMaterial == "number"){
                                                                                       if(o1.name == vM.name) o.monster[n1].material = newNum;
                                                                                   }else{
                                                                                       $.each(newMaterial, function (n2, o2) {
                                                                                           if(o2.name == vM.name) newMaterial[n2].num = newNum;
                                                                                       })
                                                                                   }
                                                                               });
                                                                           });
                                                                       }
                                                                   });
                                                               }
                                                           });
                                                       }
                                                   });
                                               }
                                           });

                                           // 恢复按钮可点击
                                           $('.eq-make-btn').removeClass('disabled').removeAttr('disabled');

                                           layer.open({
                                               content: '成功制作' + pg2Num + '个<b style="color:#FFEA3E">' + parts + '</b>！',
                                               skin: 'msg',
                                               time: 1.8
                                           });
                                       });
                                   }else{
                                       deficiency();
                                   }
                               }else{
                                   deficiency();
                               }
                           }else{
                               deficiency();
                           }
                       }else{
                           deficiency();
                       }
                    }else{ // 无材料
                        deficiency();
                    }
                });

                // 当前tab切换
                $(document).on('click', '.eq-tab-item', function () {
                    var $self = $(this), id = $self.data('id'), category = $self.attr('data-category'), active = 'active', none = 'none';
                    $self.addClass(active).siblings().removeClass(active);
                    $('#' + id).removeClass(none).siblings().addClass(none);

                    // 加载对应栏目数据
                    if(category == '全部'){
                        vGame.getEqCategory(equipment, id);
                    }else {
                        vGame.getEqCategory(equipment, id, category);
                    }
                });

                $('.page-item2').find('.eq-total-zb').find('b').text(vGame.initNum[2]);
                vGame.pageSlide('page2');

                break;
            case 'page3': // 技能页
                if($page.html().trim() == '') {
                    var skills = data[0].skills;
                    html += ' <div class="page-wrap">'
                        + '     <div class="page-inner">'
                        + '     <div class="eq-total">'
                        + '         <div class="eq-total-sk">'
                        + '             <span class="eq-total-name">技能点</span><b>'+ vGame.initNum[2] +'</b>'
                        + '         </div>'
                        + '     </div>'
                        + '     <div class="eq-wrap">'
                        + '         <div class="eq-list">'
                        + '             <div class="eq-inner">';
                        $.each(skills, function (i, v) {
                            html += '   <div class="eq-item sk-list-item">'
                                + '         <div class="eq-item-photo-bg">'
                                + '             <img src="'+ v.face +'" alt="'+ v.name +'" class="eq-item-photo">'
                                + '         </div>'
                                + '         <div class="eq-item-info">'
                                + '             <h3 class="eq-item-tle">'
                                + '                 <span class="eq-tleclase ellipsis"> '+ v.name +'</span>'
                                + '                 <span class="lv-total"><b class="a-lv">'+ v.Lv +'</b>级/<b class="b-total">'+ v.total +'</b>级</span>'
                                + '             </h3>'
                                /*+ '             <div class="eq-item-progress">'
                                + '                 <div class="eq-item-progress-out"><div class="eq-item-progress-in" style="width:0%"></div></div>'
                                + '             </div>'*/
                                + '         </div>'
                                + '         <button type="button" class="sk-update-btn" data-vocation="'+ v.name +'">升级</button>'
                                + '     </div>';
                        });
                    html += '       </div></div></div>'
                        + '     </div>'
                        + '</div>';

                    $page.empty().append(html);

                    // 升级
                    $(document).on(vGame.eventClick(), '.sk-update-btn', function (e) {
                        var $self = $(this),
                            vocation = $self.data('vocation'),
                            $skPoint = $('.page-item3').find('.eq-total-sk').find('b'),
                            $prev = $self.prev('.eq-item-info'),
                            $lv = $prev.find('.a-lv'),
                            $total = $prev.find('.b-total'),
                            skPoint = parseInt($skPoint.text()),
                            lv = parseInt($lv.text()),
                            total = parseInt($total.text());

                        if(skPoint > 0) {
                            $.each(skills, function (i, v) {
                                var $parents = $self.parents('.sk-list-item'),
                                    $siblings = $parents.siblings(),
                                    $siblingBtn = $siblings.not('.sk-ok').find('.sk-update-btn');

                                if (v.name == vocation) {
                                    // 技能点 -1
                                    skPoint -= 1;
                                    skPoint = (skPoint <= 0) ? 0 : skPoint;

                                    lv += 1; // 当前技能升级 +1

                                    //禁止其它按钮点击
                                    $siblingBtn.addClass('disabled').attr('disabled', true);

                                    // 5s后执行效果
                                    vGame.progressLoading(5, function () {
                                        //恢复其它按钮点击
                                        $siblingBtn.removeClass('disabled').removeAttr('disabled');

                                        $lv.text(lv);
                                        $skPoint.text(skPoint);
                                        v.Lv = lv; // 更新当前升级数据
                                        resData[0].initArr[2] = skPoint; // 更新存储的技能点
                                        /*
                                        * 如果当前升级数>=总级数，
                                        * 则升级数=总级数，升级完成
                                        */
                                        if (lv >= total) { //
                                            lv = total;
                                            v.Lv = lv;
                                            layer.open({
                                                content: vocation + '已经升级完成',
                                                skin: 'msg',
                                                time: 3
                                            });
                                            $self.addClass('disabled').attr('disabled', true);
                                            $parents.addClass('sk-ok'); // 添加升级完成标志
                                            return false;
                                        }
                                    });
                                }
                            });
                        }else {
                            layer.open({
                                content: '技能点不足',
                                skin: 'msg',
                                time: 2
                            });
                        }
                        e.preventDefault();
                    });
                }else{
                    $('.page-item3').find('.eq-total-sk').find('b').text(vGame.initNum[2]);
                    vGame.pageSlide('page3');
                }
                break;
            case 'page4': // 成就页
                var achievement = data[0].achievement;
                html += ' <div class="page-wrap">'
                    + '     <div class="page-inner">'
                    + '     <div class="eq-total"></div>'
                    + '     <div class="eq-wrap">'
                    + '         <div class="eq-list">'
                    + '             <div class="eq-inner">';
                    $.each(achievement, function (i, v) {
                        html += '   <div class="eq-item">'
                            + '         <div class="eq-item-photo-bg">'
                            + '             <img src="'+ v.face +'" alt="'+ v.category +'级别" class="eq-item-photo">'
                            + '         </div>';
                            $.each(v.grade, function (i1, v1) {
                                var iLv = v.Lv, i1Total = v1.total;
                                var gradeProgress = (iLv/i1Total).toFixed(4)*100;
                                html += '<div class="eq-item-info am-grade-item am-grade-'+ (i + 1) +'-'+ (i1 + 1) +' none">'
                                    + '     <h3 class="eq-item-tle">'+ v1.name +'</h3>'
                                    + '     <div class="eq-item-progress">'
                                    + '        <div class="eq-item-progress-total"><i>'+ iLv +'</i> / <b>'+ i1Total +'</b></div>'
                                    + '        <div class="eq-item-progress-out"><div class="eq-item-progress-in" style="width: '+ gradeProgress +'%"></div></div>'
                                    + '     </div>'
                                    + ' </div>';
                            });
                        html += '   </div>';
                    });
                html += '       </div></div></div>'
                    + '     </div>'
                    + '</div>';

                $page.empty().append(html);

                // 显示对应的级别
                vGame.gradeShow(achievement);

                vGame.pageSlide('page4');
                break;
        }
    },
    getMonsterList: function (e, data) {
        var $self = $(e), mapName = $self.data('name'), mapImg = $self.data('face'), monsterHtml = '';
        var VITStep = vGame.VITNum, VITTotal = vGame.initNum[0], VITRate = (VITStep / VITTotal).toFixed(4) * 100;

        monsterHtml += '<div class="monster-wrap" style="background-image: url('+ mapImg +'); left: '+ vGame.w +'px; opacity: 0">'
            + '<div class="monster-inner">'
            + '     <div class="monster-VIT">'
            + '         <div class="VIT-progess-name">体力</div>'
            + '         <div class="VIT-progess-con">'
            + '             <div class="VIT-progess" style="width:'+ VITRate +'%" data-num="'+ VITStep +'" data-total="'+ VITTotal +'"></div>'
            + '         </div>'
            + '     </div>'
            + '     <div class="monster-list">';
        $.each(data, function (i, v) {
            if(mapName == v.name) {
                $.each(v.monster, function (i2, v2) {
                    var material = v2.material;
                    monsterHtml += '<div class="monster-item">'
                        + '     <div class="monster-item-img">'
                        + '         <img src="' + v2.face + '" class="monster-item-face">'
                        + '     </div>'
                        + '     <div class="monster-item-wrap">'
                        + '         <div class="monster-item-inner">';
                    if(typeof material == "number"){
                        monsterHtml += '    <h3 class="monster-item-tle ellipsis zero-m-top">' + v2.name + '<b class="num-item" data-name="' + v2.name + '">'+ material +'</b></h3>';
                    }else{
                        monsterHtml += '    <h3 class="monster-item-tle ellipsis">' + v2.name + '</h3>'
                            + '<div class="monster-item-info">';
                        $.each(material, function(i3, v3){
                            monsterHtml += ' <p class="monster-item-p">'+ v3.name +'<b class="num-item" data-name="' + v3.name + '">'+ v3.num +'</b></p>';
                        });
                        monsterHtml += '</div>';

                    }

                    monsterHtml += '    </div>'
                        + '     <div class="monster-step"><div class="eq-item-progress-in" style="width:0%"></div></div>'
                        + '     <button type="button" class="monster-gather" data-monster="'+ v2.name +'" data-map="'+ v.name +'">采集</button>'
                        + '     </div>'
                        + '</div>';
                });
            }
        });
        monsterHtml += '</div>'
            + '         <button class="back-index">返回</button>'
            + '     </div>'
            + ' </div>';

        $(monsterHtml).appendTo($('body'));
        $('.monster-wrap').animate({left: 0, opacity: 1}, 'fast');
    },
    /* 获取材料相关数据 */
    getMaterial: function (e) {
        var mapName = $(e).data('map'),
            monster = $(e).data('monster'),
            $item = $(e).parent().find('.monster-item-inner').find('.num-item'),
            len = $item.length,
            numArray = [0, 1, 1];
        for(var i = 0; i < len; i++){
            var $itemNum = $item.eq(i),
                materialNum = parseInt($itemNum.text()), // 材料当前个数
                materialName = $itemNum.data('name'), // 当前材料名
                newNumArray = vGame.getRandomArrayElements(numArray, 3),
                randomNum = newNumArray[Math.floor(len * Math.random())];
            //console.log(randomNum);
            materialNum += randomNum; // 当前怪物下的材料+1
            $itemNum.text(materialNum);

            // 更新材料个数
            var mapData = vGame.res[0].map;
            $.each(mapData, function (n, p) {
                if(p.name == mapName){
                    $.each(p.monster, function (n1, p1) {
                        if(p1.name == monster){
                            if(typeof p1.material == "number"){
                                p1.material = materialNum;
                            }else {
                                $.each(p1.material, function (n2, p2) {
                                    if (p2.name == materialName) {
                                        p2.num = materialNum;
                                    }
                                });
                            }
                        }
                    });
                }
            });

            var materialStr = '{"'+ materialName +'":'+ materialNum +'}';
            vGame.materialArray.push(JSON.parse(materialStr));
        }

        var newMaterialData = vGame.multiArray(vGame.materialArray);
        vGame.materialData = newMaterialData;
        //console.log(vGame.materialData);
    },
    /* 按装备栏目加载其下数据 */
    getEqList: function (itemData) {
        var listHtml = '';
        $.each(itemData.list, function (i, v) {
            var isNone = (v.num == 0) ? 'none' : '';
            listHtml += '   <div class="eq-item">'
                + '         <div class="eq-item-photo-bg">'
                + '             <img src="'+ v.face +'" alt="'+ v.name +'" class="eq-item-photo">'
                + '             <div class="eq-part-num '+ isNone +'">'+ v.num +'</div>'
                + '         </div>'
                + '         <div class="eq-item-info">'
                + '             <h3 class="eq-item-tle" data-num="'+ v.num +'">'+ v.name +'</h3>'
                + '             <div class="eq-item-tx">'
                + '                 <span class="eq-item-m-name">材料：</span>'
                + '                 <div class="eq-item-material">';
            $.each(v.material, function (i2, v2) {
                listHtml += '           <p class="eq-item-material-item" data-material="'+ v2.name +'">'+ v2.name +' <b class="m-total">'+ v2.total +'</b></p>';
            });
            listHtml += '                 </div>'
                + '             </div>'
                + '         </div>'
                + '         <button type="button" class="eq-make-btn" data-category="'+ itemData.category +'" data-parts="'+ v.name +'">制作</button>'
                + '     </div>';
        });

        return listHtml;
    },
    /* 按需加载装备栏目 */
    getEqCategory: function (data, id, sType) {
        var $item = $('#' + id), eqHtml = '';
        $.each(data, function (iList, vList) {
            if(sType == vList.category) eqHtml += vGame.getEqList(vList);
            if(sType == undefined) eqHtml += vGame.getEqList(vList);
        });
        $item.empty().append(eqHtml);

        // 滚动到顶部
        $item.parent().animate({scrollTop: 0}, 200);
    },
    /* 页面切换动画 */
    pageSlide: function (id) {
        var $page = $('#' + id), active = 'active', none = 'none';
        $page.removeClass(none).animate({left: 0}, 'fast');
        var $siblings = $page.siblings().not('.none'), $btn = $('.page-btn[data-page="'+ id +'"]');
        $siblings.animate({left: -vGame.w}, 'fast', function () {
            $siblings.addClass(none);
        });
        $btn.addClass(active);
        if($btn.siblings().hasClass(active)) $btn.siblings().removeClass(active);
    },
    progressLoading: function (t, callback) {
        var loadHtml = '<div class="m-loading-layer"><div class="m-loading-layer-inner"><div class="m-loading" style="width:0%"></div></div></div>';
        $('body').append(loadHtml);

        var $loader = $('.m-loading-layer'), $loading = $('.m-loading');
        if($loader.length > 0) {
            $loading.animate({width: '100%'}, t * 1000, function () {
                if (typeof callback == "function") {
                    callback();
                }
                $loader.remove();
            });
        }
    },
    /* 显示对应的级别 */
    gradeShow: function (data) {
        $('.am-grade-item').addClass('none');
        $.each(data, function (iAM, vAM) {
            var prefix = '.am-grade-', none = 'none', b2 = 'border2', b3 = 'border3', b4 = 'border4';
            if(vAM.Lv <= 5) $(prefix + (iAM + 1) + '-' + 1).removeClass(none);
            if(vAM.Lv > 5 && vAM.Lv <= 20){
                var $mid = $(prefix + (iAM + 1) + '-' + 2);
                $mid.removeClass(none);
                $mid.parent().find('.eq-item-photo-bg').removeClass(b2).addClass(b2);
            }
            if(vAM.Lv > 20 && vAM.Lv <= 50){
                var $gao = $(prefix + (iAM + 1) + '-' + 3);
                $gao.removeClass(none);
                $gao.parent().find('.eq-item-photo-bg').removeClass(b3).addClass(b3);
            }
            if(vAM.Lv > 50 && vAM.Lv <= 100){
                var $good = $(prefix + (iAM + 1) + '-' + 4);
                $good.removeClass(none);
                $good.parent().find('.eq-item-photo-bg').removeClass(b4).addClass(b4);
            }
        });
    },
    /* 从数组中随机取count条数据 */
    getRandomArrayElements: function(arr, count) {
        var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    },
    /* 得到多维数组中相同键的值 */
    multiArray: function (arr) {
        var obj = {};
        var newArray = new Array();
        for (var i = 0; i < arr.length; i++) {
            for (var j in arr[i]) {
                obj[j] = Number(arr[i][j]);
            }
        }

        for (var i in obj) {
            newArray.push(eval("({'name':'" + i + "','num':"+ obj[i] +"})"));
        }

        return newArray;
    },
    autoPlayMusic: function () {
        // 自动播放音乐效果，解决浏览器或者APP自动播放问题
        function musicInBrowserHandler() {
            vGame.musicPlay(true);
            document.body.removeEventListener('touchstart', musicInBrowserHandler);
        }
        document.body.addEventListener('touchstart', musicInBrowserHandler);

        // 自动播放音乐效果，解决微信自动播放问题
        function musicInWeixinHandler() {
            vGame.musicPlay(true);
            document.addEventListener("WeixinJSBridgeReady", function () {
                vGame.musicPlay(true);
            }, false);
            document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
        }
        document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
    },
    musicPlay: function (isPlay) {
        var audio = document.getElementById('musicId');
        if (isPlay && audio.paused) {
            audio.play();
        }
        if (!isPlay && !audio.paused) {
            audio.pause();
        }
    },
    appendMusic: function () {
        var $music = $('.music-info');
        var musicHtml = '<div class="music-info"><audio id="musicId" src="./music/m_01.mp3" preload="preload" autoplay="autoplay" loop="loop">您的浏览器不支持 audio标签。</audio><div class="m-ctrl m-play"></div></div>';
        if($music.length < 1) $('body').append(musicHtml);

        vGame.autoPlayMusic();
        $(document).on(vGame.eventClick(), '.m-ctrl', function (e) {
            e.preventDefault();
            var $self = $(this), stop = 'm-stop', play = 'm-play';
            if($self.hasClass(play)){
                $self.removeClass(play).addClass(stop);
                vGame.musicPlay(false);
            }else{
                $self.removeClass(stop).addClass(play);
                vGame.musicPlay(true);
            }
        });
    }
};