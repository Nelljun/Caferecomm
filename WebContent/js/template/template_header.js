//검색버튼 클릭 시 input창으로 변화
	$(".btn_header_search").click(function() {
		$(this).removeClass("active");
		$(".box_header_input").addClass("active");

		// $(".box_header_input").toggle('slide', 500);
		// $(".box_header_input").animate({
		//     width: "toggle"
		// });
		// $(this).hide(function () {
		//     // $(".box_header_input").toggle('slide', 'right');
		//     console.log("asdf");
		// });

		$("input[name=searchKeyword]").keydown(function(key) {

			if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
				search = $(this).val();
				//$(this).val('');
				if (getTextLength(search) < 3) {
					alert("검색어는 2글자이상 입력해주세요");
					return;
				} else {
					
					//searchKeyword(search);
				
				}
			}

		});

	});

	//scroll 움직일 때 header 뒷배경 변화주기
	$(window).scroll(function() {
		//현재 scroll 위치 받아오기
		var scrollValue = $(document).scrollTop();

		$("#header").css("background-color", "rgba(0,0,0,.7)");

		if (scrollValue == 0) {
			$("#header").css("background-color", "transparent");
		}
	});//$(window).scroll() end

	//검색 input창 제외한 부분 클릭 시 원상태로
	$("body").click(function(evt) {
		if ($(evt.target).closest(".box_header_search").length === 0) {
			$(".btn_header_search").addClass("active");
			$(".box_header_input").removeClass("active");
			// $(".box_header_input").toggle("slide", { direction: "right" }, 2000);
			// $(".box_header_input").animate({
			//     width: "toggle"
			// });
			// $(".box_header_input").toggle('slide', function () {
			//     $(".btn_header_search").show();
			// });
		}
	});

	//프로필, 닉네임 클릭 시 툴팁 나타나기 (혹은 사라지기)
	$(".wrap_header_user").click(function() {
		
		var $this = $(this);
		
		if($this.hasClass("on")) {
			$(".box_header_tooltip").slideUp(400);
			$(".wrap_header_user i").attr("class","fas fa-caret-down");
		} else {
			$(".box_header_tooltip").slideDown(400);
			$(".wrap_header_user i").attr("class","fas fa-caret-up");
		}
		
		$this.toggleClass("on");
		
		console.log("유저 헤더 클릭");
		return false; //부모(body)로 이벤트 전파되는거 막기
	});

	//툴팁 제외한 부분 클릭 시 툴팁 사라지기
	$("body").click(function(evt) {
		if ($(evt.target).closest(".box_header_tooltip").length === 0) {
			$(".box_header_tooltip").slideUp(400);
			$(".wrap_header_user i").attr("class", "fas fa-caret-down");
		}
	});

	function getTextLength(str) {
		var len = 0;
		for (var i = 0; i < str.length; i++) {
			if (escape(str.charAt(i)).length == 6) {
				len++;
			}
			len++;
		}
		return len;
	}