/**
 * Created by mayn on 2018/2/23.
 */

    /*搜索框*/
$('.ui-searchbar').click(function () {
    $('.ui-searchbar-wrap').addClass('focus');
    $('.ui-searchbar-input input').focus();
});
$('.ui-searchbar-cancel').click(function () {
    $(this).parents(".ui-searchbar-wrap").removeClass('focus');
});

$(".ui-icon-close").on("click",function(){
    $("#sousuo").val("");
});

(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})(jQuery);
var pinpai_name = unescape($.getUrlParam("pinpai"));
var pinpai_id = $.getUrlParam("pinpai_id");
var desc = $.getUrlParam("desc");
var price_min = $.getUrlParam("price_min");
var price_max = $.getUrlParam("price_max");

$("#sousuo").on('keypress',function(e) {
    var keycode = e.keyCode;
    var search = $(this).val();
    if(keycode=='13') {
        e.preventDefault();
        $.ajax({
            url:carList,
            type:"post",
            dataType:"json",
            data:{
                keywords:search
            },
            success:function(res){
                console.log(res);
                console.log(search);
                var pinpai_id = window.localStorage.getItem("pinpai_id");
                if(res.data.length != 0){
                    $(".coupon").css("display","none");
                    location.href = choose_car+".html?desc="+desc+"&price_min="+price_min+"&price_max="+price_max+"&pinpai="+escape(pinpai_name)+"&pinpai_id="+pinpai_id+"&search="+escape(search);

                }else{
                    $(".coupon").css("display","block");
                }
            }
        });

        //alert(search);
    }
});


(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})(jQuery);

var ym_id = parseInt($.getUrlParam("ym_id"));

//拦截安卓回退按钮
/*history.pushState(null, null, location.href);
window.addEventListener('popstate', function(event) {
    history.pushState(null, null, location.href );
    //此处加入回退时你要执行的代码
    //window.history.back();
    alert(y_i);
});*/


function jumpToDetailView(url){
    mui.openWindow({
        url:""+url+""

    });
}

/*返回*/
$(".ui-header .ui-icon-return").on("click",function(){
    //console.log(ym_id);
    //console.log(history.length);
    if (history.length == 0) {
        location.href = index+'.html';
    } else if (history.length == 1) {
        history.back();
    }else if(history.length > 1){
        switch (ym_id) {
            case 0:
                //console.log(index+".html");
                //location.href = index + ".html";
                var url = index + ".html";
                jumpToDetailView(url);
                break;
            case 1:
                //console.log(1);
                //location.href = choose_car + ".html";
                var url = choose_car + ".html";
                jumpToDetailView(url);
                break;
        }
    }
})