//Hero에서 즐겨찾기 눌렀을때
var $mainBookmarkIcon = $(".wrap_hero_main .box_hero_info .main_hero_bookmark");

$mainBookmarkIcon.click(function () {
    //alert("하하");
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

});


//main hero 음악 정보 흘러가는거 (무한루프)
var $musicMovingbar = $(".movingbar_main_music"),
    movingbarWidth = $musicMovingbar.width(); //움직이는 바 너비 얻어오기

// console.log(movingbarWidth);

function moveMovingbar() {
    $musicMovingbar.animate(
        {left: "-"+movingbarWidth+"px"},
        15000, "linear", function () {
            $musicMovingbar.css("left", "38.6vw");
            moveMovingbar();
        });
}

moveMovingbar();

//카페카드 슬라이드
$(document).ready(function() {
    $(".content-slider").lightSlider({
        loop: true,
        pager: false, //page 점 삭제
        keyPress: false, //화살표 버튼 작동 멈춤
        autoWidth: true, //자동으로 width 지정
        enableDrag: false
    });
});

//hero카페 위 점유율 글씨 animation
var $mainHeroShare = $(".main_hero_share");

function changeTextShadow() {
	$mainHeroShare.animate({
            "opacity" : ".7"          
    }, 500, "linear", function () {
    	$mainHeroShare.css({
    			"opacity": "1"
    		});
        changeTextShadow();
    });

}

changeTextShadow();