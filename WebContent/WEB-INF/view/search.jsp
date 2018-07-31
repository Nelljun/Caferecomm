<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core_1_1"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>검색</title>
<c:import url="/WEB-INF/view/templates/link.jsp"></c:import>
<link rel="stylesheet" href="/css/search.css"/>

<style>
</style>
</head>
<body>
	<c:import url="/WEB-INF/view/templates/header.jsp"></c:import>


	<div id="content">

		<div class="wrap_search_filter">
			<div class="cover_search_filter"></div>
			<!--tooltip뜰 때 content 덮을 div-->
			<ul class="box_search_filter">
				<li class="search_filter search_filter_brightness">
					<button>밝기</button>
					<ul class="wrap_search_filter_tooltip">
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="brightness"
								value="brighter" /> 아주 밝음
						</label></li>
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="brightness"
								value="bright" /> 적당히 밝음
						</label></li>
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="brightness"
								value="dark" /> 어두움
						</label></li>
					</ul>
				</li>
				<li class="search_filter search_filter_noise">
					<button>시끄러움</button>
					<ul class="wrap_search_filter_tooltip">
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="noise" value="loud" />
								약간 시끄러운
						</label></li>
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="noise"
								value="normal" /> 적당한
						</label></li>
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="noise"
								value="quite" /> 조용한
						</label></li>
					</ul>
				</li>
				<li class="search_filter search_filter_atmosphere">
					<button>분위기</button>
					<ul class="wrap_search_filter_tooltip">						
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="atmosphere"
								value="study" /> 공부하기 좋은
						</label></li>
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="atmosphere"
								value="normal" /> 휴식취하기 좋은
						</label></li>
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="atmosphere"
								value="children" /> 아이들 데리고 놀기 좋은
						</label></li>
					</ul>
				</li>
				<li class="search_filter search_filter_share">
					<button>붐비는 정도</button>
					<ul class="wrap_search_filter_tooltip">
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="noise"
								value="louder" /> 자리가 거의 다 찬
						</label></li>
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="noise"
								value="loude" /> 조금씩 붐비고 있는
						</label></li>
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="noise"
								value="quite" /> 널널한
						</label></li>
					</ul>
				</li>
				<li class="search_filter search_filter_purpose">
					<button>목적</button>
					<ul class="wrap_search_filter_tooltip">
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="noise"
								value="louder" /> 공부할 때
						</label></li>
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="noise"
								value="loude" /> 책 읽을 때
						</label></li>
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="noise"
								value="normal" /> 이야기하러 갈 때
						</label></li>
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="noise"
								value="quite" /> 쉬러갈 때
						</label></li>
					</ul>
				</li>
				<li class="search_filter search_filter_genre">
					<button>음악 종류</button>
					<ul class="wrap_search_filter_tooltip">
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="noise"
								value="louder" /> 재즈
						</label></li>
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="noise"
								value="loude" /> 가요
						</label></li>
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="noise"
								value="normal" /> 팝
						</label></li>
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="noise"
								value="quite" /> 락
						</label></li>
					</ul>
				</li>
				<li class="search_filter search_filter_kind">
					<button>카페 종류</button>
					<ul class="wrap_search_filter_tooltip">
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="noise"
								value="louder" /> 개인카페
						</label></li>
						<li><label class="container_filter_checkbox"> <input
								class="input_checkbox" type="checkbox" name="noise"
								value="loude" /> 프랜차이즈
						</label></li>
					</ul>
				</li>

				<li class="search_filter search_filter_sort">
					<button>정렬</button>
					<ul class="wrap_search_sort_tooltip">
						<li>평점순</li>
						<li>리뷰순</li>
						<li>즐겨찾기순</li>
					</ul>
				</li>
			</ul>
		</div>
		<!--//.wrap_search_filter-->
		<div class="wrap_search_content">
			<div class="wrap_search_cafelist">
				<div class="search_result_sentence">${count}개의 카페가 검색되었습니다.</div>
				<ul class="box_search_cafelist">
				</ul>
			</div>
			<!--//.wrap_search_cafelist-->


			<div class="wrap_search_map">
				<div id="searchMapBox" class="box_search_map"></div>
			</div>
			<!--//.wrap_search_map-->

		</div>

	</div>

	<!--//#content -->
	
	<c:import url="/WEB-INF/view/templates/footer.jsp"></c:import>

	<script type="text/template" id="searchValue">	


