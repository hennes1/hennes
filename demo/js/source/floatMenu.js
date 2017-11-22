$(window).on('resize', function () {
    iconFloatFun('floaticon');
}).trigger('resize');

function iconFloatFun(ele) {
    var idrag = true,
        ivclick = true,
        nleft, ntop, disX, disY,
        obj = document.getElementById(ele),
        part = obj.parentNode,
        ww = document.documentElement.clientWidth, // 屏幕宽度
        wh = document.documentElement.clientHeight, // 屏幕高度
        aw = ww - obj.clientWidth, // 图标可移动max
        ah = wh - obj.clientHeight, // 图标可移动max
        toOpacity = ''; //图标透明
    part.style.left = ww - obj.clientWidth + 'px';
    part.style.top = '300px';
    obj.addEventListener('touchstart', iconTouchStart);
    obj.addEventListener('touchend', iconTouchEnd);
    obj.addEventListener('touchmove', iconTouchMove);
    toOpacity = setTimeout(function () {
        iconMoveOut();
    }, 2000);

    function iconTouchStart(e) {
        nleft = parseInt(part.style.left);
        ntop = parseInt(part.style.top);
        disX = e.touches[0].pageX;
        disY = e.touches[0].pageY;
        $(part).removeClass('floaticon-opacity')
        $(part).removeClass('floaticon-anim');
        clearTimeout(toOpacity);
        return false;
    }

    function iconTouchEnd() {
        if (ivclick) {
            // 点击事件
            var mshow = $('.float-menu').css('display')
            if (mshow == 'block') {
                iconMoveOut();
                $('.float-menu').hide();
                idrag = true;
            } else {
                clearTimeout(toOpacity);
                iconMoveIn();
                $('.float-menu').show();
                idrag = false;
            }
        } else {
            // 拖动事件
            iconMoveOut();
        }
        ivclick = true;
    }

    function iconTouchMove(e) {
        if (idrag) {
            ivclick = false;
        }
        e.preventDefault();
        if (idrag) {
            var xl = nleft + e.touches[0].pageX - disX,
                xy = ntop + e.touches[0].pageY - disY,
                xl = xl > 0 ? xl : 0, //左侧边界
                xy = xy > 0 ? xy : 0; //顶部边界
            xl = xl > aw ? aw : xl; //右边边界
            xy = xy > ah ? ah : xy; //底部边界
            part.style.left = xl + 'px';
            part.style.top = xy + 'px';
            return false;
        }
    }

    function iconMoveOut() {
        $(part).addClass('floaticon-anim');
        var floatox = parseInt(part.style.left) < (ww / 2) ? 0 : aw,
            movein = floatox == 0 ? -25 : 25;
        part.style.left = floatox + 'px';

        toOpacity = setTimeout(function () {
            $(part).addClass('floaticon-opacity');
            part.style.left = (floatox + movein) + 'px';
        }, 1000);

        if (floatox == 0) {
            $(part).removeClass('floaticon-right').addClass('floaticon-left');
        } else {
            $(part).removeClass('floaticon-left').addClass('floaticon-right');
        }
    }

    function iconMoveIn() {
        $(part).addClass('floaticon-anim');
        var floatox = parseInt(part.style.left) <= 0 ? 0 : aw;
        part.style.left = floatox + 'px';
    }
}