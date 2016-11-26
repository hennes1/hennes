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

        $.getJSON('json/indexData.json', function (data) {
            for(var i = 0, len = data.length; i < len; i++) {
                html += '<div class="col-sm-4">'
                     + '   <div class="panel panel-default">'
                     + '       <div class="panel-heading">'
                     + '           <h4 class="panel-title"><i class="glyphicons ' + data[i].icoName + ' fn-mr-5"></i>' + data[i].title + '</h4>'
                     + '       </div>'
                     + '       <div class="panel-body">'
                     + '           <div class="media">'
                     + '               <div class="media-left media-middle ' + data[i].icoColor + '">'
                     + '                 <i class="glyphicons ' + data[i].icoName + '"></i>'
                     + '               </div>'
                     + '               <div class="media-body">'
                     + '                   <p>' + data[i].description + '</p>'
                     + '               </div>'
                     + '           </div>'
                     + '       </div>'
                     + '       <div class="panel-footer text-right">'
                     + '           <a class="btn btn-primary btn-sm" href="pages/' + data[i].link + '" role="button">了解详情 »</a>'
                     + '       </div>'
                     + '   </div>'
                     + '</div>';
            }

            //添加数据
            $index.append(html);

            //关闭loading
            layer.closeAll('loading');
        });
    });
});