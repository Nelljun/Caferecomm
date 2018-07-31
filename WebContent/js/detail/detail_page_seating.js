
var overlays = []; // 지도에 그려진 도형을 담을 배열
var seats = [];
var imageSrc = '/img/icon/outlet.png', // 마커이미지의 주소입니다
	imageSize = new daum.maps.Size(20, 30), // 마커이미지의 크기입니다
	imageOption = {offset: new daum.maps.Point(20, 30)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
//마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption);

var map = "";
//alert("들어옴")




console.log(imgWidth,imgHeight);

function displayMap(w,h){
	var plan = function( x, y, z ) {
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
	        imgWidth*w, imgHeight*h, plan, '', false, 2, 2 ) );

	var node = document.getElementById('map');

	map = new daum.maps.Map( node, {
	    projectionId: null,
	    mapTypeId: daum.maps.MapTypeId.PLAN,
	    $scale: false,
	    center: new daum.maps.Coords( imgWidth*w, -imgHeight*h ),
	    level: 2
	} );
	daum.maps.event.addListener(map, 'click', function(mouseEvent) {

		console.log(mouseEvent);
	});
	drawRectangle(tableList);
	drawCircle(chairList);
	drawMarker(plugList);
}


// Drawing Manager에서 가져온 데이터 중 마커를 아래 지도에 표시하는 함수입니다
function drawMarker(markers) {
    var len = markers.length, i = 0;

    for (; i < len; i++) {
    	console.log(markers[i].y, markers[i].x);
        var marker = new daum.maps.Marker({
            map: map,
            position: new daum.maps.LatLng(markers[i].y, markers[i].x),
            zIndex: 10,
            image: markerImage
        });
        console.log("들어왔다");
        // 커스텀 오버레이를 생성합니다
        var customOverlay = new daum.maps.CustomOverlay({
        	map : map,
            content: '<div class ="plug_label" data-no="'+i+'">'+markers[i].count+'</div>',
            position: new daum.maps.LatLng(markers[i].y, markers[i].x),
            zIndex: 20
        });
        console.log(customOverlay);
        customOverlay.setMap(map);
        //customOverlay.setVisible(true);
        //map.relayout();
    }

}

//플러그 갯수 10초마다 변하게 하는 함수
setInterval($(".plug_label").each(function () {
	var $this = $(this);
	
	var thisIndex = $this.index();
	
	var thisText = $this.text();
	
	var rand = Math.floor(Math.random()*(thisText+1)); //random (0~해당 플러그 갯수 count)
	
	$this.text(rand);
}),10000);

// Drawing Manager에서 가져온 데이터 중 사각형을 아래 지도에 표시하는 함수입니다
function drawRectangle(rects) {
    var len = rects.length, i = 0;

    for (; i < len; i++) {
        var style = rects[i].options;
        var rect = new daum.maps.Rectangle({
            map: map,
            bounds: new daum.maps.LatLngBounds(
                new daum.maps.LatLng(rects[i].sy, rects[i].sx),
                new daum.maps.LatLng(rects[i].ey, rects[i].ex)
            ),
            strokeColor: '#311B92',
            strokeOpacity: 1,
            strokeStyle: 'solid',
            strokeWeight: 3,
            fillColor: '#ba68c8',
            fillOpacity: 1
        });
    }

}

