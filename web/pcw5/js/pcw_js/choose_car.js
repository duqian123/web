/**
 * Created by mayn on 2018/2/23.
 */

//定义获取车辆数据的参数变量
var bool = true,
    limit = 1,//页数
    orderBy = "",//团购指导价
    desc = "",//排序方式
    pinpai_name = "",//品牌名称
    pinpai_id = "",//品牌id
    price_min = "",//价格区间最小值
    price_max = "",//价格区间最大值
    keywords = "",//搜索关键字
    fh_name = "",//详情返回品牌名称
    lim = 0,
    foot_id = 0;

var scrollTop_h = 0;
/*获取url传参*/
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})(jQuery);

// fh_name = unescape($.getUrlParam("fh_name"));
keywords = unescape($.getUrlParam("search"));//获取传递的搜索关键字
pinpai_name = unescape($.getUrlParam("pinpai"));//获取传递的品牌名称
pinpai_id = $.getUrlParam("pinpai_id");//获取传递的品牌ID
desc = $.getUrlParam("desc");//获取传递的排序方式
price_min = $.getUrlParam("price_min");//获取传递的最小值
price_max = $.getUrlParam("price_max");//获取传递的最大值
lim = $.getUrlParam("limit");//获取传递的最大值

/*console.log(pinpai_name+"-"+pinpai_id+"-"+desc+"-"+price_min+"-"+price_max);
console.log(pinpai_name=="null");
console.log(pinpai_id=="null");
console.log(price_min==null);
console.log(price_max==null);
console.log(desc==null);
console.log(keywords=="null");
console.log(lim==null);
console.log(lim);*/

var token = window.localStorage.getItem("token");//从本地获取token值
var st = window.localStorage.getItem("st");//从本地获取滑动的距离

/*从详情页返回时传过来的参数*/
/*var search_ = unescape($.getUrlParam("search"));
 pinpai_name = unescape($.getUrlParam("pinpai"));
 //var pinpai_id = window.localStorage.getItem("pinpai_id");

 var fh_name = unescape($.getUrlParam("fh_name"));
 var li = window.localStorage.getItem("hc");

 var ph = $.getUrlParam("ph");
 var pt_id = $.getUrlParam("pt_id");
 var lim = $.getUrlParam("limit");
 var pp = $.getUrlParam("pp");
 */


