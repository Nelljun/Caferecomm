<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core_1_1"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>${heroCafeMap.cafe.name }<c:if
		test="${heroCafeMap.cafe.ownerNo == loginUser.no }">_관리페이지</c:if>
</title>
<%@ include file="/WEB-INF/view/templates/link.jsp"%>
<link rel="stylesheet" href="/css/template/template_cafecard.css" />
<link rel="stylesheet" href="/css/detail/detail.css?date=2018062202" />
<link rel="stylesheet" href="/css/api/lightslider.css" />
<link rel="stylesheet"
	href="/css/detail/detail_basic.css?date=2018062204" />
<link rel="stylesheet" href="/css/detail/detail_seating.css">
<link rel="stylesheet" href="/css/api/tui-chart.css" />
<link rel="stylesheet" type="text/css" href="/css/api/slick/slick.css" />
<link rel="stylesheet" type="text/css"
	href="/css/api/slick/slick-theme.css" />
<link rel="stylesheet"
	href="/css/template/template_menu.css?date=2018062401">
<link rel="stylesheet"
	href="/css/detail/detail_review.css?date=2018062241">
<link rel="stylesheet"
	href="/css/detail/popup_review.css?date=2018062004">

<style>
.box_board.box_menu ul {
	/*background-color: #E91E63;*/
	overflow: hidden;
	margin: 10px 0;
}

.box_board.box_menu .menu_box_title {
	/*background-color: #00AAB4;*/
	width: 100px;
	height: 50px;
	font-size: 25px;
	color: rgb(192, 192, 192);
	line-height: 47px;
	margin: 10px 0 0 3px;
}

.box_board.box_menu ul>li {
	margin: 0 3px 10px 3px;
	width: 250px;
	height: 250px;
	float: left;
}
</style>

