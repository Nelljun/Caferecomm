//카드 오버 시
$(".box_cafecard_image").mouseover(function () {
    var $this = $(this),
        $musicMovingbar = $this.next().find(".movingbar_cafecard_music"),
        movingbarWidth = 0;

    //infinite animation loop 함수
    //음악 정보 흘러가는 거 (무한루프)
    function moveMovingbar() {
        $musicMovingbar.animate(
            {left: "-"+movingbarWidth+"px"},
            10000, "linear", function () {
                $musicMovingbar.css("left", "222px");
                moveMovingbar();
            });
    }

    setTimeout(function() {
        $this.addClass("on");
        $this.next().addClass("on");
        $this.find(".icon_cafecard_bookmark").addClass("on");

        movingbarWidth = $musicMovingbar.width();
        //info박스 display: block; 되고나서 width값 얻어오기

        moveMovingbar();

    }, 400);

});

//마우스 떠날때
$(".wrap_cafecard").mouseleave(function () {

    var $this = $(this),
        $musicMovingbar = $this.find(".movingbar_cafecard_music");

    setTimeout(function() {
        $(".box_cafecard_info, .box_cafecard_image, .icon_cafecard_bookmark").removeClass("on");

        $musicMovingbar.stop(true, false).css("left", "222px");
        //루프 애니메이션 멈추게 하고, 원래 자리로 보내기
    }, 400);
});

//즐겨찾기 누를 때
var $iconCafecardBookmark = $(".icon_cafecard_bookmark");

$iconCafecardBookmark.click(function (e) {
	
	e.preventDefault(); //a요소 클릭 막음 
	
	var $this = $(this);
	var cafeNo = $this.parents("li.wrap_cafecard").data("no");

    if($this.hasClass("active")){
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
    				$this.removeClass("active");
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
    				$this.addClass("active");
    			}
    		}//success end
    	});//$.ajax() end
    	
    }//if~else end
});