//滚动加载
$(document).ready(function () {
    var _li = $(".ui-container .choose_car_content").html();
    /*console.log(_li==""&&
    ((desc==""||desc==null)&&
    (pinpai_name==""||pinpai_name=="null")&&
    (pinpai_id==""||pinpai_id==null)&&
    (price_min==""||price_min==null)&&
    (price_max==""||price_max==null)&&
    (keywords==""||keywords=="null")));*/
    if(_li==""&&
        ((desc==""||desc==null)&&
        (pinpai_name==""||pinpai_name=="null")&&
        (pinpai_id==""||pinpai_id==null)&&
        (price_min==""||price_min==null)&&
        (price_max==""||price_max==null)&&
        (keywords==""||keywords=="null")&&
        (lim==0||lim==null)))
    {
        //console.log(333);

        keywords="";
        price_min="";
        price_max="";
        one_data();
        //console.log(444);
    }

    //顶部导航点击事
    //默认排序点击事件
    $("#mrpx").on("click",function() {

        /*价格区间的隐藏样式*/
        jgyc();
        var bx = $("#jgqj").html();
        //console.log(bx);
        if (bx == "<span></span><span></span>不限价格<i></i>"||bx=='<span></span><span></span>不限价格<i class="img"></i>'||bx=='价格区间<i class="img"></i>'||bx=='价格区间<i></i>') {
            $(".choose_car_nav>ul li:eq(2) a i").removeAttr("class");
            $("#jgqj").css("color", "#000");
        }else{
            $(".choose_car_nav>ul").children("li").eq(2).children("a").css("color", "#ff5936");
            $(".choose_car_nav>ul").children("li").eq(2).children("a").children("i").addClass("img");
        }

        var px_hide = $(".paixu").attr("style");
        if(px_hide=="display: none;"){
            $(".paixu").attr("style","display: block;");
            $(".choose_car_nav>ul").children("li").eq(0).children("a").css("color", "#ff5936");
            $(".choose_car_nav>ul").children("li").eq(0).children("a").children("i").addClass("img");
        }else{
            $(".paixu").attr("style","display: none;");
            $(".choose_car_nav>ul").children("li").eq(0).children("a").css("color", "#000");
            $(".choose_car_nav>ul").children("li").eq(0).children("a").children("i").removeClass("img");
        }

        $(".paixu ul li").on("click",function(){
            var px_desc = $(this).html();
            //console.log(px_desc);
            if(px_desc=="最低价排序"){
                px_desc="最低价...";
                orderBy="gp_price";
                desc="asc";
                $(".choose_car_content li").remove();
                limit=1;
                $("#md").css("top","45px");
                window.location.hash = "#md";
                one_data();
            }else if(px_desc=="最高价排序"){
                px_desc="最高价...";
                orderBy="gp_price";
                desc="desc";
                $(".choose_car_content li").remove();
                limit=1;
                $("#md").css("top","45px");
                window.location.hash = "#md";
                one_data();
            }
            $("#mrpx").html(px_desc+"<i class='img'></i>");
            $(".paixu").attr("style","display: none;");

            if(px_desc=="默认排序"){
                $(".choose_car_nav>ul").children("li").eq(0).children("a").css("color", "#000");
                $(".choose_car_nav>ul").children("li").eq(0).children("a").children("i").removeClass("img");
                orderBy="";
                desc="";
                $(".choose_car_content li").remove();
                limit=1;
                $("#md").css("top","45px");
                window.location.hash = "#md";
                one_data();
            }
            //解除click绑定事件避免重复请求
            $(".paixu ul li").unbind();
        });

    });


    //console.log(pinpai_name+"-"+pinpai_id+"-"+desc+"-"+price_min+"-"+price_max);

    //判定返回的排序参数是否为空
    var li = window.localStorage.getItem("hc");
    if((desc!=""||desc!=null)){
        if(desc=="asc"){
            px_desc="最低价...";
            $("#mrpx").html(px_desc+"<i class='img'></i>");
            $(".choose_car_nav>ul").children("li").eq(0).children("a").css("color", "#ff5936");
            $(".choose_car_content li").remove();
            orderBy = "gp_price";
            desc=="asc"
            limit = parseInt(lim)+1;

            //判定返回的品牌id参数是否为空
            if(pinpai_id == "null"||pinpai_id == ""){
                pinpai_id = "";
            }

            //one_data();
            $(".choose_car_content").html(li);
            //st = window.localStorage.setItem("st","45");
            scrollTop_h = $.getUrlParam("scrollTop_h");
            var top_h = (parseInt(scrollTop_h)+$(window).height())-100;
            //console.log(top_h);
            $("#md").css("top",parseInt(scrollTop_h)+"px");
            window.location.hash = "#md";
            fn();

            if(keywords=="null"){
                keywords="";
                //console.log(keywords);
            }else if(keywords!="null"&&keywords!=""){
                pinpai_id = "";

                if(lim == null){
                    limit = 0;
                    //console.log(lim == null);
                    $(".choose_car_content li").remove();
                    askData();
                    $("#md").css("top","0px");
                    window.location.hash = "#md";

                }


            }
        }else if(desc =="desc"){
            px_desc="最高价...";
            $("#mrpx").html(px_desc+"<i class='img'></i>");
            $(".choose_car_nav>ul").children("li").eq(0).children("a").css("color", "#ff5936");
            $(".choose_car_content li").remove();
            orderBy = "gp_price";
            desc =="desc"
            limit = parseInt(lim)+1;

            //判定返回的品牌id参数是否为空
            if(pinpai_id == "null"||pinpai_id == ""){
                pinpai_id = "";
            }

            //one_data();
            $(".choose_car_content").html(li);
            //st = window.localStorage.setItem("st","45");
            scrollTop_h = $.getUrlParam("scrollTop_h");
            var top_h = (parseInt(scrollTop_h)+$(window).height())-100;
            //console.log(top_h);
            $("#md").css("top",parseInt(scrollTop_h)+"px");
            window.location.hash = "#md";
            fn();

            if(keywords=="null"){
                keywords="";
                //console.log(keywords);
            }else if(keywords!="null"&&keywords!=""){
                pinpai_id = "";

                if(lim == null){
                    limit = 0;
                    //console.log(lim == null);
                    $(".choose_car_content li").remove();
                    askData();
                    $("#md").css("top","0px");
                    window.location.hash = "#md";

                }


            }
        }else if(desc==""||desc=="null"){
            //console.log(888);
            px_desc="默认排序";
            $("#mrpx").html(px_desc+"<i></i>");
            $(".choose_car_content li").remove();
            orderBy = "";
            desc = ""
            limit = parseInt(lim)+1;

            //判定返回的品牌id参数是否为空
            if(pinpai_id == "null"||pinpai_id == ""){
                pinpai_id = "";
            }

            //one_data();
            $(".choose_car_content").html(li);
            //st = window.localStorage.setItem("st","45");
            scrollTop_h = $.getUrlParam("scrollTop_h");
            var top_h = (parseInt(scrollTop_h)+$(window).height())-100;
            //console.log(top_h);
            $("#md").css("top",parseInt(scrollTop_h)+"px");
            window.location.hash = "#md";
            fn();

            if(keywords=="null"){
                keywords="";
                //console.log(keywords);
            }else if(keywords!="null"&&keywords!=""){
                pinpai_id = "";

                if(lim == null){
                    limit = 0;
                    //console.log(lim == null);
                    $(".choose_car_content li").remove();
                    askData();
                    $("#md").css("top","0px");
                    window.location.hash = "#md";

                }


            }
        }
    }

    //判定返回的品牌名称参数是否为空
    if((pinpai_name!=""&&pinpai_name!="null")){
        //console.log(lim);
        if(lim==null){
            $(".choose_car_content li").remove();
            limit = 0;
            askData();
            //bool = false;
        }

        var p_name = $(".choose_car_nav>ul li:eq(1) a").html();
        //console.log(p_name == "品牌<i></i>")
        if(p_name == "品牌<i></i>"){
            $(".choose_car_nav>ul li:eq(1) a").html(pinpai_name+'<i class="img"></i>');
            $(".choose_car_nav>ul li:eq(1) a").css("color", "#ff5936");
        }
        if(pinpai_name=="不限品牌"){
            $(".choose_car_nav>ul li:eq(1) a").css("color", "#000");
            $(".choose_car_nav>ul li:eq(1) a i").removeClass("img");
        }
    }

    //判定返回的最低价和最高价参数是否为空
    if((price_min!=""&&price_min!=null)&&(price_max!=""&&price_max!=null)){
        var jg_name = $("#jgqj").html();
        //console.log(jg_name);
        if((price_min==""&&price_max=="")){
            $(".choose_car_nav ul li").eq(2).children("a").html("不限价格<i></i>");
        }else if((price_min!=""&&price_max!="")){
            if(price_min==0&&price_max!=0){
                $(".choose_car_nav>ul li:eq(2) a").css("color", "#ff5936");
                $(".choose_car_nav ul li").eq(2).children("a").html(price_max+"万以下<i class='img'></i>");
            }else if(price_min>=70){
                $(".choose_car_nav>ul li:eq(2) a").css("color", "#ff5936");
                $(".choose_car_nav ul li").eq(2).children("a").html(price_min+"万以上<i class='img'></i>");
            }else if(price_min>0&&price_max<70){
                $(".choose_car_nav>ul li:eq(2) a").css("color", "#ff5936");
                $(".choose_car_nav ul li").eq(2).children("a").html(price_min+"万"+"-"+price_max+"万<i class='img'></i>");
            }
            //$(".choose_car_nav>ul li:eq(2) a").css("color", "#ff5936");
        }
    }

    /*价格选区滑动选取价格插件*/
    $(document).ready(function () {
        var $range = $("#range_44"),
            $tou = $("#tou"),
            $wei = $("#wei");
        var track = function (data) {
            delete data.input;
            delete data.slider;
            if (JSON) {
                $tou.html(JSON.stringify(data.from, null, 2));
                $wei.html(JSON.stringify(data.to, null, 2));
            } else {
                $tou.html(data.from);
                $wei.html(data.to);
            }
        };
        $range.ionRangeSlider({
            type: "double",
            min: 0,
            max: 50,
            from: 0,
            to: 50,
            step: 1,
            grid: true,
            onStart: track,
            onChange: track,
            onFinish: track,
            onUpdate: track
        });
    });

    //控制价格区间界面的隐藏
    function jgyc() {
        $(".qujian ").css("display", "none");
        $(".mask").css("display", "none");
    }

    //点击显示隐藏价格区间
    $("#jgqj").on("click",function(){

        /*隐藏清除排序的样式*/
        $(".paixu").attr("style","display: none;");
        $(".choose_car_nav>ul").children("li").eq(0).children("a").css("color", "#000");
        $(".choose_car_nav>ul").children("li").eq(0).children("a").children("i").removeClass("img");
        var px_desc = $("#mrpx").html();
        console.log(px_desc);
        if(px_desc!='默认排序<i class=""></i>'&&px_desc!='默认排序<i></i>'){
            $(".choose_car_nav>ul").children("li").eq(0).children("a").css("color", "#ff5936");
            $(".choose_car_nav>ul").children("li").eq(0).children("a").children("i").addClass("img");
        }


        /*判定价格区间导航选项的隐藏或者显示*/
        var jg_nem = $(this).html();
        var qujian_hide = $(".qujian").attr("style");
        if(qujian_hide=="display: none;"){
            $(".qujian").attr("style","display: block;");
            $(".mask").attr("style","display: block;");

            $(".choose_car_nav>ul").children("li").eq(2).children("a").css("color", "#ff5936");
            $(".choose_car_nav>ul").children("li").eq(2).children("a").children("i").addClass("img");

            //*遮罩层*//
            $(".qujian .ui-row-flex .ui-col").addClass("ys");
            $(".mask").css({"height": "100%"});
            $(".mask").on("click",function(){
                jgyc();
            });
            //价格按钮按下后改变添加样式
            $(".qujian .ui-row-flex .ui-col").on("touchstart", function () {
                $(this).addClass("bs");
                $(this).removeClass("ys");
            });
            //价格按钮放开后删除添加样式
            $(".qujian .ui-row-flex .ui-col").on("touchend", function () {
                $(this).removeClass("bs");
                $(this).addClass("ys");
                $(this).siblings().removeClass("bs");
                $(this).parent().siblings().children().removeClass("bs");
                var bx = $(this).html();
                $(".choose_car_nav ul li").eq(2).children("a").html(bx + "<i class='img'></i>");
                if (bx == "<span></span><span></span>不限价格") {
                    $(".choose_car_nav>ul li:eq(2) a i").removeAttr("class");
                    $("#jgqj").css("color", "#000");
                }else{
                    $("#jgqj").css("color", "#ff5936");
                }
                price_min = $(this).children("span").eq(0).html();
                price_max = $(this).children("span").eq(1).html();
                jgyc();
                $(".choose_car_content li").remove();
                limit = 0;
                desc = "";
                orderBy = "";
                $("#md").css("top","45px");
                window.location.hash = "#md";
                one_data();
                $(".qujian .ui-row-flex .ui-col").unbind();
            });
            //价格区间滑动选择确定按钮点击事件
            $(".btn_ys").on("click",function(){
                price_min = $(".qujian #tou").html();
                price_max = $(".qujian #wei").html();
                $(".choose_car_nav ul li").eq(2).children("a").html(price_min+"万"+"-"+price_max+"万<i class='img'></i>");
                jgyc();
                $(".choose_car_content li").remove();
                limit = 0;
                desc = "";
                orderBy = "";
                $("#md").css("top","45px");
                window.location.hash = "#md";
                one_data();
            });
        }else{
            $(".choose_car_nav>ul").children("li").eq(2).children("a").css("color", "#000");
            $(".choose_car_nav>ul").children("li").eq(2).children("a").children("i").removeClass("img");

            jgyc();
            var jg_html = jg_nem.split('<i></i>');
            //console.log(jg_html);
            if(jg_html[0]=='价格区间'){
                $(".choose_car_nav>ul li:eq(2) a i").removeClass("img");
                $(".choose_car_nav>ul li:eq(2) a i").removeAttr("class");
                $("#jgqj").css("color", "#000");
            }

            var bx = $("#jgqj").html();
            console.log(bx);
            if (bx == '<span></span><span></span>不限价格<i class=""></i>'||bx=='价格区间<i class=""></i>') {
                $(".choose_car_nav>ul li:eq(2) a i").removeAttr("class");
                $("#jgqj").css("color", "#000");
            }else{
                $(".choose_car_nav>ul").children("li").eq(2).children("a").css("color", "#ff5936");
                $(".choose_car_nav>ul").children("li").eq(2).children("a").children("i").addClass("img");
            }
        }
    });

    /*点击跳转品牌页面*/
    $(".choose_car_nav ul li:eq(1)").on("click",function(){
        /*console.log(desc);
         console.log(price_min);
         console.log(price_max);*/

        location.href = pinpai+".html?desc="+desc+"&price_min="+price_min+"&price_max="+price_max+"&ym_id=1";
        //var url = pinpai+".html?desc="+desc+"&price_min="+price_min+"&price_max="+price_max+"&ym_id=1";
        //jumpToDetailView(url);
    });

    /*点击跳转到搜索页*/
    $(".choose_car_nav ul li:eq(3)").on("click",function(){
        location.href = search1+".html?desc="+desc+"&price_min="+price_min+"&price_max="+price_max+"&pinpai_name="+escape(pinpai)+"&pinpai_id="+pinpai_id+"&ym_id=1";
        //var url = search1+".html?desc="+desc+"&price_min="+price_min+"&price_max="+price_max+"&pinpai_name="+escape(pinpai)+"&pinpai_id="+pinpai_id+"&ym_id=1";
        //jumpToDetailView(url);
    });


    /*滚动时触发*/
    $(window).scroll(function () {
        var ui_container = $(".ui-container");
        scrollTop_h = $(window).scrollTop();
        //$("#md").css("top",parseInt(scrollTop_h)+"px");
        //console.log(bool);
        //console.log(scrollTop_h);
        if (bool) {
            //console.log(($(window).height()+"----"+$(document).scrollTop())+"----"+(ui_container.height()));
            //关键 如果 屏幕高度加上 向下滚动距离等于 body 文档高度 或者 大于//
            if ((($(window).height()) + $(window).scrollTop()) > ui_container.height()) {
                $("#page_tag_load").show();
                $("#page_tag_load").css("color","#bbb");

                //setTimeout(askData, 500);
                askData();
            }
        }
    });
});



