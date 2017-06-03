/**
 * Created by hennes on 2017/01/04.
 */
var gameData = [
    {value: "天天飞车", fill: "4.5", refill: "4.6"},
    {value: "天天跑酷", fill: "4.1", refill: "5.0"},
    {value: "天龙八部", fill: "3.7", refill: "4.3"},
    {value: "守护者们", fill: "4.5", refill: "5.2"},
    {value: "热血街霸3D(送春丽)", fill: "4.5", refill: "5.2"},
    {value: "画江湖之灵主（暴力美学指尖感触）", fill: "8.5", refill: "7.2"},
    {value: "神雕侠侣", fill: "7.5", refill: "5.6"}
];


$(function () {
    //当前页
    Hennes.loadNav('../', 'header', 'side_nav3_1');

    //Ajax调用
    $('#auto_complete_ajax').autocomplete({
        serviceUrl: '../json/acAll.json',
        dataType: 'json',
        onSelect: function (suggestion) {
            console.log('游戏：' + suggestion.value + ', 原折扣：' + suggestion.fill + ', 现折扣：' + suggestion.refill);
        }
    });

    //本地调用
    $('#auto_complete_local').autocomplete({
        lookup: gameData,
        onSelect: function (suggestion) {
            console.log('游戏：' + suggestion.value + ', 原折扣：' + suggestion.fill + ', 现折扣：' + suggestion.refill);
        }
    });

});