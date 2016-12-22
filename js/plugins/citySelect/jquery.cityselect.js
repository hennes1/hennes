/*!
 * citySelect：Ajax 三级省市联动
 * 日期：2012-7-18
 * update：2016-12-20 By Hennes
 * ---------------------------------
 * @url: 省市数据josn文件路径
 * @prov: 默认省份
 * @city: 默认城市
 * @dist: 默认地区（县）
 * @nodata: 无数据状态
 * @required: 必选项
*/
(function ($) {
    $.fn.citySelect = function (settings) {
        if (this.length < 1) return;

        // 默认值
        settings = $.extend({
            url: "../js/plugins/citySelect/cityData.min.json",
            prov: null,
            city: null,
            dist: null,
            nodata: null,
            required: true
        }, settings);

        var box_obj = this,
            prov_obj = box_obj.find(".prov"),
            city_obj = box_obj.find(".city"),
            dist_obj = box_obj.find(".dist"),
            prov_val = settings.prov,
            city_val = settings.city,
            dist_val = settings.dist,
            _required = settings.required,
            _noData = settings.nodata;
        var select_prehtml = (_required) ? "" : "<option></option>";
        var city_json;

        // 赋值市级函数
        var cityStart = function () {
            var prov_id = prov_obj.get(0).selectedIndex;
            if (!_required) {
                prov_id--;
            }
            city_obj.empty().attr("disabled", true);
            dist_obj.empty().attr("disabled", true);

            if (prov_id < 0 || typeof(city_json.citylist[prov_id].s) === "undefined") {
                if (_noData == "none") {
                    city_obj.css("display", "none");
                    dist_obj.css("display", "none");
                }
                return;
            }

            // 遍历赋值市级下拉列表
            temp_html = select_prehtml;
            $.each(city_json.citylist[prov_id].s, function (i, city) {
                temp_html += "<option value='" + city.n + "'>" + city.n + "</option>";
            });
            city_obj.html(temp_html).attr("disabled", false).css({"display": ""});
            distStart();
        };

        // 赋值地区（县）函数
        var distStart = function () {
            var prov_id = prov_obj.get(0).selectedIndex;
            var city_id = city_obj.get(0).selectedIndex;
            if (!_required) {
                prov_id--;
                city_id--;
            }
            dist_obj.empty().attr("disabled", true);

            if (prov_id < 0 || city_id < 0 || typeof(city_json.citylist[prov_id].s[city_id].s) === "undefined") {
                if (_noData == "none") {
                    dist_obj.css("display", "none");
                }
                return;
            }

            // 遍历赋值市级下拉列表
            temp_html = select_prehtml;
            $.each(city_json.citylist[prov_id].s[city_id].s, function (i, dist) {
                temp_html += "<option value='" + dist.n + "'>" + dist.n + "</option>";
            });
            dist_obj.html(temp_html).attr("disabled", false).css({"display": ""});
        };

        var init = function () {
            // 遍历赋值省份下拉列表
            temp_html = select_prehtml;
            $.each(city_json.citylist, function (i, prov) {
                temp_html += "<option value='" + prov.n + "'>" + prov.n + "</option>";
            });

            if(_noData === 'none'){ //只赋值省份/直辖市
                if(_required === true){
                    //dist_obj.select2({placeholder: ""});
                }else{ //未赋值且非必须项
                    city_obj.empty().attr("disabled", true);
                    dist_obj.empty().attr("disabled", true);
                }
            }
            prov_obj.html(temp_html);

            // 若有传入省份与市级的值，则选中（setTimeout为兼容IE6而设置）
            setTimeout(function () {
                if (prov_val != null) {
                    prov_obj.val(prov_val);
                    prov_obj.select2().val(prov_val);
                    cityStart();
                    setTimeout(function () {
                        if (city_val != null) {
                            city_obj.val(city_val);
                            city_obj.select2().val(city_val);
                            distStart();
                            setTimeout(function () {
                                if (dist_val != null) {
                                    dist_obj.val(dist_val);
                                    dist_obj.select2().val(dist_val);
                                }
                            }, 1);
                        }
                    }, 1);
                }
            }, 1);

            // 选择省份时发生事件
            prov_obj.bind("change", function () {
                cityStart();
            });

            // 选择市级时发生事件
            city_obj.bind("change", function () {
                distStart();
            });
        };

        // 设置省市json数据
        if (typeof(settings.url) == "string") {
            $.getJSON(settings.url, function (json) {
                city_json = json;
                init();
            });
        } else {
            city_json = settings.url;
            init();
        }
    };
})(jQuery);