webpackJsonp([1],{0:function(e,t){},"0ndF":function(e,t){},"5s7L":function(e,t){},"7mC1":function(e,t){var s,a,i,n,r,o,c,l;s=document,a=window,i=540,n=320,r=30,o=s.documentElement,c="orientationchange"in window?"orientationchange":"resize",l=function(){var e=o.clientWidth;e&&(e>=n&&e<=i?o.style.fontSize=r*(e/i)+"px":e>i?o.style.fontSize=r+"px":e<n&&(o.style.fontSize=r*(n/i)+"px"))},s.addEventListener&&(a.addEventListener(c,l,!1),s.addEventListener("DOMContentLoaded",l,!1))},"7vCu":function(e,t){},"G/2H":function(e,t){e.exports="data:image/gif;base64,R0lGODlhAQABAIAAAPHx8QAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="},GO6n:function(e,t){},M5I3:function(e,t){},NHnr:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});s("dNEa");var a=s("7+uW"),i={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"main",attrs:{id:"scroll_main"}},[t("keep-alive",[this.$route.meta.keepAlive?t("router-view"):this._e()],1),this._v(" "),this.$route.meta.keepAlive?this._e():t("router-view")],1)},staticRenderFns:[]};var n=s("VU/8")({name:"app"},i,!1,function(e){s("M5I3")},null,null).exports,r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"user-center-lay-wrap"},[s("div",{staticClass:"user-center-lay"},[s("span",{staticClass:"i-48 i-user float-img",on:{click:e.hideShow}}),e._v(" "),s("div",{staticClass:"user-center-ul"},[s("router-link",{staticClass:"user-center-item wp",attrs:{to:"/home",tag:"a"}},[s("i",{staticClass:"i-36 i-wp user-center-ico"}),e._v(" "),s("span",[e._v("玩票：")]),e._v(" "),s("span",{staticClass:"wp-price"},[e._v("0")])]),e._v(" "),s("router-link",{staticClass:"user-center-item",attrs:{to:"/home",tag:"a"}},[s("i",{staticClass:"i-36 i-order user-center-ico"}),e._v(" "),s("span",[e._v("我的订单")]),e._v(" "),s("label",{staticClass:"unpay",staticStyle:{display:"none"}},[e._v("（待付款 "),s("span",{staticClass:"unpay-num"},[e._v("0")]),e._v("）")])]),e._v(" "),s("router-link",{staticClass:"user-center-item",attrs:{to:"/home",tag:"a"}},[s("i",{staticClass:"i-36 i-set user-center-ico"}),e._v(" "),s("span",[e._v("修改登录密码")])]),e._v(" "),s("router-link",{staticClass:"user-center-item",attrs:{to:"/home",tag:"a"}},[s("i",{staticClass:"i-36 i-help user-center-ico"}),e._v(" "),s("span",[e._v("帮助中心")])]),e._v(" "),s("p",{staticClass:"user-center-item",attrs:{id:"user_logout"},on:{click:e.exit}},[s("i",{staticClass:"i-36 i-exit user-center-ico"}),e._v(" "),s("span",{staticClass:"exit-tx"},[e._v("退出")]),e._v(" "),s("span",{staticClass:"user_tel"},[e._t("default")],2)])],1)]),e._v(" "),s("div",{staticClass:"user-center-lay-bg",on:{click:e.hideShow}})])},staticRenderFns:[]};var o=s("VU/8")({name:"userCenter",methods:{hideShow:function(){this.$emit("hideShow")},exit:function(){this.$emit("exit")}}},r,!1,function(e){s("NtoU")},"data-v-19d9b378",null).exports,c={render:function(){var e=this.$createElement,t=this._self._c||e;return t("swiper",{attrs:{options:this.swiperOption}},[this._l(this.swiperSlides,function(e,s){return t("swiper-slide",{key:s},[t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.face,expression:"slide.face"}],staticClass:"slide-face",attrs:{alt:e.title}})])}),this._v(" "),t("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2)},staticRenderFns:[]};var l=s("VU/8")({name:"carousel",props:["swiperSlides"],data:function(){return{swiperOption:{autoplay:{delay:3e3,disableOnInteraction:!1},pagination:{el:".swiper-pagination"}}}}},c,!1,function(e){s("7vCu")},"data-v-49efaa39",null).exports,u={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"notice-cont"},[s("swiper",{staticClass:"notice-swiper",attrs:{options:e.swiperOption}},[e._l(e.noticeSlides,function(t,a){return s("swiper-slide",{key:a,domProps:{textContent:e._s(t)}})}),e._v(" "),s("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2)],1)},staticRenderFns:[]};var d=s("VU/8")({name:"noticeCarousel",props:["noticeSlides"],data:function(){return{swiperOption:{direction:"vertical",autoplay:{delay:2e3,disableOnInteraction:!1},pagination:{el:".swiper-pagination"}}}}},u,!1,function(e){s("5s7L")},"data-v-2669d296",null).exports,m={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"circle-loader"},[s("div",{staticClass:"circle-line"},[s("div",{staticClass:"circle circle-blue"}),e._v(" "),s("div",{staticClass:"circle circle-blue"}),e._v(" "),s("div",{staticClass:"circle circle-blue"})]),e._v(" "),s("div",{staticClass:"circle-line"},[s("div",{staticClass:"circle circle-yellow"}),e._v(" "),s("div",{staticClass:"circle circle-yellow"}),e._v(" "),s("div",{staticClass:"circle circle-yellow"})]),e._v(" "),s("div",{staticClass:"circle-line"},[s("div",{staticClass:"circle circle-red"}),e._v(" "),s("div",{staticClass:"circle circle-red"}),e._v(" "),s("div",{staticClass:"circle circle-red"})]),e._v(" "),s("div",{staticClass:"circle-line"},[s("div",{staticClass:"circle circle-green"}),e._v(" "),s("div",{staticClass:"circle circle-green"}),e._v(" "),s("div",{staticClass:"circle circle-green"})])])])}]};var v=s("VU/8")(null,m,!1,function(e){s("ibkl")},"data-v-5a12ba95",null).exports,p=function(e){var t="";switch(e){case"hot":t="热门推荐";break;case"new":t="新游推荐";break;case"trend":t="潮流口袋必备";break;case"standalone":t="单机游戏";break;case"recharge":t="充值钜惠"}return t},g=(s("lONR"),s("v2ns"),"https://hennes1.github.io/hennes/images/vue/"),h={data:function(){return{title:"首页",games:[],sliders:[{face:g+"/index/01.jpg",title:"图片1"},{face:g+"/index/02.jpg",title:"图片2"},{face:g+"/index/03.jpg",title:"图片3"},{face:g+"/index/04.jpg",title:"图片4"}],hot:["妖游记","勇士之轮","少女前线","妲己传"],notice:["平台游戏下架通知","双十一来临，你的钱包准备好了吗？","VUE的确是一个不错的框架，很强大！","用Swiper做文字滚动看行不行？"],loading:!0,isOpen:!1,isLogin:parseInt(localStorage.getItem("isLogin"))||0}},created:function(){this.getCategoryGames()},mounted:function(){window.addEventListener("scroll",this.handleScroll,!0)},methods:{openLay:function(){this.isLogin>0?this.isOpen=!this.isOpen:this.$router.push("/login")},hideShow:function(){this.isOpen=!1},exit:function(){this.isOpen=!1,this.isLogin=0,localStorage.setItem("isLogin","0"),localStorage.removeItem("currUser")},categoryName:function(e){return p(e)},getCategoryGames:function(){var e=this;this.$http.get("/api/games").then(function(t){(t=t.body)&&(e.loading=!1,e.games=t)})},readNum:function(e,t){return e.slice(0,t)},handleScroll:function(){var e=this.$refs.fixHead,t=e.offsetHeight;document.getElementById("scroll_main").scrollTop>=t?(e.removeAttribute("class"),e.setAttribute("class","fix-head-scroll")):(e.removeAttribute("class"),e.setAttribute("class","fix-head-fixed"))},gameFace:function(e){return g+e},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)}},computed:{currName:function(){var e=localStorage.getItem("currUser")||"";return e.substr(0,parseInt(e.split("").length/3))+"****"+e.substr(parseInt(e.split("").length/2+3),e.split("").length)}},components:{userCenter:o,Swiper:l,"notice-swiper":d,Loading:v}},f={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{directives:[{name:"title",rawName:"v-title",value:e.title,expression:"title"}],staticClass:"index-contain"},[s("div",{ref:"fixHead",staticClass:"fix-head-fixed",attrs:{id:"fix_head"}},[s("div",{staticClass:"head-search"},[s("i",{staticClass:"i-36 i-sear"}),e._v(" "),s("div",{staticClass:"hd-search-inner"},[s("notice-swiper",{attrs:{noticeSlides:e.hot}})],1)]),e._v(" "),s("span",{staticClass:"hd-user",on:{click:e.openLay}},[s("i",{staticClass:"i-48 i-user hd-img"})])]),e._v(" "),s("userCenter",{directives:[{name:"show",rawName:"v-show",value:e.isOpen,expression:"isOpen"}],on:{hideShow:e.hideShow,exit:e.exit}},[e._v(e._s(e.currName))]),e._v(" "),s("div",{staticClass:"swiper-main"},[s("Swiper",{attrs:{swiperSlides:e.sliders}})],1),e._v(" "),s("div",{staticClass:"notice bt-bd",attrs:{id:"notice"}},[s("i",{staticClass:"i-48 i-notice"}),e._v(" "),s("notice-swiper",{attrs:{noticeSlides:e.notice}}),e._v(" "),s("router-link",{staticClass:"notice-more",attrs:{to:"/notice"}},[s("i",{staticClass:"i-36 i-more"})])],1),e._v(" "),e.loading?s("Loading"):e._l(e.games,function(t,a){return s("div",{staticClass:"page-contain bt-bd"},[s("div",{staticClass:"page-head"},[s("div",{staticClass:"page-title"},[s("i",{staticClass:"v-line"}),e._v(" "),s("h2",{staticClass:"page-tle"},[e._v(e._s(e.categoryName(t.category)))]),e._v(" "),s("router-link",{key:a,staticClass:"a-more",attrs:{to:{name:"game",params:{category:t.category}}}},[e._v("\n\t\t\t\t\t\t更多"),s("i",{staticClass:"i-36 i-more"})])],1)]),e._v(" "),s("div",{staticClass:"page-body"},[s("div",{staticClass:"page-wrap"},[s("ul",e._l(e.readNum(t.list,6),function(a,i){return s("li",[s("router-link",{key:i,staticClass:"a-game",attrs:{to:{name:"detail",params:{category:t.category,id:a.id}}}},[a.discount>0?s("span",{staticClass:"sale-tx"},[e._v("首充"+e._s(a.discount)+"折")]):e._e(),e._v(" "),s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.gameFace(a.face),expression:"gameFace(game.face)"}],staticClass:"lazy",attrs:{alt:a.name,width:"3.5rem",height:"3.5rem"}}),e._v(" "),s("h6",{staticClass:"page-name ellipsis"},[e._v(e._s(a.name))]),e._v(" "),s("p",{staticClass:"page-info ellipsis"},[e._v(e._s(a.description))])])],1)}))])])])})],2)},staticRenderFns:[]},_=s("VU/8")(h,f,!1,null,null,null).exports,C=s("Gu7T"),y=s.n(C),w={data:function(){return{isOpen:!1,isLogin:parseInt(localStorage.getItem("isLogin"))||0}},props:{isBack:{type:Boolean,default:!0}},methods:{goBack:function(){this.$router.go(-1)},openLay:function(){this.isLogin>0?this.isOpen=!this.isOpen:this.$router.push("/login")},hideShow:function(){this.isOpen=!1},exit:function(){this.isOpen=!1,this.isLogin=0,localStorage.setItem("isLogin","0"),localStorage.removeItem("currUser")}},computed:{currName:function(){var e=localStorage.getItem("currUser")||"";return e.substr(0,parseInt(e.split("").length/3))+"****"+e.substr(parseInt(e.split("").length/2+3),e.split("").length)}},components:{userCenter:o}},x={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"head-wrap"},[s("header",{staticClass:"header"},[e.isBack?s("span",{staticClass:"hd-left",on:{click:e.goBack}},[e._m(0)]):e._e(),e._v(" "),s("span",{staticClass:"hd-name"},[e._t("default")],2),e._v(" "),s("span",{staticClass:"hd-right",on:{click:e.openLay}},[e._m(1)])]),e._v(" "),s("userCenter",{directives:[{name:"show",rawName:"v-show",value:e.isOpen,expression:"isOpen"}],on:{hideShow:e.hideShow,exit:e.exit}},[e._v(e._s(e.currName))])],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("em",{attrs:{id:"head_back"}},[t("i",{staticClass:"i-48 i-left hd-img"})])},function(){var e=this.$createElement,t=this._self._c||e;return t("em",{attrs:{id:"user_center"}},[t("i",{staticClass:"i-48 i-user hd-img"})])}]};var A=s("VU/8")(w,x,!1,function(e){s("0ndF")},"data-v-0781d823",null).exports,b={data:function(){return{games:[],offset:0,hasMore:!0,isLoading:!1}},created:function(){this.moreGame()},methods:{getCategoryGames:function(){var e=this;this.$http.get("/api/games",{params:{category:this.categoryName}}).then(function(t){t=t.body,e.games=t}).catch(function(e){console.log(e)})},moreGame:function(){var e=this;this.hasMore&&!this.isLoading?(this.isLoading=!0,this.$http.get("/api/page",{params:{category:this.categoryName,offset:this.offset}}).then(function(t){var s=t=t.body,a=s.games,i=s.hasMore;e.hasMore=i,e.isLoading=!1,e.games=[].concat(y()(e.games),y()(a)),e.offset=e.games.length}).catch(function(e){console.log(e)})):this.isLoading=!0},gameFace:function(e){return"https://hennes1.github.io/hennes/images/vue/"+e}},computed:{categoryName:function(){return this.$route.params.category},categoryZHName:function(){var e=this.$route.params.category;return p(e)}},components:{Header:A}},L={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{directives:[{name:"title",rawName:"v-title",value:e.categoryZHName,expression:"categoryZHName"}],staticClass:"category-contain pd-top"},[s("Header",[e._v(e._s(e.categoryZHName))]),e._v(" "),s("div",{staticClass:"page-contain"},[s("div",{staticClass:"page-body"},[s("div",{staticClass:"page-wrap"},[s("ul",e._l(e.games,function(t,a){return s("li",[s("router-link",{key:a,staticClass:"a-game",attrs:{to:{name:"detail",params:{category:e.categoryName,id:t.id}}}},[s("span",{directives:[{name:"show",rawName:"v-show",value:t.discount>0,expression:"game.discount > 0"}],staticClass:"sale-tx"},[e._v("首充"+e._s(t.discount)+"折")]),e._v(" "),s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.gameFace(t.face),expression:"gameFace(game.face)"}],staticClass:"lazy",attrs:{alt:t.name,width:"3.5rem",height:"3.5rem"}}),e._v(" "),s("h6",{staticClass:"page-name ellipsis"},[e._v(e._s(t.name))]),e._v(" "),s("p",{staticClass:"page-info ellipsis"},[e._v(e._s(t.description))])])],1)}))])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.hasMore,expression:"hasMore"}],staticClass:"moreBtn",on:{click:e.moreGame}},[e._v("加载更多")])])],1)},staticRenderFns:[]};var $=s("VU/8")(b,L,!1,function(e){s("hhhe")},"data-v-2722a004",null).exports,S={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"page-contain bt-bd recharge"},[t("div",{staticClass:"page-head"},[t("div",{staticClass:"page-title"},[t("i",{staticClass:"v-line"}),this._v(" "),t("h2",{staticClass:"page-tle"},[this._t("default")],2)])]),this._v(" "),this._m(0)])},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"page-body"},[s("div",{staticClass:"page-inner"},[e._v("\n            充值成功后，充值金额将以"),s("u",[e._v("代金券")]),e._v("形式发到您的游戏账号下。"),s("u",[e._v("代金券")]),e._v("可以在游戏内付费时抵扣等值的现金。\n            "),s("strong",[e._v("查看代金券：")]),e._v("\n            在游戏里 点击浮窗 — 访问个人中心 — 查看“我的代金券”\n            "),s("strong",[e._v("使用代金券：")]),e._v("\n            在游戏里 选择要购买的商品—支付时选择使用代金券—完成支付\n        ")])])}]};var k={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"page-contain play-tickets"},[t("div",{staticClass:"page-head"},[t("div",{staticClass:"page-title"},[t("i",{staticClass:"v-line"}),this._v(" "),t("h2",{staticClass:"page-tle"},[this._t("default")],2)])]),this._v(" "),this._m(0)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"page-body"},[t("div",{staticClass:"page-inner"},[this._v("\n            玩票是朋友玩的虚拟货币，对任意游戏进行充值时可抵扣现金，玩票只能通过平台活动获得。\n        ")])])}]};var I={data:function(){return{user:{name:"",pwd:""},game:{},moneyArr:[6,30,98,198,648],shown:!1,moneyIpt:0,isLogin:parseInt(localStorage.getItem("isLogin"))||0}},filters:{toFixed:function(e,t){return e.toFixed(t)}},created:function(){this.getGame()},methods:{changeMoney:function(e,t,s,a){var i=document.getElementById("curr_money"),n=document.getElementById("old_money"),r=this.moneyIpt,o=Number(this.moneyArr[s]).toFixed(2),c=a?r<=0||""===r?0:Number(r).toFixed(2):o;if(void 0!==t&&(i.innerText=t>0?Number(c*t).toFixed(2):Number(c).toFixed(2),n.innerText="原价： ¥"+c,!a)){var l=document.querySelector(".money-item.selected");l&&l.classList.toggle("selected"),e.currentTarget.classList.toggle("selected"),this.shown=!1,this.moneyIpt=0}},getGame:function(){var e=this;this.$http.get("/api/detail",{params:{category:this.category,id:this.gameId}}).then(function(t){t=t.body,e.game=t}).catch(function(e){console.log(e)})},moneyTotal:function(e){var t=this.moneyArr;if(void 0!==e)return e>0?(e*t[t.length-1]).toFixed(2):t[t.length-1]},showHideIpt:function(e){this.shown=!0;var t=document.querySelector(".money-item.selected");t&&t.classList.toggle("selected"),e.currentTarget.classList.toggle("selected")},gameFace:function(e){return"https://hennes1.github.io/hennes/images/vue/"+e}},computed:{category:function(){return this.$route.params.category},gameId:function(){return this.$route.params.id}},components:{Header:A,RechargeTx:s("VU/8")(null,S,!1,function(e){s("n/FO")},"data-v-ae2fe2bc",null).exports,TicketsTx:s("VU/8")(null,k,!1,function(e){s("vj4i")},"data-v-e2a813a8",null).exports}},N={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{directives:[{name:"title",rawName:"v-title",value:e.game.name,expression:"game.name"}],staticClass:"detail-cont pd-top"},[s("Header",[e._v(e._s(e.game.name))]),e._v(" "),s("div",{staticClass:"page-contain"},[s("div",{staticClass:"page-body"},[s("div",{staticClass:"page-inner game-detail"},[s("div",{staticClass:"game-bg",style:{backgroundImage:"url("+e.gameFace(e.game.face)+")"}}),e._v(" "),s("div",{staticClass:"game-basic"},[s("div",{staticClass:"game-unit"},[s("img",{staticClass:"lazy",attrs:{src:e.gameFace(e.game.face),alt:e.game.name,width:"4rem",height:"4rem"}}),e._v(" "),s("span",{staticClass:"game-down"},[e._v("下载")])]),e._v(" "),s("div",{staticClass:"game-about"},[s("h3",[e._v(e._s(e.game.name))]),e._v(" "),s("p",[e._v(e._s(e.game.capacity))]),e._v(" "),s("div",{staticClass:"game-introduction"},[e._v(e._s(e.game.introduction))])])])])])]),e._v(" "),s("div",{staticClass:"page-contain bt-bd"},[s("div",{staticClass:"page-body"},[s("div",{staticClass:"page-inner"},[s("div",{staticClass:"game-money"},[e._l(e.moneyArr,function(t,a){return s("span",{staticClass:"money-item",on:{click:function(t){t.stopPropagation(),e.changeMoney(t,e.game.discount,a)}}},[e._v("\n                        ¥ "),s("i",[e._v(e._s(t))])])}),e._v(" "),s("span",{staticClass:"money-item",on:{click:function(t){t.stopPropagation(),e.showHideIpt(t)}}},[s("b",{directives:[{name:"show",rawName:"v-show",value:!e.shown,expression:"!shown"}]},[e._v("其它金额")]),e._v(" "),s("input",{directives:[{name:"show",rawName:"v-show",value:e.shown,expression:"shown"},{name:"model",rawName:"v-model",value:e.moneyIpt,expression:"moneyIpt"},{name:"focus",rawName:"v-focus"}],attrs:{type:"number",min:"0",max:"9"},domProps:{value:e.moneyIpt},on:{keyup:function(t){t.stopPropagation(),e.changeMoney(t,e.game.discount,9,"money")},input:function(t){t.target.composing||(e.moneyIpt=t.target.value)}}})])],2),e._v(" "),s("div",{staticClass:"game-pay"},[s("div",{staticClass:"game-price"},[e._v("\n                        实付款：\n                        "),s("div",{staticClass:"pay-num"},[s("small",[e._v("¥")]),e._v(" "),s("span",{attrs:{id:"curr_money"}},[e._v(e._s(e.moneyTotal(e.game.discount)))]),e._v(" "),s("s",{attrs:{id:"old_money"}},[e._v("原价： ¥"+e._s(e._f("toFixed")(e.moneyArr[4],2)))])])]),e._v(" "),e.isLogin>0?s("button",{staticClass:"game-pay-btn"},[e._v("充值")]):s("router-link",{staticClass:"login-btn",attrs:{to:"/login"}},[e._v("登录")])],1)])])]),e._v(" "),s("RechargeTx",[e._v("充值说明")]),e._v(" "),s("TicketsTx",[e._v("玩票说明")])],1)},staticRenderFns:[]};var F=s("VU/8")(I,N,!1,function(e){s("mAkC")},"data-v-3ca71ac4",null).exports,E=s("mvHQ"),O=s.n(E),U={data:function(){return{title:"登录/注册",user:[],isLogin:parseInt(localStorage.getItem("isLogin"))||0,userStorage:JSON.parse(localStorage.getItem("userLogin"))||null}},methods:{checkForm:function(e){var t=document.getElementById("user_name"),s=document.getElementById("user_pwd"),a=this.user.name,i=this.user.pwd;if(!a)return this.$Layer("请输入手机号"),t.focus(),!1;if(!this.validPhone(a))return this.$Layer("请输入正确的手机号"),t.focus(),!1;if(!i)return this.$Layer("请输入用户密码"),s.focus(),!1;if(!this.validChart(i))return this.$Layer("密码格式：数字+字母，数字+特殊字符，字母+特殊字符，数字+字母+特殊字符",3e3),s.focus(),!1;var n={name:a,pwd:i},r=this;if(this.userStorage){var o=r.userStorage.some(function(e){return e.name===n.name&&e.pwd===n.pwd}),c=r.userStorage.some(function(e){return e.name===n.name&&e.pwd!==n.pwd});if(o)this.$Layer("成功登录");else{if(c)return this.$Layer("该账号已注册过"),!1;this.$Layer("注册成功并登录"),r.userStorage.push(n),localStorage.setItem("userLogin",O()(r.userStorage))}r.isLogin=1,localStorage.setItem("isLogin","1"),localStorage.setItem("currUser",n.name),setTimeout(function(){r.$router.go("-1")},1200)}else this.$Layer("注册成功并登录"),this.user.push(n),localStorage.setItem("userLogin",O()(this.user)),this.isLogin=1,localStorage.setItem("isLogin","1"),localStorage.setItem("currUser",n.name),setTimeout(function(){r.$router.go("-1")},1200);e.preventDefault()},validChart:function(e){return/^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,18}$/.test(e)},validPhone:function(e){return/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/.test(e)},press:function(){var e=event.keyCode;event.returnValue=e>=48&&e<=57}}},H={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{directives:[{name:"title",rawName:"v-title",value:e.title,expression:"title"}],staticClass:"category-contain pd-top"},[s("div",{staticClass:"page-contain"},[s("div",{staticClass:"page-body"},[s("h5",{staticClass:"form-tle"},[e._v("登录/注册")]),e._v(" "),s("div",{staticClass:"form-panel"},[s("p",{directives:[{name:"sysFocus",rawName:"v-sysFocus"}],staticClass:"form-item"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.user.name,expression:"user.name",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",id:"user_name",placeholder:"请输入手机号作为用户名",maxlength:"11"},domProps:{value:e.user.name},on:{keypress:e.press,input:function(t){t.target.composing||e.$set(e.user,"name",t.target.value.trim())},blur:function(t){e.$forceUpdate()}}})]),e._v(" "),s("p",{directives:[{name:"sysFocus",rawName:"v-sysFocus"}],staticClass:"form-item"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.user.pwd,expression:"user.pwd",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"password",id:"user_pwd",maxlength:"18",minlength:"6",placeholder:"请输入用户密码",autocomplete:"off"},domProps:{value:e.user.pwd},on:{input:function(t){t.target.composing||e.$set(e.user,"pwd",t.target.value.trim())},blur:function(t){e.$forceUpdate()}}})]),e._v(" "),s("p",{staticClass:"explain"},[e._v("如果是第一次登录本网站，注册即登录。")]),e._v(" "),s("p",{staticClass:"form-item"},[s("button",{staticClass:"form-btn",on:{click:e.checkForm}},[e._v("登录")])])])])])])},staticRenderFns:[]};var R=s("VU/8")(U,H,!1,function(e){s("PjOd")},"data-v-7e189263",null).exports,B=s("/ocq"),T=s("8+8L");a.a.use(B.a),a.a.use(T.a);var z=new B.a({routes:[{path:"/",redirect:"/home"},{path:"/home",component:_,meta:{keepAlive:!0}},{path:"/game/:category",component:$,name:"game"},{path:"/detail/:category/:id",component:F,name:"detail",meta:{auth:0}},{path:"/login",component:R}]}),G=(a.a.directive("title",function(e,t){document.title=t.value||t.expression}),a.a.directive("focus",function(e){e.focus()}),a.a.directive("sysFocus",function(e){var t=e.querySelector("input");t.onfocus=function(){t.style.borderColor="#FFBC00"},t.onblur=function(){t.style.borderColor="#D1D1D1"}}),s("7mC1"),s("POcy")),P=s.n(G),V=s("cTzj"),M=s.n(V),j=s("ULxA"),D=s.n(j),Z=s("G/2H"),Q=s.n(Z),q=s("7QTg"),J=s.n(q),W={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{directives:[{name:"show",rawName:"v-show",value:this.show,expression:"show"}],staticClass:"layer"},[this._v(this._s(this.msg))])},staticRenderFns:[]};var K=s("VU/8")(null,W,!1,function(e){s("GO6n")},"data-v-9a1612fc",null).exports,X=a.a.extend(K);function Y(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,s=new X({el:document.createElement("div"),data:function(){return{msg:e,show:!0}}});document.body.appendChild(s.$el),setTimeout(function(){s.show=!1},t)}var ee=function(){a.a.prototype.$Layer=Y};a.a.use(P.a),a.a.use(M.a,{preLoad:1.3,error:D.a,loading:Q.a,attempt:1}),a.a.use(J.a),a.a.use(ee),new a.a({router:z,el:"#app",render:function(e){return e(n)}})},NtoU:function(e,t){},PjOd:function(e,t){},ULxA:function(e,t){e.exports="data:image/gif;base64,R0lGODlhAQABAIAAAP4EBAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="},dNEa:function(e,t){},hhhe:function(e,t){},ibkl:function(e,t){},lONR:function(e,t){},mAkC:function(e,t){},"n/FO":function(e,t){},v2ns:function(e,t){},vj4i:function(e,t){}},["NHnr"]);