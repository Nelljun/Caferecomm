//submit할때 manager.getData()안에 rectangle, circle 리스트를 보낸다.(DB에 저장)
//rectangle : ePoint,sPoint, type : 테이블
//circle : center, radius, type : 좌석
//marker : x,y,type : 콘센트
//marker count : outletCount[] : 콘센트 갯수
//var overlays = []; // 지도에 그려진 도형을 담을 배열

var outletCount = [];





$("#map").on("click",".close",function () {
    //overlay.setMap(null);

    $(this).parent().parent().removeClass("on");
    return false;
});

$("#map").on("click",".btn_minus",function () {
    var count = $(this).next().text();

    if(count > 0){
        count--;
        $(this).next().text(count);
    }

    /*            var index = $(this).parent().parent().parent().prev().find("map").attr("id");
                index = index.substring(index.length-1)/2 - 1;

                $(".popup_wrap").each(function (index) {
                    alert(index);
                });*/
    var index  = $(this).index(".btn_minus");
    $(this).parent().find(".plug_input").val(count);
    outletCount[index] = count;
    //console.log(outletCount);
    return false;
});

$("#map").on("click",".btn_plus",function () {
    var count = $(this).prev().text();
    //alert(count);
    count++;
    $(this).prev().text(count);

    $(this).parent().find(".plug_input").val(count);
    var index  = $(this).index(".btn_plus");

    outletCount[index] = count;
    console.log(manager.getData());
    //console.log(outletCount);
    return false;
});

$("#map").on("click","area",function () {
    $(this).parent().parent().next().next().find(".popup_wrap").addClass("on");
    var index  = $(this).index("area");

    return false;
});