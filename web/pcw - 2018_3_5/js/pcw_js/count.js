/**
 * Created by mayn on 2018/2/26.
 */

    /*获取url pt_id的值*/
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);

/*function clk(){
 $("#tab1 .sel").click(function(){
 $(this).children("div").children("i").last().removeClass("no_selected");
 $(this).children("div").children("i").last().addClass("selected");
 $("#tab1 .no_sel").children("div").children("i").last().removeClass("selected");
 $("#tab1 .no_sel").children("div").children("i").last().addClass("no_selected");
 });
 $("#tab1 .no_sel").click(function(){
 $(this).children("div").children("i").last().removeClass("no_selected");
 $(this).children("div").children("i").last().addClass("selected");
 $("#tab1 .sel").children("div").children("i").last().removeClass("selected");
 $("#tab1 .sel").children("div").children("i").last().addClass("no_selected");
 });
 $("#tab2 .sel").click(function(){
 $(this).children("div").children("i").last().removeClass("no_selected");
 $(this).children("div").children("i").last().addClass("selected");
 $("#tab2 .no_sel").children("div").children("i").last().removeClass("selected");
 $("#tab2 .no_sel").children("div").children("i").last().addClass("no_selected");
 });
 $("#tab2 .no_sel").click(function(){
 $(this).children("div").children("i").last().removeClass("no_selected");
 $(this).children("div").children("i").last().addClass("selected");
 $("#tab2 .sel").children("div").children("i").last().removeClass("selected");
 $("#tab2 .sel").children("div").children("i").last().addClass("no_selected");
 });
 }*/

function car_info(index){
    var pt_id= $.getUrlParam("pt_id");

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
            console.log(cl);
            if(index==1){
                $("#tab1 .pintuan_car_img").attr("src",res.data.car_imgs);
                $("#tab1 .pintuan_car_txt p:first").html("" + cl + " " + res.data.style_name + "");
                var img_w = $("#tab1 .pintuan_car_img").width();
                var h = img_w / 1.7;
                $(".pintuan_car_img").css("height", h);
            }else if(index==2){
                $("#tab2 .pintuan_car_img").attr("src",res.data.car_imgs);
                $("#tab2 .pintuan_car_txt p:first").html("" + cl + " " + res.data.style_name + "");
                var img_w = $("#tab2 .pintuan_car_img").width();
                var h = img_w / 1.7;
                $(".pintuan_car_img").css("height", h);
            }
        }
    });
}

$(function(){
    var index= $.getUrlParam("show_id");
    //判断发起拼团和快速加入的显示隐藏
    if(index==1){
        console.log(1111);
        $("#tab1").css("display","block");
        $("#tab2").css("display","none");
        $(".ui-footer").css({
            display: "block"
        });
        //clk();
        car_info(index);
    }else if(index==2){
        console.log(2222);
        $("#tab2").css("display","block");
        $("#tab1").css("display","none");
        $(".ui-footer").css({
            display: "block"
        });
        //clk();
        car_info(index);
    }


});


function back(){
    if(history.length==0){
        location.href = index+'.html';
    }else if(history.length>=1){
        history.back();
    }
}