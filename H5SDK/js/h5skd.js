/**
 * H5Sdk回调接口
 */

function XiaoMengH5SDK() {
    var self = this, xmUserCookie = new History('key'), isApp = false;
    var getInitBackVal, getGameBasic, getLoginBackVal, getLgAccount;

    /**
     * 初始化sdk
     */
    this.init = function (game_key, game_secret, channel_id) {
        // 获取商户提供的参数值
        var gameBasicConfig = [game_key, game_secret, channel_id];

        // 将获取的值作为对象储存到session中
        sessionStorage.removeItem("basicConfig");
        sessionStorage.setItem("basicConfig", gameBasicConfig);

        // 原始数据json字符串
        var param = '{"game_key":"'+game_key +'", "game_secret":"'+ game_secret +'", "channel_id":"'+ channel_id +'", "os":"'+ XiaoMeng.Os +'", "imei":"'+ XiaoMeng.imei +'", "ios_ver":"'+ XiaoMeng.ios_ver +'", "model":"'+ XiaoMeng.model +'"}';

        // 对原始数字进行加密
        param = aesEncrypt(param, game_secret);

        // 对加密数据进行urlencode
        param = encodeURIComponent(param);

        getJson({"x": game_secret, "param": param}, function(data){
            // urldecode
            var result = decodeURIComponent(data);

            // 解密
            result = aesDecrypt(result, game_secret);

            // 解json
            result = JSON.parse(result);

            if(result.ack == 200){
                layer.open({
                    content: '系统初始化已完成',
                    skin: 'msg',
                    style: 'top:-50px',
                    time: 2
                });

                // 将对象转字符串便于存储
                var initData = JSON.stringify(result.data);

                // 存储初始化时的返回值
                sessionStorage.removeItem("initBackVal");
                sessionStorage.setItem("initBackVal", initData);

                // 显示登录面板
                self.openLogin();
            }else{
                layer.open({
                    content: result.msg,
                    btn: '我知道了',
                    yes: function(index){
                        location.reload();
                    }
                });
                return false;
            }
        }, XiaoMeng.app_url + '/init', 'GET', 'jsonp');
    }

    /**
     * 打开登录窗口
     */
    this.openLogin = function () {
        if(OSName().name == 'PC'){
            layer.open({content: '请在手机模式下打开', btn: '我知道了'});
            return false;
        }else{
            var $loginBg = $('.login-bg');

            // 获取存储的登录后返回信息
            getLoginBackVal = JSON.parse(sessionStorage.getItem("loginBackVal"));

            if(getLoginBackVal == null) {
                (typeof gameBg == 'undefined') ? $loginBg.html('') : $loginBg.html('<img src="' + gameBg + '">');
                this.loadLoginMode();
            }else{
                window.location.href = 'sub.html';
            }
        }
    }

    /**
     * 登录检测
     */
    this.userLogin = function () {
        var $form = $('.mod-login-ulogin'),
            $lgUserName = $form.find('input[name=username]'),
            $lgPWD = $form.find('input[name=password]'),
            _urn = $lgUserName.val(),
            _psw = $lgPWD.val();

        // 获取游戏基本信息
        getGameBasic = sessionStorage.getItem("basicConfig").split(",");
        XiaoMeng.game_key = getGameBasic[0];
        XiaoMeng.game_secret = getGameBasic[1];
        XiaoMeng.channel_id = getGameBasic[2];

        // 获取存储的初始化时的返回值
        getInitBackVal = JSON.parse(sessionStorage.getItem("initBackVal"));

        if (!CSRegular.uname(_urn)) {
            layer.open({
                content: '请输入正确账号',
                skin: 'msg',
                style: 'top:-50px',
                time: 2
            });
            $lgUserName.focus();
            return false;
        }
        if (!CSRegular.pass(_psw)) {
            layer.open({
                content: '请输入6-20位密码',
                skin: 'msg',
                style: 'top:-50px',
                time: 2
            });
            $lgPWD.focus();
            return false;
        }

        // 原始数据json字符串
        var param = '{"game_key":"'+ XiaoMeng.game_key +'", "game_secret":"'+ XiaoMeng.game_secret +'", "channel_id":"'+ XiaoMeng.channel_id +'", "os":"'+ XiaoMeng.Os +'", "imei":"'+ XiaoMeng.imei +'", "username": "'+ _urn +'", "password" : "'+ _psw +'", "sign": "'+ md5(_urn + XiaoMeng.game_key) +'", "token": "'+ getInitBackVal.token +'"}';

        // 对原始数字进行加密
        param = aesEncrypt(param, XiaoMeng.game_secret);

        // 对加密数据进行urlencode
        param = encodeURIComponent(param);

        // save account
        sessionStorage.removeItem("lgAccount");
        sessionStorage.setItem("lgAccount", _urn);

        // 按钮不可点击
        self.changeBtnType('.btn-submit');

        getJson({"x": XiaoMeng.game_secret, "param": param}, function(data){
            // urldecode
            var result = decodeURIComponent(data);

            // 解密
            result = aesDecrypt(result, XiaoMeng.game_secret);

            // 解json
            result = JSON.parse(result);

            if (result.ack == 200) {
                layer.open({
                    content: "登录成功！",
                    skin: 'msg',
                    style: 'top:-50px',
                    time: 2
                });

                // 将对象转字符串便于存储
                var okData = JSON.stringify(result.data);
                sessionStorage.removeItem("loginBackVal");
                sessionStorage.setItem("loginBackVal", okData);

                // 加密用户名和密码
                var newPort = aesEncrypt(_urn, XiaoMeng.game_secret), newPWD = aesEncrypt(_psw, XiaoMeng.game_secret);

                // 存储用户登录信息
                xmUserCookie.setCookie('loginUserName', newPort, xmUserCookie.cacheTime, {"path": xmUserCookie.path});
                xmUserCookie.setCookie('loginUserPWD', newPWD, xmUserCookie.cacheTime, {"path": xmUserCookie.path});

                xmUserCookie.add(newPort, newPWD);

                // 替换对应账号下的密码
                self.reWriteCookie(newPort, newPWD);

                setTimeout(function () {
                    window.location.href = 'sub.html';
                }, 1000);
            }else{
                // 按钮可点击
                self.changeBtnType('.btn-submit', 0);

                layer.open({
                    content: result.msg,
                    skin: 'msg',
                    style: 'top:-50px',
                    time: 3
                });
                return false;
            }
        }, XiaoMeng.app_url + '/login', 'GET', 'jsonp');

        // 按钮6s后可点击
        setTimeout(function () {
            self.changeBtnType('.btn-submit', 0);
        }, 6000);
    }

    /**
     * 用户注册检测
     * ele：当前元素
     * mod：注册模式 phone | onekey
     */
    this.userRegister = function (ele, mod) {
        var $form = $(ele).closest('.mod-login-module');

        // 获取游戏基本信息
        getGameBasic = sessionStorage.getItem("basicConfig").split(",");
        XiaoMeng.game_key = getGameBasic[0];
        XiaoMeng.game_secret = getGameBasic[1];
        XiaoMeng.channel_id = getGameBasic[2];

        // 手机注册
        if (mod == 'phone') {
            var $mobPhone = $form.find('input[name=cellphone]'),
                $mobPWD = $form.find('input[name=password]'),
                $mobCap = $form.find('input[name=captcha]'),
                _cellphone = $mobPhone.val(),
                _psw = $mobPWD.val(),
                _captcha = $mobCap.val();

            if (!CSRegular.phone(_cellphone)) {
                layer.open({
                    content: '请输入正确的手机号',
                    skin: 'msg',
                    style: 'top:-50px',
                    time: 2
                });
                $mobPhone.focus();
                return false;
            }
            if (!CSRegular.pass(_psw)) {
                layer.open({
                    content: '请输入6-20位密码',
                    skin: 'msg',
                    style: 'top:-50px',
                    time: 2
                });
                $mobPWD.focus();
                return false;
            }
            if (!CSRegular.captcha(_captcha)) {
                layer.open({
                    content: '验证码输入有误',
                    skin: 'msg',
                    style: 'top:-50px',
                    time: 2
                });
                $mobCap.focus();
                return false;
            }

            // 原始数据json字符串
            var param = '{"game_key":"'+ XiaoMeng.game_key +'", "game_secret":"'+ XiaoMeng.game_secret +'", "channel_id":"'+ XiaoMeng.channel_id +'", "os":"'+ XiaoMeng.Os +'", "imei":"'+ XiaoMeng.imei +'", "passport": "'+ _cellphone +'", "password" : "'+ _psw +'", "sign": "'+ md5(_cellphone + XiaoMeng.game_key) +'", "smscode": "'+ _captcha +'"}';

            // 对原始数字进行加密
            param = aesEncrypt(param, XiaoMeng.game_secret);

            // 对加密数据进行urlencode
            param = encodeURIComponent(param);

            // 提交数据
            self.registerPost(param, _cellphone, _psw, '/passportReg');

        } else { // 一键注册
            var $oneName = $form.find('input[name=username]'),
                $onePWD = $form.find('input[name=password]'),
                _urn = $oneName.val(),
                _psw = $onePWD.val();

            if (!CSRegular.uname(_urn)) {
                layer.open({
                    content: '请输入正确账号',
                    skin: 'msg',
                    style: 'top:-50px',
                    time: 2
                });
                $oneName.focus();
                return false;
            }
            if (!CSRegular.pass(_psw)) {
                layer.open({
                    content: '请输入6-20位密码',
                    skin: 'msg',
                    style: 'top:-50px',
                    time: 2
                });
                $onePWD.focus();
                return false;
            }

            // 原始数据json字符串
            var param = '{"game_key":"'+ XiaoMeng.game_key +'", "game_secret":"'+ XiaoMeng.game_secret +'", "channel_id":"'+ XiaoMeng.channel_id +'", "os":"'+ XiaoMeng.Os +'", "imei":"'+ XiaoMeng.imei +'", "account": "'+ _urn +'", "password" : "'+ _psw +'", "sign": "'+ md5(_urn + XiaoMeng.game_key) +'"}';

            // 对原始数字进行加密
            param = aesEncrypt(param, XiaoMeng.game_secret);

            // 对加密数据进行urlencode
            param = encodeURIComponent(param);

            // 提交数据
            self.registerPost(param, _urn, _psw, '/accountFastRegLogin');
        }
    }

    /**
     * 注册数据提交
     */
    this.registerPost = function (params, passport, password, url) {
        getJson({"x": XiaoMeng.game_secret, "param": params}, function(data){
            // urldecode
            var result = decodeURIComponent(data);

            // 解密
            result = aesDecrypt(result, XiaoMeng.game_secret);

            // 解json
            result = JSON.parse(result);

            if (result.ack == 200) {
                layer.open({
                    content: "注册成功，即将跳转到登录页",
                    skin: 'msg',
                    style: 'top:-50px',
                    time: 2
                });

                self.openLogin();
                $('.mod-login-ulogin').find('input[name=username]').val(passport);
                $('.mod-login-ulogin').find('input[name=password]').val(password);

                setTimeout(function () {
                    self.userLogin();
                }, 2000);
            }else{
                layer.open({
                    content: result.msg,
                    skin: 'msg',
                    style: 'top:-50px',
                    time: 2
                });
                return false;
            }
        }, XiaoMeng.app_url + url, 'GET', 'jsonp');
    }

    /**
     * 打开手机注册窗口
     */
    this.openRegisterPhone = function () {
        if(OSName().name == 'PC'){
            layer.open({content: '请在手机模式下打开', btn: '我知道了'});
            return false;
        }else{
            this.loadLoginMode('phone');
        }
    }

    /**
     * 一键注册窗口
     */
    this.openRegisterOneKey = function () {
        if(OSName().name == 'PC'){
            layer.open({content: '请在手机模式下打开', btn: '我知道了'});
            return false;
        }else{
            this.loadLoginMode('onekey');

            // 获取游戏基本信息
            getGameBasic = sessionStorage.getItem("basicConfig").split(",");
            XiaoMeng.game_key = getGameBasic[0];
            XiaoMeng.game_secret = getGameBasic[1];
            XiaoMeng.channel_id = getGameBasic[2];

            // 获取存储的初始化时的返回值
            getInitBackVal = JSON.parse(sessionStorage.getItem("initBackVal"));
            //console.log(getInitBackVal);

            // 获取一键注册用户名和密码
            var param = '{"game_key":"'+ XiaoMeng.game_key +'", "game_secret":"'+ XiaoMeng.game_secret +'", "channel_id":"'+ XiaoMeng.channel_id +'", "os":"'+ XiaoMeng.Os +'", "imei":"'+ XiaoMeng.imei +'", "token": "'+ getInitBackVal.token +'"}';

            // 对原始数字进行加密
            param = aesEncrypt(param, XiaoMeng.game_secret);

            // 对加密数据进行urlencode
            param = encodeURIComponent(param);

            getJson({"x": XiaoMeng.game_secret, "param": param}, function(data){
                // urldecode
                var result = decodeURIComponent(data);

                // 解密
                result = aesDecrypt(result, XiaoMeng.game_secret);

                // 解json
                result = JSON.parse(result);

                if (result.ack == 200) {
                    layer.open({
                        content: "成功获取账号和密码",
                        skin: 'msg',
                        style: 'top:-50px',
                        time: 2
                    });

                    var oneKeyData = result.data;

                    $('.mod-reg-onekey input[name=username]').val(oneKeyData.account);
                    $('.mod-reg-onekey input[name=password]').val(oneKeyData.password);
                }else{
                    layer.open({
                        content: result.msg,
                        skin: 'msg',
                        style: 'top:-50px',
                        time: 2
                    });
                    return false;
                }
            }, XiaoMeng.app_url + '/accountFastReg', 'GET', 'jsonp');
        }
    }

    /**
     * 忘记密码
     */
    this.forgetPassword = function () {
        var $userName = $('.mod-login-ulogin').find('input[name="username"]'), _userAc = $userName.val();

        if(_userAc !== '' && CSRegular.phone(_userAc)) {
            $('#user_name').val(_userAc);
            self.loadLoginMode('forgetpass');
        }else{
            layer.open({
                content: '联系客服QQ：' + XiaoMeng.QQ + '',
                btn: '我知道了'
            });
        }
    }

    /**
     * 登录注册
     * 按需求显示弹窗
     */
    this.loadLoginMode = function (mode) {
        // 获取存储的初始化时的返回值
        getInitBackVal = JSON.parse(sessionStorage.getItem("initBackVal"));

        // 获取游戏基本信息
        getGameBasic = sessionStorage.getItem("basicConfig").split(",");
        XiaoMeng.game_secret = getGameBasic[1];

        var modeHtml = '';
        switch (mode) {
            case 'phone':
                modeHtml = loadPhoneMode();
                break;
            case 'onekey':
                modeHtml = loadRegMode();
                break;
            case 'forgetpass':
                modeHtml = loadForgetPass();
                break;
            default:
                modeHtml = loadLoginPanel();
                break;
        }

        if ($('#login_pop').length) {
            $('#login_pop').html(modeHtml);
        }

        if(mode == 'phone'){
            var $modePhone_name = $("input[name='cellphone']"), $modePhone_PWD = $("input[name='password']");

            $modePhone_PWD.val('');

            // 非手机号或空格检测
            $modePhone_name.keypress(function() {
                checkBlank();
            });
        }

        if(mode == 'forgetpass'){
            var $lgAc = $('#user_name'),
                $forget = $('.mod-lg-find-pass'),
                $forget_phone = $forget.find("input[name='cellphone']"),
                $forget_PWD1 = $forget.find("input[name='password']"),
                $forget_PWD2 = $forget.find("input[name='agpassword']");

            $forget_PWD1.val('');
            $forget_PWD2.val('');

            $forget_phone.val($lgAc.val());

            // 非手机号或空格检测
            $forget_phone.keypress(function() {
                checkBlank();
            });
        }

        if(mode == undefined){
            // 未定义快速注册
            if(getInitBackVal.use_fast_reg == 0){
                $('li.li-fast').remove();
                $('.login-group-tool li').addClass('li-phone');
            }

            var loginUser = xmUserCookie.getCookie('loginUserName'),
                $lgUserName = $('input[name="username"]'),
                $lgPWD = $('input[name="password"]');

            // 用户名历史下拉
            var $history = $('.cookie-name-list'),
                hisData = xmUserCookie.getList();

            if(hisData) {
                var ckIndex = cookieIndexOf(hisData, loginUser);
                if(ckIndex != -1){
                    // 解密用户名和密码
                    var intPort = aesDecrypt(hisData[ckIndex].title, XiaoMeng.game_secret), intPWD = aesDecrypt(hisData[ckIndex].link, XiaoMeng.game_secret);

                    $lgUserName.val(intPort);
                    $lgPWD.val(intPWD);
                }
                $history.empty();
                for (var i = 0; i < hisData.length; i++) {
                    var itemPort = aesDecrypt(hisData[i].title, XiaoMeng.game_secret);
                    var pHtml = '<p class="history-item">' + itemPort + '</p>';
                    if ($history.length > 0) {
                        $history.append(pHtml);
                    }
                }

                $('b.more').click(function (event) {
                    event.stopPropagation();
                    var $self = $(this), _sys = 't-trans';
                    if (hisData.length > 0 && $('.history-item').length > 0) {
                        if($history.css('display') == 'none'){
                            $history.show();
                            $self.addClass(_sys);
                        } else {
                            $history.hide();
                            $self.removeClass(_sys);
                        }
                    }
                });

                $('.history-item').each(function (i) {
                    $(this).on('click', function (event) {
                        event.stopPropagation();
                        // 解密密码
                        var chkPort = aesDecrypt(hisData[i].title, XiaoMeng.game_secret),
                            chkPWD = aesDecrypt(hisData[i].link, XiaoMeng.game_secret);

                        $lgUserName.val(chkPort);
                        $lgPWD.val(chkPWD);
                        $('b.more').removeClass('t-trans');
                        if ($history.css('display') == 'block') $history.hide();
                    });
                });

                $('.mod-login-ulogin').click(function (event) {
                    $history.hide();
                    $('b.more').removeClass('t-trans');
                });
            }

            //回车提交
            $('.mod-login-ulogin').keydown(function(e){
                var eType = e || window.event;
                if(eType.keyCode == 13){
                    self.userLogin();
                }
            });

            // 退格删除
            delectInputVal('input[name="username"], input[name="password"]');

        }

        //用户登录
        function loadLoginPanel() {
            var html = '<div class="dialog-box mod-login mod-login-module mod-login-ulogin"><a href="javascript:;" title="关闭" class="dialog-close icon-close"></a><div class="login-hd"><div class="login-hd-tit">用户登录</div></div><div class="login-form"><div class="w-form"><div class="w-item login-ipt"><i class="icon-user"></i> <input name="username" type="text" maxlength="15" placeholder="账号"> <b class="more"></b><div class="cookie-name-list"></div></div><div class="w-item"><i class="icon-lock"></i><input name="password" type="password" maxlength="20" placeholder="请输入6-20位密码" autocomplete="off"><a href="javascript:H5Sdk.forgetPassword();" class="m-txt">忘记密码</a></div><input type="button" class="btn-submit" onclick="H5Sdk.userLogin()" value="登 录"></div></div><ul class="login-group-tool"><li><a href="javascript:H5Sdk.openRegisterPhone();">手机注册</a></li><li class="li-fast"><a href="javascript:H5Sdk.openRegisterOneKey();">一键注册</a></li></ul></div>';
            return html;
        }

        //忘记密码面板
        function loadForgetPass() {
            var html = '<div class="dialog-box mod-login mod-login-module mod-uc-pass mod-lg-find-pass" style="padding-top:0"><a href="javascript:H5Sdk.loadLoginMode();" title="返回用户登录窗口" class="icon-back"></a><div class="login-hd"><div class="login-hd-tit">忘记密码</div></div><div class="w-form"><div class="w-item"> <i class="icon-mobile"></i><input name="cellphone" type="text" maxlength="11" placeholder="请输入手机号码"></div><div class="w-item-wp"><div class="w-item w-item-s"><i class="icon-email"></i><input name="captcha" type="text" maxlength="6" placeholder="请输入验证码"></div><button class="w-button J-sendcaptcha" onclick="H5Sdk.sendCaptcha(this,\'bindphone\');">发送验证码</button></div><div class="w-item"><i class="icon-lock"></i><input name="password" type="password" maxlength="20" autocomplete="off" placeholder="请输入6-20位新密码"></div><div class="w-item"><i class="icon-lock"></i><input name="agpassword" type="password" maxlength="20" autocomplete="off" placeholder="请再次输入新密码"><div class="place none"></div><em class="icon-oeye J-eye"></em></div><a href="javascript:;" class="btn-submit" onclick="H5Sdk.modifyPass(this)">找回密码</a></div></div>';
            return html;
        }
        
        //手机注册
        function loadPhoneMode() {
            var html = '<div class="dialog-box mod-login mod-login-module mod-reg-phone"><a href="javascript:H5Sdk.loadLoginMode();" title="返回用户登录窗口" class="icon-back"></a><div class="login-hd"><div class="login-hd-tit">手机注册</div></div><div class="login-form"><div class="w-form"><div class="w-item"><i class="icon-mobile"></i><input name="cellphone" type="text"  maxlength="11" placeholder="请输入您的手机号码" autocomplete="off"></div><div class="w-item"><i class="icon-lock"></i> <input name="password" type="password" maxlength="20" autocomplete="new-password" placeholder="请输入6-20位密码"></div><div class="w-item-wp"><div class="w-item w-item-s"><i class="icon-email"></i> <input name="captcha" type="text" maxlength="6" placeholder="请输入验证码"></div><button class="w-button J-sendcaptcha" onclick="H5Sdk.sendCaptcha(this);">发送验证码</button></div><a href="javascript:;" class="btn-submit" onclick="H5Sdk.userRegister(this,\'phone\')">注 册</a></div></div></div>';
            return html;
        }
        
        //一键注册
        function loadRegMode() {
            var html = '<div class="dialog-box mod-login mod-login-module mod-reg-onekey"><a href="javascript:H5Sdk.loadLoginMode();" title="返回用户登录窗口" class="dialog-close icon-back"></a><div class="login-hd tc"><div class="login-hd-tit">一键注册</div></div><div class="login-form"><div class="w-form"><div class="w-item"><i class="icon-user"></i><input name="username" type="text" maxlength="15" placeholder="请输入账号" readonly></div><div class="w-item"><i class="icon-lock"></i> <input name="password" type="text" maxlength="20" placeholder="请输入6-20位密码"></div><a href="javascript:;" class="btn-submit" onclick="H5Sdk.userRegister(this)">进入游戏</a></div></div></div>';
            return html;
        }

    }

    /**
     * 登录后
     * 按需求显示用户面板
     */
    this.loadUserPanel = function (mode) {
        // 获取游戏基本信息
        getGameBasic = sessionStorage.getItem("basicConfig").split(",");
        XiaoMeng.game_key = getGameBasic[0];
        XiaoMeng.game_secret = getGameBasic[1];
        XiaoMeng.channel_id = getGameBasic[2];

        $('#floatmod').hide();
        var modeHtml = '';
        switch (mode) {
            case 'ctl':
                modeHtml = loadCtlMode();
                break;
            case 'pass':
                modeHtml = loadModifyPWD();
                break;
            case 'bindphone':
                modeHtml = loadBindPhone();
                break;
            case 'gift':
                modeHtml = loadGiftMode();
                break;
            case 'kf':
                modeHtml = loadKF();
                break;
            default:
                modeHtml = loadCtlMode();
                break;
        }

        if ($('#uc_pop').length) {
            $('#uc_pop').html(modeHtml).show();
        }

        if(mode == 'ctl' || mode == undefined){
            getLoginBackVal = JSON.parse(sessionStorage.getItem("loginBackVal"));
            getLgAccount = sessionStorage.getItem("lgAccount");

            // 如果是账号登录
            if(getLoginBackVal.account_type == 0){
                $('.place').html(getLoginBackVal.account);
                $('.uc-tool').remove();
            }

            // 如果是手机登录，则移除绑定手机项
            if(getLoginBackVal.account_type == 1){
                $('.place').html(getLgAccount);
                $('.bind-phone').remove();
            }
        }

        //如果在修改密码模式下
        if(mode == 'pass'){
            getLgAccount = sessionStorage.getItem("lgAccount");
            //console.log(getLgAccount)

            var $modifyPWD1 = $('.mod-uc-pass').find('input[name="password"]'),
                $modifyPWD2 = $('.mod-uc-pass').find('input[name="agpassword"]'),
                $passPhone = $('.mod-uc-pass').find('input[name="cellphone"]');

            $passPhone.val(getLgAccount);
            $modifyPWD1.val('');
            $modifyPWD2.val('');

            // 非手机号或空格检测
            $passPhone.keypress(function() {
                checkBlank();
            });

            $modifyPWD2.keyup(function() {
                var $self = $(this), pass = $self.val();
                if (pass) {
                    $self.siblings('.place').html(pass);
                }else{
                    $self.siblings('.place').html('请输入新密码');
                }
            });

            $('.mod-uc-pass .place').click(function() {
                $modifyPWD2.focus();
            });

            $('.J-eye').click(function() {
                var $self = $(this), $sibling = $self.siblings('.place'), hasClass = $self.hasClass('icon-oeye');
                if (hasClass) {
                    $self.attr('class','icon-ceye J-eye');
                    $sibling.show();
                    $modifyPWD2.focus();
                }else{
                    $self.attr('class','icon-oeye J-eye');
                    $sibling.hide();
                    $modifyPWD2.focus();
                }
            });
        }

        //账户面板
        function loadCtlMode() {
            var html = '<div class="dialog-box mod-login mod-uc mod-uc-ctl"><a href="javascript:;" title="关闭" class="dialog-close icon-close"></a><div class="w-form fn-mt-30"><div class="w-item"><i class="icon-user2"></i> <p class="place">yd88649345</p></div></div><ul class="uc-tool"><li class="ac-li" onclick="H5Sdk.loadUserPanel(\'pass\')">修改密码 <i class="icon-arrr"></i></li><li class="bind-phone" onclick="H5Sdk.loadUserPanel(\'bindphone\')">绑定手机 <i class="icon-arrr"></i></li></ul><a href="javascript:H5Sdk.exitToLogin();" class="btn-submit logout">切换帐号(注销)</a></div>';
            return html;
        }
        
        //修改密码面板
        function loadModifyPWD() {
            var html = '<div class="dialog-box mod-login mod-uc mod-uc-pass" style="padding-top:12px"><a href="javascript:H5Sdk.loadUserPanel();" class="icon-back"></a><div class="login-hd" style="padding-top:0"><div class="login-hd-tit">修改密码</div></div><div class="w-form"><div class="w-item readonly"> <i class="icon-mobile"></i><input name="cellphone" type="text" maxlength="11" placeholder="请输入手机号码" readonly></div><div class="w-item-wp"><div class="w-item w-item-s"><i class="icon-email"></i><input name="captcha" type="text" maxlength="6" placeholder="请输入验证码"></div><button class="w-button J-sendcaptcha" onclick="H5Sdk.sendCaptcha(this,\'bindphone\');">发送验证码</button></div><div class="w-item"><i class="icon-lock"></i><input name="password" type="password" maxlength="20" placeholder="请输入6-20位新密码"></div><div class="w-item"><i class="icon-lock"></i><input name="agpassword" type="password" maxlength="20" placeholder="请再次输入新密码"><div class="place none"></div><em class="icon-oeye J-eye"></em></div><a href="javascript:;" class="btn-submit" onclick="H5Sdk.modifyPass(this)">确 定</a></div></div>';
            return html;
        }
        
        //绑定手机面板
        function loadBindPhone() {
            var html = '<div class="dialog-box mod-login mod-uc mod-uc-bindphone"><a href="javascript:H5Sdk.loadUserPanel();" class="icon-back"></a><div class="w-form"><div class="w-item"> <i class="icon-mobile"></i><input name="cellphone" type="text" maxlength="11" placeholder="请输入手机号码" value=""></div><div class="w-item"><i class="icon-lock"></i><input name="password" type="password" maxlength="20" placeholder="请输入6-20位密码"></div><div class="w-item-wp"><div class="w-item w-item-s"><i class="icon-email"></i><input name="captcha" type="text" maxlength="6" placeholder="请输入验证码"></div><button class="w-button J-sendcaptcha" onclick="H5Sdk.sendCaptcha(this,\'bindphone\');">发送验证码</button></div><a href="javascript:;" class="btn-submit" onclick="H5Sdk.bindPhone(this)">绑 定</a></div></div>';
            return html;
        }

        //礼包面板
        function loadGiftMode() {
            var html = '<div class="dialog-box mod-login mod-uc mod-uc-gift"><a href="javascript:;" title="关闭" class="dialog-close icon-close"></a><div class="login-hd">礼包</div><div class="gift-wp"><div class="gift-box"><ul class="gift-list"><div class="nodata">敬请期待</div></ul></div><div class="gift-box"><ul class="gift-list"></ul></div></div></div>';
            return html;
        }

        //客服面板
        function loadKF() {
            var html = '<div class="dialog-box mod-login mod-uc mod-uc-kf"><a href="javascript:;" title="关闭" class="dialog-close icon-close"></a><div class="login-hd">客 服</div><div class="w-form"><div class="w-item"><a href="tel:'+ XiaoMeng.Tel +'">电话：'+ XiaoMeng.Tel +'</a></div><div class="w-item"><a href="mqqwpa://im/chat?chat_type=crm&amp;uin='+ XiaoMeng.QQ +'&amp;version=1&amp;src_type=web&amp;web_src=http:://wpa.b.qq.com">QQ：'+ XiaoMeng.QQ +'</a></div></div></div>';
            return html;
        }
    }

    /**
     * 修改密码
     */
    this.modifyPass = function (ele) {
        var $part = $(ele).closest('.mod-uc-pass'),
            _cellphone = $part.find('input[name="cellphone"]').val(),
            _psw = $part.find('input[name="password"]').val(),
            _psw1 = $part.find('input[name="agpassword"]').val(),
            _captcha = $part.find('input[name="captcha"]').val();

        if (!CSRegular.pass(_psw) || !CSRegular.pass(_psw1)) {
            layer.open({
                content: '请输入6-20位密码',
                skin: 'msg',
                style: 'top:-50px',
                time: 2
            });
            return false;
        }
        if (_psw1 !== _psw) {
            layer.open({
                content: '两次输入密码不一致',
                skin: 'msg',
                style: 'top:-50px',
                time: 2
            });
            return false;
        }
        if (!CSRegular.captcha(_captcha)) {
            layer.open({
                content: ' 验证码输入不正确',
                skin: 'msg',
                style: 'top:-50px',
                time: 2
            });
            return false;
        }

        // 获取游戏基本信息
        getGameBasic = sessionStorage.getItem("basicConfig").split(",");
        XiaoMeng.game_key = getGameBasic[0];
        XiaoMeng.game_secret = getGameBasic[1];
        XiaoMeng.channel_id = getGameBasic[2];

        // 原始数据json字符串
        var param = '{"game_key":"'+ XiaoMeng.game_key +'", "game_secret":"'+ XiaoMeng.game_secret +'", "channel_id":"'+ XiaoMeng.channel_id +'", "os":"'+ XiaoMeng.Os +'", "imei":"'+ XiaoMeng.imei +'", "passport": "'+ _cellphone +'", "first_password": "'+ _psw +'", "second_password": "'+ _psw1 +'", "sign": "'+ md5(_cellphone + XiaoMeng.game_key) +'", "smscode": "'+ _captcha +'"}';

        // 对原始数字进行加密
        param = aesEncrypt(param, XiaoMeng.game_secret);

        // 对加密数据进行urlencode
        param = encodeURIComponent(param);

        getJson({"x": XiaoMeng.game_secret, "param": param}, function(data){
            // urldecode
            var result = decodeURIComponent(data);

            // 解密
            result = aesDecrypt(result, XiaoMeng.game_secret);

            // 解json
            result = JSON.parse(result);

            if (result.ack == 200) {
                layer.open({
                    content: "密码修改成功，请牢记！",
                    skin: 'msg',
                    style: 'top:-50px',
                    time: 2
                });

                // 加密用户名和密码
                var newPort = aesEncrypt(_cellphone, XiaoMeng.game_secret), newPWD = aesEncrypt(_psw, XiaoMeng.game_secret);

                // 替换对应账号下的密码
                self.reWriteCookie(newPort, newPWD);

                setTimeout(function () {
                    sessionStorage.clear();
                    window.location.reload();
                }, 2000);
            }else{
                layer.open({
                    content: result.msg,
                    skin: 'msg',
                    style: 'top:-50px',
                    time: 1
                });
                return false;
            }

        }, XiaoMeng.app_url + '/passportMofifyPwd', 'GET', 'jsonp');
    }

    /**
     * 更新账号相同的密码cookie
     */
    this.reWriteCookie = function (keyword, keyval) {
        var rePortSeries, getPortSeries = xmUserCookie.getCookie('key'), jsonPortSeries = JSON.parse(getPortSeries);

        for(var i in jsonPortSeries){
            if(jsonPortSeries[i].title == keyword){
                jsonPortSeries[i].link = keyval;
            }
        }
        rePortSeries = JSON.stringify(jsonPortSeries);
        xmUserCookie.setCookie('key', rePortSeries, xmUserCookie.cacheTime, {"path": xmUserCookie.path});
    }

    /**
     * 绑定手机
     */
    this.bindPhone = function (ele) {
        var obj = $(ele),
            $part = obj.parents('.mod-uc-bindphone'),
            $bdPhone = $part.find('input[name=cellphone]'),
            $bdPWD = $part.find('input[name=password]'),
            $bdCap = $part.find('input[name=captcha]'),
            _cellphone = $bdPhone.val(),
            _psw = $bdPWD.val(),
            _captcha = $bdCap.val();

        if (!CSRegular.phone(_cellphone)) {
            layer.open({
                content: '请输入正确手机号',
                skin: 'msg',
                style: 'top:-50px',
                time: 2
            });
            $bdPhone.focus();
            return false;
        }
        if (!CSRegular.captcha(_captcha)) {
            layer.open({
                content: '验证码输入不正确',
                skin: 'msg',
                style: 'top:-50px',
                time: 2
            });
            $bdCap.focus();
            return false;
        }
        if (!CSRegular.pass(_psw)) {
            layer.open({
                content: '请输入6-20位密码',
                skin: 'msg',
                style: 'top:-50px',
                time: 2
            });
            $bdPWD.focus();
            return false;
        }
        // 获取游戏基本信息
        getGameBasic = sessionStorage.getItem("basicConfig").split(",");
        XiaoMeng.game_key = getGameBasic[0];
        XiaoMeng.game_secret = getGameBasic[1];
        XiaoMeng.channel_id = getGameBasic[2];

        // 原始数据json字符串
        var param = '{"game_key":"'+ XiaoMeng.game_key +'", "game_secret":"'+ XiaoMeng.game_secret +'", "channel_id":"'+ XiaoMeng.channel_id +'", "os":"'+ XiaoMeng.Os +'", "imei":"'+ XiaoMeng.imei +'", "passport": "'+ _cellphone +'", "password": "'+ _psw +'", "sign": "'+ md5(_cellphone + XiaoMeng.game_key) +'", "smscode": "'+ _captcha +'"}';

        // 对原始数字进行加密
        param = aesEncrypt(param, XiaoMeng.game_secret);

        // 对加密数据进行urlencode
        param = encodeURIComponent(param);

        getJson({"x": XiaoMeng.game_secret, "param": param}, function(data){
            // urldecode
            var result = decodeURIComponent(data);

            // 解密
            result = aesDecrypt(result, XiaoMeng.game_secret);

            // 解json
            result = JSON.parse(result);

            if (result.ack == 200) {
                layer.open({
                    content: result.msg,
                    skin: 'msg',
                    style: 'top:-50px',
                    time: 3
                });

                $('.mod-uc-bindphone .w-item-wp').hide();
                $('.mod-uc-bindphone .btn-submit').hide();
            }else{
                layer.open({
                    content: result.msg,
                    skin: 'msg',
                    style: 'top:-50px',
                    time: 3
                });
                return false;
            }
        }, XiaoMeng.app_url + '/passportReg', 'GET', 'jsonp');
    }
    
    /**
     * 发送验证码
     */
    this.sendCaptcha = function (ele, mod) {
        // 获取游戏基本信息
        getGameBasic = sessionStorage.getItem("basicConfig").split(",");
        XiaoMeng.game_key = getGameBasic[0];
        XiaoMeng.game_secret = getGameBasic[1];
        XiaoMeng.channel_id = getGameBasic[2];

        var $phone = $(ele).closest('.dialog-box').find('input[name="cellphone"]'), _cellphone = $phone.val();

        if (!CSRegular.phone(_cellphone)) {
            layer.open({
                content: '请输入正确的手机号码',
                skin: 'msg',
                style: 'top:-50px',
                time: 2
            });
            $phone.focus();
            return false;
        }

        if (mod == 'bindphone') { // 忘记密码|修改密码
            self.captchaJsonType(_cellphone, 2);
        }else{ // 手机注册
            self.captchaJsonType(_cellphone, 1);
        }

    }

    /**
     * smsType：找回密码方式
     * 注册通行证：1，忘记手机密码：2
     */
    this.captchaJsonType = function (passport, smsType) {
        var param = '{"game_key":"'+ XiaoMeng.game_key +'", "game_secret":"'+ XiaoMeng.game_secret +'", "channel_id":"'+ XiaoMeng.channel_id +'", "os":"'+ XiaoMeng.Os +'", "imei":"'+ XiaoMeng.imei +'", "passport": "'+ passport +'", "sign": "'+ md5(passport + XiaoMeng.game_key) +'", "smstype": "'+ smsType +'"}';

        // 对原始数字进行加密
        param = aesEncrypt(param, XiaoMeng.game_secret);

        // 对加密数据进行urlencode
        param = encodeURIComponent(param);

        getJson({"x": XiaoMeng.game_secret, "param": param}, function(data){
            // urldecode
            var result = decodeURIComponent(data);

            // 解密
            result = aesDecrypt(result, XiaoMeng.game_secret);

            // 解json
            result = JSON.parse(result);

            if (result.ack == 200) {
                var $Captcha = $('.J-sendcaptcha');

                $Captcha.attr('disabled', 'disabled').addClass('w-button-disabled');
                var capt_cd = 60;
                var capt_timer = setInterval(function(){
                    capt_cd--;
                    $Captcha.text(capt_cd + '秒后重试');
                    if (capt_cd == 1) {
                        $Captcha.text('发送验证码').removeAttr('disabled').removeClass('w-button-disabled');
                        clearInterval(capt_timer);
                    }
                },1000)
            }else{
                layer.open({
                    content: result.msg,
                    skin: 'msg',
                    style: 'top:-50px',
                    time: 2
                });
                return false;
            }
        }, XiaoMeng.app_url + '/getSmsCode', 'GET', 'jsonp');
    }

    /**
     * 获取下单配置
     */
    this.getOrderConfig = function (payMoney, productId, orderSN, orderInfo) {
        var $payWrap = $('.pay-wp'), $payClose = $('#pay_cls');

        // 获取游戏基本信息
        getGameBasic = sessionStorage.getItem("basicConfig").split(",");
        XiaoMeng.game_key = getGameBasic[0];
        XiaoMeng.game_secret = getGameBasic[1];
        XiaoMeng.channel_id = getGameBasic[2];

        // 获取登录成功后返回的数据
        getLoginBackVal = JSON.parse(sessionStorage.getItem("loginBackVal"));

        // 获取参数
        var param = '{"game_key":"'+ XiaoMeng.game_key +'", "game_secret":"'+ XiaoMeng.game_secret +'", "channel_id":"'+ XiaoMeng.channel_id +'", "os":"'+ XiaoMeng.Os +'", "imei":"'+ XiaoMeng.imei +'", "account": "'+ getLoginBackVal.account +'", "token": "'+ getLoginBackVal.token +'", "sign": "'+ md5(getLoginBackVal.account + XiaoMeng.game_key) +'"}';

        // 对原始数字进行加密
        param = aesEncrypt(param, XiaoMeng.game_secret);

        // 对加密数据进行urlencode
        param = encodeURIComponent(param);

        getJson({"x": XiaoMeng.game_secret, "param": param}, function(data){
            // urldecode
            var result = decodeURIComponent(data);

            // 解密
            result = aesDecrypt(result, XiaoMeng.game_secret);

            // 解json
            result = JSON.parse(result);

            if (result.ack == 200) {
                layer.open({
                    content: "获取下单配置，请稍等...",
                    skin: 'msg',
                    style: 'top:-50px',
                    time: 2.5
                });

                var pay_type_val = result.data.pay_type_order.split(",");

                setTimeout(function () {
                    $payWrap.show();
                    $payClose.show();
                    self.createPayTypeList('#pay_list', pay_type_val);

                    $('#J_pay_price').text(payMoney);
                    $('input[name="order_price"]').val(payMoney);
                    $('input[name="cp_product_id"]').val(productId);
                    $('input[name="cp_order_sn"]').val(orderSN);
                    $('input[name="cp_order_info"]').val(encodeURIComponent(orderInfo.toString()));
                }, 2500);

            }else{
                layer.open({
                    content: result.msg,
                    skin: 'msg',
                    style: 'top:-50px',
                    time: 2.5
                });

                setTimeout(function () {
                    sessionStorage.clear();
                    location.reload();
                }, 2500);
                return false;
            }
        }, XiaoMeng.app_url + '/createOrderConfig', 'GET', 'jsonp');
    }

    /**
     * 生成支付类型列表
     */
    this.createPayTypeList = function (e, data) {
        var currPayType = data, html = '';
        var regex = /micromessenger/i.test(navigator.userAgent);
        for(var i = 0; i < currPayType.length; i++){
            var _tp = currPayType[i], nameArr = (_tp == 2) ? "微信" : (_tp == 3) ? "支付宝" : (_tp == 7) ? "银联" : "";
            var checked = '';
            if(regex){
                checked = _tp == 2 ? "checked" : '';
            }else{
                checked = _tp == 3 ? "checked" : '';
            }

            html += '<li class="flex '+ checked +'" id="li_p_'+ _tp +'"><label class="pay-label" for="ipt_p_'+ _tp +'"><i class="i-pay i-pay-'+ _tp +'"></i><span class="flex-list">'+ nameArr +'</span><em><input type="radio" name="pay_type" id="ipt_p_'+ _tp +'" value="'+ _tp +'" '+ checked +'></em></label></li>';
        }
        $(e).empty().html(html);

        if(regex){
            $('#li_p_3').remove();
        }

        // 选择支付类型
        $(document).on('click', '.pay-label', function () {
            var $self = $(this),
                $parent = $self.parent(),
                $ipt = $self.find('input[name="pay_type"]'),
                $siblingIpt = $parent.siblings().find('input[name="pay_type"]');

            $parent.addClass('checked');
            $ipt.attr('checked', 'checked');
            $parent.siblings().removeClass('checked');
            $siblingIpt.removeAttr('checked');
        });
    }

    // app中调用处理
    this.appJump = function () {
        isApp = true;
    }

    /**
     * 充值支付
     */
    this.openCharge = function () {
        // 获取游戏基本信息
        getGameBasic = sessionStorage.getItem("basicConfig").split(",");
        XiaoMeng.game_key = getGameBasic[0];
        XiaoMeng.game_secret = getGameBasic[1];
        XiaoMeng.channel_id = getGameBasic[2];

        var $form = $('#pay_form'),
            _payType = $form.find('input[name="pay_type"]:checked').val(),
            _orderMoney = $form.find('input[name="order_price"]').val(),
            _productId = $form.find('input[name="cp_product_id"]').val(),
            _orderSN = $form.find('input[name="cp_order_sn"]').val(),
            _orderInfo = $form.find('input[name="cp_order_info"]').val();

        // 如果未指定支付类型
        if(_payType == undefined){
            layer.open({
                content: "请选择支付方式",
                skin: 'msg',
                style: 'top:-50px',
                time: 2.5
            });
            return false;
        }

        // 获取登录成功后返回的数据
        getLoginBackVal = JSON.parse(sessionStorage.getItem("loginBackVal"));

        // 获取参数
        var param = '{"game_key":"'+ XiaoMeng.game_key +'", "game_secret":"'+ XiaoMeng.game_secret +'", "channel_id":"'+ XiaoMeng.channel_id +'", "os":"'+ XiaoMeng.Os +'", "imei":"'+ XiaoMeng.imei +'", "account": "'+ getLoginBackVal.account +'", "token": "'+ getLoginBackVal.token +'", "order_price": "'+ _orderMoney +'", "cp_product_id": "'+ _productId +'", "cp_uid": "'+ getLoginBackVal.cp_uid +'", "cp_order_sn": "'+ _orderSN +'", "cp_order_info": "'+ _orderInfo +'", "pay_type": "'+ _payType +'", "sign": "'+ md5(getLoginBackVal.account + _orderMoney + XiaoMeng.game_key) +'"}';

        // 对原始数字进行加密
        param = aesEncrypt(param, XiaoMeng.game_secret);

        // 对加密数据进行urlencode
        param = encodeURIComponent(param);

        getJson({"x": XiaoMeng.game_secret, "param": param}, function(data){
            // urldecode
            var result = decodeURIComponent(data);

            // 解密
            result = aesDecrypt(result, XiaoMeng.game_secret);

            // 解json
            result = JSON.parse(result);

            if (result.ack == 200) {
                layer.open({
                    content: "即将跳转到对应支付接口完成支付",
                    skin: 'msg',
                    style: 'top:-50px',
                    time: 3
                });

                var backURL = sessionStorage.getItem("jumpToIndex"),
                    payUrl = XiaoMeng.pay_url + '/pay/wx_checkout?out_trade_no=' + result.data.order_sn + '&platform=jssdk&pay_type='+ _payType +'&back_url=' + backURL;

                setTimeout(function () {
                    $('.pay-mask').show();
                    window.location.href = payUrl;
                }, 3000);

                setTimeout(function () {
                    $('.pay-mask').hide();
                }, 10000);
            } else {
                layer.open({
                    content: result.msg,
                    skin: 'msg',
                    style: 'top:-50px',
                    time: 3
                });
                return false;
            }
        }, XiaoMeng.app_url + '/createOrder', 'GET', 'jsonp');
    }

    /**
     * 关闭支付窗口
     */
    this.closePayWindows = function () {
        var $self = $('.pay-close'), $parLay = $('.pay-wp');

        $('#pay_list').html('');
        $self.hide();
        $parLay.hide();
        $parLay.find('input[type="hidden"]').val('');
    }

    /**
     * 切换帐号(注销)
     */
    this.exitToLogin = function () {
        layer.open({
            content: '您确定要切换帐号(注销)吗？',
            btn: ['确定', '取消'],
            yes: function(index){
                var backURL = sessionStorage.getItem("jumpToIndex");
                sessionStorage.clear();
                window.location.href = backURL;
            }
        });
    }

    /**
     * 检测用户登录状态
     */
    this.checkUserType = function (url) {
        getLoginBackVal = JSON.parse(sessionStorage.getItem("loginBackVal"));
        if(getLoginBackVal == null ){
            sessionStorage.clear();
            window.location.href = url;
        }
    }

    /**
     * 改变按钮状态
     */
    this.changeBtnType = function (e, t) {
        var _disabled = 'disabled';
        if(t == 0){ // 按钮可用
            $(e).removeAttr(_disabled).removeClass(_disabled);
        }else{ // 按钮不可用
            $(e).attr('disabled', _disabled).addClass(_disabled);
        }
    }

}

