//정보불러오기

var imgName = "menu_default.jpg";


function addAddress() {
	//주소-좌표 변환 객체를 생성
    var geocoder = new daum.maps.services.Geocoder();
    
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var fullAddr = data.address; // 최종 주소 변수
            var extraAddr = ''; // 조합형 주소 변수

            // 기본 주소가 도로명 타입일때 조합한다.
            if(data.addressType === 'R'){
                //법정동명이 있을 경우 추가한다.
                if(data.bname !== ''){
                    extraAddr += data.bname;
                }
                // 건물명이 있을 경우 추가한다.
                if(data.buildingName !== ''){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
            }

            $("#cafeRegisterAddress").val(fullAddr);
            $("#sido").val(data.sido);
            $("#sigungu").val(data.sigungu);
            // 주소로 상세 정보를 검색
            geocoder.addressSearch(data.address, function(results, status) {
                // 정상적으로 검색이 완료됐으면
                if (status === daum.maps.services.Status.OK) {

                    var result = results[0]; //첫번째 결과의 값을 활용
                    console.log(result.y);
                    console.log(result.x);
                    $("#lat").val(result.y);
                    $("#lng").val(result.x);
                }
            });
        }
    }).open();

}
$(".addressBox").click(addAddress);
$("#cafeRegisterAddressDetail").click(addAddress);


$(document).ready(function(){

    $('select').prettyDropdown();
    $("li").css({
        "width" : "150px",
        "height" : "40px",
        "border-bottom":"transparent",
        "border-top":"transparent",
        "border-left":"transparent",
        "border-right":"transparent",
        "color":"white",
        "font-family": "'Nanum Gothic', sans-serif",
        "background":"transparent"
    })
    $("ul").css({
        "border-bottom":"1px solid white",
        "border-top":"transparent",
        "border-left":"transparent",
        "border-right":"transparent",
        "color":"white",
        "font-family": "'Nanum Gothic', sans-serif",
        "background":"transparent",
        "outline":"none",
    })
});




var tmp = _.template($("#etcPlus").html());
var tmp3 = _.template($("#page3Image").html());
var menuTmp = _.template($("#menuTmp").html());
var $btnPre = $(".pre");
var $btnAfter = $(".after");
var count = 0;
var flag = 0;


