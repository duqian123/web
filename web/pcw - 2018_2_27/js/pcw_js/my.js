/**
 * Created by mayn on 2018/2/23.
 */

$(function(){
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
    })(jQuery);


    /*底部点击改变样式*/
    $(".ui-footer ul li").on("click",function(){
        var i = $(this).index();
        console.log(i);
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


    $('.ui-list li,.ui-tiled li').click(function(){
        if($(this).data('href')){
            location.href= $(this).data('href');
        }
    });
    $("#pt_id").children("a").click(function(){
        var index = $(this).index()+1;
        location.href=my_pintuan+".html?pt_id="+index;
    });
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
            async:false,
            success:function(res){
                if((token!=null&&token!="")&&res.code==2000){
                    if(i==2){
                        location.href = my_pintuan+".html?ph="+phone;
                    }else if(i==3){
                        location.href = my+".html?ph="+phone;
                    }
                }else{
                    location.href = login_one+".html?&ym_id="+0;
                }
            },
            error:function(XMLHttpRequest,textStatus,errorThrown){
                console.log("异常信息："+XMLHttpRequest.readyState+":"+XMLHttpRequest.status+":"+textStatus,0);
            }
        });
    }

    $(".ui-footer ul li").on("click",function () {
        var i = $(this).index();

        //console.log(i);
        switch (i) {
            case 0:
                console.log(index+".html");
                location.href = index + ".html?ph="+phone;
                break;
            case 1:
                console.log(1);
                location.href = choose_car + ".html?ph="+phone;
                break;
            case 2:
                console.log(2);
                tz(i);
                break;
            case 3:
                console.log(3);
                tz(i);
                break;
        }
    });


    var token = window.localStorage.getItem("token");
    console.log(token);
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
            console.log(res);
            console.log(res.data.logo);

            /*用户信息*/
            var phone = res.data.phone;
            console.log(phone);
            var user_phone = phone.substr(0,3)+"*****"+phone.substr(8);
            $(".user_cont div p").eq(1).html(user_phone);

            $(".user_img").attr("src",res.data.logo);
            $(".user_cont div p:first-child").html(res.data.nick_name);
            $(".user_cont").on("click",function(){
                location.href = edit+".html?ph="+phone;
            });
        }
    });


});
