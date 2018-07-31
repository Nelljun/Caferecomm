<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core_1_1"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<c:import url="/WEB-INF/view/templates/link.jsp"></c:import>
<link rel="stylesheet" href="/css/api/prettydropdowns.css">
<link rel="stylesheet" href="/css/register/register1.css" />
<link rel="stylesheet" href="/css/register/register6.css" />
<link rel="stylesheet" href="/css/register/register7.css" />
<link rel="stylesheet" href="/css/template/template_menu.css" />

<title>등록</title>
<style>
</style>

</head>
<body>
	<div class="menu_popup_wrap insert_drink">
		<div id="cafeRegisterDrink" class="page4_popup">
			<div id="cafeRegisterDrinkTitle" class="page4_title">
				<h1>음료 추가</h1>
				<i class="fas fa-times-circle"></i>
			</div>
			<div id="drinkForm">
				<label for="coffeImage"><div class="popup_image drink_image">
						<img src="" class="popup_view coffe_preview" alt=""><i
							class="far fa-image"></i><input type='file' id="coffeImage" />
					</div></label>
				<div class="drink_detail drink_menu">
					<label for="drinkTitle"> 메뉴명 <input type="text"
						name="drinkTitle" id="drinkTitle"></label>
				</div>
				<div class="drink_detail drink_explicate">
					<label class="page4_size_controller" for="drinkExplicate">
						상세설명</label>
					<textarea name="drinkExplicate" id="drinkExplicate"></textarea>
				</div>
				<div class="drink_detail drink_fee">
					<label for="drinkFee">가격</label> <input type="number"
						name="driveFee" id="drinkFee">원
				</div>
				<div class="page4_drink_insert">추가</div>
			</div>
		</div>
	</div>

<c:choose>
<c:when test="${cafe != null }">
	<form action="/cafe" method="post" id="form">
	<input type="hidden" name="_method" value="PUT"/>
	<input type="hidden" name="no" value="${cafe.no }">
</c:when>
<c:otherwise>
	<form action="/cafe" method="post" id="form">
</c:otherwise>
</c:choose>
		<div id="cafeRegisterWrap">

			<div id="cafeRegisterTitle">
				<div class="title_logo">
				    <a href="/main"><img src="/img/logo.svg"></a>					
				</div>
				<div id="titleWrap">
				<span id="cafeRegisterMainTitle">1단계:</span> 
				<span id="cafeRegisterSubTitle"> 기본사항을 입력하세요</span>
				</div>
				<div id="cafeRegisterLine">
					<div id="cafeRegisterLineContainer"></div>
				</div>
			</div>

			<div id="page1" class="content on">

				<div class="cafe_register_box">

					<div class="page1_cafe_register_nav">
						<label for="cafeRegisterKind"> 등록하시려는 카페는 어떤종류인가요?
							<div class="page1_input_cover">
								<select name="type" class="page1_input kind" id="cafeRegisterKind">
