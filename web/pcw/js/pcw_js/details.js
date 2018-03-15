/**
 * Created by mayn on 2018/2/23.
 */

$(function () {
    var token = window.localStorage.getItem("token");
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
    })(jQuery);

    function jumpToDetailView(url){
        mui.openWindow({
            url:""+url+""

        });
    }

    var pt_id = $.getUrlParam("pt_id");
    console.log(pt_id);
    /*车辆信息*/
    $.ajax({
        url: getCar,
        type: "post",
        data: {
            id: pt_id
        },
        dataType: "json",
        success: function (res) {
            console.log(res);
            var cx = res.data.model.model_name,
                pb = res.data.model.brand.name,
                cl = "";
            if(cx.indexOf(pb)!=-1){
                cl = cx;
            }else {
                cl = pb+" "+cx;
            }
            $(".detail_img").attr("src", res.data.car_imgs);
            $("#clxq .pc_txt span").html("" + cl + " " + res.data.style_name + "");
            $("#clxq .pc_price").children("span").eq(0).children("span").html("" + res.data.gp_price + "");
            $("#clxq .pc_price").children("span").eq(1).children("span").html("" + res.data.price + "");
            $(".ld").html("" + res.data.description + "");
            $(".ld h1").before("<i></i>");
            $(".ld h2").contents().unwrap().wrap('<p>');
            $(".ld h2").before("<i></i>");
            //$(".ld h2").prev("i").remove();


            $(".cha_kan").on("click",function(){
                //?pt_id=18&ym_id=1&desc=null&limit=1&pinpai_name=null&pinpai_id=null&search=&price_max=&price_min=&scrollTop_h=500
                var pt_id = $.getUrlParam("pt_id");
                var desc = $.getUrlParam("desc");
                var limit = $.getUrlParam("limit");
                var pinpai_name = $.getUrlParam("pinpai_name");
                var pinpai_id = $.getUrlParam("pinpai_id");
                var search = $.getUrlParam("search");
                var price_max = $.getUrlParam("price_max");
                var price_min = $.getUrlParam("price_min");
                var scrollTop_h = $.getUrlParam("scrollTop_h");
                location.href = canshu + ".html?pt_id="+pt_id+"&ym_id="+ym_id+"&desc="+desc+"&limit="+limit+"&pinpai_name="+pinpai_name+"&pinpai_id="+pinpai_id+"&search="+search+"&price_max="+price_max+"&price_min="+price_min+"&scrollTop_h="+scrollTop_h;
                //var url = canshu + ".html?pt_id="+pt_id+"&ym_id="+ym_id+"&desc="+desc+"&limit="+limit+"&pinpai_name="+pinpai_name+"&pinpai_id="+pinpai_id+"&search="+search+"&price_max="+price_max+"&price_min="+price_min+"&scrollTop_h="+scrollTop_h;
                //jumpToDetailView(url);
            });


            /*汽车参数*/
            var ss = res.data.car_param_model.params.split("<tbody>");
            //console.log(ss[1]);
            $(".ul_box").append(ss[1]);
            $(".ul_box tr").eq(0).children("td").eq(3).remove();
            $(".ul_box tr").eq(0).children("td").eq(2).remove();
            $(".ul_box tbody").contents().unwrap().wrap('');
            $(".ul_box tr").contents().unwrap("");
            $(".ul_box td").contents().unwrap().wrap('<li>');
            var len = $(".ul_box li").length;
            for (var i = 0; i < len; i++) {
                $(".ul_box li").eq(i).addClass("ui-border-b");
                var t = $(".ul_box li").eq(i).children(".title").text();
                var reg = /：/g;
                $(".ul_box li").eq(i).children(".title").html(t.replace(reg, ""));
            }

            /*收藏*/
            $(".shoucang").click(function () {
                var car_id = res.data.id,
                    car_tit = cl + " " + res.data.style_name,
                    gp_price = res.data.gp_price,
                    price = res.data.price,
                    create_time = res.data.model.create_time.substring(0,10);

                k++;
                if (k == 1) {
                    $(this).find("div").first().css({
                        "background": "url(img/images/xin.png) no-repeat",
                        "background-size": "auto 100%"
                    });
                } else if (k == 2) {
                    ;
                    $(this).find("div").first().css({
                        "background": "url(img/images/list_icon.png) no-repeat",
                        "background-size": "auto 100%"
                    });
                    k = 0;
                }
            });

            /*客服*/
            $.ajax({
                url:getUserInfo,
                type:"post",
                dataType:"json",
                headers: {
                    Authorization: token
                },
                success:function(res){
                    console.log(res);
                    if(res.code==2000){
                        $("#kf").attr("href","tel:"+res.data.services.phone);
                    }
                }
            });
        }
    });

    /*团购时间*/
    var hour = [],
        min = [],
        second = [];
    $.ajax({
        url: groupPurchases,
        type: "post",
        data: {
            car_style_id: pt_id
        },
        dataType: "json",
        success: function (res) {
            console.log(res);
            var li = '<li class="ui-border-b" data-href="#"><div class="userlist"><img class="head_portrait" src="img/images/head_portrait_1.png" onerror="javascript:this.src=' + "'img/images/head_portrait_0.png'" + '"><div class="w_name"><p>网名网名网名</p><p>还差 <span>1人</span> 成团</p></div></div><div class="time-box"><div class="surplus_time"><span>剩余时间</span> <span class="djs" id="h">23</span> <i></i> <span class="djs" id="m">59</span> <i></i> <span class="djs" id="s">59</span></div> <div class="ui-btn-wrap cjpt"><button class="ui-btn ui-btn-danger" >参加拼团</button></div></div></li>';
            var len = res.data.length;


            for (var i = 0; i < len; i++) {
                $("#pt").append(li);

                /*查看拼团*/
                ckpt();

                /*昵称*/
                $("#pt li").eq(i).children("div").eq(0).children("div").children("p").eq(0).html("" + res.data[i].users[0].nick_name + "");
                $("#pt li").eq(i).children("div").eq(0).children("img").attr("src", "" + res.data[i].users[0].logo + "");

                //console.log(res.data[i].users[0].logo);

                /*剩余时间*/
                var time = res.data[i].residue_time;
                hour[i] = parseInt(time / 60 / 60);
                min[i] = parseInt(time / 60 % 60);
                second[i] = parseInt(time % 60);

                hour[i] = checkTime(hour[i]);
                min[i] = checkTime(min[i]);
                second[i] = checkTime(second[i]);

                $("#pt li").eq(i).children("div").eq(1).children("div").children("span").eq(3).html("" + second[i] + "");
                $("#pt li").eq(i).children("div").eq(1).children("div").children("span").eq(2).html("" + min[i] + "");
                $("#pt li").eq(i).children("div").eq(1).children("div").children("span").eq(1).html("" + hour[i] + "");

                //参加拼团
                $("#pt li .cjpt").on("click",function(){
                    //console.log(66666);
                    $(".ui-loading-block").css("display", "none");
                    if(!token){
                        window.location.href = login_one+".html?ym_id="+4+"&foot_id="+3+"&pt_id="+pt_id+"&old_ym_id="+ym_id;
                    }else{
                        window.location.href = count + ".html?show_id=1&pt_id="+pt_id;
                    }
                });
            };
            if ($("#pt li").length < 10) {
                $(".ts span").html("无更多拼团记录");
            };
            function checkTime(i) {

                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }

            setInterval(run, 1000);
            function run() {
                for (var j = 0; j < second.length; j++) {
                    --second[j];
                    second[j] = second[j];
                    if (second[j] < 0) {
                        --min[j];

                        second[j] = 59;
                    } else if (second[j].toString().length < 2) {
                        second[j] = "0" + second[j];
                    }

                    if (min[j] < 0) {
                        --hour[j];

                        min[j] = 59;
                    } else if (min[j].toString().length < 2) {
                        min[j] = "0" + min[j];
                    }

                    if (hour[j] < 0) {
                        second[j] = 0;
                        min[j] = 0;
                    } else if (hour[j].toString().length < 2) {
                        hour[j] = "0" + hour[j];
                    }

                    $("#pt li").eq(j).children("div").eq(1).children("div").children("span").eq(3).html("" + second[j] + "");
                    $("#pt li").eq(j).children("div").eq(1).children("div").children("span").eq(2).html("" + min[j] + "");
                    $("#pt li").eq(j).children("div").eq(1).children("div").children("span").eq(1).html("" + hour[j] + "");
                }
                //console.log(hour+"-"+min+"-"+second);
            }
        }
    });
    /*所有拼团人数*/
    $.ajax({
        url: getTotal,
        type: "post",
        data: {
            car_style_id: pt_id
        },
        dataType: "json",
        success: function (res) {
            //console.log(res.data.total);
            $("#ptrs span").html("" + res.data.total + "");
        }
    });



    /*灰色按钮*/
    $(".car-btn").on("touchstart", function () {
        $(this).attr("class", "car-btn-down");
        $(this).find("button").attr("class", "font_color");
    })
    $(".car-btn").on("touchend", function () {
        $(this).removeClass("car-btn-down");
        $(this).find("button").removeClass("font_color");
        $(this).find("button").find("i").removeClass("font_color");
        $(this).attr("class", "car-btn");
        $(this).find("button").attr("class", "car-btn-txt");
    })
    /*查看全部拼团*/
    function ckpt() {
        var i = 0;
        $("#pt").find("li").eq(1).nextAll("li").css("display", "none");
        $(".ts").css("display", "none");
        $("#userlist_btn").on("click", function () {
            i++;
            if (i == 1) {
                $("#pt").find("li").eq(1).nextAll("li").css("display", "block");
                $(".ts").css("display", "block");
                $(this).find("button").html("收起<i class='ui-icon-unfold'></i>");
                $(this).find("button").find("i").addClass("ui-icon-rotate");
            } else if (i == 2) {
                $("#pt").find("li").eq(1).nextAll("li").css("display", "none");
                $(".ts").css("display", "none");
                $(this).find("button").html("查看全部拼团<i class='ui-icon-unfold'></i>");
                i = 0;
                //$("html,body").animate({scrollTop: $("#pintuan").offset().top}, 500);
                location.href = "#pintuan";
            }
        });
    }

    /*快速加入*/
    $(".footer_ui .jiaru").click(function () {

        if(!token){
            window.location.href = login_one+".html?ym_id="+4+"&foot_id="+3+"&pt_id="+pt_id+"&old_ym_id="+ym_id;
        }else{
            $(".ui-loading-block").css("display", "block");
            $(".ui-loading-block").css("display", "-webkit-box");
            setTimeout(fn, 1500);
        }
    });
    function fn() {
        $(".ui-loading-block").css("display", "none");
        window.location.href = count + ".html?show_id=1&pt_id="+pt_id+"&ym_id="+ym_id;
    }

    /*发起拼团*/
    $(".footer_ui .faqi").click(function () {
        if(!token){
            window.location.href = login_one+".html?ym_id="+4+"&foot_id="+3+"&pt_id="+pt_id+"&old_ym_id="+ym_id;
        }else{
            window.location.href = count + ".html?show_id=2&ym_id="+ym_id+"&pt_id="+pt_id;
        }

    });
    var k = 0;



    /*汽车图片高度*/
    //var w = $(".detail_img").width();
    var img_w = $(".detail_img").width();
    var img_h = $(".detail_img").height();
    var h = img_w / 1.7;
    console.log(img_w + "---" + img_w + "---" + img_h);
    console.log(h);
    $(".detail_img").css("height", h);

    /*添加data-href点击li跳转*/
    $('.ui-list li,.ui-tiled li').click(function () {
        if ($(this).data('href')) {
            location.href = $(this).data('href');
        }
    });