/*第一次加载数据*/
function one_data(){
    /*console.log(limit);
    console.log(pinpai_id);
    console.log(orderBy);
    console.log(desc);
    console.log(price_min);
    console.log(price_max);
    console.log(keywords);*/
    $.ajax({
        url: carList,
        type: "post",
        data: {
            limit: limit,
            brand_id:pinpai_id,
            orderBy:orderBy,
            desc:desc,
            keywords:keywords,
            price_min:price_min,
            price_max:price_max
        },
        dataType: "json",
        success: function (res) {
            console.log(res);

            var len = res.data.length;

            for (var i = 0; i < len; i++) {
                car_html(res, i);
            }
        },
        error:function(XMLHttpRequest,textStatus,errorThrown){
            console.log("异常信息："+XMLHttpRequest.readyState+":"+XMLHttpRequest.status+":"+textStatus,0);
        }
    });
}


//异步请求数据
function askData() {
    console.log(desc);
    console.log(limit);
    limit++;
    $.ajax({
        url: carList,
        type: "post",
        data: {
            limit: limit,
            brand_id:pinpai_id,
            orderBy:orderBy,
            desc:desc,
            keywords:keywords,
            price_min:price_min,
            price_max:price_max
        },
        dataType: "json",
        success: function (res) {
            console.log(res);
            var len = res.data.length;

            var i = 0
            for (; i < len; i++) {
                car_html(res, i);
            }
            hide();
            if (len == 0) {
                $("#page_tag_load").show();
                $("#page_tag_load").html("没有更多数据！");
                bool = false;
                //setTimeout(hide,2000);
            }
        },
        error:function(XMLHttpRequest,textStatus,errorThrown){
            console.log("异常信息："+XMLHttpRequest.readyState+":"+XMLHttpRequest.status+":"+textStatus,0);
        }
    });

}

