<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core_1_1"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>메인</title>
<%@ include file="/WEB-INF/view/templates/link.jsp"%>
<link rel="stylesheet" href="/css/template/template_cafecard.css" />
<link rel="stylesheet"  href="/css/api/lightslider.css"/>
<link rel="stylesheet"  href="/css/main.css"/>
<style>

</style>
</head>
<body>
<%@ include file="/WEB-INF/view/templates/header.jsp"%>

<div id="content">
        <div class="main_hero_slider">
            <span>
                <div class="wrap_hero_main">
                    <div class="box_hero_image">
                        <div class="shadow_top_hero"></div>
                        <div class="shadow_left_hero"></div>
                        <img src="/img/cafe/<c:forEach items="${heroCafeMap.cafePics }" var="cafePic"><c:if test="${cafePic.repPic == 1 }">${cafePic.name }</c:if></c:forEach>">
                    </div>
                    <div class="shadow_bottom_hero"></div>
                    <div class="box_hero_info">
                        <div class="main_hero_music">
                            <div class="icon_main_music">
                                <i class="fas fa-music"></i>
                            </div>
                            <div class="wrap_main_music">
                                <div class="movingbar_main_music">Someday (Feat.Meghan Trainor) - Michael Buble</div>
                            </div>
                        </div>
                        <div class="main_hero_title">
                            <span>${heroCafeMap.cafe.name}</span> <span>${heroCafeMap.cafe.branch }</span>
                        </div>
                        <div class="main_hero_facility">
                        	<c:forEach items="${heroCafeMap.cafeFacils }" var="cafeFacil" begin="0" end="5">
                            	<span><img src="/img/icon/facils_icon/${cafeFacil.icon }" title="${cafeFacil.title }" alt="${cafeFacil.title }"/></span>
                            </c:forEach>
                        </div>
                        <div class="main_hero_info main_hero_area">${heroCafeMap.cafe.sido } ${heroCafeMap.cafe.sigungu }</div>
                        <div class="main_hero_info main_hero_schedule">${heroCafeMap.cafe.openTime }</div>
                        <div class="main_hero_info main_hero_rating">평점 ${heroCafeMap.cafe.avgRating }  &nbsp; 리뷰 ${heroCafeMap.reviews.size() }개</div>
                        <div class="main_hero_info main_hero_share">
                            현재 붐비고 있어요!!
                        </div>
                        <button class="main_hero_bookmark <c:if test="${heroCafeMap.bookmarkFromDB != null }">on</c:if>">
                            <i class="fas fa-star"></i> 즐겨찾기
                        </button>
                        <a class="main_hero_detail" href="/cafe/${heroCafeMap.cafe.no }">
                            <i class="fas fa-info-circle"></i> 상세정보
                        </a>
                        <div></div>
                    </div>
                </div><!--//.wrap_hero_main-->
            </span>
        </div>
        <div class="main_content">
            <div class="wrap_cafelist_row">
                <div class="cafelist_row_title">예상 평점이 높은 카페</div>
                <ul class="content-slider">
                	<c:forEach items="${cafeMapList0 }" var="cafeMap">
                    <li class="wrap_cafecard" data-no="${cafeMap.cafe.no }">
                   		<a href="/cafe/${cafeMap.cafe.no }">
                        <div class="box_cafecard_image">
                            <div class="content_cafecard_image">
                                <img src="/img/cafe/<c:forEach items="${cafeMap.cafePics }" var="cafePic"><c:if test="${cafePic.repPic == 1 }">${cafePic.name }</c:if></c:forEach>">
                            </div>
                            <div class="cover_cafecard_image"></div>
                            <div class="box_cafecard_title">
                                <div class="cafecard_title">${cafeMap.cafe.name }</div>
                                <div class="cafecard_branch">${cafeMap.cafe.branch } <c:if test="${cafeMap.cafe.branch == null }"> ${cafeMap.cafe.sido} ${cafeMap.cafe.sigungu }</c:if></div>
                            </div>
                            <span class="icon_cafecard_bookmark <c:if test="${cafeMap.bookmarkFromDB != null }">active</c:if>"><i class="fas fa-star"></i></span>
                        </div><!--//.box_cafecard_image-->

                        <div class="box_cafecard_info">
                            <ul>
                                <li class="cafecard_info cafecard_info_facility">
                                	<c:forEach items="${cafeMap.cafeFacils }" var="cafeFacil" begin="0" end="5">
                                    <span><img src="/img/icon/facils_icon/${cafeFacil.icon }" title="${cafeFacil.title }" alt="${cafeFacil.title }"/></span>                
                                    </c:forEach>
                                </li>
                                <li class="cafecard_info cafecard_info_rating">평점 ${cafeMap.cafe.avgRating } 리뷰 ${cafeMap.reviews.size() }개</li>
                                <li class="cafecard_info cafecard_info_status cafecard_info_share">매장이 붐비기 시작해요!</li>
                                <li class="cafecard_info cafecard_info_status cafecard_info_atmosphere">힐링하기 좋아요~</li>
                                <li class="cafecard_info cafecard_info_music">
                                    <div class="icon_cafecard_music">
                                        <i class="fas fa-music"></i>
                                    </div>
                                    <div class="wrap_cafecard_music">
                                        <div class="movingbar_cafecard_music">Someday (Feat.Meghan Trainor) - Michael Buble</div>
                                    </div>
                                </li>
                            </ul>
                        </div><!--//.box_cafecard_info-->
                        </a>
                    </li>
                    </c:forEach>
                </ul>
            </div><!--//.wrap_cafelist_row-->
            <div class="wrap_cafelist_row">
                <div class="cafelist_row_title">최고 인기의 카페</div>
                <ul class="content-slider">
                	<c:forEach items="${cafeMapList1 }" var="cafeMap">
                    <li class="wrap_cafecard" data-no="${cafeMap.cafe.no }">
                   		<a href="/cafe/${cafeMap.cafe.no }">
                        <div class="box_cafecard_image">
                            <div class="content_cafecard_image">
                                <img src="/img/cafe/<c:forEach items="${cafeMap.cafePics }" var="cafePic"><c:if test="${cafePic.repPic == 1 }">${cafePic.name }</c:if></c:forEach>">
                            </div>
                            <div class="cover_cafecard_image"></div>
                            <div class="box_cafecard_title">
                                <div class="cafecard_title">${cafeMap.cafe.name }</div>
                                <div class="cafecard_branch">${cafeMap.cafe.branch } <c:if test="${cafeMap.cafe.branch == null }"> ${cafeMap.cafe.sido} ${cafeMap.cafe.sigungu }</c:if></div>
                            </div>
                            <span class="icon_cafecard_bookmark <c:if test="${cafeMap.bookmarkFromDB != null }">active</c:if>"><i class="fas fa-star"></i></span>
                        </div><!--//.box_cafecard_image-->

                        <div class="box_cafecard_info">
                            <ul>
                                <li class="cafecard_info cafecard_info_facility">
                                	<c:forEach items="${cafeMap.cafeFacils }" var="cafeFacil" begin="0" end="5">
                                    <span><img src="/img/icon/facils_icon/${cafeFacil.icon }" title="${cafeFacil.title }" alt="${cafeFacil.title }"/></span>                
                                    </c:forEach>
                                </li>
                                <li class="cafecard_info cafecard_info_rating">평점 ${cafeMap.cafe.avgRating } 리뷰 ${cafeMap.reviews.size() }개</li>
                                <li class="cafecard_info cafecard_info_status cafecard_info_share">매장이 붐비기 시작해요!</li>
                                <li class="cafecard_info cafecard_info_status cafecard_info_atmosphere">힐링하기 좋아요~</li>
                                <li class="cafecard_info cafecard_info_music">
                                    <div class="icon_cafecard_music">
                                        <i class="fas fa-music"></i>
                                    </div>
                                    <div class="wrap_cafecard_music">
                                        <div class="movingbar_cafecard_music">Someday (Feat.Meghan Trainor) - Michael Buble</div>
                                    </div>
                                </li>
                            </ul>
                        </div><!--//.box_cafecard_info-->
                        </a>
                    </li>
                    </c:forEach>
                </ul>    
            </div><!--//.wrap_cafelist_row-->
            <div class="wrap_cafelist_row">
                <div class="cafelist_row_title">한 번쯤 들르기 좋은 카페</div>
                <ul class="content-slider">
                	<c:forEach items="${cafeMapList2 }" var="cafeMap">
                    <li class="wrap_cafecard" data-no="${cafeMap.cafe.no }">
                   		<a href="/cafe/${cafeMap.cafe.no }">
                        <div class="box_cafecard_image">
                            <div class="content_cafecard_image">
                                <img src="/img/cafe/<c:forEach items="${cafeMap.cafePics }" var="cafePic"><c:if test="${cafePic.repPic == 1 }">${cafePic.name }</c:if></c:forEach>">
                            </div>
                            <div class="cover_cafecard_image"></div>
                            <div class="box_cafecard_title">
                                <div class="cafecard_title">${cafeMap.cafe.name }</div>
                                <div class="cafecard_branch">${cafeMap.cafe.branch } <c:if test="${cafeMap.cafe.branch == null }"> ${cafeMap.cafe.sido} ${cafeMap.cafe.sigungu }</c:if></div>
                            </div>
                            <span class="icon_cafecard_bookmark <c:if test="${cafeMap.bookmarkFromDB != null }">active</c:if>"><i class="fas fa-star"></i></span>
                        </div><!--//.box_cafecard_image-->

                        <div class="box_cafecard_info">
                            <ul>
                                <li class="cafecard_info cafecard_info_facility">
                                	<c:forEach items="${cafeMap.cafeFacils }" var="cafeFacil" begin="0" end="5">
                                    <span><img src="/img/icon/facils_icon/${cafeFacil.icon }" title="${cafeFacil.title }" alt="${cafeFacil.title }"/></span>                
                                    </c:forEach>
                                </li>
                                <li class="cafecard_info cafecard_info_rating">평점 ${cafeMap.cafe.avgRating } 리뷰 ${cafeMap.reviews.size() }개</li>
                                <li class="cafecard_info cafecard_info_status cafecard_info_share">매장이 붐비기 시작해요!</li>
                                <li class="cafecard_info cafecard_info_status cafecard_info_atmosphere">힐링하기 좋아요~</li>
                                <li class="cafecard_info cafecard_info_music">
                                    <div class="icon_cafecard_music">
                                        <i class="fas fa-music"></i>
                                    </div>
                                    <div class="wrap_cafecard_music">
                                        <div class="movingbar_cafecard_music">Someday (Feat.Meghan Trainor) - Michael Buble</div>
                                    </div>
                                </li>
                            </ul>
                        </div><!--//.box_cafecard_info-->
                        </a>
                    </li>
                    </c:forEach>
                </ul>
            </div><!--//.wrap_cafelist_row-->
            <div class="wrap_cafelist_row">
                <div class="cafelist_row_title">아름다운 인테리어가 돋보이는 카페</div>
                <ul class="content-slider">
                	<c:forEach items="${cafeMapList3 }" var="cafeMap">
                    <li class="wrap_cafecard" data-no="${cafeMap.cafe.no }">
                   		<a href="/cafe/${cafeMap.cafe.no }">
                        <div class="box_cafecard_image">
                            <div class="content_cafecard_image">
                                <img src="/img/cafe/<c:forEach items="${cafeMap.cafePics }" var="cafePic"><c:if test="${cafePic.repPic == 1 }">${cafePic.name }</c:if></c:forEach>">
                            </div>
                            <div class="cover_cafecard_image"></div>
                            <div class="box_cafecard_title">
                                <div class="cafecard_title">${cafeMap.cafe.name }</div>
                                <div class="cafecard_branch">${cafeMap.cafe.branch } <c:if test="${cafeMap.cafe.branch == null }"> ${cafeMap.cafe.sido} ${cafeMap.cafe.sigungu }</c:if></div>
                            </div>
                            <span class="icon_cafecard_bookmark <c:if test="${cafeMap.bookmarkFromDB != null }">active</c:if>"><i class="fas fa-star"></i></span>
                        </div><!--//.box_cafecard_image-->

                        <div class="box_cafecard_info">
                            <ul>
                                <li class="cafecard_info cafecard_info_facility">
                                	<c:forEach items="${cafeMap.cafeFacils }" var="cafeFacil" begin="0" end="5">
                                    <span><img src="/img/icon/facils_icon/${cafeFacil.icon }" title="${cafeFacil.title }" alt="${cafeFacil.title }"/></span>                
                                    </c:forEach>
                                </li>
                                <li class="cafecard_info cafecard_info_rating">평점 ${cafeMap.cafe.avgRating } 리뷰 ${cafeMap.reviews.size() }개</li>
                                <li class="cafecard_info cafecard_info_status cafecard_info_share">매장이 붐비기 시작해요!</li>
                                <li class="cafecard_info cafecard_info_status cafecard_info_atmosphere">힐링하기 좋아요~</li>
                                <li class="cafecard_info cafecard_info_music">
                                    <div class="icon_cafecard_music">
                                        <i class="fas fa-music"></i>
                                    </div>
                                    <div class="wrap_cafecard_music">
                                        <div class="movingbar_cafecard_music">Someday (Feat.Meghan Trainor) - Michael Buble</div>
                                    </div>
                                </li>
                            </ul>
                        </div><!--//.box_cafecard_info-->
                        </a>
                    </li>
                    </c:forEach>
                </ul>
            </div><!--//.wrap_cafelist_row-->
            <div class="wrap_cafelist_row">
                <div class="cafelist_row_title">디저트, 어디까지 먹어봤니?</div>
                <ul class="content-slider">
                	<c:forEach items="${cafeMapList4 }" var="cafeMap">
                    <li class="wrap_cafecard" data-no="${cafeMap.cafe.no }">
                   		<a href="/cafe/${cafeMap.cafe.no }">
                        <div class="box_cafecard_image">
                            <div class="content_cafecard_image">
                                <img src="/img/cafe/<c:forEach items="${cafeMap.cafePics }" var="cafePic"><c:if test="${cafePic.repPic == 1 }">${cafePic.name }</c:if></c:forEach>">
                            </div>
                            <div class="cover_cafecard_image"></div>
                            <div class="box_cafecard_title">
                                <div class="cafecard_title">${cafeMap.cafe.name }</div>
                                <div class="cafecard_branch">${cafeMap.cafe.branch } <c:if test="${cafeMap.cafe.branch == null }"> ${cafeMap.cafe.sido} ${cafeMap.cafe.sigungu }</c:if></div>
                            </div>
                            <span class="icon_cafecard_bookmark <c:if test="${cafeMap.bookmarkFromDB != null }">active</c:if>"><i class="fas fa-star"></i></span>
                        </div><!--//.box_cafecard_image-->

                        <div class="box_cafecard_info">
                            <ul>
                                <li class="cafecard_info cafecard_info_facility">
                                	<c:forEach items="${cafeMap.cafeFacils }" var="cafeFacil" begin="0" end="5">
                                    <span><img src="/img/icon/facils_icon/${cafeFacil.icon }" title="${cafeFacil.title }" alt="${cafeFacil.title }"/></span>                
                                    </c:forEach>
                                </li>
                                <li class="cafecard_info cafecard_info_rating">평점 ${cafeMap.cafe.avgRating } 리뷰 ${cafeMap.reviews.size() }개</li>
                                <li class="cafecard_info cafecard_info_status cafecard_info_share">매장이 붐비기 시작해요!</li>
                                <li class="cafecard_info cafecard_info_status cafecard_info_atmosphere">힐링하기 좋아요~</li>
                                <li class="cafecard_info cafecard_info_music">
                                    <div class="icon_cafecard_music">
                                        <i class="fas fa-music"></i>
                                    </div>
                                    <div class="wrap_cafecard_music">
                                        <div class="movingbar_cafecard_music">Someday (Feat.Meghan Trainor) - Michael Buble</div>
                                    </div>
                                </li>
                            </ul>
                        </div><!--//.box_cafecard_info-->
                        </a>
                    </li>
                    </c:forEach>
                </ul>
            </div><!--//.wrap_cafelist_row-->
            <div class="wrap_cafelist_row">
                <div class="cafelist_row_title">#조용한</div>
                <ul class="content-slider">
                	<c:forEach items="${cafeMapList5 }" var="cafeMap">
                    <li class="wrap_cafecard" data-no="${cafeMap.cafe.no }">
                   		<a href="/cafe/${cafeMap.cafe.no }">
                        <div class="box_cafecard_image">
                            <div class="content_cafecard_image">
                                <img src="/img/cafe/<c:forEach items="${cafeMap.cafePics }" var="cafePic"><c:if test="${cafePic.repPic == 1 }">${cafePic.name }</c:if></c:forEach>">
                            </div>
                            <div class="cover_cafecard_image"></div>
                            <div class="box_cafecard_title">
                                <div class="cafecard_title">${cafeMap.cafe.name }</div>
                                <div class="cafecard_branch">${cafeMap.cafe.branch } <c:if test="${cafeMap.cafe.branch == null }"> ${cafeMap.cafe.sido} ${cafeMap.cafe.sigungu }</c:if></div>
                            </div>
                            <span class="icon_cafecard_bookmark <c:if test="${cafeMap.bookmarkFromDB != null }">active</c:if>"><i class="fas fa-star"></i></span>
                        </div><!--//.box_cafecard_image-->

                        <div class="box_cafecard_info">
                            <ul>
                                <li class="cafecard_info cafecard_info_facility">
                                	<c:forEach items="${cafeMap.cafeFacils }" var="cafeFacil" begin="0" end="5">
                                    <span><img src="/img/icon/facils_icon/${cafeFacil.icon }" title="${cafeFacil.title }" alt="${cafeFacil.title }"/></span>                
                                    </c:forEach>
                                </li>
                                <li class="cafecard_info cafecard_info_rating">평점 ${cafeMap.cafe.avgRating } 리뷰 ${cafeMap.reviews.size() }개</li>
                                <li class="cafecard_info cafecard_info_status cafecard_info_share">매장이 붐비기 시작해요!</li>
                                <li class="cafecard_info cafecard_info_status cafecard_info_atmosphere">힐링하기 좋아요~</li>
                                <li class="cafecard_info cafecard_info_music">
                                    <div class="icon_cafecard_music">
                                        <i class="fas fa-music"></i>
                                    </div>
                                    <div class="wrap_cafecard_music">
                                        <div class="movingbar_cafecard_music">Someday (Feat.Meghan Trainor) - Michael Buble</div>
                                    </div>
                                </li>
                            </ul>
                        </div><!--//.box_cafecard_info-->
                        </a>
                    </li>
                    </c:forEach>
                </ul>
                        </div><!--//.box_cafecard_info-->
                    </li>
                </ul>
            </div><!--//.wrap_cafelist_row-->
        </div>
    </div><!--//#content -->
    
    <%@ include file="/WEB-INF/view/templates/footer.jsp"%>
    
    <%@ include file="/WEB-INF/view/templates/js.jsp"%>
    <script>
    	
    	var loginUserNo = ${loginUser.no} //로그인 유저 번호
    	var cafeNo = ${heroCafeMap.cafe.no} //Hero 카페 번호
    	
    	console.log("유저번호 : "+loginUserNo);
    	console.log("카페번호 : "+cafeNo);
    	
    </script>
    <script src="/js/api/lightslider.js?date=20170611001"></script>
    <script src="/js/template/template_cafecard.js?date=20180626"></script>
    <script src="/js/main.js"></script>
    <script src="/js/main_ws.js"></script>

	<script>
	
	</script>
</body>
</html>