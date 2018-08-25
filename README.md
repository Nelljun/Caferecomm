# Caferecomm

> 가고 싶은 카페의 실시간 정보를 얻을 수 있는 웹사이트

> 가상의 IOT를 통해 넘어오는 카페의 실시간 정보(좌석, 음악, 소음 등등) 및<br/>
  등록된 카페의 기본 정보를 볼 수 있는 웹사이트<br/>

********

### 개발환경

- OS : Windows, Linux
- Development Tool : WebStorm, Eclipse
- Framework : Spring
- Language/Skills : HTML, CSS, Javascript, Java
- DB : MyBatis, Oracle
- Bigdata : Hadoop ecosystem(flume, Kafka, Hbase, Spark)

#### 참여인원 : 5명 
#### 담당업무 : 조장으로서 기획 및 개발 전반
#### 개발기간 : 2개월 

********

### 맡은 부분

#### 프론트엔드

##### header & footer 템플릿

<img alt="header" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/header.PNG" width="200"> <img alt="footer" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/footer.PNG" width="200"> <img alt="header_footer_result" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/header_footer_result.PNG" width="400">

- 마크업 및 CSS
- 스크롤 움직일 시 header 고정 및 배경 변화
- '검색'버튼 클릭 시 input박스로 변경, 다른 곳 클릭 시 다시 '검색'버튼으로 변경
- header 오른쪽 유저 클릭 시 tooltip slidetoggle
- tooltip hover시 css 변화

##### 카페카드 템플릿

<img alt="cafecard" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/cafecard.PNG" width="400"> <img alt="cafecard_result" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/cafecard_result.PNG" width="400">

- 마크업 및 CSS
- 카페카드 hover시, 카드 아래로 카페정보박스와 즐겨찾기 버튼 생김
- 카페정보박스에서 음악정보 옆으로 이동하는 무한루프 애니메이션

##### 메인페이지

<img alt="main_hero" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/main_hero.PNG" width="400"> <img alt="main_hero_result" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/main_hero_result.PNG" width="400">
********
<img alt="main_content" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/main_content.PNG" width="400"> <img alt="main_content_result" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/main_content_result.PNG" width="400">

- 마크업 및 CSS
- (hero) 상단 음악정보 옆으로 이동하는 무한루프 애니메이션
- (content) 화살표 클릭 시 카페카드 슬라이드 (lightslider.js)

##### 검색페이지

<img alt="search_step1" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/search_step1.PNG" width="200"> <img alt="search_step2" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/search_step2.PNG" width="200"> <img alt="search_result" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/search_result.PNG" width="400"> 
********
<img alt="filter_tooltip" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/filter_tooltip.PNG" width="400"> <img alt="filter_tooltip_result" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/filter_tooltip_result.PNG" width="400">

- 마크업 및 CSS
- 지도 api 사용(naver map api)
- (필터) 각 필터 클릭 시 해당 tooltip slidetoggle
- (필터) 해당 tooltip의 내용 클릭 시 필터 내용 텍스트 변경
- (필터) check/uncheck 시 checkbox 애니메이션 적용(오픈소스 활용)

##### 상세페이지 - 기본정보, 리뷰

<img alt="details_basic" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/details_basic.PNG" width="400"> <img alt="details_basic_result" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/details_basic_result.PNG" width="400">
********
<img alt="details_review" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/details_review.png" width="400"> <img alt="details_review_popup" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/details_review_popup.png" width="400">

- 마크업 및 CSS 수정
- 리뷰 팝업창 on/off
- 리뷰 등록 시 점수와 작성내용 담긴 리뷰 div template 생성

#### 백엔드

##### IOT기기(가상)를 통해 실시간 카페 정보 생성 및 전달

<img alt="IOT" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/IOT.PNG" width="600">

- java를 이용해 가상의 IOT기기를 구현하여 csv형태로 카페에 대한 정보를 생성<br/>
  (카페번호, 밝기(lux), 소음(db), 음악, 좌석현황, 좌석점유율(%))
  
<img alt="flume" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/flume.PNG" width="400">  
  
- flume을 이용해 해당 정보를 수집하여 전송(http, HBase)


##### Websocket을 이용해 클라이언트로 카페 정보 전송 및 시각화 

    var ws = null;
    
    function handshakingWebSocket() {

	    ws = new WebSocket("ws://xxx.xxx.x.xx/cafeWS");
      
      $(ws).on("open", function() {
        //open
      })
      .on("close", function() {
        //close
      })
      .on("error", function() {
        //error
      })
      .on("message", function(e) {
        //message
      })

    }//handshakingWebSocket() end ....
    
<img alt="main" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/main.PNG" width="500"> <img alt="detail" src="https://raw.githubusercontent.com/Nelljun/Spring_Caferecomm/master/images%20for%20Readme/detail.png" width="300"> 

