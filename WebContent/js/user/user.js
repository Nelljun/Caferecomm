//gnb버튼 클릭시 버튼과 버튼에 해당되는 content div에 on클래스
$(".profile_gnb").click(function () {
    $(".box_board").removeClass("on");
    $(".profile_gnb").parent().removeClass("on");
    $(this).parent().addClass("on");
    var index = $(this).parent().index();
    $(".box_board").eq(index).addClass("on");
});

//즐겨찾기 버튼 클릭시 카페 즐겨찾기로 이동
$(".gnb_bookmark").click(function () {
    $(".box_bookmarkList_seat").removeClass("on");
    $(".box_bookmarkList_cafe").addClass("on");
    $(this).addClass("on");
});

//카페 북마크 클릭시 on클래스
$(".gnb_cafeBookmark").click(function () {
    $(".box_board").removeClass("on");
    $(".box_bookmark").addClass("on");
    $(".profile_gnb").parent().removeClass("on");
    // $(".gnb_cafeBookmark").parent().addClass("on");
    $(".box_bookmarkList_seat").removeClass("on");
    $(".box_bookmarkList_cafe").addClass("on");
});

//좌석 북마크 클릭시 on클래스
$(".gnb_seatBookmark").click(function () {
    $(".box_board").removeClass("on");
    $(".box_bookmark").addClass("on");
    $(".profile_gnb").parent().removeClass("on");
    // $(".gnb_seatBookmark").parent().addClass("on");
    $(".box_bookmarkList_cafe").removeClass("on");
    $(".box_bookmarkList_seat").addClass("on");
});

//닉네임 수정버튼 클릭시 닉네임 수정 inputbox에 on add클레스
$(".fa-pencil-alt").click(function () {
    $("#boxNickname").removeClass("on");
    $("#editNicknameBox").addClass("on");
});
//닉네임 수정 완료버튼 클릭시 변경한 닉네임으로 출력및 수정input박스에 on remove클래스
$(".fa-check-circle").click(function () {
    var editNickname = $("#nicknameEdit").val();
    $("#textNickname").text(editNickname);
    $("#editNicknameBox").removeClass("on");
    $("#boxNickname").addClass("on");
});



//즐겨찾기gnb에 호버했을시 상세 gnb(좌석 카페)에 on클래스
$("#gnbBookmark").mouseover(function () {
    $(".gnb_bookmarkDetail").addClass("on")
});
//즐겨찾기gnb에 호버하지 않을때 상세 gnb(좌석 카페)에 remove클래스
$("#gnbBookmark").mouseleave(function () {
    $(".gnb_bookmarkDetail").removeClass("on")
});



//좌석, 카페 북마크버튼 클릭시 추가 삭제되는 제이쿼리
$(".icon_cafecard_bookmark").click(function () {
	var userNo = loginUserNo;
	var bookmarkNo = $(this).attr("data-bookmarkNo");
	console.log(userNo);
	console.log(bookmarkNo);
	if($(".icon_cafecard_bookmark").hasClass("active")){
		$(this).removeClass("active");
		var data = { 
	        	'userNo' : userNo,
	        	'bookmarkNo' : bookmarkNo
	        };
		$.ajax({
			url : "/ajax/bookmark/delete",
			type : "delete",
			data : data,
			error : function(a, b, c) {
				alert("서비스 점검중 입니다.");
			},
			success : function(data) {
			}
		})
	}else{
		$(this).addClass("active");
	}
})

$(".box_cafeInfo>i").click(function () {
	if($(".box_cafeInfo>i").hasClass("on")){
		
		$(this).removeClass("on");
		var userNo = loginUserNo;
		var bookmarkNo = $(this).attr("data-bookmarkChairNo");
		var data = { 
	        	'userNo' : userNo,
	        	'bookmarkNo' : bookmarkNo
	        };
		$.ajax({
			url : "/ajax/bookmark/delete",
			type : "delete",
			data : data,
			error : function(a, b, c) {
				alert("서비스 점검중 입니다.");
			},
			success : function(data) {
			}
		})
	}else{
		
		$(this).addClass("on");
		var userNo = loginUserNo;
		var bookmarkNo = $(".box_cafeInfo>i").attr("data-bookmarkChairNo");
		console.log(userNo);
		console.log(bookmarkNo);
	}
})


/*$(".icon_cafecard_bookmark, .box_bookmarkList_seat .fa-star").click(function () {
	if($(".icon_cafecard_bookmark, .box_bookmarkList_seat .fa-star").hasClass("active")
			||$(".icon_cafecard_bookmark, .box_bookmarkList_seat .fa-star").hasClass("on")){
		deleteBookmark();
	}else{
		insertBookmark();
	} 
	 
})

function deleteBookmark() {
	$(".icon_cafecard_bookmark").removeClass("active")||$(".box_bookmarkList_seat .fa-star").removeClass("on");
	
	var userNo = loginUserNo;
	var bookmarkNo = $(".icon_cafecard_bookmark, .box_bookmarkList_seat .fa-star").attr("data-no");
	var b1 = $(".box_bookmarkList_seat .fa-star").attr("data-no");
	var b2 = $(".icon_cafecard_bookmark").attr("data-no");
	console.log(b1,":",b2);
	var data = { 
        	'userNo' : userNo,
        	'bookmarkNo' : bookmarkNo
        };
	
	$.ajax({
		url : "/ajax/bookmark/delete",
		type : "delete",
		data : data,
		error : function(a, b, c) {
			alert("서비스 점검중 입니다.");
		},
		success : function(data) {
		}
	})
}

function insertBookmark() {
	
}*/


//유저페이지에 해당 유저 및 팔로우 탭에있는 유저 카드 팔로우 추가 제거 제이쿼리