function readFloorPlan(input) {                                  //커피 추가 팝업창에서 미리보기 사진 넣게 해줌.
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#floorPlanUpload').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
function cafeRegisterBusinessRegistration(input){        //사업자 등록증 등록 미리보기
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#cafeRegisterBusinessRegistrationPreview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }

} //사업자 등록증 등록 미리보기

$("#cafeRegisterBusinessRegistration").change(function () {
    //db에 집어넣음.
    cafeRegisterBusinessRegistration(this);
    
    var data = new FormData();
    
    var file =  $(this).get(0).files[0];

    data.append('upload', file);
    data.append('imgPath', 'cafe');
    
     $.ajax({
         url: '/ajax/uploadPic',
         type: "post",
         dataType: "json",
         data: data,
         processData: false,
         contentType: false,
         success: function(json) {
        	 console.log(json);
     		//사진을 배열에 추가
    		// var pushed = picArr.push(json.src);
    		//화면에 출력
    	     //var markup = picThumbTmp({"src":json.src});
    	     //$ThumbPic.prepend(markup);
        	 $("#reg_pic").val(json.src);
        	 
         }, error: function(jqXHR, textStatus, errorThrown) {
        	 
        	 alert(textStatus);
         }
     });
});


//평면도 업로드
$("#page5FloorPlan").change(function () {
    readFloorPlan(this);

    var data = new FormData();
    
    var file =  $(this).get(0).files[0];

    data.append('upload', file);
    data.append('imgPath', 'floor_plan');
     $.ajax({
         url: '/ajax/uploadPic',
         type: "post",
         dataType: "json",
         data: data,
         processData: false,
         contentType: false,
         success: function(json) {
        	 var src = json.src;
        	 $("#floorPlanInput").val(src);
        	 displayFloorPlan(src);
    	    $(".page5_container").css("background", "transparent");
    	    $(".page5_container").text('');
         }, error: function(jqXHR, textStatus, errorThrown) {
        	 
        	 alert(textStatus);
         }
     });
    
})
var map = "";
var map1 = "";
var node = "";
var node1 = "";
var imgWidth = "";
var imgHeight = "";
var plan = "";
var imageSrc = '/img/icon/outlet.png'; // 마커이미지의 주소입니다
var imageSize = new daum.maps.Size(20, 30); // 마커이미지의 크기입니다
var imageOption = {offset: new daum.maps.Point(20, 30)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
var options = "";
var manager = "";
var floorPlanPic = "";
var outletCount = [];
// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption);

function displayFloorPlan(src){
	//평면도 바꾸면 됩니다.
	var image = new Image();
	image.src = '/img/floor_plan/'+src;
	image.onload = function(){
		imgWidth = image.width;
		imgHeight = image.height;

	}
	floorPlanPic = '/img/floor_plan/'+src;
}






$(".page4_coffe_image").on("click", function () {  //page4 커피 추가 팝업창 만듦.
    $(".insert_drink").addClass("on");
    flag = 1;
});           //page4 커피 추가 팝업창.

$(".page4_desert_image").on("click", function () {         //디저트 추가 팝업창 실행.
    $(".insert_drink").addClass("on");
    $(".insert_drink").find("h1").text("디저트 추가");
    flag= 2;
});        //page4 디저트 추가 팝업창.

$(".fa-times-circle").on("click", function () {     //팝업창 닫기.
	$(".insert_drink").removeClass("on");
});          //page4 취소버튼..


$(".page4_drink_insert").on("click", function () {    //메뉴 추가
    var drinkTitle = $("#drinkTitle").val();
    var drinkDetail = $("#drinkExplicate").val();
    var driveFee = $("#drinkFee").val();
    var image_reference = imgName;

    $("#drinkTitle").val('');
    $("#drinkExplicate").val('');
    $("#drinkFee").val('');
    $('.coffe_preview').attr('src', "");
    
    var markup = menuTmp({
        "title" : drinkTitle,
        "detail" : drinkDetail,
        "fee" : driveFee,
        "img" : image_reference,
        "type" : flag
    });


    if(flag ==1){
        $(".drink_list").prepend(markup);
    }else if(flag ==2){
        $(".dessert_list").prepend(markup);
    }

    $(".insert_drink").removeClass("on");
    return false;
});     //page4 커피 insert 버튼.


function readCoffeImage(input) {                                  //커피 추가 팝업창에서 미리보기 사진 넣게 해줌.
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.coffe_preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}                          //page4 커피 사진 미리보기



$("#coffeImage").change(function() {                     //image 요소 변화가 있을시 실행.
    //db에 사진을 저장하고 출력함.
    readCoffeImage(this);
    
    var data = new FormData();
    
    var file =  $(this).get(0).files[0];

    data.append('upload', file);
    data.append('imgPath', 'menu');

     $.ajax({
         url: '/ajax/uploadPic',
         type: "post",
         dataType: "json",
         data: data,
         processData: false,
         contentType: false,
         success: function(json) {
        	 console.log(json);
        	 imgName = json.src;
        	 
         }, error: function(jqXHR, textStatus, errorThrown) {
        	 
        	 alert(textStatus);
         }
     });
    
});                     //page4 커피 미리보기에 변화가 있을시 실행..


//여기까지 page4요소들







$btnPre.on("click", function () {               //page이동
    if($("#page7").css("display")=="block"){
        $("#page7").css("display", "none");
        $("#page6").css("display", "block");
        $("#cafeRegisterMainTitle").text('6단계 : ');
        $("#cafeRegisterSubTitle").text('테이블, 좌석, 콘센트를 추가하세요.');
        $("#cafeRegisterLineContainer").css({
            "transition": ".1s ease",
            "width" : (14*6) + "%"
        });
        $("#map").css("visibility","visible");
        console.log(node);
        node = document.getElementById('map');
        node.style.width = '1000px';
        node.style.height = '800px';
        map.relayout();
        $("body").scrollTop(0);
    }
    else if($("#page6").css("display")=="block"){
        $("#page6").css("display", "none");
        $("#page5").css("display", "block");
        $("#cafeRegisterMainTitle").text('5단계 : ');
        $("#cafeRegisterSubTitle").text('평면도를 추가하세요.');
        $("#cafeRegisterLineContainer").css({
            "transition": ".1s ease",
            "width" : (14*5) + "%"
        });
        $("body").scrollTop(0);
    }
    else if($("#page5").css("display")=="block"){
        $("#page5").css("display", "none");
        $("#page4").css("display", "block");
        $("#cafeRegisterMainTitle").text('4단계 : ');
        $("#cafeRegisterSubTitle").text('메뉴를 추가하세요.');
        $("#cafeRegisterLineContainer").css({
            "transition": ".1s ease",
            "width" : (14*4) + "%"
        });
        $("body").scrollTop(0);
    }
    else if($("#page4").css("display")=="block"){
        $("#page4").css("display", "none");
        $("#page3").css("display", "block");
        $("#cafeRegisterMainTitle").text('3단계 : ');
        $("#cafeRegisterSubTitle").text('카페 사진을 추가하세요.');
        $("#cafeRegisterLineContainer").css({
            "transition": ".1s ease",
            "width" : (14*3) + "%"
        });
        $("body").scrollTop(0);
    }
    else if($("#page3").css("display")=="block"){
        $("#page3").css("display", "none");
        $("#page2").css("display", "block");
        $("#cafeRegisterMainTitle").text('2단계 : ');
        $("#cafeRegisterSubTitle").text('시설 정보를 선택하세요');
        $("#cafeRegisterLineContainer").css({
            "transition": ".1s ease",
            "width" : (14*2) + "%"
        });
        $("body").scrollTop(0);
    }
    else if($("#page2").css("display")=="block"){
        $("#page2").css("display", "none");
        $("#page1").css("display", "block");
        $("#cafeRegisterMainTitle").text('1단계 : ');
        $("#cafeRegisterSubTitle").text('기본 사항을 입력하세요');
        $("#cafeRegisterLineContainer").css("width", "98px");
        $("#cafeRegisterLineContainer").css({
            "transition": ".1s ease",
            "width" : (14*1) + "%"
        });
        $("body").scrollTop(0);
    }
    else{
        return false;
    }

})            //페이지 이전

var phoneCheck =/^[0-9|\-]*$/;

$btnAfter.on("click", function () {

    if($("#page1").css("display")=="block"){

        $(".validate").removeClass("on");

        if ($("#page1CafeRegisterName").val() == '') {
            $(".cafe_name").addClass("on");
            $(".cafe_name").text('카페명을 입력하세요.');
            return;
        }//if end

        if ($("#cafeRegisterNumber").val() == '') {
            $(".phone_n_cafe_number_first").addClass("on");
            $(".phone_n_cafe_number_first").text("번호를 입력하세요.");
            return;
        }// else if end
        else if (!phoneCheck.test($("#cafeRegisterNumber").val()))  {
            $(".phone_n_cafe_number_first").addClass("on");
            $(".phone_n_cafe_number_first").text("잘못된 번호입니다.");
            return;
        }// else if end
        if ($("#cafeRegisterTime").val() == '') {
            $(".process_time").addClass("on");
            $(".process_time").text('영업시간을 입력하세요.');
            return;
        }//if end
        if ($("#cafeRegisterAddress").val() == '') {
            $(".adress_check_detail ").addClass("on");
            $(".adress_check_detail ").text('주소를 입력하세요.');
            return;
        }//if end
        if ($("#reg_pic").val() == '') {
            $(".bussiness_registration_image ").addClass("on");
            $(".bussiness_registration_image ").text(' 사업자 등록증을 추가하세요.');
            return;
        }//if end
        $("#page1").css("display", "none");
        $("#page2").css("display", "block");
        $("body").scrollTop(0);
        $("#cafeRegisterMainTitle").text('까페레꼼 2단계 : ');
        $("#cafeRegisterSubTitle").text('시설 정보를 선택하세요.');
        $("#cafeRegisterLineContainer").css({
            "transition": ".1s ease",
            "width": (14 * 2) + "%"
        })


        $("#page1").css("display", "none");
        $("#page2").css("display", "block");
        $("#cafeRegisterMainTitle").text('2단계 : ');
        $("#cafeRegisterSubTitle").text('시설 정보를 선택하세요.');
        $("#cafeRegisterLineContainer").css({
            "transition": ".1s ease",
            "width" : (14*2) + "%"
        });
    }
    else if($("#page2").css("display")=="block"){
        $("#page2").css("display", "none");
        $("#page3").css("display", "block");
        $("#cafeRegisterMainTitle").text('3단계 : ');
        $("#cafeRegisterSubTitle").text('카페 사진을 추가하세요.');
        $("#cafeRegisterLineContainer").css({
            "transition": ".1s ease",
            "width" : (14*3) + "%"
        });
        $("body").scrollTop(0);

    }
    else if($("#page3").css("display")=="block"){
        $("#page3").css("display", "none");
        $("#page4").css("display", "block");
        $("#cafeRegisterMainTitle").text('4단계 : ');
        $("#cafeRegisterSubTitle").text('메뉴를 추가하세요.');
        $("#cafeRegisterLineContainer").css({
            "transition": ".1s ease",
            "width" : (14*4) + "%"
        });
        $("body").scrollTop(0);
    }
    else if($("#page4").css("display")=="block"){
        $("#page4").css("display", "none");
        $("#page5").css("display", "block");
        $("#cafeRegisterMainTitle").text('5단계 : ');
        $("#cafeRegisterSubTitle").text('평면도를 추가하세요.');
        $("#cafeRegisterLineContainer").css({
            "transition": ".1s ease",
            "width" : (14*5) + "%"
        });
        $("body").scrollTop(0);
    }
    else if($("#page5").css("display")=="block"){
        $("#page5").css("display", "none");
        $("#page6").css("display", "block");
        $("#cafeRegisterMainTitle").text('6단계 : ');
        $("#cafeRegisterSubTitle").text('테이블, 좌석, 콘센트를 추가하세요.');
        $("#cafeRegisterLineContainer").css({
            "transition": ".1s ease",
            "width" : (14*6) + "%"
        });
        $("body").scrollTop(0);
        //$("#map").css("visibility","visible");
        //node = document.getElementById('map');
        //node.style.width = '1000px';
        //node.style.height = '800px';
        
        makeFuniture();
        map.relayout();
    }
    else if($("#page6").css("display")=="block"){
        $("#page6").css("display", "none");
        $("#page7").css("display", "block");
        $("#cafeRegisterMainTitle").text('7단계 : ');
        $("#cafeRegisterSubTitle").text('좌석 사진을 추가하세요.');
        $("#cafeRegisterLineContainer").css({
            "transition": ".1s ease",
            "width" : (98*7) + "%"
        });        
        console.log($("#map").children("div").eq(0).children("div").eq(0).children("div").eq(5).html());
        $("body").scrollTop(0);
        var count = $(".outlet_count").length;
        for(var i=0 ; i<count ; i++ ){

        	var cnt = $(".outlet_count").eq(i).text();
        	outletCount.push(cnt);
        }
        console.log(outletCount);
        console.log(manager);
        getDataFromDrawingMap();
        map1.relayout();
        //$("#map1").css("visibility","visible");
        //node1 = document.getElementById('map1');
        //node1.style.width = '1000px';
        //node1.style.height = '800px';
        //map1.relayout();
    }
    else{
        return false;
    }

})       //페이지 다음.



$(".page2_check_plus").on("click", function () {        //page2 기타 추가.
    if(($("#others").val()=='')){
        console.log("test");
        alert("세부시설을 입력하세요!");
        return;
    }
    else{
        var etc_plus = $("#others").val();
        $(".page2_plus").prepend(tmp({"etc_plus":etc_plus}));


        $("#others").val("").focus();


        //유저의 편리를 위해서
        //input의 값을 비우고 포커스 맞추기
    }
    return false;

})
$(".etc_plus").on("click", function () {
    alert("test");
})
var repPic = cafePicCount;
$("#cafeImage").change(function(){                          //page3번 이미지 추가.
	console.log("들어왔음");
    var data = new FormData();
    
    var file =  $(this).get(0).files[0];
    
    data.append('upload', file);
    data.append('imgPath', 'cafe');
     $.ajax({
         url: '/ajax/uploadPic',
         type: "post",
         dataType: "json",
         data: data,
         processData: false,
         contentType: false,
         success: function(json) {
        	 console.log(json);

        	 $(".image_box").prepend(tmp3({"image_reference":json.src,"idx":repPic}));
        	 repPic++;
         }, error: function(jqXHR, textStatus, errorThrown) {
        	 
        	 alert(textStatus);
         }
     });
    

    

    return false;
    //db에 사진을 저장하고 출력함.
}); //page3번 jquery

$(".input_representati").on("click", function () {//대표지정. 아직 미완성.
    count++;
})


//기타 삭제
$(".page2_plus").on("click",".etc_delete",function(){
    $(this).parent().remove();
});

$(".li_image").on("click", ".li_image_delete", function () {
    console.log("이거체크만일단")
    $(this).parent().remove();
})
/* 메뉴 이미지를 마우스 오버시 */
$(".drink_list").on("mouseover",".box_menu_image",function () {

    var $this = $(this);

    $this.find(".menu_click").css("display", "block");

});


/* 메뉴 이미지를 마우스 떠날시 */
$(".drink_list").on("mouseleave",".box_menu_image",function () {

    var $this = $(this);

    $this.find(".menu_click").css("display", "none");

});
/* 메뉴 이미지를 마우스 오버시 */
$(".dessert_list").on("mouseover",".box_menu_image",function () {

    var $this = $(this);

    $this.find(".menu_click").css("display", "block");

});


/* 메뉴 이미지를 마우스 떠날시 */
$(".dessert_list").on("mouseleave",".box_menu_image",function () {

    var $this = $(this);

    $this.find(".menu_click").css("display", "none");

});

$(".image_box").on("click",".li_image_delete",function(){

	var picName = $(this).parent().find(".cafe_pic_name").val();
	var $liImg = $(this).parent();

	//사진편집창 refresh & 삭제
	$.ajax({
        url: '/ajax/deletePic',
        type: "post",
        data: {"name":picName,"_method":"DELETE","imgPath":"cafe"},
		error: function(jqXHR, textStatus, errorThrown) {
       	 	alert(textStatus);
        },
        success: function () {
        	$liImg.remove();

        }
    });
});

function makeFuniture(){
	plan = function( x, y, z ) {
	    y = -y - 1;
	    var limit = Math.ceil( 3 / Math.pow( 2, z ) );

	    if ( 0 <= y && y < limit && 0 <= x && x < limit ) {
	        return floorPlanPic;
	    } else {
	        return 'http://i1.daumcdn.net/dmaps/apis/white.png';
	    }

	};


	daum.maps.Tileset.add( 'PLAN',
	    new daum.maps.Tileset(
	        imgWidth*1.5, imgHeight*1.5, plan, '', false, 2, 2 ) );
    
	node = document.getElementById( 'map' );
	map = new daum.maps.Map( node, {
	    projectionId: null,
	    mapTypeId: daum.maps.MapTypeId.PLAN,
	    $scale: false,
	    center: new daum.maps.Coords( imgWidth*1.5, -imgHeight*1.5 ),
	    level: 2
	} );
	
	options = { // Drawing Manager를 생성할 때 사용할 옵션입니다
		    map: map, // Drawing Manager로 그리기 요소를 그릴 map 객체입니다
		    drawingMode: [ // Drawing Manager로 제공할 그리기 요소 모드입니다
		        daum.maps.Drawing.OverlayType.MARKER,
		        daum.maps.drawing.OverlayType.RECTANGLE,
		        daum.maps.drawing.OverlayType.CIRCLE
		    ],
		    // 사용자에게 제공할 그리기 가이드 툴팁입니다
		    // 사용자에게 도형을 그릴때, 드래그할때, 수정할때 가이드 툴팁을 표시하도록 설정합니다
		    guideTooltip: ['draw', 'drag', 'edit'],
		    markerOptions: { // 마커 옵션입니다
		        draggable: true, // 마커를 그리고 나서 드래그 가능하게 합니다
		        removable: true, // 마커를 삭제 할 수 있도록 x 버튼이 표시됩니다
		        markerImages: [
		            //null, // API에서 제공하는 기본 마커 이미지
		            {
		                src: '/img/icon/outlet.png',
		                width: 20,
		                height: 30,
		                shape: 'rectangle',
		                coords: '0,0,20,30'

		            }
		        ]
		    },
		    rectangleOptions: {
		        /*                bounds: new daum.maps.LatLngBounds(
		                            new daum.maps.LatLng(rects[i].sPoint.y, rects[i].sPoint.x),
		                            new daum.maps.LatLng(rects[i].ePoint.y, rects[i].ePoint.x)
		                        ),*/
		        draggable: true,
		        removable: true,
		        editable: true,
		        strokeColor: '#311B92', // 외곽선 색
		        fillColor: '#CE93D8', // 채우기 색
		        fillOpacity: 1 // 채우기색 투명도
		    },
		    circleOptions: {
		        draggable: true,
		        removable: true,
		        editable: true,
		        strokeColor: '#311B92',
		        fillColor: '#FBC02D',
		        fillOpacity: 1
		    }

		};

		// 위에 작성한 옵션으로 Drawing Manager를 생성합니다
		manager = new daum.maps.drawing.DrawingManager(options);

		// 버튼 클릭 시 호출되는 핸들러 입니다
		function selectOverlay(type) {
		    // 그리기 중이면 그리기를 취소합니다
		    manager.cancel();

		    // 클릭한 그리기 요소 타입을 선택합니다
		    manager.select(daum.maps.drawing.OverlayType[type]);
		    console.log(manager.getData().marker);

		}


	
		
		$("#btnTableInsert").click(function () {

		    selectOverlay('RECTANGLE');
		});
		$("#btnChairInsert").click(function () {

		    selectOverlay('CIRCLE');
		});
		$("#btnConsentInsert").click(function () {

		    selectOverlay('MARKER');


		});
/*		var content =
		    '<div class="popup_wrap on">'+
		    '<div class="popup_title">콘센트 갯수<div class="close" title="닫기"></div></div>'+
		    '<div class="popup_content">'+
		    '<button class="control_btn btn_minus">-</button>'+
		    '<label class="outlet_count"> 1 </label>'+
		    '<button class="control_btn btn_plus">+</button>'+
		    '<input type="hidden" class="plug_input" name="outletCount" />'+
		    '</div>'+
		    '</div>';*/
		var drawType;
		var overlays = [];
		var i=1;

		var size = 0;

		daum.maps.event.addListener(map, 'click', function(mouseEvent) {

		    $(".popup_wrap").removeClass("on");
		});



		manager.addListener('select', function(e) {
		    console.log(e.overlayType);
		    drawType = e.overlayType;
		});

		manager.addListener('drawend', function(mouseEvent) {

		    if(drawType == 'marker'){

		        var position = mouseEvent.coords;
		        position.ib += 220;
		        position.jb += 350;
		        console.log(position);
		        var overlay = new daum.maps.CustomOverlay({
		            clickable: true,
		            content: 		    '<div class="popup_wrap on">'+
				    '<div class="popup_title">콘센트 갯수<div class="close" title="닫기"></div></div>'+
				    '<div class="popup_content">'+
				    '<button class="control_btn btn_minus">-</button>'+
				    '<label class="outlet_count"> 1 </label>'+
				    '<button class="control_btn btn_plus">+</button>'+
				    '<input type="hidden" class="plug_input" name="outletCount" value="1"/>'+
				    '</div>'+
				    '</div>',
		            map: map,
		            position: position.toLatLng(),
		            zIndex: 10
		        });

		        //overlay.setPosition();

		        overlay.setMap(map);
		        //overlays.push(overlay);

		    }
		    return false;
		});	
		
		if(tableList.length > 0){
			for(var i=0 ; i<tableList.length ; i++){
				var sw = new daum.maps.LatLng(tableList[i].sy, tableList[i].sx);
				var ne = new daum.maps.LatLng(tableList[i].ey, tableList[i].ex);
				var bounds = new daum.maps.LatLngBounds(sw, ne);
				
				manager.put(daum.maps.drawing.OverlayType.RECTANGLE, bounds);
			}
		}

		if(chairList.length > 0){
			for(var i=0 ; i<chairList.length ; i++){
				var center = new daum.maps.LatLng(chairList[i].y, chairList[i].x);
				
				manager.put(daum.maps.drawing.OverlayType.CIRCLE, center, chairList[i].radius);
			}
		}
	
		if(plugList.length > 0){
			for(var i=0 ; i<plugList.length ; i++){
				var position = new daum.maps.LatLng(plugList[i].y, plugList[i].x);
				
				manager.put(daum.maps.drawing.OverlayType.MARKER, position, 0);
				
				var content =
				    '<div class="popup_wrap">'+
				    '<div class="popup_title">콘센트 갯수<div class="close" title="닫기"></div></div>'+
				    '<div class="popup_content">'+
				    '<button class="control_btn btn_minus">-</button>'+
				    '<label class="outlet_count">'+plugList[i].count+'</label>'+
				    '<button class="control_btn btn_plus">+</button>'+
				    '<input type="hidden" name="outletCount" class="plug_input" value="'+plugList[i].count+'"/>'+
				    '</div>'+
				    '</div>';

				var position1 = new daum.maps.LatLng(plugList[i].y, plugList[i].x);
				
		        var overlay = new daum.maps.CustomOverlay({
		            clickable: true,
		            content: content,
		            map: map,
		            position: position1,
		            zIndex: 10
		        });

		        //overlay.setPosition();

		        overlay.setMap(map);
		        //overlays.push(overlay);

			}
		}
}

function getDataFromDrawingMap() {
	
	plan = function( x, y, z ) {
	    y = -y - 1;
	    var limit = Math.ceil( 3 / Math.pow( 2, z ) );

	    if ( 0 <= y && y < limit && 0 <= x && x < limit ) {
	        return floorPlanPic;
	    } else {
	        return 'http://i1.daumcdn.net/dmaps/apis/white.png';
	    }

	};


	daum.maps.Tileset.add( 'PLAN',
	    new daum.maps.Tileset(
	        imgWidth*1.5, imgHeight*1.5, plan, '', false, 2, 2 ) );
	
	node1 = document.getElementById( 'map1' );
	map1 = new daum.maps.Map( node1, {
	    projectionId: null,
	    mapTypeId: daum.maps.MapTypeId.PLAN,
	    $scale: false,
	    center: new daum.maps.Coords( imgWidth*1.5, -imgHeight*1.5 ),
	    level: 2
	} );
	
	var data = manager.getData();
	console.log(data);
    drawMarker(data[daum.maps.drawing.OverlayType.MARKER]);
    drawRectangle(data[daum.maps.drawing.OverlayType.RECTANGLE]);
    drawCircle(data[daum.maps.drawing.OverlayType.CIRCLE]);
}

$(".cancel").click(function(){
	if(isCafe == 1){
		location.href = "/cafe/"+cafeNo;
	}else{
		location.href = "/main";
	}

});

$("#form").submit(function(e){
	//e.preventDefault();

	for(var i=0 ; i<overlays.length ; i++){
		overlays[i].setVisible(true);
	}
	var tag;

	var length = $(".chair_pic_input").length;

/*    var count = $(".outlet_count").length;

    for(var i=0 ; i<count ; i++ ){

    	tag = "<input type='hidden' value='"+outletCount[i]+"' name='outletCount' />";
    	$("#page7").append(tag);
    	console.log(outletCount[i]);
    }*/
/*    var count1 = $(".popup_wrap1").length;
    alert(count1);
    //alert(count1);
    for(var i=0 ; i<count1 ; i++){
    	var pic = $(".popup_wrap1").eq(i).find(".pic_box").attr("data");
    	//var picArr = pic.split('/');
    	tag = "<input type='hidden' value='"+pic+"'  name='chairPic' />";
    	$("#page7").append(tag);
    	//console.log(picList[i]);
    }*/
/*    var count1 = $(".chair_pic1").length;
    for(var i=0 ; i<count ;i++){
    	console.log("의자사진:"+$(".chair_pic1").eq(i).val());
    }*/
/*    alert($("#map1 .pic_input").length);
    for(var i=0 ; i<picList.length ; i++){
    	console.log(picList[i]);
    	var tag = "<input type='hidden' value='"+picList[i]+"'  name='chairPic' />";
    	$("#page7").append(tag);
    }*/
    var data = manager.getData();
    for(var i=0 ; i<data.circle.length ; i++){
    	tag = "<input type='hidden' value='"+data.circle[i].radius+"'  name='radius' />"
    		+"<input type='hidden' value='"+data.circle[i].center.x+"'  name='x' />"
    		+"<input type='hidden' value='"+data.circle[i].center.y+"'  name='y' />"
    		+"<input type='hidden' value='"+(i+1)+"'  name='idx' />"
    		+"<input type='hidden' value='"+$(".chair_pic_input").eq(i).val()+"'  name='chairPic' />";
    	$("#form").append(tag);
    }
	alert("a :"+length);
	alert("b :"+data.circle.length);

    for(var i=0 ; i<data.rectangle.length ; i++){
    	tag = "<input type='hidden' value='"+data.rectangle[i].ePoint.x+"'  name='ex' />"
    		+"<input type='hidden' value='"+data.rectangle[i].ePoint.y+"'  name='ey' />"
    		+"<input type='hidden' value='"+data.rectangle[i].sPoint.x+"'  name='sx' />"
    		+"<input type='hidden' value='"+data.rectangle[i].sPoint.y+"'  name='sy' />";
    	$("#form").prepend(tag);
    }
    
    for(var i=0 ; i<data.marker.length ; i++){
    	tag = "<input type='hidden' value='"+data.marker[i].x+"'  name='plugX' />"
    		+"<input type='hidden' value='"+data.marker[i].y+"'  name='plugY' />";
    	$("#form").prepend(tag);
    }
});