function hide() {
    $("#page_tag_load").hide();
}

//加载数据到页面
function car_html(res, i) {
    var cl = "";
    var cx = "";

    cx = res.data[i].model_name;
    var pb = res.data[i].name;
    if(cx.indexOf(pb)!=-1){
        cl = cx;
    }else {
        cl = pb+" "+cx;
    }
    //console.log(cl);
    var ls = parseInt((res.data[i].price - res.data[i].gp_price) * 100) / 100;
    var html = "<li class='ui-border-t' id='" + res.data[i].id + "'>" +
        "<a href='javascript:void(0);'><img class='choose_car_img' src='" + res.data[i].car_imgs + "'/> " +
        "<div class='choose_car_txt'>" +
        "<p>" + cl+ " " + res.data[i].style_name + "</p>" +
        "<p>厂商指导价：" + res.data[i].price + "万</p>" +
        "<div>" +
        "<span class='tgj'>团购价<span>" + res.data[i].gp_price + "</span>万</span>" +
        "<span>优惠 " + ls + "万</span>" +
        "</div>" +
        "</div>" +
        "</a>" +
        "</li>";

    $(".choose_car_content").append(html);
    fn();
    /*汽车图片高度*/
    var img_w = $(".choose_car_img").width();
    var img_h = $(".choose_car_img").height();
    var h = img_w / 1.7;
    //console.log(img_w+"---"+img_h);
    //console.log(h);
    $(".choose_car_img").css("height", h);
    //console.log($(".choose_car_content").html());
    $(".choose_car_content li").eq(0).removeClass("ui-border-t");
}

