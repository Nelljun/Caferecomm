var $reviewTmp = $("#reviewTmp");
var reviewTmpHTML = $reviewTmp.html();
var reviewTmp = _.template(reviewTmpHTML);

var $reviewListUl = $(".wrap_review ul"); //리뷰 템플릿 붙을 곳
var $totalReviewNumberSpan = $(".total_review_number span"); //리뷰 갯수 쓰여지는 곳


//리뷰리스트 ajax로 불러오고 ul에 띄우는 함수 + 리뷰 갯수 표시
function getReviewListByAjax() {
	
	$.ajax({
		url: "/ajax/reviewList",
		data: {
			"cafeNo": cafeNo
		},
		type: "post",
		error: function(xhr, err, code) {
			alert(err);
		},
		success: function(data){
			console.log(data);
			var markup = reviewTmp({"reviewList":data.reviewList});
			
			$reviewListUl.html(markup);
			
			$totalReviewNumberSpan.text(data.reviewList.length);
			
			console.log("리스트 호출");
			console.log("리뷰 갯수 : "+data.reviewList.length);
			
			//태그갱신
			var tagList1 = [];
			
			for(var i=0 ; i<data.tagList.length ; i++){
				tagList1.push(data.tagList[i].content);
			}
			$(".list_detail_tag").html(tagTmp({"tagList": tagList1}));
			
		}//success end
		
	});//$.ajax() end
	
}//getReviewListByAjax() end

getReviewListByAjax(); //페이지 로딩될 때 호출

//리뷰 남기기 버튼 누르면 리뷰 팝업뜨기
//띄울 때 예상점수 채워서 보여주기
var $btnReview = $(".btn_review");
var $reviewPopupCover = $("#backgroundColor");
var $reviewPopup = $("#reviewRegisterPopup");
var $popupReviewScore = $(".popup_review_score span");
var $popupCoffeIcon = $(".wrap_popup_review_evaluate img"); //팝업창 커피콩

//팝업창 원하는 커피콩 갯수만큼 채워주는 함수
function fillCoffeeIcon(number) {
	
	$popupCoffeIcon.attr("src", "/img/icon/coffee_bean.svg");//일단 모두 색 비우고
	
	for(var i=0; i <= (number-1); i++) {
		$popupCoffeIcon.eq(i).attr("src", "/img/icon/coffee_bean%20on.svg");//원하는 커피 콩까지 색 칠하기
	}
	
}//fillCoffeeIcon() end

var ranNum = 1 + Math.floor(Math.random()*5); //리뷰예상점수

$btnReview.click(function () {
	//예상점수
	console.log("예상점수 : "+ranNum);
	
	$popupReviewScore.text(ranNum+"점이 예상되는 군요!"); //예상점수 보여주기
	
	fillCoffeeIcon(ranNum); //예상점수만큼 커피콩 색 칠하기
	
	$reviewRegisterBtn.text("등록"); //등록 대신 수정 버튼으로
	$reviewRegisterBtn.removeAttr("data-no");
	
	//팝업 띄우기
    $reviewPopupCover.addClass("on");
    
});//click() end



//커피콩 클릭 시 해당 커피콩까지 색칠되고 점수 바뀌기
$popupCoffeIcon.click(function () {
	
	var index = $(this).index(); //누른 커피콩의 index + 1 (평점)
	
	console.log("클릭한 커피콩 index : "+index);

	fillCoffeeIcon(index+1); // 클릭한 커피콩까지 색 칠하기
	
	$popupReviewScore.text((index+1)+"점을 선택하셨습니다.");
	
});//click() end



//리뷰창 외 다른 곳 클릭하면 팝업 사라지기
var $reviewTextArea = $("#reviewRegisterWrite textarea"); //리뷰 쓰는 textarea

$reviewPopupCover.click(function(evt) {
    //popup창 제외한 곳 클릭할 때 hide
    if($(evt.target).closest($reviewPopup).length === 0) {
        $reviewPopupCover.removeClass("on");
        $reviewTextArea.val(""); //리뷰 작성란 초기화
    }
});//click() end



//리뷰등록 (및 수정)
var $reviewRegisterBtn = $(".btn_review_register");

var $reviewPopupScore = $(".popup_review_score span");

