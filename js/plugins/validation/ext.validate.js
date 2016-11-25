/**
 * 自定义扩展 插件jquery.validation.js 验证方法
 */

//注册账号(字母, 数字, 下划线)
jQuery.validator.addMethod('user_str', function(value, element, param){
    return this.optional(element) || /^[\w]+$/.test(value);
}, '只能包含英文字符, 数字, 下划线');

//手机号码
jQuery.validator.addMethod('mobile', function(value, element, param){
    return this.optional(element) || /^1[3|4|5|7|8]\d{9}$/.test(value);
}, '手机格式不对或不存在');           //$.validator.format("请确保输入的值在{0}-{1}个字节之间(一个中文字算2个字节)")

//中文字符(UTF-8编码)
jQuery.validator.addMethod('cn_utf8', function(value, element, param){
    return this.optional(element) || /^[\u4e00-\u9fa5]+$/.test(value);
}, '请输入中文字符');

//常用字符(包括:中英文字符, 数字, 下划线, 中划线)
jQuery.validator.addMethod('real_str', function(value, element, param){
    return this.optional(element) || /^[\u4e00-\u9fa5\w\-]+$/.test(value);
}, '只能包含中英文字符, 数字, 下划线');

jQuery.validator.addMethod('cant_str', function(value, element, param){
    return this.optional(element) || !( /[\~\!\?\`\$\%\^\&\*\+\/\{\}\'\<\>\=\"\s]/.test(value) );
}, '不能包含特殊字符或空格');

//固定电话
jQuery.validator.addMethod('tel', function(value, element, param){
    return this.optional(element) || /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/.test(value);
}, '电话格式不对或不存在');

//邮政编码
jQuery.validator.addMethod('zip_code', function(value, element, param){
    return this.optional(element) || /^[0-9]{6}$/.test(value);
}, '邮政编码格式不对');

//身份证
jQuery.validator.addMethod('id_card', function(value, element, param){
    return this.optional(element) || /^(\d{15}|\d{17}(\d|X|x))$/.test(value);
}, '身份证格式不对');

//日期时间
jQuery.validator.addMethod('datetime', function(value, element, param){
    return this.optional(element) || /^[1-9]\d{3}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/.test(value);
}, '日期时间格式不对');

//只包含字母和数字字符
jQuery.validator.addMethod('alpha_num', function(value, element, param){
    return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
}, '只能包含字母, 数字');

//只包含字母
jQuery.validator.addMethod('alpha', function(value, element, param){
    return this.optional(element) || /^[a-zA-Z]+$/.test(value);
}, '只能包含字母');

//不能提交指定的默认值(自定义属性placeholder对应的值)
jQuery.validator.addMethod('non_default', function(value, element, param){
    var attr_name = typeof param == 'string' && param ? param : 'placeholder';
    return this.optional(element) || $(element).attr(attr_name) != value;
}, '不能为空');

//自定义正则URL匹配
jQuery.validator.addMethod('url2', function(value, element, param){
    return this.optional(element) || /^((http|https):\/\/)?(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9\&%_\.\-\=\#\?]*)?$/.test(value);
}, 'URL格式不对');

//是否包含指定字符(如果包含,则不能通过)
jQuery.validator.addMethod('in_array', function(value, element, param){
    var flag = false;
    if(!jQuery.isArray(param)){
        param = [param];
    }
    for(var i in param){
        if(value.toLowerCase().indexOf(param[i].toLowerCase()) != -1){
            flag = true;
            break;
        }
    }
    return this.optional(element) || !flag;
}, '包含指定字符')

//防止必填项出现英文
// $.validator.messages['required'] = '必填项不能为空';

//-----------------------------------------------------------------------------
//设置插件默认值(全局)
jQuery.validator.setDefaults({
    // debug: 1,
    submitOperation: true, //控制form.submit()的提交，默认true为使用
    openKeyUp: false, //keyup验证表单 true使用 | false不使用
    openInTime: true, //及时验证表单 true使用 | false不使用
    focusInvalid: false,
    onkeyup : function(element){
        $val = $.trim($(element).val());
        var $error = 'label.' + this.settings.errorClass;
        if($val==null || $val.length==0){
            $(element).removeClass(this.settings.errorClass).addClass(this.settings.validClass);
            $(element).next($error).remove();
            $(element).val('');
        }

        if(!this.settings.openInTime || !this.settings.openKeyUp) return false;
        $(element).valid();
    },
    onfocusin : function(element){ //默认值替换
        var $error = 'label.' + this.settings.errorClass;
        $(element).removeClass(this.settings.errorClass).addClass(this.settings.validClass);
        $(element).next($error).remove();

        if(!this.settings.openInTime) return false;

        $placeholder = $(element).attr('placeholder'); 
        $val = $(element).val();
        // if($placeholder == $val) $(element).val(''); //TODO:This code isn't compatible with ie browser Au:Cale
    },
    onfocusout : function(element){ //默认值替换
        if(!this.settings.openInTime) return false;

        $placeholder = $(element).attr('placeholder');
        $val = $.trim($(element).val());
        if($val==null || $val.length==0){
            // $(element).val($placeholder); //TODO:如果value没值则把placeholder的值赋予它 Au:Cale
        }else{
            var form_rules = this.settings.rules;
            var dom_name = $(element).attr('name');
            //非必填, 有默认值, 且修改后验证
            $placeholder != null && form_rules[dom_name] && !('required' in form_rules[dom_name]) && $val != $placeholder && $(element).valid();
            //必填, 无默认值, 且修改后验证
            form_rules[dom_name] && ('required' in form_rules[dom_name]) && $(element).valid();
        }
    },
    submitHandler : function(form){
        if(this.numberOfInvalids() == 0){
            var form_rules = this.settings.rules;
            var valid_obj = null;
            $.each(form, function(k,v){
                var dom_name = $(v).attr('name');
                var placeholder = $(v).attr('placeholder');
                var _val = $(v).val();
                // console.log(form_rules, dom_name);
                if(placeholder != null && !('required' in form_rules[dom_name]) && _val != placeholder && !$(v).valid()){
                    valid_obj = $(v);
                    return false;
                }
                if(placeholder != null && placeholder != '' && placeholder == _val){
                    $(v).val('');
                }
            });
            if(valid_obj){
                // valid_obj.focus(); //TODO:Cancel all of focus status. Au:Cale
                return false;
            }
            if(!this.settings.submitOperation) return false;
            form.submit();
        }
    }
});


/*-------------------------------------------------------------------------------------------------------*/

/**
 * TODO: Deal input textarea word color.
 * Au: Cale
 */
function dealText(txt, color1, color2){
    if(browser()['ie']) keepValue(0, color1, color2);

    $(txt).each(function() {
        var $jthis = $(this);
        var defVal = $jthis.attr('placeholder');
        if (this.value !== defVal) {
            $jthis.css('color', color2);
        }
        $jthis.keyup(function(){
            if(this.value == ""){
                $jthis.css('color', color1);
            }else{
                $jthis.css('color', color2);
            }
        });
        $jthis.focus(function(){
            if (this.value == defVal) {
                $jthis.css('color', color1);
                // this.value = '';
            }else{
                $jthis.css('color', color2);
            }
        });
        $jthis.blur(function(){
            if (this.value == "" || this.value == defVal) {
                $jthis.css('color', color1);
                // this.value = defVal; //TODO:Because use placeholder attribute Au:Cale
            }else{
                $jthis.css('color', color2);
            }
        });
    });
}

/*
 * TODO: if it has survived default value, keep default value after input is focusing.
 * Au: Cale
 */
function keepValue(pos, color1, color2){
    var pos = !pos ? 0 : pos;
    var doc = document, inputs = doc.getElementsByTagName('input'), supportPlaceholder = 'placeholder' in doc.createElement('input'), placeholder = function (input) {
        var text = input.getAttribute('placeholder'), defaultValue = input.defaultValue;
        if (defaultValue == '') {
            input.value = text;
            input.style.color = color1;
        }
        input.onfocus = function(){
            if (input.value === text){
                input.style.color = color1;
                this.value = text;
                setCaretPosition(this, pos);
            }
        };
        input.onkeyup = function(){
            if(this.value == ''){
                input.style.color = color1;
                this.value = text;
                setCaretPosition(this, pos);
            }
        };
        input.onkeydown = function(){
            if(this.value == text){
                this.value = '';
            }
        };
        input.onkeypress = function(){
            if(this.value == text){
                input.style.color = color1;
            }else{
                input.style.color = color2;
            }
        };        
        input.onblur = function(){
            if (input.value === ''){
                input.style.color = color1;
                this.value = text;
            }
        };
    };
    if (!supportPlaceholder){
        for (var i = 0, len = inputs.length; i < len; i++){
            var input = inputs[i], text = input.getAttribute('placeholder');
            if (input.type === 'text' && text){
                placeholder(input);
            }
        }
    }    
}

/*
 * TODO: set caret position in chrome/ff/ie
 * Au: Cale
 */
function setCaretPosition(tObj, sPos){
    if(tObj.setSelectionRange){
        tObj.setSelectionRange(sPos, sPos);
        tObj.focus();
    }else if(tObj.createTextRange){
        var rng = tObj.createTextRange();
        rng.move('character', sPos);
        rng.select();
    }
}

/*-------------------------------------------------------------------------------------------------------*/