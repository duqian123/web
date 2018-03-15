/**
 * Created by mayn on 2018/2/23.
 */

$(function(){

    /*性别按钮切换*/
    $("#nan").on("tap",function(){
        nanShow();
    });

    $("#nv").on("tap",function(){
        nvShow();
    });
    function nanShow(){
        $("#nan").addClass("nan_style");
        $("#nan").find("span").addClass("i_style");
        $("#nan").find("i").addClass("i_style");
        $("#nv").removeClass("nv_style");
        $("#nv").find("span").removeClass("i_style");
        $("#nv").find("i").removeClass("i_style");
    }
    function nvShow(){
        $("#nv").addClass("nv_style");
        $("#nv").find("span").addClass("i_style");
        $("#nv").find("i").addClass("i_style");
        $("#nan").removeClass("nan_style");
        $("#nan").find("span").removeClass("i_style");
        $("#nan").find("i").removeClass("i_style");
    }

    /*信息编辑*/
    $(".caozuo input").focus(function(){
        $(this).attr("class","input_new");
    })
    $(".caozuo input").blur(function(){
        $(this).attr("class","input_txt");
    })

    /*弹出禁止修改手机号*/
    $(".content:eq(0)").click(function(){
        show();
        $(".ui-poptips .ui-poptips-cnt span").html("手机号无法修改");
        setTimeout(hide,1700);
    });
    function show(){
        $(".ui-poptips").css("display","block");
    }
    function hide(){
        $(".ui-poptips").css("display","none");
    }

    /*选择出生日期*/
    $('#picker_name').on('click', function () {
        weui.datePicker({
            start: 1940,
            end: new Date().getFullYear(),
            onChange: function (result) {
                console.log("onChange"+result);
            },
            onConfirm: function (result) {
                console.log("onConfirm"+result);
                $("#picker_name").val(result);
            }
        });
    });

    /*退出登录*/
    $(".content:last-child").on("click",function(){
        location.href = login_one+".html?tc="+0;
    });

    /*获取url 传递参数*/
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
    })(jQuery);
    /*绑定用户信息*/
    var token = window.localStorage.getItem("token");
    var phone = parseInt($.getUrlParam("ph"));
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
            //console.log(res);
            $("#user_id").val(res.data.id);
            $(".user_photo").css({"background":"url("+res.data.logo+") no-repeat","background-size": "100% 100%"});
            var sex = res.data.sex;
            if(sex=="男"){
                nanShow();
            }else{
                nvShow();
            }
            $("#phone").val(res.data.phone);
            $("#username").val(res.data.nick_name);
            $("#name").val(res.data.u_name);
            var reg = /-/g;
            var sr = res.data.brithday.replace(reg, ',');
            $("#picker_name").val(sr);

        }
    });

    var tx_img;
    /*选择头像*/
    var clipArea = new bjj.PhotoClip("#clipArea", {
        size: [100, 100],// 截取框的宽和高组成的数组。默认值为[260,260]
        outputSize: [100, 100], // 输出图像的宽和高组成的数组。默认值为[0,0]，表示输出图像原始大小
        //outputType: "jpg", // 指定输出图片的类型，可选 "jpg" 和 "png" 两种种类型，默认为 "jpg"
        file: "#file", // 上传图片的<input type="file">控件的选择器或者DOM对象
        view: "#view", // 显示截取后图像的容器的选择器或者DOM对象
        ok: "#clipBtn", // 确认截图按钮的选择器或者DOM对象
        loadStart: function() {
            // 开始加载的回调函数。this指向 fileReader 对象，并将正在加载的 file 对象作为参数传入
            $('.cover-wrap').fadeIn();
            console.log("照片读取中");
        },
        loadComplete: function() {
            // 加载完成的回调函数。this指向图片对象，并将图片地址作为参数传入
            console.log("照片读取完成");
        },
        //loadError: function(event) {}, // 加载失败的回调函数。this指向 fileReader 对象，并将错误事件的 event 对象作为参数传入
        clipFinish: function(dataURL) {
            // 裁剪完成的回调函数。this指向图片对象，会将裁剪出的图像数据DataURL作为参数传入
            $('.cover-wrap').fadeOut();
            $('#view').css('background-size','100% 100%');
            tx_img = dataURL;
            //console.log(tx_img);
        }
    });
    //console.log(clipArea);
    $("#view").removeAttr("style");

    $(".qx").click(function(){
        $(".footer").css("display","none");
    })
    $("#view").click(function(){
        $(".footer").css("display","block");
    });
    $("#bc #clipBtn").click(function(){
        $(".footer").css("display","none");
    });
    $("#bc #fh").click(function(){
        $(".cover-wrap").css("display","none");
    });


    /*点击保存*/
    $(".storage").on("click",function(){
        var id = $("#user_id").val();
        var user_photo = $(".user_photo").attr("src");
        //tx_img = tx_img.replace("data:image/jpeg;base64,", '');
        if(tx_img!=undefined){
            tx_img = tx_img.replace("data:image/jpeg;base64,", '');
        }else{
            tx_img = "old";
        }
        console.log(tx_img);
        var sex = $(".i_style").eq(1).html(),
            phone = $("#phone").val(),
            nick_name = $("#username").val(),
            u_name = $("#name").val(),
            reg = /,/g,
            rq = $("#picker_name").val().replace(reg, '-');

        $.ajax({
            url:"http://192.168.10.176:8888/v1/updateUserInfo",
            type:"post",
            dataType:"json",
            data:{
                id:id,
                u_name:u_name,
                nick_name:nick_name,
                sex:sex,
                brithday:rq,
                tx_img:tx_img,
                old_img:user_photo
            },
            headers: {
                Authorization: token
            },
            success:function(res){
                console.log(res);
                if(res.code==2000){
                    show();
                    $(".ui-poptips .ui-poptips-cnt span").html(""+res.msg+"");
                    setTimeout(hide,1700);
                }

            }
        });
        console.log(id+"-"+user_photo+"-"+sex+"-"+phone+"-"+nick_name+"-"+u_name+"-"+rq+"++++"+tx_img);
    });


});
var ph = window.localStorage.getItem("phone");
/*返回*/
function back(){
    if(history.length==0){
        location.href = my+'.html?ph='+ph;
    }else if(history.length==1){
        history.go(-1);
    }else if(history.length>1){
        location.href = my+'.html?ph='+ph;
    }
}
