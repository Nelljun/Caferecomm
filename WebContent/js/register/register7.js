var overlays = [];

// Drawing Manager에서 가져온 데이터 중 마커를 아래 지도에 표시하는 함수입니다
function drawMarker(markers) {
    var len = markers.length, i = 0;

    for (; i < len; i++) {
        var marker = new daum.maps.Marker({
            map: map1,
            position: new daum.maps.LatLng(markers[i].y, markers[i].x),
            zIndex: 10,
            image: markerImage
        });
        
        var count = $(".outlet_count").eq(i).text();
        // 커스텀 오버레이를 생성합니다
        var customOverlay = new daum.maps.CustomOverlay({
            content: '<div class ="plug_label" data-no="'+i+'">'+count+'</div>',
            position: new daum.maps.LatLng(markers[i].y+0.0004, markers[i].x+0.0002),
            zIndex: 11
        });
        customOverlay.setMap(map1);
        //overlays.push(marker);

    }
    node1.style.width = '1000px';
    node1.style.height = '800px';
    map1.relayout();
}

// Drawing Manager에서 가져온 데이터 중 사각형을 아래 지도에 표시하는 함수입니다
function drawRectangle(rects) {
    var len = rects.length, i = 0;

    for (; i < len; i++) {
        var style = rects[i].options;
        var rect = new daum.maps.Rectangle({
            map: map1,
            bounds: new daum.maps.LatLngBounds(
                    new daum.maps.LatLng(rects[i].sPoint.y, rects[i].sPoint.x),
                    new daum.maps.LatLng(rects[i].ePoint.y, rects[i].ePoint.x)
            ),
            dragable : true,
            strokeColor: '#311B92',
            strokeOpacity: 1,
            strokeStyle: 'solid',
            strokeWeight: 3,
            fillColor: '#ba68c8',
            fillOpacity: 1
        });

    }
    node1.style.width = '1000px';
    node1.style.height = '800px';
    map1.relayout();
}

// Drawing Manager에서 가져온 데이터 중 원을 아래 지도에 표시하는 함수입니다
function drawCircle(circles) {

    var len = circles.length, i = 0;

    for (; i < len; i++) {
        var style = circles[i].options;
        var circle = new daum.maps.Circle({
            map: map1,
            center: new daum.maps.LatLng(circles[i].center.y, circles[i].center.x),
            radius: circles[i].radius,
            strokeColor: '#311B92',
            strokeOpacity: 1,
            strokeStyle: 'solid',
            strokeWeight: 3,
            fillColor: '#FBC02D',
            fillOpacity: 1
        });

        var content1 ='<div class="popup_wrap1">'+
            '<div class="popup_title">사진 추가<div class="close" title="닫기"></div></div>'+
            '<div class="popup_content">'+
            '<div class="pic_container">';
        if(chairList.length !=0 &&chairList[i] !=null){
        	content1 += '<div class="pic_box"><img class="chair_pic" src="/img/chair/'+chairList[i].pic+'"/></div>'
        			+ '<input type="hidden" class="chair_pic_input" name="seatPicture" value="'+chairList[i].pic+'"/>';
        }else{
        	content1 += '<div class="pic_box" data=""><img class="chair_pic" src="/img/icon/add.png"/></div>'
        			+ '<input type="hidden" class="chair_pic_input" name="seatPicture" value="chair_default.jpg"/>';
        }
        content1 += '<input type="file" class="pic_input"/>'+
        		'</div>'+
        		'</div></div>';
        var contentNode = document.createElement('div');
        contentNode.className = 'popup_wrap1';
        contentNode.innerHTML = content1;
        
        
        var overlay = new daum.maps.CustomOverlay({
        	map : map1,
        	content : content1,
        	position : new daum.maps.LatLng(circles[i].center.y, circles[i].center.x),
        	zIndex : 23,
        	vislble : false,
        	clickable : true,
            xAnchor: 0,
            yAnchor: 0,
        });
        overlays.push(overlay);
        overlays[i].setMap(map1);
        overlays[i].setVisible(false);
        displayOverlay(circle,overlays[i]);
        nonDisplayOverlay(overlays[i]);
        
    }
    console.log(overlays);
    node1.style.width = '1000px';
    node1.style.height = '800px';
    map1.relayout();
    
    function displayOverlay(circle,overlay){
    	daum.maps.event.addListener(circle, 'click', function() {
    		//alert("클릭");
    		daum.maps.event.preventMap();
    		for(var i=0 ; i<overlays.length ; i++){
    			overlays[i].setVisible(false);
    		}
    		overlay.setVisible(true);
    	});
    }
    
    function nonDisplayOverlay(overlay){
    	daum.maps.event.addListener(map1, 'click', function(mouseEvent) {
    		overlay.setVisible(false);
        });
    }

}

$("#map1").on("click",".close",function () {
	for(var i=0 ; i<overlays.length ; i++){
		overlays[i].setVisible(false);
	}
});

// 마커 위에 커스텀오버레이를 표시합니다
// 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다


var reg = /^image\//;
var reader = new FileReader();
var img = new Image();



//파일올리는 곳
//여기에서 사진 업로드하면 됩니다.
$("#map1").on("click",".pic_box",function(e) {
	$(this).next().next().click();
});

$("#map1").on("change",".pic_input",function(e) {

	var me = this;
	var index = $(this).index();
	//alert(index);
	var data = new FormData();
	    
    var file =  $(this).get(0).files[0];

    data.append('upload', file);
    data.append('imgPath', 'chair');
    var pic="";
     $.ajax({
         url: '/ajax/uploadPic',
         type: "post",
         dataType: "json",
         data: data,
         processData: false,
         contentType: false,
         success: function(json) {
        	 console.log(json);

        	 var pic = json.src;

        	 $(me).prev().prev().find("img").attr('src', "/img/chair/"+pic).css("object-fit","cover");
        	 $(me).parent().find(".chair_pic_input").val(pic);
        	 
        	 
         }, error: function(jqXHR, textStatus, errorThrown) {
        	 
        	 alert(textStatus);
         }
     });
     
     

});