$(".icon_user_bookmark button, .box_followerList .btn_following").click(function () {
	if($(this).hasClass("on")){
		
		$(this).removeClass("on").text("팔로우");

    	var fromUserNo = loginUserNo;
		
		var toUserNo = $(this).attr("data-no");
		
		var data = {
	        	'_method':'DELETE',
	        	'fromUserNo' : fromUserNo,
	        	'toUserNo' : toUserNo
	        };
		
    	$.ajax({
    		url : "/ajax/user/delete",
    		type : "post",
    		data : data,
    		error : function(a, b, c) {
    			alert("서비스 점검중 입니다.");
    		},
    		success : function(data) {
    		}
    	})
    	
    	
	}else{
		
		$(this).addClass("on").text("팔로잉");
		
		var fromUserNo = loginUserNo;
		
		var toUserNo = $(this).attr("data-no");
		
		var data = {
	        	'fromUserNo' : fromUserNo,
	        	'toUserNo' : toUserNo
	        };
		
    	$.ajax({
    		url : "/ajax/user/bookmarkInsert",
    		type : "post",
    		data : data,
    		error : function(a, b, c) {
    			alert("서비스 점검중 입니다.");
    		},
    		success : function(data) {
    			 
    		}
    	})
	}
})

//팔로잉 유저 삭제 제이쿼리
if(loginUserNo == profileNo){
	$(".box_followingList .btn_following").click(function () {
		
		alert("해당유저에 대한 팔로우를 취소하시겠습니까?")
		
		$(this).parents(".card_following").remove();
		
		var fromUserNo = loginUserNo;
		
		var toUserNo = $(this).attr("data-no");
		
		var data = {
	        	'_method':'DELETE',
	        	'fromUserNo' : fromUserNo,
	        	'toUserNo' : toUserNo
	        };

	        console.log(data)
	    	$.ajax({
	    		url : "/ajax/user/delete",
	    		type : "post",
	    		data : data,
	    		error : function(a, b, c) {
	    			alert("서비스 점검중 입니다.");
	    		},
	    		success : function(data) {
	    			 
	    		}
	    	})
	})
}else{
	$(".box_followingList .btn_following").click(function () {
		if($(this).hasClass("on")){
			
			$(this).removeClass("on").text("팔로우");

	    	var fromUserNo = loginUserNo;
			
			var toUserNo = $(this).attr("data-no");
			
			var data = {
		        	'_method':'DELETE',
		        	'fromUserNo' : fromUserNo,
		        	'toUserNo' : toUserNo
		        };
			
	    	$.ajax({
	    		url : "/ajax/user/delete",
	    		type : "post",
	    		data : data,
	    		error : function(a, b, c) {
	    			alert("서비스 점검중 입니다.");
	    		},
	    		success : function(data) {
	    		}
	    	})
	    	
	    	
		}else{
			
			$(this).addClass("on").text("팔로잉");
			
			var fromUserNo = loginUserNo;
			
			var toUserNo = $(this).attr("data-no");
			
			var data = {
		        	'fromUserNo' : fromUserNo,
		        	'toUserNo' : toUserNo
		        };
			
	    	$.ajax({
	    		url : "/ajax/user/bookmarkInsert",
	    		type : "post",
	    		data : data,
	    		error : function(a, b, c) {
	    			alert("서비스 점검중 입니다.");
	    		},
	    		success : function(data) {
	    			 
	    		}
	    	})
		}
	})
}



//유저 프로필 사진 변경 제이쿼리

//업로드 인풋박스
var $profileImgModify = $("#profileImgModify");
//업로드된 이미지를 보여주는 요소
var $userImage = $("#userImage")

var $headerImage = $(".content_header_profile>img")

var $profileImg = $("#profileImg")

$profileImgModify.change(modifyProfileImage);

function modifyProfileImage() {
    
	var userNo = loginUserNo;
	
	var data = new FormData();
    
    var file =  $profileImgModify.get(0).files[0];
    
    data.append('upload', file);
   	data.append('folder','/img/profile/');
   	data.append('width',266);
   	data.append('height',266);
   	data.append('no',userNo);
    
    $.ajax({
        url: '/ajax/upload',
        type: "post",
        dataType: "json",
        data: data,
        processData: false,
        contentType: false,
        success: function(json) {
       	 
         $profileImg.val(json.name);
       	 
       	 $userImage.attr("src","/img/profile/"+json.name);
       	 
       	 $headerImage.attr("src","/img/profile/"+json.name);
       	 
       	
       	 //posterCheck = true;
       	 
       	 //$posterBox.removeClass("no_image");
       	 
        }, error: function(jqXHR, textStatus, errorThrown) {
       	 
       	 alert(textStatus);
        }
    });
   	
}

//닉네임 변경버튼 클릭시 값 받아오는 제이쿼리

var nickname = '';

var userNo = loginUserNo;

$("#editNicknameBox>.fa-check-circle").click(function () {
    nickname = $("#nicknameEdit").val();
    
    //alert(nickname)
    
    var data = {
    	'_method':'PUT',
    	'nickname':nickname,
    	'no':userNo
    };
    //data.append('nickname',nickname);
    //data.append('no',userNo);

    console.log(data)
	$.ajax({
		url : "/ajax/user",
		type : "post",
		data : data,
		error : function(a, b, c) {
			alert("서비스 점검중 입니다.");
		},
		success : function(data) {
			console.log(data);
			/*
			var markup = tmp({
				"coinTransactions" : json.coinTransactions,
				"paginate":json.paginate
			});
			
			$("#cardBox").html(markup);
			 */
			 $(".header_username").text(nickname);
		}
	})
})
