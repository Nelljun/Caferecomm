//카드 오버 시

var $cafeCardImage = $(".box_cafecard_image");

var $searchCafeList = $(".box_search_cafelist");

$searchCafeList.on("mouseover", ".box_cafecard_image", (function() {
	var $this = $(this), $musicMovingbar = $this.next().find(
			".movingbar_cafecard_music"), movingbarWidth = 0;

	// infinite animation loop 함수
	// 음악 정보 흘러가는 거 (무한루프)
	function moveMovingbar() {
		$musicMovingbar.animate({
			left : "-" + movingbarWidth + "px"
		}, 10000, "linear", function() {
			$musicMovingbar.css("left", "222px");
			moveMovingbar();
		});
	}

	setTimeout(function() {
		$this.addClass("on");
		$this.next().addClass("on");
		$this.find(".icon_cafecard_bookmark").addClass("on");

		movingbarWidth = $musicMovingbar.width();
		// info박스 display: block; 되고나서 width값 얻어오기

		moveMovingbar();

	}, 400);

}));

// 마우스 떠날때
$searchCafeList.on("mouseleave", ".wrap_cafecard", (function() {

	var $this = $(this), $musicMovingbar = $this
			.find(".movingbar_cafecard_music");

	setTimeout(function() {
		$(".box_cafecard_info, .box_cafecard_image, .icon_cafecard_bookmark")
				.removeClass("on");

		$musicMovingbar.stop(true, false).css("left", "222px");
		// 루프 애니메이션 멈추게 하고, 원래 자리로 보내기
	}, 400);
}));

// 즐겨찾기 누를 때
var $iconCafecardBookmark = $(".icon_cafecard_bookmark");

$searchCafeList.on("click", ".icon_cafecard_bookmark", (function(e) {

	var userNo = "${userNo}";
	e.preventDefault(); // a요소 클릭 막음

	var $this = $(this);
	var cafeNo = $this.parents("li.wrap_cafecard").data("no");
	$this.parents("li.wrap_cafecard").data("no");
	if ($this.hasClass("active")) {
		// 북마크 제거

		$.ajax({
			url : "/ajax/bookmark",
			type : "post",
			dataType : "json",
			data : {
				"userNo" : loginUserNo,
				"bookmarkNo" : cafeNo,
				"type" : 1, // 1: 카페 , 2: 의자
				"kind" : 1
			// 1: delete , 2: insert
			},
			error : function(xhr, err, code) {
				console.log(err);
			},
			success : function(data) {
				console.log(data);

				if (data == true) {
					// 북마크 색깔 빼기
					$this.removeClass("active");
				}
			}// success end
		});// $.ajax() end

	} else {
		// 북마크 추가

		$.ajax({
			url : "/ajax/bookmark",
			type : "post",
			dataType : "json",
			data : {
				"userNo" : loginUserNo,
				"bookmarkNo" : cafeNo,
				"type" : 1,
				"kind" : 2
			// 1: delete , 2: insert
			},
			error : function(xhr, err, code) {
				console.log(err);
			},
			success : function(data) {
				console.log(data);

				if (data == true) {
					// 북마크 색깔 바꾸기
					$this.addClass("active");
				}
			}// success end
		});// $.ajax() end

	}// if~else end
}));

var doubleSubmitFlag = false;
function doubleSubmitCheck() {
	if (doubleSubmitFlag) {
		return doubleSubmitFlag;
	} else {
		doubleSubmitFlag = true;
		return false;
	}
}
var minLat = 0;
var minLng = 0;

var container = document.getElementById('searchMapBox'); // 지도를 담을 영역의 DOM
															// 레퍼런스
var options = { // 지도를 생성할 때 필요한 기본 옵션
	center : new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
	level : 3
// 지도의 레벨(확대, 축소 정도)
};
var locPosition;
var map = new daum.maps.Map(container, options); // 지도 생성 및 객체 리턴

// HTML5의 geolocation으로 사용할 수 있는지 확인합니다
if (navigator.geolocation) {

	// GeoLocation을 이용해서 접속 위치를 얻어옵니다
	navigator.geolocation.getCurrentPosition(function(position) {

		var lat = position.coords.latitude, // 위도 현재위도
		lon = position.coords.longitude; // 경도 현재경도 이부분 반드시 쓰게될테니 기억할것.

		locPosition = new daum.maps.LatLng(lat, lon), // 마커가 표시될 위치를
															// geolocation으로 얻어온
															// 좌표로 생성합니다
		message = '<div style="padding:5px;">현재위치</div>'; // 인포윈도우에 표시될 내용입니다

		// 마커와 인포윈도우를 표시합니다
		displayMarker(locPosition, message);
		minLat = lat;
		minLng = lon;

	});

} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

	locPosition = new daum.maps.LatLng(33.450701, 126.570667), message = 'geolocation을 사용할수 없어요..'

	displayMarker(locPosition, message);
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition, message) {

	// 마커를 생성합니다
	var marker = new daum.maps.Marker({
		map : map,
		position : locPosition
	});

	var iwContent = message, // 인포윈도우에 표시할 내용
	iwRemoveable = true;

	// 인포윈도우를 생성합니다
	var infowindow = new daum.maps.InfoWindow({
		content : iwContent,
		removable : iwRemoveable
	});

	// 인포윈도우를 마커위에 표시합니다
	infowindow.open(map, marker);

	// 지도 중심좌표를 접속위치로 변경합니다
	//map.setCenter(locPosition);
}

