//websocket

//ws객체
var ws = null;
var brightData = 0;
var noiseData = 0;
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
	  		//좌석
	  		var currentSeatsArr = dataSplittedByComma[4].split(":");
	  		
	  		if(cafeShare< 60) {
	  			cafeShareStr = "여유가 있어요!";
	  		} else if(cafeShare >= 60 && cafeShare < 80) {
	  			cafeShareStr = "조금씩 붐비고 있어요!";
	  		} else {
	  			cafeShareStr = "자리가 거의 다 찼어요!";
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
	  			cafeNoiseStr = "약간 소란스러워지고 있어요";
	  		} else {
	  			cafeNoiseStr = "많이 시끄러워요!";
	  		}
	  		
	  		//밝기 현황 그래프 값 추가 (from IOTdata)
	  		brightData = cafeLight;
	  		noiseData = cafeNoise;
	  		
	  		if(cafeNoFromIOTData == cafeNo) {
	  			 msgIndex++;
	  			
	  			//hero카페 상단 정보 변경
	  			if(msgIndex%10 == 1) {
	  				$heroShare.text(cafeShareStr);
	  			}
	  			$heroLight.text(cafeLightStr);
	  			$heroNoise.text(cafeNoiseStr);
	  			if(msgIndex%20 == 1) {
	  				$heroMusic.text(cafeMusic); 
	  			}
	  			
	  			//카페현황에서 카페 현황 요약카드 정보 변경
	  				$cafeSummaryInfo.eq(0).find("span").eq(1).text(cafeShare+"%");
	  			$cafeSummaryInfo.eq(1).find("span").eq(1).text(cafeLight+"lux");
	  			$cafeSummaryInfo.eq(2).find("span").eq(1).text(cafeNoise+"dB");
	  				$cafeSummaryInfo.eq(3).find("span").eq(1).text(cafeMusic);
	  			
	  			//카페현황(좌석현황)에서 좌석 사용 여부 변경
					_.each(currentSeatsArr, function(value, index) {
		  				
		  				if(value == 0) {
		  					//빈좌석이라면
		  					seats[index].setOptions({
		  						fillColor: "#FBC02D"
		  					})
		  				} else {
		  					//사용 중인 좌석이라면
		  					seats[index].setOptions({
		  						fillColor: "red"
		  					})
		  				}//if~else end
		  				
		  			});//_.each()end
	  			
	  			
	  		}//if end
	  		
	  		$wrapCafecard.each(function () {
	  			
	  			var $this = $(this);
	  			
	  			var cafeNum = $this.data("no"); //추천 카페 카드의 카페 번호
	  			
	  			if(cafeNoFromIOTData == cafeNum) {
	  					$this.find(".box_cafecard_info .cafecard_info_share").text(cafeShareStr);
	  				$this.find(".box_cafecard_info .cafecard_info_atmosphere").text(cafeLightStr+" / "+cafeNoiseStr);
	  					$this.find(".box_cafecard_info .movingbar_cafecard_music").text(cafeMusic);
	  			}
	  			
	  		});
	  		
	  		
	  		
	  	 }//if~else end
		
	});
	
}//handshakingWebSocket() end

handshakingWebSocket();

var msgIndex = 0;

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
var $heroShare = $(".box_cafe_status").eq(1).find(".status_value");
//밝기
var $heroLight = $(".box_cafe_status").eq(2).find(".status_value");
//소음
var $heroNoise = $(".box_cafe_status").eq(3).find(".status_value");
//음악
var $heroMusic = $(".box_cafe_status").eq(4).find(".movingbar_detail_music");
//카페관리자 카페현황 상세 요약정보
var $cafeSummaryInfo = $("#cafeSummary>div");







//카페현황 그래프
function getRandom(start, end) {
    return start + (Math.floor(Math.random() * (end - start + 1)));
}

function zeroFill(number) {
    var filledNumber;

    if (number < 10) {
        filledNumber = '0' + number;
    } else {
        filledNumber = number;
    }

    return filledNumber;
}

function adjustTime(time, addTime) {
    addTime = addTime || 60;
    if (time < 0) {
        time += addTime;
    }
    return time;
}