</head>
<body>
	<%@ include file="/WEB-INF/view/templates/header.jsp"%>

	<div id="boxCafeHeroImg">
		<img id="heroImg"
			src="/img/cafe/<c:forEach items="${heroCafeMap.cafePics }" var="cafePic"><c:if test="${cafePic.repPic == 1 }">${cafePic.name }</c:if></c:forEach>">
		<div id="heroImgColor"></div>
		<div id="wrapCafeStatus">
			<div class="box_cafe_status">
				<div class="box_statusTitle_wrap">
					<img src="/img/icon/status_icon/coffee-beans.svg"> <span
						class="status_title">평점</span>
				</div>
				<div class="status_value score">${heroCafeMap.cafe.avgRating }</div>
			</div>
			<div class="box_cafe_status">
				<div class="box_statusTitle_wrap">
					<img src="/img/icon/status_icon/armchair.svg"> <span
						class="status_title">좌석 점유율</span>
				</div>
				<div class="status_value">여유로워요</div>
			</div>
			<div class="box_cafe_status">
				<div class="box_statusTitle_wrap">
					<img src="/img/icon/status_icon/light-bulb.svg"> <span
						class="status_title">밝기</span>
				</div>
				<div class="status_value">책읽기 좋은 밝기에요</div>
			</div>
			<div class="box_cafe_status">
				<div class="box_statusTitle_wrap">
					<img src="/img/icon/status_icon/megaphone.svg"> <span
						class="status_title">소음</span>
				</div>
				<div class="status_value">조용해요</div>
			</div>
			<div class="box_cafe_status">
				<div class="box_statusTitle_wrap">
					<img src="/img/icon/status_icon/musical-note.svg"> <span
						class="status_title">음악</span>
				</div>
				<div class="wrap_detail_music">
					<div class="movingbar_detail_music">Sarah - Gravity (Feat. 개코
						of 다이나믹듀오)</div>
				</div>
			</div>
			<div class="box_cafe_status time">
				<div class="box_statusTitle_wrap">
					<img src="/img/icon/status_icon/clock-circular-outline.svg">
					<span class="status_title">평균이용시간</span>
				</div>
				<div class="status_value time">3시간 34분</div>
			</div>
		</div>
		<label id="cafePicBtn" class="fas fa-camera-retro"> 카페사진 더보기</label>
		<div class="wrap_cafeDetailPic">
			<div class="popup_cafeDetailPic">
				<c:forEach items="${heroCafeMap.cafePics }" var="cafePic">
					<c:if test="${cafePic.repPic == 2}">
						<div>
							<img src="/img/cafe/${cafePic.name }">
						</div>
					</c:if>
				</c:forEach>
			</div>
		</div>
	</div>
	<div id="cafeGnbBtn">
		<div id="cafeNameBox">
			<span id="cafeName"><c:out value="${heroCafeMap.cafe.name }" /></span>
			<span id="cafeBranch">${heroCafeMap.cafe.branch } <c:if
					test="${heroCafeMap.cafe.branch == null }"> ${heroCafeMap.cafe.sido} ${heroCafeMap.cafe.sigungu }</c:if></span>
			<i
				class="fas fa-star <c:if test="${heroCafeMap.bookmarkFromDB != null }">on</c:if>"></i>
			<c:if test="${heroCafeMap.cafe.ownerNo == loginUser.no }">
				<a class="btn_cafe_modify"
					href="/cafe/modify/${heroCafeMap.cafe.no }">카페 정보 수정</a>
			</c:if>
		</div>
		<ul>
			<li><a class="cafe_gnb on gnb_basic_info" href="#">기본정보</a></li>
			<li><a class="cafe_gnb gnb_seat" href="#"><c:choose>
						<c:when test="${heroCafeMap.cafe.ownerNo != loginUser.no }">좌석</c:when>
						<c:otherwise>카페</c:otherwise>
					</c:choose>현황</a></li>
			<li id="gnbMenu"><a class="cafe_gnb gnb_menu" href="#">메뉴</a>
				<div class="gnb_menuDetail">
					<a href="#boxCoffee" class="gnb_drink">음료</a><a href="#boxDessert"
						class="gnb_dessert">디저트</a>
				</div></li>
			<li><a class="cafe_gnb gnb_review" href="#">리뷰</a></li>
		</ul>
	</div>


	<div id="detailsCafeWrap">
		<div class="box_board box_basic_info on">
			<div class="wrap_detail_basic_info">

				<div class="wrap_detail_basic_sidebar">
					<div class="box_update_date">
						마지막 업데이트
						<fmt:formatDate value="${heroCafeMap.cafe.regdate }"
							pattern="YYYY년 MM월 dd일" />
					</div>

					<div class="box_sns_link">
						<ul>
							<li><a href=""><i class="fab fa-twitter-square"></i></a></li>
							<li><a href=""><i class="fab fa-facebook-square"></i></a></li>
							<li><a href=""><i class="fab fa-linkedin"></i></a></li>
						</ul>
					</div>

					<div class="box_detail_tag">
						<div>이 카페 관련 태그</div>
						<ul class="list_detail_tag">
						</ul>
					</div>

				</div>

				<ul class="list_detail_facility">
					<c:forEach items="${heroCafeMap.cafeFacils }" var="cafeFacil">
						<li>
							<div class="icon_detail_facility">
								<img src="/img/icon/facils_icon/${cafeFacil.icon }" />
							</div>
							<div class="title_detail_facility">${cafeFacil.title }</div>
						</li>
					</c:forEach>
				</ul>

				<ul class="list_detail_basic_info">
					<li>
						<div class="info_title">
							<i class="fas fa-building"></i>
						</div>
						<div class="info_content">
							<c:choose>
								<c:when test="${heroCafeMap.cafe.type == 1 }">
                    			프랜차이즈
                    		</c:when>
								<c:otherwise>
                    			개인카페
                    		</c:otherwise>
							</c:choose>
						</div>
					</li>
					<li>
						<div class="info_title">
							<i class="fas fa-phone"></i>
						</div>
						<div class="info_content">${heroCafeMap.cafe.phone }</div>
					</li>
					<li>
						<div class="info_title">
							<i class="fas fa-map-marker-alt"></i>
						</div>
						<div class="info_content">${heroCafeMap.cafe.roadAddress }</div>
					</li>
					<li>
						<div class="info_title">
							<i class="fas fa-clock"></i>
						</div>
						<div class="info_content">${heroCafeMap.cafe.openTime }</div>
					</li>
					<!--<li>-->
					<!--<div class="info_title"><i class="fas fa-utensils"></i></div>-->
					<!--<div class="info_content">4,100원   아메리카노(Tall)</div>-->
					<!--</li>-->
				</ul>



				<div class="wrap_cafelist_row">
					<div class="cafelist_row_title">주변 추천 카페</div>
					<ul class="content-slider">
						<c:forEach items="${cafeMapList }" var="cafeMap">
							<li class="wrap_cafecard" data-no="${cafeMap.cafe.no }"><a
								href="/cafe/${cafeMap.cafe.no }">
									<div class="box_cafecard_image">
										<div class="content_cafecard_image">
											<img
												src="/img/cafe/<c:forEach items="${cafeMap.cafePics }" var="cafePic"><c:if test="${cafePic.repPic == 1 }">${cafePic.name }</c:if></c:forEach>">
										</div>
										<div class="cover_cafecard_image"></div>
										<div class="box_cafecard_title">
											<div class="cafecard_title">${cafeMap.cafe.name }</div>
											<div class="cafecard_branch">${cafeMap.cafe.branch }
												<c:if test="${cafeMap.cafe.branch == null }"> ${cafeMap.cafe.sido} ${cafeMap.cafe.sigungu }</c:if>
											</div>
										</div>
										<span
											class="icon_cafecard_bookmark <c:if test="${cafeMap.bookmarkFromDB != null }">active</c:if>"><i
											class="fas fa-star"></i></span>
									</div> <!--//.box_cafecard_image-->

									<div class="box_cafecard_info">
										<ul>
											<li class="cafecard_info cafecard_info_facility"><c:forEach
													items="${cafeMap.cafeFacils }" var="cafeFacil" begin="0"
													end="5">
													<span><img
														src="/img/icon/facils_icon/${cafeFacil.icon }"
														title="${cafeFacil.title }" alt="${cafeFacil.title }" /></span>
												</c:forEach></li>
											<li class="cafecard_info cafecard_info_rating">평점
												${cafeMap.cafe.avgRating } 리뷰 ${cafeMap.reviews.size() }개</li>
											<li
												class="cafecard_info cafecard_info_status cafecard_info_share">매장이
												붐비기 시작해요!</li>
											<li
												class="cafecard_info cafecard_info_status cafecard_info_atmosphere">힐링하기
												좋아요~</li>
											<li class="cafecard_info cafecard_info_music">
												<div class="icon_cafecard_music">
													<i class="fas fa-music"></i>
												</div>
												<div class="wrap_cafecard_music">
													<div class="movingbar_cafecard_music">Someday
														(Feat.Meghan Trainor) - Michael Buble</div>
												</div>
											</li>
										</ul>
									</div> <!--//.box_cafecard_info-->
							</a></li>
						</c:forEach>
					</ul>
				</div>
				<!--//.wrap_cafelist_row-->



			</div>
			<!--//.wrap_detail_basic_info-->





		</div>
		<div class="box_board box_seat">
			<c:if test="${heroCafeMap.cafe.ownerNo == loginUser.no }">
				<div id="cafeSummaryWrap">
					<div class="content_title">
						<label>상세 요약 정보</label>
					</div>
					<div id="cafeSummary">
						<div>
							<span class="list_title">좌석 점유율 : </span><span>45%</span>
						</div>
						<div>
							<span class="list_title">조도 : </span><span>50lux</span>
						</div>
						<div>
							<span class="list_title">소음 : </span><span>70dB</span>
						</div>
						<div>
							<span class="list_title">배경음악 : </span><span>날아라 병아리 -
								next</span>
						</div>
					</div>
				</div>
			</c:if>
			<div id="mapWrap">
				<div class="content_title">
					<label>좌석 현황</label> <label> <span><i
							class="fas fa-circle"></i> 공석</span> <span><i
							class="fas fa-circle"></i> 사용 중</span> <span><i
							class="fas fa-plug"></i> 콘센트</span>
					</label>
				</div>
				<div id="mapBox">
					<div id="map"></div>
				</div>
			</div>
			<div id="chartWrap">
				<div class="content_title">
					<label>시간별 인기도</label>
				</div>
				<div id="chartArea"></div>
				<div id="btnWeekBox">
					<button class="btn_week">일</button>
					<button class="btn_week">월</button>
					<button class="btn_week">화</button>
					<button class="btn_week">수</button>
					<button class="btn_week">목</button>
					<button class="btn_week">금</button>
					<button class="btn_week">토</button>
				</div>
			</div>
			<c:if test="${heroCafeMap.cafe.ownerNo == loginUser.no }">
				<div id="noiseChartWrap">
					<div class="content_title">
						<label>카페 소음</label>
					</div>
					<div id="noiseChartArea"></div>
				</div>
				<div id="brightChartWrap">
					<div class="content_title">
						<label>카페 밝기</label>
					</div>
					<div id="brightChartArea"></div>
				</div>
			</c:if>
		</div>
		<div class="box_board box_menu">
			<div id="boxCoffee">
				<div class="menu_box_title">음료</div>
				<ul>
					<c:forEach items="${heroCafeMap.menus }" var="menu">
						<c:if test="${menu.type == 1 }">
							<li>
								<div class="box_menu_image">
									<div class="content_menu_image">
										<img src="/img/menu/${menu.pic }" />
										<div class="cover_menu_image"></div>
									</div>
									<div class="box_menu_title">
										<div class="menu_title">${menu.name }</div>
									</div>

									<div class="menu_click" style="display: none;">

										<h3 class="font-bl">${menu.name }</h3>
										<p class="txt">${menu.info }</p>
										<div class="hover_cover">
											<p class="price">${menu.price }원</p>
											<p class="msg">(매장 상황에 따라 판매하지 않을 수 있습니다.)</p>
										</div>
									</div>

								</div> <!--//.box_menu_image-->
							</li>
						</c:if>
					</c:forEach>
				</ul>
			</div>
			<div id="boxDessert">
				<div class="menu_box_title">디저트</div>
				<ul>
					<c:forEach items="${heroCafeMap.menus }" var="menu">
						<c:if test="${menu.type == 2 }">
							<li>
								<div class="box_menu_image">
									<div class="content_menu_image">
										<img src="/img/menu/${menu.pic }" />
										<div class="cover_menu_image"></div>
									</div>
									<div class="box_menu_title">
										<div class="menu_title">${menu.name }</div>
									</div>

									<div class="menu_click" style="display: none;">

										<h3 class="font-bl">${menu.name }</h3>
										<p class="txt">${menu.info }</p>
										<div class="hover_cover">
											<p class="price">${menu.price }원</p>
											<p class="msg">(매장 상황에 따라 판매하지 않을 수 있습니다.)</p>
										</div>
									</div>

								</div> <!--//.box_menu_image-->
							</li>
						</c:if>
					</c:forEach>
				</ul>
			</div>
		</div>
		<div class="box_board box_review">
			<div class="wrap_review">
				<c:if test="${heroCafeMap.cafe.ownerNo != loginUser.no }">
					<button class="btn_review">리뷰 남기기</button>
				</c:if>
				<div class="total_review_number">
					총 <span></span>개의 리뷰
				</div>

				<div id="backgroundColor">
					<div id="reviewRegisterPopup">
						<div id="reviewRegisterTitle">
							<span class="review_registesr_title">${heroCafeMap.cafe.name }</span>
							<span class="review_register_subtitle">${heroCafeMap.cafe.branch }
								<c:if test="${heroCafeMap.cafe.branch == null }"> ${heroCafeMap.cafe.sido} ${heroCafeMap.cafe.sigungu }</c:if>
							</span>
						</div>
						<div id="reviewRegisterWrite">
							<textarea placeholder="이 카페에 대한 생각을 자유롭게 써주세요"
								class="review_register_write"></textarea>
						</div>
						<div class="review_popup_bottom">
							<button class="btn_review_register">등록</button>

							<div id="reviewRegisterEvaluate">
								<div class="wrap_popup_review_evaluate">
									<img src="/img/icon/coffee_bean.svg"> <img
										src="/img/icon/coffee_bean.svg"> <img
										src="/img/icon/coffee_bean.svg"> <img
										src="/img/icon/coffee_bean.svg"> <img
										src="/img/icon/coffee_bean.svg">
								</div>
								<div class="popup_review_score">
									<span></span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<ul>

				</ul>

			</div>
		</div>
	</div>

	<%@ include file="/WEB-INF/view/templates/footer.jsp"%>

	<script type="text/template" id="reviewTmp">
				<@if(reviewList.length == 0) {@>
					<li class="box_review_none">
						<div><i class="fas fa-comments"></i></div>
						<div>아직 등록된 리뷰가 없네요 ㅠㅠ</div>
					</li>
				<@} else { @>
					<@_.each(reviewList, function(review) { @>
			            <li class="box_review_content" data-no="<@=review.no @>">
			                <div class="wrap_review_img">
			                    <div class="review_img"><img src="/img/profile/<@=review.userProfile @>"></div>
			                    <div class="review_img_userTitle"><@=review.userNickname @></div>
			                </div>
			                <div class="review_contents">
			                    <div class="wrap_review_percent">
			                        <ul>
										<li title="긍정 <@=(review.positive*100).toFixed(1)@>%" style="width:<@=review.positive*400@>px"></li>
										<li title="부정 <@=(review.negative*100).toFixed(1)@>%" style="width:<@=review.negative*400@>px"></li>
										<li title="복합 <@=(review.complex*100).toFixed(1)@>%" style="width:<@=review.complex*400@>px"></li>
										<li title="중립 <@=(review.neutral*100).toFixed(1)@>%" style="width:<@=review.neutral*400@>px"></li>
										<li title="없음 <@=(review.none*100).toFixed(1)@>%" style="width:<@=review.none*400@>px"></li>
									</ul>
			                    </div>
								<@if(loginUserNo == review.userNo) {@>
				                    <div class="btn_delete_modified">
				                        <button class="btn_review_all">수정</button>
				                        <button class="btn_review_all">삭제</button>
				                    </div>
								<@} @>
			                    <div class="wrap_review_userContents">
			                        <@=review.content @>
			                    </div>
			                    <div class = "box_review_score">
			                        <div class="icon_review_score">	 
										<@for(var i = 1; i <= review.rating; i++) {@>
											<img src="/img/icon/coffee_bean on.svg" />      
										<@} @>                          
										<@for(var i = 1; i <= (5-review.rating); i++) {@>
											<img src="/img/icon/coffee_bean.svg" />      
										<@} @>                          										                         
		                       	  	</div>
			                        <div class="content_review_score">
			                            <span><@=review.rating @></span>점
			                        </div>
			                    </div>
			                    <div class="wrap_review_date">
									<@=moment(review.regdate).format("YYYY년 MM월 DD일") @>
			                    </div>
			                </div>
			            </li>
		            <@}); @>
				<@} @>