//filter버튼 클릭 시 툴팁 toggleClass, cover div toggleClass
var $searchFilterBtn = $(".search_filter>button"),
    $searchCover = $(".cover_search_filter");

$searchFilterBtn.click(function () {
	
	
    //alert("하하");
    var $this = $(this);

    var hasClassOnFilter = $this.parent().hasClass("on"); //on클래스 제거 전 on클래스 가지고 있었는지 확인

    $(".search_filter.on").removeClass("on"); //on클래스 붙어있는 filter의 클래스제거
    $searchCover.removeClass("on");//cover의 클래스 제거

    if(!hasClassOnFilter) {
        //클릭할 때 on클래스 가지고 있지 않았을 때만
        $this.parent().addClass("on"); //부모에 클래스 줘서 필터글씨, 툴팁 효과 줌
        $searchCover.addClass("on");

        //on클래스 가지고 있었으면 다시 on클래스 안준다.
        //즉, 켜져있던 필터 다시 클릭하면 사라지게끔
    }

    return false; //부모로 이벤트 전파되는거 막기
});

$("body").click(function (evt) {
    if ($(evt.target).closest(".wrap_search_filter_tooltip").length === 0) {
        $(".search_filter").removeClass("on");
        $searchCover.removeClass("on");
    }

});




//클릭한 checkbox 텍스트 모으는 배열 객체
var checkboxTextObjArr = [];

// console.log($(".box_search_filter>.search_filter").length);

//각 필터에 해당하는 객체 (속성은 name, value) 생성해서
for(var i = 0; i < ($(".box_search_filter>.search_filter").length)-1; i++) {

    var filterText = $(".box_search_filter>.search_filter").eq(i).find("button").text();

    // console.log(filterText);

    var checkboxTextObj = {
        name: filterText,
        value: []
    };

    // console.log(checkboxTextObj);

    checkboxTextObjArr.push(checkboxTextObj);

}
// console.log(checkboxTextObjArr);

//텍스트 배열 객체에서 하나의 텍스트로 만드는 함수
function getFullFilterText(index) {

    var fullFilterText = "",
        selectedCheckboxTextArr = checkboxTextObjArr[index].value,
        filterName = checkboxTextObjArr[index].name;

    if(selectedCheckboxTextArr.length == 0) {
        fullFilterText += filterName;
    } else {
        fullFilterText += selectedCheckboxTextArr[0];

        if(selectedCheckboxTextArr.length > 1) {

            for(var i = 1; i < selectedCheckboxTextArr.length; i++) {
                fullFilterText += ", "+selectedCheckboxTextArr[i];
            }//for end

        }//if end
    }//if ~ else end

    return fullFilterText;
}

// console.log(getFullFilterText(4));


