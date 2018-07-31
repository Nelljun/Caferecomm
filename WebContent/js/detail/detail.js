//카페 정보 수정 버튼 누를 시
var $cafeModifyBtn = $(".btn_cafe_modify");

$cafeModifyBtn.click(function (e) {
	
	if(!confirm("카페 정보를 수정하시겠습니까?")) {
		//아니오 누를 시 링크이동 막기
		e.preventDefault();
		
	}//if end
	
});

//메뉴 호버시 음료 디저트 나오는 자바스크립트
$("#gnbMenu").mouseover(function () {
    $(".gnb_menuDetail").addClass("on");
});
$("#gnbMenu").mouseleave(function () {
    $(".gnb_menuDetail").removeClass("on");
});

//디테일 페이지 탭 버튼 클릭시 밝기 변화 및 하단 컨텐츠 변화
$(".cafe_gnb").click(function () {

    $(".on").removeClass("on");
    $(this).addClass("on");
    var index = $(this).parent().index();
    $(".box_board").eq(index).addClass("on");
    
    if(index ==1){
    	displayMap(1.5,1.5);
    }
});

$(".gnb_drink").click(function () {
    $(".on").removeClass("on");
    $(".box_menu").addClass("on");
});

$(".gnb_dessert").click(function () {
	$(".on").removeClass("on");
    $(".box_menu").addClass("on");
});

//북마크 클릭 시 북마크 추가/삭제 
$("#cafeGnbBtn #cafeNameBox .fa-star").click(function () {
	
	var $this = $(this);
	
    if($this.hasClass("on")){
    	//북마크 제거
    	
    	$.ajax({
    		url: "/ajax/bookmark",
    		type: "post",
    		dataType: "json",
    		data: {
    			"userNo": loginUserNo,
    			"bookmarkNo": cafeNo,
    			"type": 1, // 1: 카페 , 2: 의자 
    			"kind": 1 // 1: delete , 2: insert
    		},
    		error: function (xhr, err, code) {
    			console.log(err);
    		},
    		success: function (data) {
    			console.log(data);
    			
    			if(data == true) {
    				//북마크 색깔 빼기
    				$this.removeClass("on");
    			}
    		}//success end
    	});//$.ajax() end
        
    }else{
    	//북마크 추가
    	
    	$.ajax({
    		url: "/ajax/bookmark",
    		type: "post",
    		dataType: "json",
    		data: {
    			"userNo": loginUserNo,
    			"bookmarkNo": cafeNo,
    			"type": 1,
    			"kind": 2 // 1: delete , 2: insert
    		},
    		error: function (xhr, err, code) {
    			console.log(err);
    		},
    		success: function (data) {
    			console.log(data);
    			
    			if(data == true) {
    				//북마크 색깔 바꾸기
    				$this.addClass("on");
    			}
    		}//success end
    	});//$.ajax() end
    	
    }//if~else end
    
});//click() end

//음악정보 흐르는 거
var $heroMusicMovingbar = $(".movingbar_detail_music"),
    heroMusicMovingbarWidth = $heroMusicMovingbar.width();

function moveHeroMusicMovingbar() {

    $heroMusicMovingbar.animate(
        {left: "-"+heroMusicMovingbarWidth+"px"},
        10000, "linear", function() {
            $heroMusicMovingbar.css("left", "200px");
            moveHeroMusicMovingbar();
        }
    );//animate() end

}//moveHeroMusicMovingbar() end

moveHeroMusicMovingbar();


//cafepicbtn 을 클릭해야만 popup_cafedetailpic이 on 되고 그뒤에  slick 으로 블라블라
// 굳
$("#cafePicBtn").click(function () {
    $(".wrap_cafeDetailPic").addClass("on");
    $('.popup_cafeDetailPic').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
});

$(".wrap_cafeDetailPic").click(function () {
    $(".wrap_cafeDetailPic").removeClass("on");
});
$(".popup_cafeDetailPic").click(function (e) {
    //slick 이미지 슬라이드 제이쿼리


    e.stopPropagation();
    //$(this).find(".slick-slide").css("width",1050);
});


//hero이미지 위 정보 글씨 animation
var $statusValue = $(".box_cafe_status .status_value");
var $musicInfo = $(".movingbar_detail_music");

function changeTextShadow() {
    $statusValue.animate({
            "opacity" : ".7"
    }, 500, "linear", function () {
        $statusValue.css({"opacity": "1"});
        changeTextShadow();
    });

}

changeTextShadow();
