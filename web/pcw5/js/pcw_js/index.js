
/**
 * Created by mayn on 2018/2/23.
 */

var token = window.localStorage.getItem("token");
//console.log(token!=null);
var bool = true,
    foot_id = 0;

(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})(jQuery);

$(function(){
    $('.ui-list li,.ui-tiled li').click(function () {
        if ($(this).data('href')) {
            location.href = $(this).data('href');
        }
    });

    /*轮播跳转*/
    $(".ui-slider-content li").on("click",function(){
        var index = $(this).index();
        console.log(index);
        switch (index){
            case 0:
                location.href = details+".html?pt_id=27&ym_id=0";
                break;
            case 1:
                location.href = details+".html?pt_id=55&ym_id=0";
                break;
            case 2:
                location.href = details+".html?pt_id=29&ym_id=0";
                break;
            case 3:
                location.href = details+".html?pt_id=100&ym_id=0";
                break;
        }
    });


    /*底部点击改变样式*/
    $(".ui-footer ul li").on("click",function(){
        var i = $(this).index();
        foot_id = i;
        //console.log(i);
        //$("li").eq(i).siblings().children("div").eq(0).attr("class","adc");
        //$(".ui-footer ul li").eq(i).siblings().children("div").eq(1).removeAttr("class");
        //console.log("++++");
        /*$(".ui-footer ul li").eq(i).children("div").eq(0).addClass("xx_img");
         $(".ui-footer ul li").eq(i).children("div").eq(1).addClass("xx_txt");
         if(i==0){
         $(".ui-footer ul li").eq(1).children("div").eq(0).removeAttr("class");
         $(".ui-footer ul li").eq(1).children("div").eq(1).removeAttr("class");
         $(".ui-footer ul li").eq(2).children("div").eq(0).removeAttr("class");
         $(".ui-footer ul li").eq(2).children("div").eq(1).removeAttr("class");
         $(".ui-footer ul li").eq(3).children("div").eq(0).removeAttr("class");
         $(".ui-footer ul li").eq(3).children("div").eq(1).removeAttr("class");
         }
         if(i==1){
         $(".ui-footer ul li").eq(0).children("div").eq(0).removeAttr("class");
         $(".ui-footer ul li").eq(0).children("div").eq(1).removeAttr("class");
         $(".ui-footer ul li").eq(2).children("div").eq(0).removeAttr("class");
         $(".ui-footer ul li").eq(2).children("div").eq(1).removeAttr("class");
         $(".ui-footer ul li").eq(3).children("div").eq(0).removeAttr("class");
         $(".ui-footer ul li").eq(3).children("div").eq(1).removeAttr("class");
         }
         if(i==2){
         $(".ui-footer ul li").eq(1).children("div").eq(0).removeAttr("class");
         $(".ui-footer ul li").eq(1).children("div").eq(1).removeAttr("class");
         $(".ui-footer ul li").eq(0).children("div").eq(0).removeAttr("class");
         $(".ui-footer ul li").eq(0).children("div").eq(1).removeAttr("class");
         $(".ui-footer ul li").eq(3).children("div").eq(0).removeAttr("class");
         $(".ui-footer ul li").eq(3).children("div").eq(1).removeAttr("class");
         }
         if(i==3){
         $(".ui-footer ul li").eq(1).children("div").eq(0).removeAttr("class");
         $(".ui-footer ul li").eq(1).children("div").eq(1).removeAttr("class");
         $(".ui-footer ul li").eq(2).children("div").eq(0).removeAttr("class");
         $(".ui-footer ul li").eq(2).children("div").eq(1).removeAttr("class");
         $(".ui-footer ul li").eq(0).children("div").eq(0).removeAttr("class");
         $(".ui-footer ul li").eq(0).children("div").eq(1).removeAttr("class");
         }*/
        //console.log(".....");
    });




    /*底部导航跳转*/
    var phone = parseInt($.getUrlParam("ph"));
    var y_i = parseInt($.getUrlParam("y_i"));
    //console.log(y_i);
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
            async:true,
            success:function(res){
                if((token!=null&&token!="")&&res.code==2000){
                    if(i==2){
                        location.href = my_pintuan+".html?ph="+phone;
                        //var url = my_pintuan+".html?ph="+phone+"&y_i="+0;
                        //jumpToDetailView(url);
                    }else if(i==3){
                        location.href = my+".html?ph="+phone;
                        //var url = my+".html?ph="+phone+"&y_i="+0;
                        //jumpToDetailView(url);
                    }
                }else{
                    //location.href = login_one+".html?ym_id="+0+"&foot_id="+foot_id;
                    var url = login_one+".html?ym_id="+0+"&foot_id="+foot_id;
                    jumpToDetailView(url);
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


    var first = null;
    mui.back = function() {
//首次按键，提示‘再按一次退出应用’
        if (!first) {
            first = new Date().getTime();
            mui.toast('再按一次退出应用1');
            setTimeout(function() {
                first = null;
            }, 1000);
        } else {
            if (new Date().getTime() - first < 1000) {
                plus.runtime.quit();
            }
        }

    };

    $(".ui-footer ul li").on("tap",function(){
        var i = $(this).index();
        //console.log(i);
        switch (i){
            case 0:
                location.href = index+".html?ph="+phone+"&y_i="+0;
                //var url = index+".html?ph="+phone+"&y_i="+0;
                //jumpToDetailView(url);
                break;
            case 1:
                location.href = choose_car+".html?ph="+phone+"&y_i="+0;
                //var url_ = choose_car+".html?ph="+phone+"&y_i="+0;
                //jumpToDetailView(url_);
                break;
            case 2:
                //console.log(i);
                tz(i);
                break;
            case 3:
                //console.log(i);
                tz(i);
                break;
        }

    });

    /*搜索跳转*/
    $(".ss").on("click",function(){
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
            lim = 0;
        //location.href = search1+".html";
        location.href = search1+".html?desc="+desc+"&price_min="+price_min+"&price_max="+price_max+"&pinpai_name="+escape(pinpai)+"&pinpai_id="+pinpai_id+"&ym_id=0";
        //var url = search1+".html?desc="+desc+"&price_min="+price_min+"&price_max="+price_max+"&pinpai_name="+escape(pinpai)+"&pinpai_id="+pinpai_id+"&ym_id=0";
        //jumpToDetailView(url);
    });


    $(window).scroll(function () {
        var st_h = $(document).scrollTop();
        /*热门拼团点击跳转*/
        $("#list #rmpt li").on("click",function(){
            var  index= $(this).attr("id");
            //console.log(index);
            location.href = details+".html?pt_id="+index+"&ym_id="+0+"&st_h="+st_h;
            //var url = details+".html?pt_id="+index+"&ym_id="+0+"&st_h="+st_h;
            //jumpToDetailView(url);
        });
        /*超值推荐点击跳转*/
        $("#list #cztj li").on("click",function(){
            var  index= $(this).attr("id");
            //console.log(index);
            location.href = details+".html?pt_id="+index+"&ym_id="+0+"&st_h="+st_h;
            //var url =details+".html?pt_id="+index+"&ym_id="+0+"&st_h="+st_h;
            //jumpToDetailView(url);
        });
        /*新品上架点击跳转*/
        $("#xinpin #xpsj .ui-col").on("click",function(){
            var  index= $(this).attr("id");
            //console.log(index);
            location.href =details+".html?pt_id="+index+"&ym_id="+0+"&st_h="+st_h;
            //var url =details+".html?pt_id="+index+"&ym_id="+0+"&st_h="+st_h;
            //jumpToDetailView(url);
        });
    });

    /*热门拼团*/
    $.ajax({
        url:getListByGP,
        type:"post",
        dataType:"json",
        success:function(res){
            //console.log(res.data[0].car_imgs);
            //console.log(res);
            var len = res.data.length;
            for(var i=0;i<len;i++){
                $("#rmpt").children("li").eq(i).children("a").children("img").attr("src",res.data[i].car_imgs);
                $("#rmpt").children("li").eq(i).children("a").children("div").children("div").html(res.data[i].model.brand.name+" "+res.data[i].model.model_name+" "+res.data[i].style_name);
                $("#rmpt").children("li").eq(i).children("a").children("div").children("span").first().children("span").html(res.data[i].gp_price);
                $("#rmpt").children("li").eq(i).children("a").children("div").children("span").last().children("span").html(res.data[i].discount);
                $("#rmpt").children("li").eq(i).attr("id",res.data[i].id);
            }
        },
        error:function(XMLHttpRequest,textStatus,errorThrown){
            console.log("异常信息："+XMLHttpRequest.readyState+":"+XMLHttpRequest.status+":"+textStatus,0);
        }
    }).done(function(){
        /*超值推荐*/
        $.ajax({
            url:getListByDiscount,
            type:"post",
            dataType:"json",
            async:true,
            success:function(res){
                //console.log(res.data[0].car_imgs);
                //console.log(res);
                var len = res.data.length;
                for(var i=0;i<len;i++){
                    $("#cztj").children("li").eq(i).children("a").children("img").attr("src",res.data[i].car_imgs);
                    $("#cztj").children("li").eq(i).children("a").children("div").children("div").html(res.data[i].model.brand.name+" "+res.data[i].model.model_name+" "+res.data[i].style_name);
                    $("#cztj").children("li").eq(i).children("a").children("div").children("span").first().children("span").html(res.data[i].gp_price);
                    $("#cztj").children("li").eq(i).children("a").children("div").children("span").last().children("span").html(res.data[i].discount);
                    $("#cztj").children("li").eq(i).attr("id",res.data[i].id);
                }
            },
            error:function(XMLHttpRequest,textStatus,errorThrown){
                console.log("异常信息："+XMLHttpRequest.readyState+":"+XMLHttpRequest.status+":"+textStatus,0);
            }
        }).done(function(){
            /*新品上架*/
            $.ajax({
                url:carList,
                type:"post",
                dataType:"json",
                async:true,
                success:function(res){
                    //console.log(res);
                    var len = res.data.length;
                    var li = '<li class="ui-col  ui-col-50"><a href="javascript:void(0);"><img class="car_new_img" src="img/images/new_car.png"/><div class="car_new_txt"><div>福特斯瑞斯 2017款 1.5L自动舒适型</div><span>团购价<span>2.5</span>万</span><span>优惠<span>2.5</span>万</span></div></a></li>'
                    $("#xpsj li").remove();
                    for(var i=0; i<len;i++){
                        var cx = res.data[i].model_name,
                            pb = res.data[i].name,
                            cl = "";
                        if(cx.indexOf(pb)!=-1){
                            cl = cx;
                        }else {
                            cl = pb+" "+cx;
                        }

                        $("#xpsj").append(li);
                        var price = res.data[i].price,
                            gp_price = res.data[i].gp_price,
                            ls = parseInt(( price - gp_price)*100)/100;
                        $("#xinpin li").eq(i).children("a").children("img").attr("src",""+res.data[i].car_imgs+"");
                        $("#xinpin li").eq(i).children("a").children("div").children("div").html(""+cl+" "+res.data[i].style_name+"");
                        $("#xinpin li").eq(i).children("a").children("div").children("span").eq(0).children("span").html(""+res.data[i].gp_price+"");
                        $("#xinpin li").eq(i).children("a").children("div").children("span").eq(1).children("span").html(""+ls+"");
                        $("#xinpin li").eq(i).attr("id",res.data[i].id);
                        //$("#xpsj li:eq(0)").append($("#xpsj li"));

                        var w = $("#xpsj .car_new_img").width();
                        var h = w/1.7;
                        //console.log(h);
                        $("#xpsj .car_new_img").css("height",h);

                        //var st = $.getUrlParam("st_h");
                        //$("#md").css("top",(parseInt(st))+"px");
                        //location.href = "#md";
                    }
                },
                error:function(XMLHttpRequest,textStatus,errorThrown){
                    console.log("异常信息："+XMLHttpRequest.readyState+":"+XMLHttpRequest.status+":"+textStatus,0);
                }
            });
        });
    })

    /*查看更多车型*/
    $(".car-btn ul").on("click",function(){
        location.href = choose_car+".html";
    });


}) ;