//每台车辆点击跳转详情页面
function fn(){
    $(".choose_car_content li").on("click", function () {
        var index = $(this).attr("id");
        var scrollTop = $(document).scrollTop();
        //console.log(scrollTop);
        //window.localStorage.setItem("st",scrollTop);
        window.localStorage.setItem("hc",$(".choose_car_content").html());
        location.href = details + ".html?pt_id=" + index + "&ym_id=" + 1+"&desc="+desc+"&limit="+limit+"&pinpai_name="+escape(pinpai_name)+"&pinpai_id="+pinpai_id+"&search="+escape(keywords)+"&price_max="+price_max+"&price_min="+price_min+"&scrollTop_h="+scrollTop_h;
        //var url = details + ".html?pt_id=" + index + "&ym_id=" + 1+"&desc="+desc+"&limit="+limit+"&pinpai_name="+escape(pinpai_name)+"&pinpai_id="+pinpai_id+"&search="+escape(keywords)+"&price_max="+price_max+"&price_min="+price_min+"&scrollTop_h="+scrollTop_h;
        //jumpToDetailView(url);
    });
}

/*底部点击改变样式*/
$(".ui-footer ul li").on("click",function(){
    var i = $(this).index();
    //console.log(i);
    foot_id = i;
    //$("li").eq(i).siblings().children("div").eq(0).attr("class","adc");
    //$(".ui-footer ul li").eq(i).siblings().children("div").eq(1).removeAttr("class");
    //console.log("++++");
    /*$(".ui-footer ul li").eq(i).children("div").eq(0).addClass("xx_img");
     $(".ui-footer ul li").eq(i).children("div").eq(1).addClass("xx_txt");
     if(i==0){
     $(".ui-footer ul li").eq(1).children("div").eq(0).attr("class","adc");
     $(".ui-footer ul li").eq(1).children("div").eq(1).removeAttr("class");
     $(".ui-footer ul li").eq(2).children("div").eq(0).attr("class","adc");
     $(".ui-footer ul li").eq(2).children("div").eq(1).removeAttr("class");
     $(".ui-footer ul li").eq(3).children("div").eq(0).attr("class","adc");
     $(".ui-footer ul li").eq(3).children("div").eq(1).removeAttr("class");
     }
     if(i==1){
     $(".ui-footer ul li").eq(0).children("div").eq(0).attr("class","adc");
     $(".ui-footer ul li").eq(0).children("div").eq(1).removeAttr("class");
     $(".ui-footer ul li").eq(2).children("div").eq(0).attr("class","adc");
     $(".ui-footer ul li").eq(2).children("div").eq(1).removeAttr("class");
     $(".ui-footer ul li").eq(3).children("div").eq(0).attr("class","adc");
     $(".ui-footer ul li").eq(3).children("div").eq(1).removeAttr("class");
     }
     if(i==2){
     $(".ui-footer ul li").eq(1).children("div").eq(0).attr("class","adc");
     $(".ui-footer ul li").eq(1).children("div").eq(1).removeAttr("class");
     $(".ui-footer ul li").eq(0).children("div").eq(0).attr("class","adc");
     $(".ui-footer ul li").eq(0).children("div").eq(1).removeAttr("class");
     $(".ui-footer ul li").eq(3).children("div").eq(0).attr("class","adc");
     $(".ui-footer ul li").eq(3).children("div").eq(1).removeAttr("class");
     }
     if(i==3){
     $(".ui-footer ul li").eq(1).children("div").eq(0).attr("class","adc");
     $(".ui-footer ul li").eq(1).children("div").eq(1).removeAttr("class");
     $(".ui-footer ul li").eq(2).children("div").eq(0).attr("class","adc");
     $(".ui-footer ul li").eq(2).children("div").eq(1).removeAttr("class");
     $(".ui-footer ul li").eq(0).children("div").eq(0).attr("class","adc");
     $(".ui-footer ul li").eq(0).children("div").eq(1).removeAttr("class");
     }*/
    //console.log(".....");
});