<@ _.each(searchList, function(list) { @>
          <li class="wrap_cafecard"><a href="/cafe/<@=list.no@>">
						<div class="box_cafecard_image">
							<div class="content_cafecard_image">
								<img src="/img/cafe/<@=list.picture@>" />
							</div>
							<div class="cover_cafecard_image"></div>
							<div class="box_cafecard_title">
								<div class="cafecard_title"><@=list.name@></div>
								<div class="cafecard_branch"><@=list.branch@><@if(list.branch ==null) {@><@=list.sido@> <@=list.sigungu@><@}@></div>
							</div>
							<span class="icon_cafecard_bookmark"><i
								class="fas fa-star"></i></span>
						</div>
						<!--//.box_cafecard_image-->

						<div class="box_cafecard_info">
							<ul>
		<li class="cafecard_info cafecard_info_facility">
<@ _.each(cafeFacil, function(facilList) { @>

						<span
									title="<@=facilList.title@>"><img src="/img/icon/facils_icon/<@=facilList.icon@>" /></span>
<@ }) @>
								<li class="cafecard_info cafecard_info_rating">평점<@=list.avgRating@> 리뷰
									43개</li>
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
										<div class="movingbar_cafecard_music"><@list.music@></div>
									</div>
								</li>
							</ul>
						</div>
						<!--//.box_cafecard_info-->
</a>
					</li>
<@ }) @>

</script>
	<c:import url="/WEB-INF/view/templates/js.jsp"></c:import>
	<script type="text/javascript"
		src="//dapi.kakao.com/v2/maps/sdk.js?appkey=59458989542c351078619c74f60f36dc"></script>
	<script src="/js/search.js"></script>
	<script src="/js/search_ws.js"></script>
	
	
	
	
	<script>
	var cafeList = [];
	var facilList = [];	
	var filters = []; 
	var filter1 = [1,2,3,4,5,6,7,8,9,12,14,15,16,17,18,19,20,21,25,26,29,37,38,42,,43,44,45,46,47,49,50]; filters.push(filter1);
	var filter2 = [1,2,6,7,42]; filters.push(filter2);
	var filter3 = [1,6,8,9,11,24,34,50]; filters.push(filter3);
	var filter4 = [3,6,9,14,16,25,26,30,33,37,40,42]; filters.push(filter4);
	var filter5 = [42]; filters.push(filter5);
	var filter6 = []; filters.push(filter6);
	var filter7 = []; filters.push(filter7);
	var filter8 = []; filters.push(filter8);
	var filter9 = []; filters.push(filter9);
	var filter10 = []; filters.push(filter10);
	var filter11 = []; filters.push(filter11);
	var filter12 = []; filters.push(filter12);
	var filter13 = []; filters.push(filter13);
	var filter14 = []; filters.push(filter14);
	var filter15 = []; filters.push(filter15);
	var filter16 = []; filters.push(filter16);
	var filter17 = []; filters.push(filter17);
	var filter18 = []; filters.push(filter18);
	var filter19 = []; filters.push(filter19);
	var filter20 = []; filters.push(filter20);
	var filter21 = []; filters.push(filter21);
	var filter22 = []; filters.push(filter22);
	var filter23 = []; filters.push(filter23);
	var filter24 = []; filters.push(filter24);
	var filter25 = []; filters.push(filter25);
	var filter26 = []; filters.push(filter26);
	var filter27 = []; filters.push(filter27);
	var filter28 = []; filters.push(filter28);
	var tempList = [];
	var cafeFilteredCount = [];
	var filteredCafes = [];
	var filteredCafeFacils = [];
	
	
	//스크롤 내릴 때 헤더 배경 반투명해지는거 막기
	$(window).off("scroll");
	
	
	
		var ajaxFlag = true;

		var markers = [];

		var listCount = 0;
		var bounds = new daum.maps.LatLngBounds();
		var searchTmp = _.template($("#searchValue").html()); //변수 tmp에 언더스코어 저장된 템플릿 가져오기.
		var marker = null;

		$(document).ready(function() {

			keyword = "${searchKeyword}";
			searchKeyword(keyword);

		});

		function searchKeyword(keyword) {


			if (ajaxFlag) {

				ajaxFlag = false;

				$.ajax({
					url : "/ajax/search",
					datatype : "json",
					type : "get",
					data : {
						"search" : keyword,
						"minLat" : minLat,
						"minlng" : minLng
					},
					error : function() {
						alert("에러!");
					},
					success : function(json) {

						for (var i = 0; i < markers.length; i++) {
							markers[i].setMap(null);
						}//for end

						cafeList = json.cafeList;
						facilList = json.facilList;

						var markup = searchTmp({
							"searchList" : cafeList,
							"cafeFacil" : facilList
						});

						var count = json.count;
						$(".box_search_cafelist").html(markup);

						$(".search_result_sentence").text("");

						$(".search_result_sentence").text(
								count + "개의 카페가 검색되었습니다");

						positions = [];

						for (var i = 0; i < count; i++) {

							positions.push({
								name : cafeList[i].name,
								latlng : new daum.maps.LatLng(cafeList[i].lat,
										cafeList[i].lng)
							});

							bounds.extend(new daum.maps.LatLng(cafeList[i].lat,
									cafeList[i].lng));

							marker = new daum.maps.Marker({
								map : map,
								position : new daum.maps.LatLng(
										cafeList[i].lat, cafeList[i].lng)
							});

							markers.push(marker);
							marker.setMap(map);
						}//for end

						map.setBounds(bounds);
						


						ajaxFlag = true;

					}
				});//ajax() end
				
			}//if end
			map.relayout();
			map.panTo(locPosition);
		}
		
	</script>
</body>
</html>