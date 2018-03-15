/**
 * Created by mayn on 2018/2/23.
 */

$(function () {
    var tit = "";
    $.ajax({
        url:getCar,
        type:"post",
        dataType:"json",
        success:function (res) {
            //console.log(res.data.car_param_model.params);
            $(".xx_info").append(res.data.car_param_model.params);
            var len =$(".xx_info tbody").length;
            tit = "<div class='box'><span class='tit_txt'></span><i class='jt'></i><span class='r'><span class='hd'></span><span class='bp'>标配</span><span class='yd'></span><span class='xp'>选配</span><span class='g'></span><span class='wu'>无</span></span></div>"
            for(var i=0;i<len;i++){
                switch (i){
                    case 0:
                        $(".xx_info tbody").eq(i).before(tit);
                        $(".xx_info tbody").eq(i).prev().children(".tit_txt").html("基本参数");
                        break;
                    case 1:
                        $(".xx_info tbody").eq(i).before(tit);
                        $(".xx_info tbody").eq(i).prev().children(".tit_txt").html("车身尺寸");
                        break;
                    case 2:
                        $(".xx_info tbody").eq(i).before(tit);
                        $(".xx_info tbody").eq(i).prev().children(".tit_txt").html("动力系统");
                        break;
                    case 3:
                        $(".xx_info tbody").eq(i).before(tit);
                        $(".xx_info tbody").eq(i).prev().children(".tit_txt").html("地盘制动");
                        break;
                    case 4:
                        $(".xx_info tbody").eq(i).before(tit);
                        $(".xx_info tbody").eq(i).prev().children(".tit_txt").html("安全配置");
                        break;
                    case 5:
                        $(".xx_info tbody").eq(i).before(tit);
                        $(".xx_info tbody").eq(i).prev().children(".tit_txt").html("驾驶辅助");
                        break;
                    case 6:
                        $(".xx_info tbody").eq(i).before(tit);
                        $(".xx_info tbody").eq(i).prev().children(".tit_txt").html("外部配置");
                        break;
                    case 7:
                        $(".xx_info tbody").eq(i).before(tit);
                        $(".xx_info tbody").eq(i).prev().children(".tit_txt").html("内部配置");
                        break;
                    case 8:
                        $(".xx_info tbody").eq(i).before(tit);
                        $(".xx_info tbody").eq(i).prev().children(".tit_txt").html("座椅配置");
                        break;
                    case 9:
                        $(".xx_info tbody").eq(i).before(tit);
                        $(".xx_info tbody").eq(i).prev().children(".tit_txt").html("信息娱乐");
                        break;
                }
            }

            $(".xx_info tbody").eq(0).children("tr").eq(0).children("td").eq(3).remove();
            $(".xx_info tbody").eq(0).children("tr").eq(0).children("td").eq(2).remove();
            $(".xx_info tbody").contents().unwrap().wrap('<ul/>');
            $(".xx_info tr").contents().unwrap("");
            $(".xx_info ul td").contents().unwrap().wrap('<li>');

            $(".xx_info ul li").addClass("ui-border-b");
            var len2 = $(".xx_info ul li").length;
            $(".focus-color-warp ul li a span").addClass("car_color");
            $(".focus-color-warp ul li").removeClass("ui-border-b");

            $('.xx_info ul').each(function(){
                if(!$(this).has("li").length){
                    $(this).remove();
                }
            })

            for (var i = 0; i < len2; i++) {
                var n= $(".xx_info ul li").length;
                //console.log(n);
                if (i % 2 == 1) {

                    var l = $(".xx_info ul li").eq(i+1).children(".info").children(".optional").length;
                    console.log(l);
                    if (l == 0 || l == 1) {
                        $(".xx_info ul li").eq(i).css({
                            "height": "50px",
                            "line-height": "50px"

                        });
                    } else {
                        $(".xx_info ul li").eq(i+1).children(".info").css({
                            "height": 50 * l + "px"

                        });
                        $(".xx_info ul li").eq(i+1).children(".info").children(".optional").css({
                            "height": "50px",
                            "line-height": "50px"
                        });
                    }
                } else if (i % 2 == 0) {

                    var t = $("li").eq(i).children(".title").text();
                    var reg = /：/g;
                    $("li").eq(i).children(".title").html(t.replace(reg, ""));
                    //console.log(i);
                    var k = $(".xx_info ul li").eq(i).children(".info").children(".optional").length;
                    //console.log($(".xx_info ul li").eq(i).children(".info").children(".optional").length);
                    if (k != 0) {
                        $(".xx_info ul li").eq(i-1).css({
                            "height": 50 * k + "px",
                            "line-height": 50 * k + "px"
                        });
                        $(".xx_info ul li").eq(i-1).children(".info").css({
                            "height": 50 * k + "px",
                            "line-height": 50 * k + "px"
                        });
                    } else {
                        $(".xx_info ul li").eq(i).css({
                            "height": "50px",
                            "line-height": "50px"
                        });
                    }
                }
            }
        }
    });

    function fn(){
        $(".demo-block").addClass("hidde");
        $(".xx_info").removeClass("hidde");
        $(".xx_info").addClass("show");
        $(".ui-footer").removeClass("hidde");
        $(".ui-footer").addClass("show");
    }
    setTimeout(fn,1500);

});
/*返回*/
function back() {
    if (history.length == 0) {
        location.href = 'index.html';
    } else if (history.length >= 1) {
        history.back();
    }
}
$(".footer_ui .jiaru").click(function () {
    $(".ui-loading-block").css("display", "-webkit-box");
    function fn() {
        $(".ui-loading-block").css("display", "none");
        window.location.href = count+".html?pt_id=1";
    }
    setTimeout(fn, 1500);
});
$(".footer_ui .faqi").click(function () {
    window.location.href = count+".html?pt_id=2";
});
var k = 0;
$(".shoucang").click(function () {
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