/*//拦截安卓回退按钮
    history.pushState(null, null, location.href);
    window.addEventListener('popstate', function(event) {
        history.pushState(null, null, location.href );
        //此处加入回退时你要执行的代码
        alert("333");
    });*/

    /*$(function(){
        pushHistory();

        window.addEventListener("popstate", function(e) {
            alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
            //window.history.back();
        }, false);
        function pushHistory() {
            var state = {
                title: "title",
                url: "#"
            };

            window.history.pushState(state, "title", "#");
        }
    });*/

    function jumpToDetailView(url){
        mui.openWindow({
            url:""+url+""

        });
    }

    /*返回*/
    var ym_id = parseInt($.getUrlParam("ym_id")),
        old_ym_id = parseInt($.getUrlParam("old_ym_id")),
        st = window.localStorage.getItem("st"),
        st_h = $.getUrlParam("st_h");
    $(".ui-header .fh").on("click", function () {
        //console.log(164343);
        if (history.length == 0) {
            location.href = index + '.html';
        } else if (history.length == 1) {
            history.go(-1);
        } else if (history.length > 1) {
            var p_name = unescape($.getUrlParam("pinpai_name")),
                desc = $.getUrlParam("desc"),
                limit = $.getUrlParam("limit"),
                keywords = unescape($.getUrlParam("search")),
                pinpai_id = $.getUrlParam("pinpai_id"),
                price_min = $.getUrlParam("price_min"),
                price_max = $.getUrlParam("price_max"),
                scrollTop_h = $.getUrlParam("scrollTop_h");
            //console.log(ym_id);
            switch (ym_id) {
                case 0:
                    //console.log(index + ".html");
                    //location.href = index + ".html?st_h="+st_h;
                    var url = index + ".html?st_h="+st_h;
                    jumpToDetailView(url);
                    break;
                case 1:
                    //console.log(1);
                    //location.href = choose_car + ".html?desc="+desc+"&pt_id="+pt_id+"&limit="+limit+"&pinpai="+escape(p_name)+"&search="+escape(keywords)+"&pinpai_id="+pinpai_id+"&price_min="+price_min+"&price_max="+price_max+"&scrollTop_h="+scrollTop_h;//+"&st="+st
                    var url = choose_car + ".html?desc="+desc+"&pt_id="+pt_id+"&limit="+limit+"&pinpai="+escape(p_name)+"&search="+escape(keywords)+"&pinpai_id="+pinpai_id+"&price_min="+price_min+"&price_max="+price_max+"&scrollTop_h="+scrollTop_h;//+"&st="+st
                    jumpToDetailView(url);
                    break;
                /*case 2:
                 console.log(2);
                 location.href = my_pintuan + ".html?pt_id=0";
                 break;
                 case 3:
                 console.log(3);
                 location.href = my + ".html";
                 break;*/
            }
        }
    });
});