function makeDate(hour, minute, second) {
    return zeroFill(adjustTime(hour, 24)) + ':' + zeroFill(adjustTime(minute)) + ':' + zeroFill(adjustTime(second));
}

var legends1 = ['소음'];
var legends2 = ['밝기'];
var seriesData1 = tui.util.map(tui.util.range(1), function (value, index) {
    var name = legends1[index];
    var data = tui.util.map(tui.util.range(100), function () {
        return getRandom(50, 100);
    });
    return {
        name: name,
        data: data
    };
});
var seriesData2 = tui.util.map(tui.util.range(1), function (value, index) {
    var name = legends2[index];
    var data = tui.util.map(tui.util.range(100), function () {
        return getRandom(500, 1000);
    });
    return {
        name: name,
        data: data
    };
});
var baseNow = new Date();
var startSecond1 = baseNow.getSeconds() - seriesData1[0].data.length - 1;
var startSecond2 = baseNow.getSeconds() - seriesData2[0].data.length - 1;
var categories1 = tui.util.map(seriesData1[0].data, function (value, index) {
    var hour = baseNow.getHours();
    var minute = baseNow.getMinutes();
    var second = startSecond1 + index;

    if (second < 0) {
        minute -= 1;
    }

    if (minute < 0) {
        hour -= 1;
    }
    return makeDate(hour, minute, (startSecond1 + index));
});
var categories2 = tui.util.map(seriesData2[0].data, function (value, index) {
    var hour = baseNow.getHours();
    var minute = baseNow.getMinutes();
    var second = startSecond2 + index;

    if (second < 0) {
        minute -= 1;
    }

    if (minute < 0) {
        hour -= 1;
    }
    return makeDate(hour, minute, (startSecond2 + index));
});


//소음,
var noiseContainer = document.getElementById('noiseChartArea');
var data1 = {
	    categories: categories1,
	    series: seriesData1
};
var noiseOptions = {
	    chart: {
	        width: 1000,
	        height: 300,
	        title: 'noises'
	    },
	    xAxis: {
	        title: 'seconds',
	        labelInterval: 3,
	        tickInterval: 'auto'
	    },
	    yAxis: {
	        title: 'dB'
	    },
	    series: {
	        spline: true,
	        showDot: true,
	        shifting: true
	    },
	    tooltip: {
	        suffix: 'dB',
	        grouped: true
	    },
    theme: 'noiseTheme'
};


// For apply theme

tui.chart.registerTheme('noiseTheme', {
    series: {
        colors: [
            '#83b14e'
        ]
    }
});

var noiseChart = tui.chart.lineChart(noiseContainer, data1, noiseOptions);

noiseChart.on('load', function () {
    var index = categories1.length;
    setInterval(function () {
        var now = new Date();
        var category = makeDate(now.getHours(), now.getMinutes(), now.getSeconds());
        var values = [noiseData];

        noiseChart.addData(category, values);
        index += 1;
    }, 5000);
});
//밝기,
var brightContainer = document.getElementById('brightChartArea');
var data2 = {
	    categories: categories2,
	    series: seriesData2
};

tui.chart.registerTheme('brightTheme', {
    series: {
        colors: [
            '#289399'
        ]
    }
});

var brightOptions = {
    chart: {
        width: 1000,
        height: 300,
        title: 'bright'
    },
    xAxis: {
        title: 'seconds',
        labelInterval: 3,
        tickInterval: 'auto'
    },
    yAxis: {
        title: 'lux'
    },
    series: {
        spline: true,
        showDot: true,
        shifting: true
    },
    tooltip: {
        suffix: 'lux',
        grouped: true
    },
    theme: 'brightTheme'
};

var brightChart = tui.chart.lineChart(brightContainer, data2, brightOptions);

brightChart.on('load', function () {
    var index = categories2.length;
    setInterval(function () {
        var now = new Date();
        var category = makeDate(now.getHours(), now.getMinutes(), now.getSeconds());
        var values = [brightData];

        brightChart.addData(category, values);
        index += 1;
    }, 3000);
});


	