</script>

<script type="text/template" id="tagTmp">
<@ _.each(tagList, function(tag) { @>
	<li>#<@=tag@></li>
<@})@>
</script>

	<%@ include file="/WEB-INF/view/templates/js.jsp"%>
	<script src="/js/api/moment-with-locales.js"></script>
	<script type="text/javascript"
		src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9110284f92461dacf13fdb66d076b614&libraries=services,drawing"></script>
	<script src="/js/api/tui-code-snippet.min.js"></script>
	<script src="/js/api/raphael.min.js"></script>
	<script src="/js/api/tui-chart.js"></script>
	<script src="/js/api/slick.min.js?date=20180623"></script>
	<script>

	var loginUserNo = ${loginUser.no} //로그인 유저 번호
	var cafeNo = ${heroCafeMap.cafe.no} //카페 번호
	var imgWidth =100;
	var imgHeight =100;
	console.log("유저번호 : "+loginUserNo);
	console.log("카페번호 : "+cafeNo);
	var src = "${heroCafeMap.cafe.floorPlanPic}";
	var image = new Image();
	image.src = '/img/floor_plan/'+src;
	image.onload = function(){
		//alert(image.width);
		imgWidth = image.width;
		imgHeight = image.height;
		//$(".on").removeClass("on");
		//$(".gnb_seat").addClass("on");
		
		//$(".box_board").eq(1).addClass("on");
		displayMap(1.5,1.5);
	}
	console.log("여기:"+imgWidth+","+imgHeight);
	var floorPlanPic = '/img/floor_plan/'+src;

	
	