-									<option value="1">프렌차이즈</option>
									<option value="2">개인카페</option>
								</select>
							</div>
						</label>
					</div>
					<div class="page1_cafe_register_nav">
						<label for="page1CafeRegisterName"> 이름이 무엇인가요? <span
							class="validate cafe_name">이건</span><span
							class="validate cafe_branch_name">이건</span>
							<div class="page1_input_cover">
								<input type="text" name= "name" placeholder="카페명을 입력하세요"
									id="page1CafeRegisterName" class="page1_input" /> 
								<input
									type="text" name= "branch" id="page1CafeRegisterBranch"
									placeholder="지점을 입력하세요" class="page1_input" />
							</div>
						</label>
					</div>

					<div class="page1_cafe_register_nav">
						<label for="cafeRegisterNumber">
							<h1 class="font_size_lower">
								카페의 전화번호나 본인의 휴대폰번호를 입력하세요 <span
									class="validate phone_n_cafe_number_first">이건</span> <span
									class="validate phone_n_cafe_number_second">이건</span> <span
									class="validate phone_n_cafe_number_third">이건</span>
							</h1>
							<div class="page1_input_cover">
								<input name="phone" id="cafeRegisterNumber" class="page1_input first_cafe_number" />
							</div>
						</label>
					</div>
					<div class="page1_cafe_register_nav">
						<label for="cafeRegisterTime"> 영업시간을 입력하세요. <span
							class="validate process_time">이건</span>
							<div class="page1_input_cover register_time">
								<input name= "openTime" id="cafeRegisterTime"
									class="page1_input">
							</div>
						</label>
					</div>
					<div class="page1_cafe_register_nav">
						주소를 입력하세요 <label for="cafeRegisterAddress"> <span
							id="cafeRegisterAddressDetail"> <span
								class="search_btn cafe_register_btn">검색</span>
						</span> <span class="validate adress_check">이건</span> <span
							class="validate adress_check_detail">이건</span>
							<div class="cafe_register_adress_popup"></div>
							<div class="page1_input_cover addressBox">

								<input name= "address" id="cafeRegisterAddress"
									class="page1_input" disable> <input type="hidden" name="sido"
									id="sido" /> <input type="hidden" name="sigungu" id="sigungu" />
								<input type="hidden" name="lat" id="lat" /> <input
									type="hidden" name="lng" id="lng" />
							</div>
						</label>
					</div>
					<div class="page1_cafe_register_nav">
						<label for="cafeRegisterBusinessNumber">
							<h1 class="font_size_lower">
								사업자 등록번호를 입력하세요. <span
									class="validate bussiness_registration_number">이건</span>
							</h1>
							<div class="page1_input_cover">
								<input type="number" name="regNo"
									id="cafeRegisterBusinessNumber" class="page1_input">
							</div>
						</label>
					</div>
					<div class="page1_cafe_register_nav">
						<label for="cafeRegisterBusinessRegistration"
							class="bussiness_image">
							<h1 class="font_size_lower">
								사업자 등록증 <span class="validate bussiness_registration_image">이건</span>
							</h1>
							<div class="page1_input_cover">
								<input type="file" id="cafeRegisterBusinessRegistration"
									class="page1_input filebox "> <input type="hidden"
									name="regPic" id="reg_pic" /> <img class="image_section"
									id="cafeRegisterBusinessRegistrationPreview">
							</div>
						</label>
					</div>


				</div>

				<div class="cafe_register_btn">
					<div class="cancel">취소</div>
					<div formaction="cafe_register" class="after move">다음</div>
				</div>
			</div>
			<div id="page2" class="content">
				<div class="page1_cafe_register_nav">

					<div class="cafe_register_box">

						<div class="register_checkbox">
							<label for="wifi">와이파이 <input class="faility" type="checkbox" id="wifi"
								name="facils" value="1"></label>
						</div>
						<div class="register_checkbox">
							<label for="takeout">테이크아웃 <input class="faility" type="checkbox"
								id="takeout" name="facils" value="2"></label>
						</div>
						<div class="register_checkbox">
							<label for="park">주차장 <input class="faility" type="checkbox" id="parking"
								name="facils" value="3"></label>
						</div>
						<div class="register_checkbox">
							<label for="mettingRoom">미팅룸 <input class="faility" type="checkbox"
								id="mettingRoom" name="facils" value="4" ></label>
						</div>
						<div class="register_checkbox">
							<label for="floor">복층 <input class="faility" type="checkbox" id="duplex"
								name="facils" value="5"></label>
						</div>
						<div class="register_checkbox">
							<label for="terras">테라스 <input class="faility" type="checkbox"
								id="terras" name="facils" value="6"></label>
						</div>
						<div class="register_checkbox">
							<label for="nokids">노키즈존 <input class="faility" type="checkbox"
								id="nokids" name="facils" value="7"></label>
						</div>
						<div class="register_checkbox">
							<label for="noStudy">스터디 금지 <input class="faility" type="checkbox"
								id="noStudy" name="facils" value="8"></label>
						</div>
						<div class="register_checkbox">
							<label for="noOutsideFood">외부 음식 반입금지 <input
								class="faility"  type="checkbox" id="noOutsideFood" name="facils" value="9"></label>
						</div>
						<div class="register_checkbox">
							<label for="noPet">반려동물 출입금지 <input type="checkbox"
								class="faility"  id="noPet" name="facils" value="10"></label>
						</div>
						<div class="register_checkbox">
							<label for="smokingArea">흡연 구역 <input type="checkbox"
								class="faility"  id="smokingArea" name="facils" value="11"></label>
						</div>
						<div class="register_checkbox">
							<label for="mustBut">1인1메뉴 <input type="checkbox"
								class="faility"  id="oneMenu" name="facils" value="12"></label>
						</div>
						<div class="register_checkbox">
							<label for="toilet">남녀화장실구분여부 <input type="checkbox"
								class="faility"  id="restRoomDiv" name="facils" value="13"></label>
						</div>
						<!--<div class="register_checkbox">-->
						<!--<label for="others" class="page2_others">-->
						<!--기타-->
						<!--<input type="text" id="others" name = "others">-->
						<!--</label>-->
						<!--&nbsp;<i class="fas fa-plus page2_check_plus"></i>-->
						<!--</div>-->

						<div class="aux">
							<div class="page2_plus"></div>
						</div>
					</div>
				</div>
				<div class="cafe_register_btn">
					<div class="cancel ">취소</div>
					<div formaction="cafe_register" class="pre move ">이전</div>
					<div formaction="cafe_register" class="after move ">다음</div>
				</div>
			</div>
			<div id="page3" class="content">


				<div id="cafeRegisterExplicate">추가한 사진을 클릭하여 대표 사진을 선택해 주세요.</div>
				<div class="cafe_register_box">
					<div class="filebox">
						사진추가&ensp;<label class="filebox_pointer" for="cafeImage"><i
							class="fas fa-plus-square"></i> <input type='file' id="cafeImage" /></label>
							<label class="label_option">대표 사진을 체크하세요.</label>
					</div>
					<div class="image_box"></div>


				</div>
				<div class="cafe_register_btn">
					<button class="cancel">취소</button>
					<div formaction="cafe_register" class="pre move ">이전</div>
					<div formaction="cafe_register" class="after move ">다음</div>
				</div>
			</div>
			<div id="page4" class="content">
				<div id="page4AllPopup">
					<div class="page4_cover">
						<div class="cafe_register_box">

							<div class="filebox ">
								음료 추가&ensp;<i
									class="fas fa-plus-square filebox_pointer page4_coffe_image"></i>

							</div>
							<div class="drink_list"></div>
							<div class="filebox ">
								디저트 추가&ensp;<i
									class="fas fa-plus-square page4_ filebox_pointer page4_desert_image"></i>

							</div>
							<div class="dessert_list"></div>

						</div>
					</div>
					<div class="cafe_register_btn">
						<div class="cancel ">취소</div>
						<div formaction="cafe_register" class="pre move ">이전</div>
						<div formaction="cafe_register" class="after move ">다음</div>
					</div>
				</div>
			</div>
		    <div id="page5" class="content">
		        <div class="cafe_register_box">
		            <div class="floor_plan">
		                <div id="cafe_register">
		                    <img id="floorPlanUpload" alt=""> <label
		                        for="page5FloorPlan">
		                    <div class="page5_container">평면도를 추가하세요.</div>
		                </label> <input type='file' id="page5FloorPlan" name="page5FloorPlan" />
		                    <input type="hidden" id="floorPlanInput" name="floorPlanPic"/>
		                </div>
		            </div>
		        </div>
		        <div class="cafe_register_btn page5_btn">
		            <div class="cancel ">취소</div>
		            <div formaction="cafe_register" class="pre move ">이전</div>
		            <div formaction="cafe_register" class="after move ">다음</div>
		        </div>
		    </div>
		    <div id = "page6" class="content">
		        <div class="contentWrap">
		            <div class="map_wrap">
		                <div id="map"></div>
		                <p class="modes">
		                    <button type="button" id="btnTableInsert">테이블</button>
		                    <button type="button" id="btnChairInsert">좌석</button>
		                    <button type="button" id="btnConsentInsert">콘센트</button>
		                </p>
		            </div>
		
		        </div>
		        <div class = "cafe_register_btn">
		            <div class="cancel ">취소</div>
		            <div formaction="cafe_register" class="pre move ">이전</div>
		            <div formaction="cafe_register" class="after move ">다음</div>
		        </div>
		    </div>
		    <div id = "page7" class="content">
		        <div class="contentWrap">
		            <div class="map_wrap">
		                <div id="map1"></div>
		            </div>
		        </div>
		        <div class = "cafe_register_btn">
		            <div class="cancel ">취소</div>
		            <div formaction="cafe_register" class="pre move ">이전</div>
		            <button type="submit" class="submit move" form="form">등록</button>
		        </div>
		    </div>

		</div>

	</form>

	<script type="text/template" id="etcPlus">
                <div class="etc_plus"><@=etc_plus@>&nbsp;&nbsp;&nbsp;&nbsp;<span class="etc_delete"><i class="fas fa-times "></i></span>
            </div>
    </script>
	<!-- page2 기타 추가 템플릿-->

	<script type="text/template" id="page3Image">
        <div class="li_image">
			<input  class="input_representativ" type="radio" name = "repPic" value="<@=idx@>">
			<span class="li_image_delete"><i class="fas fa-times-circle"></i></span>
			<img class="image_section"  src= "/img/cafe/<@=image_reference@>" >
			<input type="hidden" class="cafe_pic_name" name="picName" value="<@=image_reference@>"/>
        </div>
    </script>
	<!-- page3 이미지 추가 템플릿-->


	<script type="text/template" id="menuTmp">
                    <div class="box_menu_image">
                        <div class="content_menu_image">
                            <img src="/img/menu/<@=img@>" />
                        </div>
                        <div class="cover_menu_image"></div>
                        <div class="box_menu_title">
                            <div class="menu_title"><@=title@></div>
                        </div>

                        <div class="menu_click" style="display: none;">

                            <h3 class="font-bl"><@=title@></h3>
                            <p class="txt"><@=detail@></p>
                            <div class="hover_cover">
                                <p class="price"><@=fee@>원</p>
                                <p class="msg">(매장 상황에 따라 판매하지 않을 수 있습니다.)</p>
                            </div>
                        </div>
						<input type="hidden" name="menuName" value="<@=title@>"/>
						<input type="hidden" name="menuPrice" value="<@=fee@>"/>
						<input type="hidden" name="menuType" value="<@=type@>"/>
						<input type="hidden" name="menuInfo" value="<@=detail@>"/>
						<input type="hidden" name="menuPic" value="<@=img@>"/>
                    </div><!--//.box_menu_image-->