// Drawing Manager에서 가져온 데이터 중 원을 아래 지도에 표시하는 함수입니다
function drawCircle(circles) {
    var len = circles.length, i = 0;

    for (; i < len; i++) {
        var style = circles[i].options;
        seats[i] = new daum.maps.Circle({
            map: map,
            center: new daum.maps.LatLng(circles[i].y, circles[i].x),
            radius: circles[i].radius,
            strokeColor: '#424242',
            strokeOpacity: 1,
            strokeStyle: 'solid',
            strokeWeight: 3,
            fillColor: '#FBC02D',
            fillOpacity: 1
        });



        var content ='<div class="popup_title">';
        if(circles[i].bookmark == 1){
        	content += '<i class="fas fa-star chair on" data-no='+circles[i].no+'></i><div class="close" title="닫기"></div></div>';
        }else{
        	content += '<i class="fas fa-star chair" data-no='+circles[i].no+'></i><div class="close" title="닫기"></div></div>';
        }
        content += '<div class="popup_content">'+
            '<div class="pic_container">'+
            '<div class="table_pic"><img src="/img/chair/'+circles[i].pic+'"/></div>'+
            '</div>'+
            '</div>';

        
    	var contentNode = document.createElement('div');
    	contentNode.className = 'popup_wrap on';
        contentNode.innerHTML = content;
        
        overlays[i] = new daum.maps.CustomOverlay({
        	map : map,
        	content : contentNode,
        	position : new daum.maps.LatLng(circles[i].y, circles[i].x),
        	zIndex : 23,
        	vislble : false,
        	clickable : true,
            xAnchor: 0,
            yAnchor: 0,
        });
        overlays[i].setMap(map);
        overlays[i].setVisible(false);
        

        
        displayOverlay(seats[i],overlays[i]);
        nonDisplayOverlay(overlays[i]);
    }
    
    function displayOverlay(circle,overlay){
    	daum.maps.event.addListener(circle, 'click', function() {
    		daum.maps.event.preventMap();
    		for(var i=0 ; i<overlays.length ; i++){
    			overlays[i].setVisible(false);
    		}
    		overlay.setVisible(true);
    	});
    }
    
    function nonDisplayOverlay(overlay){
    	daum.maps.event.addListener(map, 'click', function(mouseEvent) {
    		overlay.setVisible(false);
        });
    }

}

$("#map").on("click", ".close", function () {
	daum.maps.event.preventMap();
	for(var i=0 ; i<overlays.length ; i++){
		overlays[i].setVisible(false);
	}
});


$("#map").on("click",".pic_box",function (e) {
    daum.maps.event.preventMap();
    $(this).addClass("on");
    e.stopPropagation();
    $(this).next().click();
	node.style.width = '1000px';
	node.style.height = '400x';
	map.relayout();
    return false;
});

//좌석 북마크
$("#map").on("click",".popup_wrap .chair",function () {
	
	var $this = $(this);
	var chairNo = $this.attr("data-no");
	//alert(chairNo);

    if($this.hasClass("on")){
    	//북마크 제거
    	
    	$.ajax({
    		url: "/ajax/bookmark",
    		type: "post",
    		dataType: "json",
    		data: {
    			"userNo": loginUserNo,
    			"bookmarkNo": chairNo,
    			"type": 2, // 1: 카페 , 2: 의자 
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
    			"bookmarkNo": chairNo,
    			"type": 2,
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


//시간별 인기도
var container = document.getElementById('chartArea');
var data = {
    categories: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'],
    series: {
        area: [
            {
                name: '주 평균',
                data: [8,10,13,17,35,32,56,65,43,47,67,69,45,55,21]
            }
        ],
        line: [
            {
                name: '시간별 인기도',
                data: [13,12,18,35,56,76,65,88,90,87,56,76,45,23,8]
            }
        ]
    }
};
var options = {
    chart: {
        width: 1000,
        height: 300,
    },
    yAxis: {
        title: '좌석',
        pointOnColumn: true
    },
    xAxis: {
        tickInterval: 'auto'
    },
    series: {
        zoomable: true
    },
    tooltip: {
        suffix: '명'
    },
    theme: 'newTheme'
};

tui.chart.registerTheme('newTheme', {
    series: {
        area: {
            colors: ['#E0E0E0']
        },
        line: {
            colors: ['#785fff']
        }
    },
    chart: {
        background: {
            color: '#fff',
            opacity: 1
        },
        color:'#fff'
    }

});

var chart = tui.chart.comboChart(container, data, options);



//일월화수목금토 버튼
//db에서 불러와!~~~쌓인 데이터
$(".btn_week").on("click",function () {
    //data의 line값 변경
})
var scale = 1;
$('#map').on('mousewheel', function(e){ // 마우스를 휠 했을 때 이벤트 발생
/*	seats[0].setOptions({
		fillColor: '#fff'
	})*/
    if(e.originalEvent.wheelDelta /120 > 0) { // 마우스 수치 값이 +면 업 이벤트
    	if(scale<=1.8){
        	scale += 0.2;
        	$(this).css("transform",'scale('+scale+')');
    	}

    }

    else{ // 마우스 수치 값이 -면 다운 이벤트
    	if(scale>=1.2){
        	scale -= 0.2;
        	$(this).css("transform",'scale('+scale+')');
    	}
    }

});