/* 	displayFloorPlan(src); */
	var tableList = [];
	var chairList = [];
	var plugList = [];
	var chairPicList=[];
	var picList=[];
	var tagList=[];
	<c:if test="${heroCafeMap.tableList != null}">
		var i = 0;
		<c:forEach items="${heroCafeMap.tableList }" var="table" >
			var table = {
					"ex":"${table.ex}",
					"ey":"${table.ey}",
					"sx":"${table.sx}",
					"sy":"${table.sy}"
			};
			tableList[i] = table;
			i++;
		</c:forEach>

	</c:if>
	
	<c:if test="${heroCafeMap.chairList != null}">
		var i = 0;
		<c:forEach items="${heroCafeMap.chairList }" var="chair" >
			var chair = {
					"no":"${chair.no}",
					"idx":"${chair.idx}",
					"x":"${chair.x}",
					"y":"${chair.y}",
					"radius":"${chair.radius}",
					"pic":"${chair.pic}",
					"bookmark":"${chair.bookmark}"
			};
			picList[i]="${chair.pic}";
			chairList[i] = chair;
			i++;
			console.log(chair);
		</c:forEach>

	</c:if>
	
	<c:if test="${heroCafeMap.plugList != null}">
		var i=0;
		<c:forEach items="${heroCafeMap.plugList }" var="plug" >
			var plug = {
					"x":"${plug.x}",
					"y":"${plug.y}",
					"count":"${plug.count}",
			};
			plugList[i] = plug;
			i++;
		</c:forEach>	

	</c:if>