$reviewRegisterBtn.click(function () {
	
	var $this = $(this);
	var contentReview = $reviewTextArea.val().trim(); //띄어쓰기, 엔터값만 있을 때 제거, 글씨 중간에 있는 띄어쓰기, 엔터 값은 유지
	var reviewRating = parseInt($reviewPopupScore.text().substring(0,1)); //String -> int로 parse
	
	
	console.log("리뷰내용 : "+contentReview);
	console.log("평점 : "+reviewRating);
	
	if(contentReview.length ==0) {
		//리뷰 글 내용 작성 안했을 때
		alert("리뷰를 작성해주세요.");
		
	} else {
		//리뷰 글 내용 작성 했을 때
		
		if($this.text()=="등록") {
			
			//등록
			console.log("등록");
			
			if(confirm("리뷰를 등록하시겠습니까?")) {
				
				$reviewPopupCover.removeClass("on");//팝업창 사라지기
				
				$reviewTextArea.val(""); //리뷰 작성란 초기화
				
				
				//ajax로 리뷰 등록 후 새 review list 불러오기
				$.ajax({
					url: "/ajax/review/insert",
					type: "post",
					data: {
						"userNo": loginUserNo,
						"cafeNo": cafeNo,
						"content": contentReview,
						"rating": reviewRating
					},
					error: function(xhr, err, code) {
						alert(err);
					},
					success: function(json) {
						
						console.log(json); //result 넘어옴
						
						if(json == true) {
							
							alert("리뷰가 등록되었습니다.");
							
							getReviewListByAjax(); //리뷰리스트 불러오고 개수 바꾸기
						
						}//if end
					
					}//success end
				});//$.ajax() end
			
			}//if end
			
		} else {
			
			//수정
			console.log("수정");
			
			var reviewNo = $this.data("no");
			console.log("수정할 리뷰 번호 : "+reviewNo);
			
			
			if(confirm("리뷰를 수정하시겠습니까?")) {
				
				$reviewPopupCover.removeClass("on");//팝업창 사라지기
				
				$reviewTextArea.val(""); //리뷰 작성란 초기화
				
				
				//ajax로 리뷰 수정 후 새 review list 불러오기
				$.ajax({
					url: "/ajax/review/update",
					type: "post",
					data: {
						"userNo": loginUserNo,
						"cafeNo": cafeNo,
						"no": reviewNo,
						"content": contentReview,
						"rating": reviewRating
					},
					error: function(xhr, err, code) {
						alert(err);
					},
					success: function(json) {
						
						console.log(json); //result 넘어옴
						
						if(json == true) {
							
							alert("리뷰가 수정되었습니다.");
							
							getReviewListByAjax(); //리뷰리스트 불러오고 개수 바꾸기
						
						}//if end
					
					}//success end
				});//$.ajax() end
			
			}//if end
			
			
		}//if~else end
		
	}//if~else end

});//click() end


//리뷰 삭제
$reviewListUl.on("click", ".btn_delete_modified .btn_review_all:nth-child(2)", function () {
	
	//alert("삭제버튼");
	
	var $this = $(this);
	var reviewNo = $this.parents(".box_review_content").data("no"); //리뷰 primary key
	
	console.log("삭제할 리뷰 번호"+reviewNo);
	
	if(confirm("해당 리뷰를 삭제하시겠습니까?")) {
		$.ajax({
			url: "/ajax/review/delete",
			type: "post",
			data: {
				"userNo": loginUserNo,
				"cafeNo": cafeNo,
				"no": reviewNo
			},
			error: function(xhr, err, code) {
				alert(err);
			},
			success: function(json) {
				
				console.log(json); //result 넘어옴
				
				if(json == true) {
					
					alert("리뷰가 삭제되었습니다.");
					
					getReviewListByAjax(); //리뷰 리스트 불러오고 개수 바꾸기
				
				}//if end
			
			}//success end
		});//$.ajax() end
	}//if end
	
});//on("click") end


//리뷰 수정버튼 눌렀을 때 팝업띄우기
$reviewListUl.on("click", ".btn_delete_modified .btn_review_all:nth-child(1)", function () {
	
//	alert("수정 버튼");
	
	var $this = $(this);
	var $thisLi = $this.parents(".box_review_content");
	var reviewNo = $thisLi.data("no"); //리뷰 primary key
	
	var reviewContent = $thisLi.find(".wrap_review_userContents").text().trim(); //리뷰 내용 (enter, space 제외)
	var reviewScore = $thisLi.find(".content_review_score span").text(); //평점
	
	console.log("reviewContent : "+reviewContent);
	
	$reviewTextArea.val(reviewContent); //팝업에 리뷰내용 띄우기
	
	$popupReviewScore.text(reviewScore+"점을 주셨군요!"); //평점 팝업에 띄우기
	fillCoffeeIcon(reviewScore); //평점 만큼 팝업에 칠하기
	
	$reviewRegisterBtn.text("수정"); //등록 대신 수정 버튼으로
	$reviewRegisterBtn.attr("data-no", reviewNo);
	
	$reviewPopupCover.addClass("on");//팝업 띄우기
	
	
	
});