var CSRegular = {
    uname : function(v){
        var rule1 = /^[a-zA-Z0-9\_]{4,20}$/.test($.trim(v));
        return rule1;
    },
    pass : function(v){
        return /^.{6,20}$/.test(v);
    },
    phone : function(v){
        return /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/.test(v);
    },
    captcha : function(v){
        return /^\d{4,6}$/.test(v);
    }
}

// 获取json数据
function getJson(data, callback, url, type, dType){
    $.ajax({
        'url': url,
        'type': type ? type : 'GET',
        'data': data,
        'dataType': dType ? dType : 'json',
        'jsonp': 'fn',// 统一命名回调
        'async': true,
        'cache': false,
        success: function(info){
            callback(info);
            return false;
        },
        error: function(e){
            layer.open({
                content: '网络异常，请稍后再试',
                btn: '我知道了',
                yes: function(index){
                    location.reload();
                    layer.close(index);
                }
            });
        }
    })
}

function checkBlank() {
    var keyCode = event.keyCode;
    event.returnValue = (keyCode >= 48 && keyCode <= 57) ? true : false;
}

function cookieIndexOf(ckArr, ckStr){
    var len = ckArr.length;
    for(var i = 0; i < len; i++){
        // 定位该元素位置
        if(ckArr[i].title == ckStr){
            return i;
        }
    }

    return -1;
}

// 退格删除input值
function delectInputVal(e) {
    $(e).keydown(function (event) {
        var $self = $(this);
        if(event.keyCode == 8){
            var txt = $self.val();
            if(txt.length > 0) $self.val('');
        }
    });
}

// 加密
function aesEncrypt(str,game_secret){
    var key = CryptoJS.enc.Utf8.parse(game_secret);
    var iv = CryptoJS.enc.Utf8.parse(game_secret);
    return CryptoJS.AES.encrypt(str,key,{iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding}).toString();
}

// 解密
function aesDecrypt(str,game_secret){
    var key = CryptoJS.enc.Utf8.parse(game_secret);
    var iv = CryptoJS.enc.Utf8.parse(game_secret);
    return CryptoJS.AES.decrypt(str,key,{iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding}).toString(CryptoJS.enc.Utf8);
}

window.H5Sdk = new XiaoMengH5SDK();