//websocket

//ws객체
var ws = null;

//서버와 웹소켓 연결하는 함수
function handshakingWebSocket() {

	ws = new WebSocket("ws://192.168.0.13/cafeWS");

	//ws는 4가지 이벤트 (open, close, error, message)
	$(ws).on("open", function() {
		console.log("열림");
	})
	.on("close", function() {
		console.log("닫혔음!");
		
		//ws 초기화
		ws = null;
	})
	.on("error", function() {
		console.log("에러발생");
	})
	.on("message", function(e) {
		
		 //e.originalEvent는 자바스크팁트 
	  	 //이벤트 객체
		 var evt = e.originalEvent;
		 
	  	 //이게 실제 데이터(String형)
	  	 var data = evt.data;
	  	 
	  	 	  	 
	  	 if(data.substring(0,1) == "r") {
	  		 //서버로부터 온 data의 첫 글자가 r이라면
	  		 //현재 유저의 페이지에서 정보가 필요한 카페의 번호를 서버로 넘겨준다.
	  		 
	  		 console.log("server로부터 온 data(r) : "+data);

	  		 
	  		 sendCafeNoArr();
	  		 
	  		 
	  	 } else {
	  		 //broadcast로 카페의 조도, 소음 정보가 넘어왔을 때
	  	
	  		 //원하는 위치에 해당하는 정보를 가져다 놓는다.
	  		 
	  		
	  		
	  		console.log("server로부터 온 data(카페정보) : "+data);
	  		
	  		
	  		var dataSplittedByComma = data.split(","); //","를 기준으로 split한 String[]
	  		
//	  		console.log(",를 기준으로 나눈 data : "+dataSplittedByComma);
	  		
	  		//0:카페번호, 1:밝기, 2:소음, 3:음악, 4:좌석현황, 5:점유율
	  		
	  		var cafeNoFromIOTData = dataSplittedByComma[0]; //0번지에 제일 처음 있는 수는 카페번호
	  		
	  		
	  		
	  		//점유율
	  		var cafeShare = Math.round(dataSplittedByComma[dataSplittedByComma.length-1]); //카페 점유율 from IOT
	  		var cafeShareStr = "";
	  		//밝기
	  		var cafeLight = dataSplittedByComma[1];
	  		var cafeLightStr = "";
	  		//소음
	  		var cafeNoise = dataSplittedByComma[2];
	  		var cafeNoiseStr = "";
	  		//음악
	  		var cafeMusic = dataSplittedByComma[3];
	  		
	  		if(cafeShare< 60) {
	  			cafeShareStr = "여유가 있어요!";
	  		} else if(cafeShare >= 60 && cafeShare < 80) {
	  			cafeShareStr = "조금씩 붐벼요!";
	  		} else {
	  			cafeShareStr = "자리가 거의 없어요ㅠ";
	  		}
	  		
	  		if(cafeLight < 500) {
	  			cafeLightStr = "약간 어두워요ㅠ";
	  		} else if(cafeLight >= 500 && cafeLight < 750) {
	  			cafeLightStr = "책 읽기 좋아요!";
	  		} else {
	  			cafeLightStr = "엄청 밝아요!!";
	  		}
	  		
	  		if(cafeNoise < 40) {
	  			cafeNoiseStr = "조용한 편이에요!";
	  		} else if(cafeNoise >= 40 && cafeNoise <60) {
	  			cafeNoiseStr = "약간 소란스러워요";
	  		} else {
	  			cafeNoiseStr = "많이 시끄러워요!";
	  		}
	  		
	  		if(cafeNoFromIOTData == cafeNo) {
	  			
	  			msgIndex++; //index+1
	  			
	  			console.log("msgIndex : "+msgIndex); // 한 cycle마다 msgIndex++ 해주기 위해 Hero 카페 정보 왔을 때만 ++
	  			
	  			//hero카페 상단 정보 변경
	  			if(msgIndex%10 == 1) {
	  				$heroShare.text(cafeShareStr); 	
	  			}
	  			if(msgIndex%20 == 1) {
	  				$heroMusic.text(cafeMusic);
	  			}
	  			 
	  		//	$heroLight.text(cafeLightStr);
	  		//	$heroNoise.text(cafeNoiseStr);
	  			
	  		}//if end
	  		
	  		$wrapCafecard.each(function () {
	  			
	  			var $this = $(this);
	  			
	  			var cafeNum = $this.data("no"); //추천 카페 카드의 카페 번호
	  			
	  			if(cafeNoFromIOTData == cafeNum) {
	  				if(msgIndex%10 == 1) {
	  					$this.find(".box_cafecard_info .cafecard_info_share").text(cafeShareStr);
	  				}
	  				if(msgIndex%20 == 1) {
	  					$this.find(".box_cafecard_info .movingbar_cafecard_music").text(cafeMusic);
	  				}
	  				
	  				$this.find(".box_cafecard_info .cafecard_info_atmosphere").text(cafeLightStr+" / "+cafeNoiseStr);
	  				
	  			}
	  			
	  		});
	  		
	  		
	  		
	  	 }//if~else end
		
	});
	
}//handshakingWebSocket() end

handshakingWebSocket();


var msgIndex = 0; //노래 값 받아올 때마다 (1 혹은 2초) 1씩 증가

//해당 페이지에서 정보가 필요한 카페의 번호를 
//하나의 문자열로 만들어서 보내는 함수
var $wrapCafecard = $(".wrap_cafecard");

function sendCafeNoArr() {
	
	var cafeNos = "";
	
	cafeNos += cafeNo; //heroCafe번호
	
	$wrapCafecard.each(function () {
		cafeNos += ","+$(this).data("no");
	});

	console.log("cafeNos : "+cafeNos);
	
	ws.send(cafeNos);
}

//점유율
var $heroShare = $(".box_hero_info .main_hero_info.main_hero_share");
//음악
var $heroMusic = $(".box_hero_info .main_hero_music .wrap_main_music .movingbar_main_music");
////밝기
//var $heroLight = $(".box_cafe_status").eq(2).find(".status_value");
////소음
//var $heroNoise = $(".box_cafe_status").eq(3).find(".status_value");
