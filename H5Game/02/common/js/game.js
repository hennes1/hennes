var moGame = {
    res: resData,
    initBlood: resData[0].initBlood,
    blood: 0, // 存储怪物血量
    monsterFirst: 0,
    fewWave: 1,
    preLoad: '.pre-load',
    eventClick: function () {
        var eventType = (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) ? 'touchend' : 'click';
        return eventType;
    },
    swiperCase: ['equipmentSwiper', 'eqSwiper', 'skSwiper'],
    equipmentData: resData[0].equipment.slice(0), // 复制一分装备数据
    CopyMonster: resData[0].monster.slice(0),     // 复制一分怪物数据
    skillData : [], // 存储可以升级的技能
    swiperBasic: function (ele, space, perNum) {
        var config = {};
        if(space == undefined && perNum == undefined){
            config = {
                pagination: { el: ele}
            };
        }else {
            config = {
                slidesPerView: perNum,
                spaceBetween: space,
                freeMode: true,
                pagination: { el: ele}
            };
        }
        return config;
    },
    startPage: function () {
        var $gameStart = $('.game-profession');
        if($gameStart.html().trim() == '') {
            var data = moGame.res;
            var html = '';

            $.each(data[0].occupation, function (i, v) {
                html += '   <div class="swiper-slide game-profession-item" data-title="' + v.title + '">'
                    + '          <div class="profession-img" style="background-image: url(' + v.src + ')" data-small="' + v.face + '"><div class="profession-tle">' + v.title + '</div></div>'
                    + '      </div>';
            });

            // 追加数据
            moGame.createSwiper('.game-profession', 'game-profession-scroll', 'pg1', html);
        }

        // 移除loading
        $(moGame.preLoad).remove();

        // 调用Swiper
        moGame.swiperCase[0] = new Swiper('.game-profession-scroll', moGame.swiperBasic('.pg1'));

        // 点击单个职业时弹出对应面板信息
        $(document).on('click', '.game-profession-item', function (e) {
            e.preventDefault();
            moGame.showOccupationPanel(this);
        });

    },
    /* 显示职业信息详情面板 */
    showOccupationPanel: function (e) {
        var data = moGame.res,
            $self = $(e),
            title = $self.data('title'),
            skillHtml = '';

        $.each(data[0].occupation, function (i, v) {
            if(v.title == title){
                skillHtml +='   <div class="occupation-wrap">'
                    +'      <div class="occupation-hd">'
                    +'          <img src="'+ v.face +'" alt="'+ title +'" class="occupation-face">'
                    +'          <h3 class="occupation-title">'+ title +'</h3>'
                    +'          <div class="occupation-info">'+ v.description +'</div>'
                    +'      </div>'
                    +'      <h5 class="occupation-sk-tle">勇者初始技能</h5>'
                    +'      <div class="occupation-bd">';

                    $.each(v.skills, function (n, d) {
                        skillHtml +='   <div class="occupation-item">'
                            +'      <img src="'+ d.face +'" alt="'+ d.name +'" class="occupation-img">'
                            +'      <p>'+ d.name +'</p>'
                            +'  </div>';
                    });

                skillHtml +='   </div>'
                    +'          <div class="occupation-ctrl">'
                    +'              <button class="layer-btn ok-btn" data-name="'+ title +'">确认出战</button><button class="layer-btn cancel-btn">取消</button>'
                    +'          </div>'
                    +'      </div>';
            }
        });

        // 加载数据显示弹层
        moGame.layerPanel('occupation-layer', skillHtml);

        // 确认出战
        $(document).on(moGame.eventClick(), '.ok-btn', function (e) {
            e.preventDefault();
            moGame.killMonster(this);
        });

        // 取消
        $(document).on(moGame.eventClick(), '.cancel-btn', function (e) {
            e.preventDefault();
            $('.layer-panel').remove();
        });

    },
    /* 杀怪 */
    killMonster: function (e) {
        var data = moGame.res,
            $self = $(e),
            $page1 = $('#page1'),
            $page2 = $('#page2'),
            name = $self.data('name');

        // 关闭page1，显示page2
        $page1.addClass('none');
        $page2.removeClass('none');

        // 音乐
        moGame.appendMusic();

        // 移除弹层面板
        $('.layer-panel').remove();

        /* 生成装备栏 */
        moGame.createColumn('equipment');

        /* 生成技能栏 */
        moGame.createColumn();

        // 读取初始技能
        var o = '[';
        $.each(data[0].occupation, function (i, v) {
            if (v.title == name) {
                $.each(v.skills, function (n, d) {
                    var $skItem = $('.sk-item-'+ (n + 1) +'');
                    var $imgCon = $skItem.find('.swiper-sk-face-cont');
                    $imgCon.html('<img src="'+ d.face +'" alt="'+ d.name +'">');
                    $skItem.find('.swiper-sk-name').text(d.name);
                    $skItem.find('.swiper-sk-level').html('Lv：<b>1</b>');
                    $skItem.attr('data-holder', d.name).attr('data-type', 'sk');
                    $.each(moGame.res[0].skills, function (i1, v1) {
                        if(v1.name == d.name){
                            o += JSON.stringify(moGame.res[0].skills[i1]) + ',';
                        }
                    });
                });
            }
        });
        o = o.substring(0, o.lastIndexOf(','));
        o += ']';
        moGame.skillData = JSON.parse(o);

        // 加载怪物
        moGame.ctrlMonster(name);

        // 点击“技能”或“装备时”显示其详细信息面板
        $(document).on('click', 'div[data-holder]', function (e) {
            e.preventDefault();
            var eqData = data[0].equipment, skData = data[0].skills, $self = $(this), holder = $self.data('holder'), sType = $self.data('type'), html ='';
            if(sType == 'eq'){
                html += moGame.getSkillEqHtml('装备', holder, eqData);
                moGame.layerPanel('layer-detail-panel', html);
            }else{
                html += moGame.getSkillEqHtml('技能', holder, skData);
                moGame.layerPanel('layer-detail-panel', html);
            }
        });

        // 关闭信息面板
        $(document).on(moGame.eventClick(), '.layer-close', function (e) {
            e.preventDefault();
            $('.layer-detail-panel').remove();
        });

        // 攻击数面板
        $('.kill-info-ctrl').on('click', function () {
            var $self = $(this), $killInfo = $('.kill-info');
            if($killInfo.is(':hidden')){
                $self.addClass('down');
                $killInfo.show().animate({ height: '2.4rem'});
            }else{
                $killInfo.animate({ height: 0}, function () {
                    $killInfo.hide();
                    $self.removeClass('down');
                });
            }
        });
    },
    ctrlMonster: function (val) {
        var mHtml = '',
            monsterData = moGame.res[0].monster[moGame.monsterFirst],
            mtBlood = moGame.blood > 0 ? moGame.blood : moGame.initBlood,
            fewWave = (moGame.fewWave > 1) ? moGame.fewWave : '',
            bodyHgt = $('body').height(),
            topHeight = parseInt($('.game-equipment').outerHeight());

        mHtml += '<div class="game-monster-inner">'
            + '  <div class="game-monster-progress">'
            + '      <div class="game-monster-progress-inner">'
            + '          <div class="game-monster-progress-in" style="width: 100%" data-total="' + mtBlood + '" data-num="' + mtBlood + '"></div>'
            + '      </div>'
            + '      <div class="game-monster-name">' + monsterData.name + fewWave + '</div>'
            + '  </div>'
            + '  <div class="game-monster-photo">'
            + '      <img src="' + monsterData.src + '" alt="">'
            + '  </div>'
            + ' </div>';

        var mHgt = bodyHgt - 3 - topHeight * 2;
        $('.game-monster').css('height', mHgt).empty().append(mHtml);

        var $mPhoto = $('.game-monster-photo'), $img = $mPhoto.find('img');
        $mPhoto.css({height: mHgt, marginTop: -mHgt/2, lineHeight: mHgt + 'px'});
        $img.addClass('scale');

        setTimeout(function () {
            $img.removeClass('scale');
        }, 300);

        // 读取技能攻击属性，以便掉血计算
        moGame.getAttackAttributes(val);
    },
    /* 生成装备或技能栏 */
    createColumn: function (colType) {
        var colSmlType, colLongType, colTypeHtml, title;
        if(colType == 'equipment'){
            title = '装备';
            colSmlType = 'eq';
            colLongType = 'equipment';
            colTypeHtml = '<div class="swiper-eq-face-cont"></div>';
        }else{
            title = '技能';
            colSmlType = 'sk';
            colLongType = 'skill';
            colTypeHtml = '<div class="swiper-sk-face-cont"></div><em class="swiper-sk-level"></em><span class="swiper-sk-name"></span>';
        }

        var colNum = 7, colHtml = '';
        colHtml += '<div class="'+ colLongType +'-title">'+ title +'</div>'
            +'<div class="'+ colLongType +'-list">'
            +'  <div class="swiper-main">'
            +'      <div class="swiper-container swiper-'+ colSmlType +'-scroll">'
            +'          <div class="swiper-wrapper">';
        for(var n = 0; n < colNum; n++) {
            colHtml += '<div class="swiper-slide swiper-'+ colSmlType +'-item '+ colSmlType +'-item-'+ (n + 1) +'">'+ colTypeHtml +'</div>';
        }
        colHtml +='     </div>'
            +'          <div class="swiper-pagination swiper-'+ colSmlType +'-page"></div>'
            +'      </div>'
            +'  </div>'
            +'</div>';

        // 添加到技能处
        $('.game-'+ colLongType).empty().append(colHtml);

        //执行Swiper
        if(colType == 'equipment'){
            moGame.swiperCase[1] = new Swiper('.swiper-eq-scroll', moGame.swiperBasic('.swiper-eq-page', 20, 3.6));
        }else{
            moGame.swiperCase[2] = new Swiper('.swiper-sk-scroll', moGame.swiperBasic('.swiper-sk-page', 20, 3.6));
        }
    },
    /* 弹层选择获取装备 */
    getEquipment: function (monster) {
        var eqData = moGame.equipmentData, SEPanel = 'sk-eq-panel';

        // 随机取3条数据
        var itemData = moGame.getRandomArrayElements(eqData, 3);

        var eqHtml = '', $eqScl = $('.swiper-eq-scroll').find('.swiper-eq-face-cont');

        eqHtml +=' <div class="sk-eq-ctrl">'
            +'  <h5 class="sk-eq-type">选择你想要获得的神器</h5>'
            +'  <div class="sk-eq-inner">';
        $.each(itemData, function (i, v) {
            var des = v.des.replace(/,/g, '<br />');
            eqHtml +=' <div class="sk-eq-item">'
                + '         <h3 class="sk-eq-tle">'+ v.name +'</h3>'
                + '         <img src="'+ v.src +'" alt="'+ v.name +'">'
                + '         <div class="sk-eq-des">'+ des +'</div>'
                + '         <button class="sk-eq-btn sk-check-btn" data-role="'+ v.name +'">选择</button>'
                + '     </div>';
        });
        eqHtml +=' </div>'
            +' </div>';

        moGame.layerPanel(SEPanel, eqHtml);

        // 点击”选择“
        $(document).on(moGame.eventClick(), '.sk-check-btn', function (event) {
            event.preventDefault();
            var $self = $(this), role = $self.data('role'), img = $self.parent().find('img').attr('src');

            // 从数据中删除已装备的装备
            $.each(eqData, function (i, v) {
                if(eqData[i].name == role){
                    eqData.splice(i, 1);
                    return false;
                }
            });

            for(var i = 0; i < $eqScl.length; i++){
                var $item = $eqScl.eq(i);
                if($item.html().trim() == ''){
                    var imgHtml = '<img src="'+ img +'" alt="'+ role +'">';
                    var nameHtml = '<span class="swiper-eq-name">'+ role +'</span>';
                    $item.html(imgHtml);
                    $item.after(nameHtml);
                    $item.parent().attr('data-holder', role).attr('data-type', 'eq');

                    // 滚动到当前添加的位置
                    moGame.swiperCase[1].slideTo(i);

                    // 取消按钮绑定
                    $(document).off(moGame.eventClick(), '.sk-check-btn');

                    // 跳出循环
                    break;
                }
            }

            // 移除弹层
            $('.' + SEPanel).remove();

            // 杀下一怪
            setTimeout(function () {
                moGame.ctrlMonster(monster);
            }, 200);
        });
    },
    /* 弹层学习或升级技术 */
    getSkill: function (monster) {
        var skData = moGame.res[0].skills, SEPanel = 'sk-eq-panel', skHtml = '', currRoleName = '',
            $sk = $('.swiper-sk-scroll'), $skScl = $sk.find('.swiper-sk-face-cont'), skImgLen = $sk.find('img').length;

        if(skImgLen >= 7) skData = moGame.skillData;

        // 随机取3条数据
        var itemData = moGame.getRandomArrayElements(skData, 3);

        for(var i = 0; i < $skScl.length; i++){
            var $item = $skScl.eq(i);
            if($item.html().trim() != ''){
                currRoleName += $item.find('img').attr('alt') + ',';
            }
        }
        currRoleName = currRoleName.substring(0, currRoleName.lastIndexOf(','));

        skHtml +=' <div class="sk-eq-ctrl">'
            +'  <h5 class="sk-eq-type">选择你想要学习的技能</h5>'
            +'  <div class="sk-eq-inner">';
        $.each(itemData, function (i, v) {
            var des = v.des.replace(/,/g, '<br />');
            var btnHtml = (currRoleName.indexOf(v.name) > -1) ? '<button class="sk-eq-btn sk-update-btn" data-role="'+ v.name +'" data-type="update">升级</button>' : '<button class="sk-eq-btn sk-study-btn" data-role="'+ v.name +'" data-type="study">学习</button>';

            skHtml +=' <div class="sk-eq-item">'
                + '         <h3 class="sk-eq-tle">'+ v.name +'</h3>'
                + '         <img src="'+ v.src +'" alt="'+ v.name +'" class="lay-sk-face">'
                + '         <div class="sk-eq-des">'+ des +'</div>'
                + '         '+ btnHtml +''
                + '     </div>';
        });
        skHtml +=' </div>'
            +' </div>';

        moGame.layerPanel(SEPanel, skHtml);

        // 点击“升级”|"学习"
        $(document).on(moGame.eventClick(), 'button[data-type]', function (event) {
            event.preventDefault();
            var $self = $(this), role = $self.data('role'), evType = $self.data('type'), img = $self.parent().find('img').attr('src');

            for(var i = 0; i < $skScl.length; i++){
                var $item = $skScl.eq(i);
                if(evType == 'update') {
                    if ($item.html().trim() != '') {
                        var roleName = $item.find('img').attr('alt');
                        if (roleName == role) {
                            var $currLv = $item.next('.swiper-sk-level').find('b'), currNum = parseInt($currLv.text());
                            currNum += 1;
                            $currLv.text(currNum);

                            $.each(skData, function (i, v) {
                                if(roleName == skData[i].name){
                                    skData[i].Lv = currNum;
                                }
                            });

                            // 滚动到当前添加的位置
                            moGame.swiperCase[2].slideTo(i);

                            // 取消按钮绑定
                            $(document).off(moGame.eventClick(), 'button[data-type]');

                            // 跳出循环
                            break;
                        }
                    }
                }else{
                    if($item.html().trim() == ''){
                        var imgHtml = '<img src="'+ img +'" alt="'+ role +'">';
                        var nameHtml = '<em class="swiper-sk-level">Lv：<b>1</b></em><span class="swiper-sk-name">'+ role +'</span>';
                        $item.html(imgHtml);
                        $item.after(nameHtml);
                        $item.parent().attr('data-holder', role).attr('data-type', 'sk');

                        // 如果技能栏没有填满，则继续追加
                        if(skImgLen < 7) {
                            $.each(skData, function (i, v) {
                                if (skData[i].name == role) {
                                    moGame.skillData.push(skData[i]);
                                }
                            });
                        }

                        // 滚动到当前添加的位置
                        moGame.swiperCase[2].slideTo(i);

                        // 取消按钮绑定
                        $(document).off(moGame.eventClick(), 'button[data-type]');

                        // 跳出循环
                        break;
                    }
                }
            }

            // 移除弹层
            $('.' + SEPanel).remove();

            // 杀下一怪
            setTimeout(function () {
                moGame.ctrlMonster(monster);
            }, 200);
        });
    },
    /* 获取并计算所有攻击属性数据，并输出相关总数据，便于血量计算 */
    computeNum: function () {
        var skStr = '',
            eqStr = '',
            skData = moGame.res[0].skills,
            eqData = moGame.res[0].equipment,
            $skName = $('.swiper-sk-scroll').find('.swiper-sk-name'),
            $eqName = $('.swiper-eq-scroll').find('.swiper-eq-name'),
            EQJsonStr = '',
            SKJsonStr = '[';

        // 取装备名
        if($eqName.length > 0) {
            for (var i = 0; i < $eqName.length; i++) {
                var eqTx = $eqName.eq(i).text();
                if (eqTx != '') {
                    eqStr += $eqName.eq(i).text() + ',';
                }
            }
            eqStr = eqStr.substring(0, eqStr.lastIndexOf(','));
            //console.log(eqStr);

            // 取装备属性
            $.each(eqData, function (iQ, vQ) {
                //console.log(vQ.name);
                if (eqStr.indexOf(vQ.name) > -1) {
                    var qAttack = vQ.attack;
                    for (var iQ1 in qAttack) {
                        for (var key in qAttack[iQ1]) {
                            EQJsonStr += '{"' + key + '":"' + qAttack[iQ1][key] + '"}' + ',';
                        }
                    }
                }
            });
            //EQJsonStr = EQJsonStr.substring(0, EQJsonStr.lastIndexOf(','));
        }

        // 取技能名
        for(var i = 0; i < $skName.length; i++){
            var skTx = $skName.eq(i).text();
            if(skTx != '') {
                skStr += $skName.eq(i).text() + ',';
            }
        }
        skStr = skStr.substring(0, skStr.lastIndexOf(','));

        // 取技能属性
        $.each(skData, function (i1, v1) {
            if(skStr.indexOf(v1.name) > -1){
                var attack = v1.attack, Lv = parseInt(v1.Lv);
                for(var i2 in attack){
                    for(var key in attack[i2]){
                        var iAttack = Number(attack[i2][key]) * Lv;
                        SKJsonStr += '{"'+ key +'":"'+ iAttack +'"}' + ',';
                    }
                }
            }
        });

        var newJsonStr = SKJsonStr;
        if(EQJsonStr != ''){
            newJsonStr += EQJsonStr;
        }
        newJsonStr = newJsonStr.substring(0, newJsonStr.lastIndexOf(','));
        newJsonStr += ']';
        //console.log(newJsonStr);
        var newJson = JSON.parse(newJsonStr);

        // 得到新的攻击属性数组
        var skNewArr = moGame.multiArray(newJson);
        var PhyMin = 40, PhyMax = 60, PhyShRt = 0, PhyCt = 0, PhyCtRt = 0, PhyBjSh = 2, PhyBjRt = 0, SKMin = 180, SKMax = 200, SKShRt = 0, SKCtRt = 0, SKCt = 0, SKBjSh = 2, SKBjRt = 0, SKCD = 0;

        $.each(skNewArr, function (i, v) {
            var itemName = skNewArr[i].name, itemVal = Number(skNewArr[i].value);
            if(itemName == 'PhyMin') PhyMin = itemVal + PhyMin;
            if(itemName == 'PhyMax') PhyMax = itemVal + PhyMax;
            if(itemName == 'PhyShRt') PhyShRt = itemVal;
            if(itemName == 'PhyCt') PhyCt = itemVal;
            if(itemName == 'PhyCtRt') PhyCtRt = itemVal;
            if(itemName == 'PhyBjSh') PhyBjSh = PhyBjSh + itemVal;
            if(itemName == 'PhyBjRt') PhyBjRt = itemVal;

            if(itemName == 'SKMin') SKMin = itemVal + SKMin;
            if(itemName == 'SKMax') SKMax = itemVal + SKMax;
            if(itemName == 'SKShRt') SKShRt = itemVal;
            if(itemName == 'SKCtRt') SKCtRt = itemVal;
            if(itemName == 'SKCt') SKCt = itemVal;
            if(itemName == 'SKBjSh') SKBjSh = itemVal + SKBjSh;
            if(itemName == 'SKBjRt') SKBjRt = itemVal;
            if(itemName == 'SKCD') SKCD = itemVal;
        });
        //console.log('PhyMin:' + PhyMin + ', PhyMax:' + PhyMax + ', PhyShRt:' + PhyShRt + ', PhyCtRt:' + PhyCtRt + ', PhyCt:' + PhyCt + ', PhyBjSh:' + PhyBjSh + ', PhyBjRt:' + PhyBjRt + '\n' + 'SKMin:' + SKMin + ', SKMax:' + SKMax + ', SKShRt:' + SKShRt + ', SKCtRt:' + SKCtRt + ', SKCt:' + SKCt + ', SKBjSh:' + SKBjSh + ', SKBjRt:' + SKBjRt + ', SKCD:' + SKCD);

        var SKMaxTotal = ((SKMax * (1 + SKShRt) + SKCt) * (1 + SKShRt)).toFixed(0),
            SKMinTotal = ((SKMin * (1 + SKShRt) + SKCt) * (1 + SKShRt)).toFixed(0),
            PhyMaxTotal = ((PhyMax * (1 + PhyShRt) + PhyCt) * (1 + PhyShRt)).toFixed(0),
            PhyMinTotal = ((PhyMin * (1 + PhyShRt) + PhyCt) * (1 + PhyShRt)).toFixed(0);

        //console.log('技能最小：' + SKMinTotal + '  技能最大：' + SKMaxTotal + '  物理最小：' + PhyMinTotal + '  物理最大：' + PhyMaxTotal + '  物理暴击率：' + PhyBjRt + '  技能暴击率：' + SKBjRt + '  物理暴击伤害：' + PhyBjSh + '  技能暴击伤害：' + SKBjSh + '  冷却时间：' + SKCD);
        var killHtml = '<p>技能攻击：'+ SKMaxTotal +' ~ '+ SKMinTotal +'</p><p>物理攻击：'+ PhyMaxTotal +' ~ '+ PhyMinTotal +'</p><p>技能暴击率：'+ SKBjRt.toFixed(2)*100 +'%</p><p>技能暴击伤害：'+ SKBjSh*100 +'%</p><p>物理暴击率：'+ PhyBjRt.toFixed(2)*100 +'%</p><p>物理暴击伤害：'+ PhyBjSh*100 +'%</p>';
        $('.kill-info').empty().html(killHtml);

        return ""+ SKMinTotal +","+ SKMaxTotal +","+ PhyMinTotal +","+ PhyMaxTotal +"," + PhyBjRt + "," + SKBjRt +"," + PhyBjSh + "," + SKBjSh + "," + SKCD;
    },
    /* 获取攻击属性，便于血量计算 */
    getAttackAttributes: function (val) {
        var currMonsterData = moGame.res[0].monster,
            $progress = $('.game-monster-progress-in'),
            num = parseInt($progress.data('num')),
            blTotal = parseInt($progress.data('total')),
            len = currMonsterData.length - 1;

        var skEndNumArr = moGame.computeNum().split(",");
        var skMin = parseInt(skEndNumArr[0]), skMax = parseInt(skEndNumArr[1]),
            PhyMin = parseInt(skEndNumArr[2]), PhyMax = parseInt(skEndNumArr[3]),
            PhyBjRt = Number(skEndNumArr[4]), skBjRt = Number(skEndNumArr[5]),
            PhyBjSh = Number(skEndNumArr[6]), SKBjSh = Number(skEndNumArr[7]), skCD = Number(skEndNumArr[8]) * 1000;

        //console.log('PhyBjRt：' + PhyBjRt + '，skBjRt：' + skBjRt + '，PhyBjSh：' + PhyBjSh + '，SKBjSh：' + SKBjSh + '，SKCD：' + skCD)
        // 每秒
        var phyNum = 0;
        var mPhysics = setInterval(function () {
            phyNum += 1;
            if(phyNum > 100) phyNum = 1;

            var mPhyEndNum = moGame.RandomNumBoth(PhyMin, PhyMax);
            if(phyNum % 11 == 0 && PhyBjRt > 0){
                var PhyEndNum = Math.round(mPhyEndNum * PhyBjSh);
                var pos = 'b';
            }else{
                var PhyEndNum = mPhyEndNum;
                var pos = 'd';
            }

            num -= PhyEndNum;
            var newBl = (num / blTotal) * 100;

            if(num > 0) {
                $('.tx-score-' + pos).remove();
                moGame.textAnimate(pos, PhyEndNum);
                $progress.attr('data-num', num);
                $progress.attr('style', 'width: ' + newBl + '%');
            }
            if(num <= 0){
                clearInterval(mSkill);
                clearInterval(mPhysics);
                $('.tx-score-' + pos).remove();
                $progress.attr('data-num', 0);
                $progress.attr('style', 'width: 0%');

                moGame.monsterFirst += 1;
                if(moGame.monsterFirst > len) { // 打完了一轮怪物
                    moGame.fewWave += 1;
                    moGame.blood = 0;
                    moGame.monsterFirst = 0;
                    moGame.initBlood = moGame.initBlood * 2;
                }else{ // 还没有打完一轮
                    moGame.blood = 0;
                    moGame.blood = Math.round(blTotal + blTotal * 0.4); // 每个怪物血量算法
                    moGame.initBlood = resData[0].initBlood;
                }

                // 根据获取的装备或技能弹出技术和装备选择面板
                var eqImgLen = $('.swiper-eq-scroll').find('img').length;

                if (Math.ceil(Math.random() * 10) > 5) {
                    if (eqImgLen < 7) {
                        moGame.getEquipment(val);
                    } else {
                        moGame.getSkill(val);
                    }
                } else {
                    moGame.getSkill(val);
                }
            }
        }, 1000);

        // 每3秒
        var perNum = 0, t = 3000 + skCD, mTime = (t < 1500) ? 1500 : t;
        var mSkill = setInterval(function () {
            perNum += 1;
            if(perNum > 10) perNum = 1;

            var mSKEndNum = moGame.RandomNumBoth(skMin, skMax);
            if(perNum % 5 == 0 && skBjRt > 0){
                var SKEndNum = Math.round(mSKEndNum * SKBjSh);
                var pos = 'm';
            }else{
                var SKEndNum = mSKEndNum;
                var pos = 't';
            }

            num -= SKEndNum;
            var newBl = (num / blTotal) * 100;
            if(num > 0) {
                $('.tx-score-' + pos).remove();
                moGame.textAnimate(pos, SKEndNum);
                $progress.attr('data-num', num);
                $progress.attr('style', 'width: ' + newBl + '%');
            }
            if(num < 0){
                clearInterval(mSkill);
            }
        }, mTime);

    },
    /* 创建Swiper滚动容器 */
    createSwiper: function (toEle, currClassName, pageClassName, html) {
        var swiperHtml = '';
        swiperHtml += '<div class="swiper-main">'
            + '      <div class="swiper-container '+ currClassName +'">'
            + '          <div class="swiper-wrapper">'+ html +'</div>'
            + '          <div class="swiper-pagination '+ pageClassName +'"></div>'
            + '      </div>'
            + '  </div>';

        // 追加数据
        $(toEle).empty().append(swiperHtml);
    },
    /* layer弹层面板 */
    layerPanel: function (layerName, html) {
        var layerHtml = '';
        layerHtml += '<div class="layer-panel '+ layerName +'">'
            +'  <div class="layer-panel-shadow"></div>'
            +'  <div class="layer-panel-main">'
            +'      <div class="layer-panel-wrap">'
            +'          <div class="layer-panel-inner layer-panel-anim-scale">'+ html +'</div>'
            +'      </div>'
            +'      </div>'
            +'</div>';

        // 先移除panel再显示面的数据
        $('.' + layerName).remove();

        // 将layer追加到BODY中
        $('body').append(layerHtml);
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
    getSkillEqHtml: function (typeText, holder, data) {
        var SkEqHtml = '';
        SkEqHtml += '<div class="layer-detail-main">'
            + ' <i class="layer-close" title="关闭">×</i>'
            + ' <h3 class="layer-detail-tle">'+ typeText + '：<b class="ft-color">' + holder +'</b></h3>'
            + ' <div class="layer-detail-wrap">';
        $.each(data, function (iEQ, vEQ) {
            if(vEQ.name == holder){
                var des = data[iEQ].des.replace(/,/g, '<br />');
                SkEqHtml += '<div class="layer-detail-inner">'
                    + '         <img src="'+ data[iEQ].src +'" alt="'+ data[iEQ].name +'" class="layer-detail-face">'
                    + '         <div class="layer-detail-info">'+ des +'</div>'
                    + '     </div>';
            }
        });
        SkEqHtml += ' </div>'
            + '</div>';
        return SkEqHtml;
    },
    /* 得到多维数组中相同键的值 */
    multiArray: function (arr) {
        var obj = {};
        var newArray = new Array();
        for (var i = 0; i < arr.length; i++) {
            for (var j in arr[i]) {
                if (obj[j] != undefined)
                    obj[j] += Number(arr[i][j]);
                else
                    obj[j] = Number(arr[i][j]);
            }
        }

        for (var i in obj) {
            newArray.push(eval("({'name':'" + i + "','value':'" + obj[i] + "'})"));
        }

        return newArray;
    },
    textAnimate: function (pos, txt) {
        var txHtml = '<div class="tx-score tx-score-'+ pos +' tx-animate-'+ pos +'">'+ txt +'</div>';
        $('.game-monster').append(txHtml);
    },
    RandomNumBoth: function(Min, Max) {
        var Range = (Min == Max) ? Max : (Max - Min);
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range);
        return num;
    },
    autoPlayMusic: function () {
        // 自动播放音乐效果，解决浏览器或者APP自动播放问题
        function musicInBrowserHandler() {
            moGame.musicPlay(true);
            document.body.removeEventListener('touchstart', musicInBrowserHandler);
        }
        document.body.addEventListener('touchstart', musicInBrowserHandler);

        // 自动播放音乐效果，解决微信自动播放问题
        function musicInWeixinHandler() {
            moGame.musicPlay(true);
            document.addEventListener("WeixinJSBridgeReady", function () {
                moGame.musicPlay(true);
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

        moGame.autoPlayMusic();
        $(document).on(moGame.eventClick(), '.m-ctrl', function (e) {
            e.preventDefault();
            var $self = $(this), stop = 'm-stop', play = 'm-play';
            if($self.hasClass(play)){
                $self.removeClass(play).addClass(stop);
                moGame.musicPlay(false);
            }else{
                $self.removeClass(stop).addClass(play);
                moGame.musicPlay(true);
            }
        });
    }
};