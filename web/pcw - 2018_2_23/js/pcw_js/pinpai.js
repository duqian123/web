/**
 * Created by mayn on 2018/2/23.
 */

$(function () {

    var pinpaiWrapper = document.querySelector('.pinpai-wrapper-hook');
    var pinpaiScroller = document.querySelector('.scroller-hook');
    var cities = $('.cities-hook');
    var shortcut = document.querySelector('.shortcut-hook');

    var scroll,
        shortcutList = [],
        anchorMap = {};

    function initCities() {
        var y = 0,
            titleHeight = 28,
            itemHeight = 50,
            name = "",
            len = 0,
            lists = '',
            en = '<ul>',
            i = 0,
            j = 0;

        $.ajax({
            url: brandList,
            type: "post",
            dataType: "json",
            success: function (res) {
                var l = res.data.length;

                //console.log(res);
                pinpaiData.forEach(function (group) {
                    i++;
                    var name = group.name;
                    //console.log(name);
                    lists += '<div class="title">' + name + '</div>';
                    lists += "<ul class='ul" + i + "'>" ;

                    for (j = 0; j < l; j++) {
                        var t = res.data[j].name;
                        var hhh = ConvertPinyin(t);

                        if (hhh[0].toUpperCase() === name) {
                            group.cities.push({
                                name: res.data[j].name,
                                pinpai_id: res.data[j].id,
                                pinpai_logo: res.data[j].logo
                            });
                        }

                    }
                    group.cities.forEach(function (g) {
                        //console.log(g.pinpai_logo);
                        lists += '<li class="item" data-name="' + g.name + '" data-id="' + g.pinpai_id + '"><span class=" name "><span class="logo"><img src="' + g.pinpai_logo + '" alt=""/></span>' + g.name + '</span></li>';
                    });
                    lists += '</ul>'

                    name = group.name.substr(0, 1);
                    len = group.cities.length;
                    //console.log(len);
                    anchorMap[name] = y;
                    y -= titleHeight + len * itemHeight;
                    en += '<li data-anchor="' + name + '" class="item">' + name + '</li>';
                });

                en += '</ul>';

                cities.append(lists);
                var len2 = $(".pinpai .pinpai-wrapper .cities ul").length;
                $(".cities ul:last-child").append("<li class='item'></li>");
                for(var k = 0;k<len2;k++){
                    var hh = $(".pinpai .pinpai-wrapper .cities ul").eq(k).html();
                    //console.log(hh);
                    if(hh==""){
                        $(".pinpai .pinpai-wrapper .cities ul").eq(k).prev().css("display","none");
                    }
                }
                $(".ul1 .item .name .logo img").css("display","none");

                /*点击品牌发送请求*/
                $(".cities  ul li").on("touchstart",function(){
                    $(this).css("background","#fbfafa");
                });
                $(".cities  ul li").on("touchend",function(){
                    $(this).css("background","#fff");
                });
                (function ($) {
                    $.getUrlParam = function (name) {
                        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                        var r = window.location.search.substr(1).match(reg);
                        if (r != null) return unescape(r[2]);
                        return null;
                    }
                })(jQuery);
                var desc = $.getUrlParam("desc");
                var price_min = $.getUrlParam("price_min");
                var price_max = $.getUrlParam("price_max");
                var scrollTop_h = 0;

                $(".cities  ul li").on("tap",function(){
                    var data_name = $(this).attr("data-name");
                    var data_id = $(this).attr("data-id");
                    console.log(data_name);
                    console.log(data_id);
                    window.localStorage.setItem("pinpai_id",data_id);
                    location.href = choose_car+".html?pinpai="+escape(data_name)+"&pinpai_id="+data_id+"&desc="+desc+"&price_min="+price_min+"&price_max="+price_max+"&scrollTop_h="+scrollTop_h;
                });

                shortcut.innerHTML = en;

                shortcut.style.top = (pinpaiWrapper.clientHeight - shortcut.clientHeight) / 2 + 'px';
                scroll = new window.BScroll(pinpaiWrapper, {
                    probeType: 3
                });

                /*scroll.on('scroll', function (pos) {
                 console.log(Math.round(pos.y));
                 });*/

                scroll.scrollTo(0, 0);


            }
        });
    }

    function bindEvent() {

        var touch = {};
        var firstTouch;

        shortcut.addEventListener('touchstart', function (e) {

            var anchor = e.target.getAttribute('data-anchor');

            firstTouch = e.touches[0];
            touch.y1 = firstTouch.pageY;
            touch.anchor = anchor;
            scrollTo(anchor);

        });

        shortcut.addEventListener('touchmove', function (e) {

            firstTouch = e.touches[0];
            touch.y2 = firstTouch.pageY;

            var anchorHeight = 10;

            var delta = (touch.y2 - touch.y1) / anchorHeight | 0;
            //console.log((touch.y1) +"+++++++++");

            var anchor = shortcutList[shortcutList.indexOf(touch.anchor) + delta];
            //console.log(anchor+"--");
            scrollTo(anchor);

            e.preventDefault();
            e.stopPropagation();

        });

        function scrollTo(anchor) {
            var maxScrollY = pinpaiWrapper.clientHeight - pinpaiScroller.clientHeight;
            //console.log(maxScrollY);
            var y = Math.min(0, Math.max(maxScrollY, anchorMap[anchor]));
            if (typeof y !== 'undefined') {
                scroll.scrollTo(0, y);
            }
        }
    }

    initCities();

    bindEvent();

});