<c:forEach items="${heroCafeMap.tagList}" var="tag" >
	tagList.push("${tag.content}");
</c:forEach>
var tagTmp = _.template($("#tagTmp").html());

$(".list_detail_tag").html(tagTmp({"tagList": tagList}));

//예상점수
/* var userPredTmp = "${heroCafeMap.userPred.pred_rating}"
var userPred = MATH.ROUND(userPredTmp);
alert(userPred); */
</script>
	<script src="/js/detail/detail_page_seating.js?date=2018062002"></script>
	<script src="/js/detail/detail.js?date=2018061901"></script>
	<script src="/js/template/template_cafecard.js?date=20180629"></script>
	<script src="/js/api/lightslider.js?date=20170611001"></script>
	<script src="/js/template/template_menu.js"></script>
	<script src="/js/detail/detail_review.js?date=2018062221"></script>
	<script src="/js/detail/detail_ws.js"></script>

	<script>
	<c:if test="${heroCafeMap.cafe.ownerNo == loginUser.no }">

	
	</c:if>
    //카페카드 슬라이드
    $(document).ready(function() {
        $(".content-slider").lightSlider({
            loop: true,
            pager: false, //page 점 삭제
            keyPress: false, //화살표 버튼 작동 멈춤
            autoWidth: true, //자동으로 width 지정
            enableDrag: false
        });
    });

</script>
</body>
</html>