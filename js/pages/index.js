/**
 * Created by hennes on 2016/11/26.
 */

$(function () {
    //当前页
    Hennes.loadNav('', 'header');

    //page data
    $(window).on('load', function (e) {
        var loading = layer.load(0, {shade: false});
        var $index = $('#index_list'), html = '';

        $.getJSON('json/indexData.json?v=' + new Date, function (data) {
            for(var i = 0, len = data.length; i < len; i++) {
                for(var m = 0; m < data[i].menu.length; m++){
                    html += '<div class="col-sm-4">'
                         + '   <div class="panel panel-default">'
                         + '       <div class="panel-heading">'
                         + '           <h4 class="panel-title">'
                         + '                <i class="glyphicons ' + data[i].menu[m].icoName + ' fn-mr-5"></i>' + data[i].menu[m].title + ''
                         + '           </h4>'
                         + '       </div>'
                         + '       <div class="panel-body">'
                         + '           <div class="media">'
                         + '               <div class="media-left media-middle ' + data[i].menu[m].icoColor + '">'
                         + '                 <i class="glyphicons ' + data[i].menu[m].icoName + '"></i>'
                         + '               </div>'
                         + '               <div class="media-body">'
                         + '                   <p>' + data[i].menu[m].description + '</p>'
                         + '               </div>'
                         + '           </div>'
                         + '       </div>'
                         + '       <div class="panel-footer text-right">'
                         + '           <a class="btn btn-primary btn-sm" href="pages/' + data[i].menu[m].link + '" role="button">了解详情 »</a>'
                         + '       </div>'
                         + '   </div>'
                         + '</div>';
                }
            }

            //添加数据
            $index.append(html);

            //关闭loading
            layer.closeAll('loading');
        });
    });
});