</script>
	<!--page4 커피 상세정보 추가 템플릿 -->



	<c:import url="/WEB-INF/view/templates/js.jsp"></c:import>
	<script src="/js/template/template_menu.js"></script>
	<script src="/js/api/jquery.prettydropdowns.js"></script>
	<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
	<script type="text/javascript"
		src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9110284f92461dacf13fdb66d076b614&libraries=services,drawing"></script>
	<script>
	var cafeNo = "";
	var isCafe = 2;
	var tableList = [];
	var chairList = [];
	var plugList = [];
	var chairPicList=[];
	var picList=[];
	var cafePicCount = 0;
	<c:if test="${tableList != null}">
		var i = 0;
		<c:forEach items="${tableList }" var="table" >
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
	
	<c:if test="${chairList != null}">
		var i = 0;
		<c:forEach items="${chairList }" var="chair" >
			var chair = {
					"idx":"${chair.idx}",
					"x":"${chair.x}",
					"y":"${chair.y}",
					"radius":"${chair.radius}",
					"pic":"${chair.pic}",
			};
			picList[i]="${chair.pic}";
			chairList[i] = chair;
			i++;
		</c:forEach>

	</c:if>
	
	<c:if test="${plugList != null}">
		var i=0;
		<c:forEach items="${plugList }" var="plug" >
			var plug = {
					"x":"${plug.x}",
					"y":"${plug.y}",
					"count":"${plug.count}",
			};
			plugList[i] = plug;
			i++;
		</c:forEach>	

	</c:if>
	</script>
	<script src="/js/register/register1.js"></script>

	<script src="/js/register/register6.js"></script>
	<script src="/js/register/register7.js"></script>
	<script src="/js/api/markdown-it.js"></script>
	<script>

	<c:if test="${cafe != null}">
		cafeNo = "${cafe.no}";
		isCafe = 1;
		console.log("들어옴");
		$("#cafeRegisterKind option").each(function(){
		if($(this).val()=="${cafe.type}"){
  			$(this).attr("selected","selected"); 
		}

	  	});
	  	$("#page1CafeRegisterName").val("${cafe.name }");
	  	<c:if test="${cafe.branch !=null }">
	  	 	$("#page1CafeRegisterBranch").val("${cafe.branch}");
	  	</c:if>
	  	$("#cafeRegisterNumber").val("${cafe.phone }");
	  	$("#cafeRegisterTime").val("${cafe.openTime }");
	  	$("#cafeRegisterAddress").val("${cafe.address }");
	  	$("#sido").val("${cafe.sido }");
	  	$("#sigungu").val("${cafe.sigungu }");
	  	$("#lat").val("${cafe.lat }");
	  	$("#lng").val("${cafe.lng }");
	  	$("#cafeRegisterBusinessNumber").val("${cafe.regNo }");
	  	$('#cafeRegisterBusinessRegistrationPreview').attr('src', "/img/cafe/${cafe.regPic }");
	  	$("#reg_pic").val("${cafe.regPic }");
	  	$('#floorPlanUpload').attr('src', "/img/floor_plan/${cafe.floorPlanPic }");
	  	$("#floorPlanInput").val("${cafe.floorPlanPic }");
	    $(".page5_container").text('수정하려면 클릭하세요.');
	    displayFloorPlan("${cafe.floorPlanPic }");
	   
	    
	    makeFuniture();
	    
	</c:if>	 

	<c:if test="${facilityList != null}">
	var i = 1;
		<c:forEach items="${facilityList }" var="facility" >
		console.log(${facility.facilityNo});

			$(".faility").eq("${facility.facilityNo}"-1).attr("checked",true);

		</c:forEach>
	</c:if>
	
	<c:if test="${menuList != null}">
		<c:forEach items="${menuList }" var="menu" >
		    var markup = menuTmp({
		        "title" : "${menu.name }",
		        "detail" : `${menu.info }`,
		        "fee" : "${menu.price }",
		        "img" : "${menu.pic }",
		        "type" : "${menu.type }"
		    });
	    	<c:choose>
				<c:when test="${menu.type == 1}">
					$(".drink_list").prepend(markup);
				</c:when>
				<c:otherwise>
					$(".dessert_list").prepend(markup);
				</c:otherwise>
			</c:choose>
		</c:forEach>
	</c:if>
	
	<c:if test="${cafePicList != null}">
		var i = 0;
		<c:forEach items="${cafePicList }" var="pic" >
			$(".image_box").prepend(tmp3({"image_reference":"${pic.name}","idx": i}));
			i++;
			<c:if test="${pic.repPic==1}">

				$(".image_box div").eq(0).find(".input_representativ").attr("checked",true);
			</c:if>
		</c:forEach>
		cafePicCount = i;
	</c:if>
	

	</script>

</body>
</html>