var y_i = $.getUrlParam("y_i");


var first = null;
mui.back = function() {
//首次按键，提示‘再按一次退出应用’
    if (!first) {
        first = new Date().getTime();
        mui.toast('再按一次退出应用2');
        setTimeout(function() {
            first = null;
        }, 1000);
    } else {
        if (new Date().getTime() - first < 1000) {
            plus.runtime.quit();
        }
    }

};


/*底部
//跳转其他页面需要执行的操作跳转*/
var phone = window.localStorage.getItem("phone");

function tz(i){
    $.ajax({
        url:getUserInfo,
        type:"post",
        data:{
            phone:phone
        },
        dataType:"json",
        headers: {
            Authorization: token
        },
        success:function(res){

            if((token!=null&&token!="")&&res.code==2000){
                if(i==2){
                    location.href = my_pintuan+".html?ph="+phone;
                    //var url = my_pintuan+".html?ph="+phone;
                    //jumpToDetailView(url);
                }else if(i==3){
                    location.href = my+".html?ph="+phone;
                    //var url = my+".html?ph="+phone;
                    //jumpToDetailView(url);
                }
            }else{
                location.href = login_one+".html?&ym_id="+1+"&foot_id="+foot_id;
                //var url = login_one+".html?&ym_id="+1+"&foot_id="+foot_id;
                //jumpToDetailView(url);
            }
        },
        error:function(XMLHttpRequest,textStatus,errorThrown){
            console.log("异常信息："+XMLHttpRequest.readyState+":"+XMLHttpRequest.status+":"+textStatus,0);
        }
    });
}

function jumpToDetailView(url){
    mui.openWindow({
        url:""+url+""

    });
}

$(".ui-footer ul li").on("click", function () {
    var i = $(this).index();
    switch (i) {
        case 0:
            //console.log(index+".html");
            location.href = index + ".html?ph="+phone;
            //var url = index + ".html?ph="+phone;
            //jumpToDetailView(url);
            break;
        case 1:
            //console.log(1);
            location.href = choose_car + ".html?ph="+phone;
            //var url = choose_car + ".html?ph="+phone;
            //jumpToDetailView(url);
            break;
        case 2:
            //console.log(2);
            tz(i);
            break;
        case 3:
            tz(i)
            break;
    }
});
