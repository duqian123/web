/**
 * Created by mayn on 2018/2/23.
 */

    /*跳转进入显示对应*/
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);
var shu= $.getUrlParam("pt_id");
var w = $(window).width();
$('#pt_id').find("li").eq(shu).addClass("current").siblings().removeClass("current");
$("#pt_id_cont").offset({left:-(w*shu)});
//$("#pt_id_cont").animate({left:-(w*index)});
//console.log(w*index);
//console.log(w);

/*点击滑动*/
$('#pt_id').children("li").click(function(){
    var i = $(this).index();
    $(this).addClass("current").siblings().removeClass("current");
    $("#pt_id_cont").animate({left:-(w*i)}).offset({left:-(w*i)});

});

function back(){
    if(history.length==0){
        location.href = index+'.html';
    }else if(history.length>=1){
        history.back();
    }
}

/*立即支付跳转*/
function zhifu(){
//        location.href = "count.html?pt_id=1";
};
if (shu == 0) {
    $(".ui-footer").css("display", "block");
}
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

function tz(){
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
                location.href = my+".html?ph="+phone;
            }else{
                location.href = login_one+".html?&ym_id="+1;
            }
        },
        error:function(XMLHttpRequest,textStatus,errorThrown){
            console.log("异常信息："+XMLHttpRequest.readyState+":"+XMLHttpRequest.status+":"+textStatus,0);
        }
    });
}

var phone = window.localStorage.getItem("phone");
var token = window.localStorage.getItem("token");

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

$(function() {
    $(".ui-footer ul li").on("click", function () {
        var i = $(this).index();

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
                tz(i);
                break;
        }
    });


    $('.ui-list li,.ui-tiled li').click(function () {
        if ($(this).data('href')) {
            location.href = $(this).data('href');
        }
    });
});
