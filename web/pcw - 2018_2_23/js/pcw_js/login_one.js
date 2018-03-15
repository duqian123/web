/**
 * Created by mayn on 2018/2/23.
 */

$(function(){
    var phone = "",
        yzm = "",
        bool = false,
        sid ="",
        rule = /^((13[0-9])|(14[579])|(15[0-35-9])|(17[0-9])|(18[0-9]))\d{8}$/;

    /*
     * 2000 成功
     * 2001 未注册
     * 4000 验证码错误
     * */

    $("#phone").bind("input propertychange", function() {
        var p_l = $("#phone").val().length;
        console.log(p_l);
        if(p_l==11){
            phone = $("#phone").val();
            console.log(rule.test(phone));
            if(!rule.test(phone)&&phone!=""){
                show();
                $(".ui-poptips .ui-poptips-cnt span").html("手机号错误");
                setTimeout(hide,1700);
            }else{
                if(djs<=0){
                    $(".ui-btn").attr("disabled",false);
                }
            }
        }else{
            $(".ui-btn").attr("disabled",true);
        }
    });
    $("#yzm,#phone").bind("input propertychange", function() {

        if(($(this).val()!=""&&$("#phone").val()!="")&&($("#yzm").val()!=""&&$("#phone").val().length==11)){
            $(".ui-btn-wrap button").removeClass("disabled");
            bool = true;
        }else{
            $(".ui-btn-wrap button").addClass("disabled");
            bool = false;
        }
    });


    /*验证码按钮*/
    $(".caozuo button").on("click",function(){
        phone = $("#phone").val();
        console.log(phone);

        //console.log(phone);
        //console.log(rule.test(phone));

        /*发送请求*/
        $.ajax({
            url:getCode,
            type:"post",
            dataType:"json",
            data:{
                phone:phone
            },
            success:function(res){
                console.log(res);
                if(res.code==4000){
                    show();
                    $(".ui-poptips").css("width","80%");
                    $(".ui-poptips .ui-poptips-cnt span").html("网络异常，请稍后再试");
                    setTimeout(hide,1700);
                }else if(res.code==2000){
                    sid = res.data;
                    window.localStorage.setItem("sid",res.data);
                }
            }
        });
        $("#yzm_btn").html("<span>60</span>秒后重发");
        $("#yzm_btn").attr("disabled","disabled");
        time = setInterval(cxhq,1000);

    });

    /*点击确定*/
    $(".ui-btn-wrap").on("click",function(){
        if(bool){
            console.log(bool);
            yzm =$("#yzm").val();
            phone = $("#phone").val();
            console.log(phone);
            console.log(yzm);
            console.log(sid);
            //location.href = one_xinxi+".html?ph="+phone+"&yzm="+yzm;
            sid = window.localStorage.getItem("sid");
            $.ajax({
                url:checkCode,
                type:"post",
                dataType:"json",
                data:{
                    phone:phone,
                    yzm:yzm,
                    session_id:sid
                },
                success:function(res){
                    console.log(res);

                    if(res.code==2001){
                        location.href = one_xinxi+".html?ph="+phone+"&yzm="+yzm+"&sid="+sid;
                    }else if(res.code==2000){

                        window.localStorage.setItem("phone",phone);
                        window.localStorage.setItem("token",res.data);
                        var foot_id = parseInt($.getUrlParam("foot_id"));
                        switch (foot_id){
                            case 0:
                                location.href = index+".html?ph="+phone;
                                break;
                            case 1:
                                location.href = choose_car+".html?ph="+phone;
                                break;
                            case 2:
                                location.href = my_pintuan+".html?ph="+phone;
                                break;
                            case 3:
                                location.href = my+".html?ph="+phone;
                                break;
                        }

                    }else if(res.code==4000){
                        show();
                        $(".ui-poptips").css("width","80%");
                        $(".ui-poptips .ui-poptips-cnt span").html(""+res.msg+"");
                        setTimeout(hide,1700);
                    }

                }
            });
        }
    });



    var time = 0;
    var djs = 0;
    function cxhq(){
        djs = parseInt($("#yzm_btn span").html());
        //console.log(djs);
        djs--;
        $("#yzm_btn span").html(djs);
        if(djs<0){
            $("#yzm_btn").html("获取验证码");
            $("#yzm_btn").removeAttr("disabled");
            clearInterval(time);
        }
    }

});
function show(){
    $(".ui-poptips").css("display","block");
}
function hide(){
    $(".ui-poptips").css("display","none");
}
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})(jQuery);



/*返回*/
$(".ui-header .fh").on("click", function () {
    //console.log(164343);
    if (history.length == 0) {
        location.href = index + '.html';
    } else if (history.length == 1) {
        history.go(-1);
    } else if (history.length > 1) {
        var ym_id = parseInt($.getUrlParam("ym_id"));
        var tc = parseInt($.getUrlParam("tc"));
        var pt_id = parseInt($.getUrlParam("pt_id"));
        if(tc==0){
            //window.close();
        }
        console.log(ym_id);
        switch (ym_id) {
            case 0:
                console.log(index + ".html");
                location.href = index + ".html";
                break;
            case 1:
                console.log(1);
                location.href = choose_car + ".html";
                break;
            case 4:
                location.href = details+".html?pt_id="+pt_id;
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