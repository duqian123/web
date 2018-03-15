/**
 * Created by mayn on 2018/2/23.
 */

(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})(jQuery);

var phone = $.getUrlParam("ph"),
    yzm = $.getUrlParam("yzm"),
    sid = $.getUrlParam("sid");
    console.log(phone+"---"+yzm+"---"+sid);

$(function(){

    /*性别按钮切换*/
    $("#nan").on("tap",function(){
        $(this).addClass("nan_style");
        $(this).find("span").addClass("i_style");
        $(this).find("span").addClass("sex");
        $(this).find("i").addClass("i_style");
        $("#nv").removeClass("nv_style");
        $("#nv").find("span").removeClass("i_style");
        $("#nv").find("span").removeClass("sex");
        $("#nv").find("i").removeClass("i_style");
    });
    $("#nv").on("tap",function(){
        $(this).addClass("nv_style");
        $(this).find("span").addClass("i_style");
        $(this).find("span").addClass("sex");
        $(this).find("i").addClass("i_style");
        $("#nan").removeClass("nan_style");
        $("#nan").find("span").removeClass("i_style");
        $("#nan").find("span").removeClass("sex");
        $("#nan").find("i").removeClass("i_style");
    });



    /*信息编辑*/
    $(".caozuo input").focus(function(){
        $(this).attr("class","input_new");
    })
    $(".caozuo input").blur(function(){
        $(this).attr("class","input_txt");
    })



    /*选择出生日期*/
    $('#picker_name').on('click', function () {
        weui.datePicker({
            start: 1940,
            end: new Date().getFullYear(),
            onChange: function (result) {
                //console.log("onChange"+result);
            },
            onConfirm: function (result) {
                //console.log("onConfirm"+result);
                $("#picker_name").val(result);


                var picker_name = $("#picker_name").val();
                var reg = /,/g;
                var rq = picker_name.replace(reg, '-');

                tx_img = tx_img.replace("data:image/jpeg;base64,", '');

                if($("#user_nc").val()!=""&&$("#name").val()!=""&&picker_name!=""){
                    $(".ui-btn-wrap button").removeClass("disabled");
                    $('.ui-btn-wrap .ui-btn-lg').click(function() {
                        var sex = $(".sex_box button .sex").html();
                        var user_nc = $("#user_nc").val();
                        var name = $("#name").val();
                        $.ajax({
                            url:register,
                            type:"post",
                            data:{
                                tx_img:tx_img,
                                sex:sex,
                                nick_name:user_nc,
                                u_name:name,
                                rq:rq,
                                phone:phone,
                                yzm:yzm,
                                session_id:sid
                            },
                            success:function(res){
                                console.log(res);
                                if(res.code==2000){
                                    window.localStorage.setItem("token",res.data);
                                    location.href = my+".html?ph="+phone;
                                }
                            }
                        });
                        console.log(tx_img+"+++"+sex+"-"+user_nc + "-" + name + "-" + rq+"-"+phone+"-"+yzm+"-"+sid);
                    });
                    $("#user_nc,#name").bind("input propertychange", function() {
                        if($(this).val()!=""&&$("#user_nc").val()!=""&&$("#name").val()!=""){
                            $(".ui-btn-wrap button").removeClass("disabled");
                        }else{
                            $(".ui-btn-wrap button").addClass("disabled");
                        }
                    });
                }else{
                    $(".ui-btn-wrap button").addClass("disabled");
                }

            }
        });
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

    $(".ui-footer").click(function(){
        $(this).css("display","none");
    })
});

/*返回*/
function back(){
    if(history.length==0){
        location.href = my+'.html';
    }else if(history.length>=1){
        history.go(-1);
    }
}