//checkbox클릭 시 checked된 checkbox 텍스트로 filter버튼 text 바꾸기
$(".container_filter_checkbox").click(function (e) {
	e.preventDefault();
    var $this = $(this),
        $filter = $this.parents(".search_filter"),
        $filterBtn = $filter.find("button");

    var clickedCheckboxText = $this.text(), //클릭한 체크박스의 text
        filterIndex = $filter.index(); //클릭한 체크박스가 포함된 filter의 index

	var index = $this.index(".container_filter_checkbox");//filter index 번호
        

    
    if($this.hasClass("on")) {
        //클릭 되었던 상태라면

        $this.children().attr("checked", false); //이벤트 전파 막아서 checked 속성 체크 안 되는 거 해줌

        $this.removeClass("on"); //글씨색 어둡게

        $.each(checkboxTextObjArr[filterIndex].value, function (index, checkboxText) {
            if(clickedCheckboxText == checkboxText) {
                checkboxTextObjArr[filterIndex].value.splice(index, 1);
            }
        })//클릭한 checkbox의 text를 checkboxText배열에서 삭제

        $filterBtn.text(getFullFilterText(filterIndex));

        if(checkboxTextObjArr[filterIndex].value.length == 0) {
            //아무것도 체크된 게 없다면 다시 글씨 회색으로
            $filterBtn.css("color", "rgb(169,169,169)");
        }//if end

    } else {
        //클릭 안되었던 상태라면
        // console.log("클릭함");

        $this.addClass("on"); //글씨 색 하얗게

        $this.children().attr("checked", true); //이벤트 전파 막아서 checked속성 체크 안 되는 거 해줌


        checkboxTextObjArr[filterIndex].value = []; //다시 배열 비우기

        $filter.find("label.container_filter_checkbox.on").each(function () {

            //on클래스 붙은 label의 text만 checkboxTextObjArr[index].value 에 넣기
            checkboxTextObjArr[filterIndex].value.push($(this).text());

        });

        $this.parents(".search_filter").find("button").text(getFullFilterText(filterIndex)).css("color", "rgb(186,104,200)");

        // 클릭할 때마다 배열 비우고 클릭되어있는 label 텍스트들 배열에 전부 넣음



    }

	//필터 적용
	for(var i=0 ; i<filters.length; i++){
		if($(".container_filter_checkbox").eq(i).hasClass("on")){
			console.log(i+"들어옴");
			for(var j=0 ; j<filters[i].length ; j++){
				//값이 있으면
				for(var k=0 ; k<cafeList.length ; k++){
					if(cafeList[k].no == filters[i][j]){
						tempList.push(filters[i][j]);
					}
				}
			}
		}
	}

	//카페마다 필터적용된 갯수 넣기
	for (var i=0; i<tempList.length; i++) {
		  var key = tempList[i].toString(); 
		  if (!cafeFilteredCount[key]) {
			  cafeFilteredCount[key] = 1
		  } else {
			  cafeFilteredCount[key] = cafeFilteredCount[key] + 1;
		  }
	}
	//tempList에서 가장 큰 값 구하기
	var maxValue = 0;
	for(var i=0 ; i<cafeFilteredCount.length ; i++){
		if(maxValue < cafeFilteredCount[i]){
			maxValue = cafeFilteredCount[i];
		}
	}

	for(var i=0 ; i<cafeFilteredCount.length ; i++){
		if(cafeFilteredCount[i] == maxValue){
			console.log(cafeFilteredCount[i]);
			for(var j=0 ; j<cafeList.length ; j++){
				if(cafeList[j].no == i){
					filteredCafes.push(cafeList[j]);
					filteredCafeFacils.push(facilList[i]);
				}
			}
		}
	}

	if(filteredCafes.length ==0){
		filteredCafes = cafeList;
	}
	var markup = searchTmp({
		"searchList" : filteredCafes,
		"cafeFacil" : facilList
	});

	var count = filteredCafes.length;
	$(".box_search_cafelist").html("");
	$(".box_search_cafelist").html(markup);

	
	$(".search_result_sentence").text("");
		
	$(".search_result_sentence").text(count+"개의 카페가 검색되었습니다");
	

	positions = [];
	for(var i = 0 ; i < markers.length;i++) {
		markers[i].setMap(null);
	}//for end
	markers = [];
	for (var i = 0; i < count; i++) {

		positions.push({
			name : filteredCafes[i].name,
			latlng : new daum.maps.LatLng(
					filteredCafes[i].lat, filteredCafes[i].lng)
		});

		bounds.extend(new daum.maps.LatLng(
				filteredCafes[i].lat, filteredCafes[i].lng));
	
		
		 marker = new daum.maps.Marker({
		    map: map,
		    position: new daum.maps.LatLng(filteredCafes[i].lat, filteredCafes[i].lng)
		});
		 
		 markers.push(marker);

	}//for end

	map.setBounds(bounds);
	marker.setMap(map);

	tempList = [];
	cafeFilteredCount = [];
	filteredCafes = [];
	filteredCafeFacils = [];
	
    return false; //부모로 이벤트전파 막기

});//click() end


/*정렬 filter 내용 클릭시*/
$(".wrap_search_sort_tooltip>li").click(function () {
    //alert("하하");

    var $this = $(this),
        clickedSortFilterText = $this.text(),
        $sortFilterBtn = $this.parents(".search_filter_sort").find("button");

    var hasOnClass = $this.hasClass("on"); //클릭한 그 요소가 on클래스 가지고 있는지 여부

    if(hasOnClass) {
        //on클래스 붙은 요소를 클릭했다면

        $this.removeClass("on"); //그 요소의 on클래스 remove

        $sortFilterBtn.text("정렬").css("color", "rgb(169,169,169)"); //원래 filter text로 바꾸기

    } else {
        //on클래스 붙지 않은 요소를 클릭했다면

        $(".wrap_search_sort_tooltip>li.on").removeClass("on"); //on클래스 붙어있는 요소에 on클래스 먼저 제거

        $this.addClass("on"); //클릭한 그 요소에 on클래스 add

        $sortFilterBtn.text(clickedSortFilterText).css("color", "rgb(186,104,200)"); //클릭한 그 요소의 text로 바꾸기 + 색 변화

    }//if else end
   

});

