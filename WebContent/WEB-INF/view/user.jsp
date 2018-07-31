<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core_1_1" %>    
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>${profile.nickname}의 페이지</title>
    <c:import url="/WEB-INF/view/templates/link.jsp"></c:import>
    
    <link rel="stylesheet" href="/css/user/card_cafe_review.css?date=20180621">
    <link rel="stylesheet" href="/css/user/card_following.css?date=20180611">
    <link rel="stylesheet" href="/css/user/chair_card.css">
    <link rel="stylesheet" href="/css/template/template_cafecard.css" />
    <link rel="stylesheet" href="/css/user/user.css?4943949">
    <link rel="icon" href="/img/icon/favicon.png" />
    <style>

    </style>
</head>
<body>
<c:import url="/WEB-INF/view/templates/header.jsp"></c:import>

<div id="boxUserHeroImg">
    <img id="heroImg" src="/img/cafe/cafe25.jpg">
    <div id="heroImgColor"></div>
    <div id="boxUserImage">
        <form method="post" action="/movie" id="form">
    	<input type="hidden" name="profileImg" id="profileImg"/>
	        <img id="userImage" src="/img/profile/${profile.profile}">
	    <c:if test="${loginUser.no==profile.no}">    
	        <label id="profilePicEdit" class="fas fa-camera-retro"><input id="profileImgModify" type="file" name="profilePicEdit"></label>
	    </c:if>
	    </form>    
    </div>
    <div id="boxNickname" class="on">
        <div id="textNickname">
            ${profile.nickname}
        </div>
        <c:choose>
        <c:when test="${loginUser.no==profile.no}">
        	<span class="icon_nickname_modify"><i class="fas fa-pencil-alt"></i></span>
        </c:when>
        <c:otherwise>
	        <c:choose>
	        	<c:when test="${followWhether==null}">
					<span class="icon_user_bookmark"><button data-no="${profile.no}">팔로우</button>
				</c:when>
				<c:otherwise>
					<span class="icon_user_bookmark"><button class="on" data-no="${profile.no}">팔로잉</button>
				</c:otherwise>
	        </c:choose>   	
        </c:otherwise>
        </c:choose>
    </div>
    <div id="editNicknameBox">
        <input autofocus type="text" name="nickname" id="nicknameEdit"> <i class="fas fa-check-circle"></i>
    </div>
    <c:if test="${loginUser.no==profile.no}">
    	<label id="coverPicEdit" class="fas fa-camera-retro"><input id="coverImgModify" type="file" name="coverPicEdit"> 커버사진 변경</label>
	</c:if>
</div>
<div id="profileGnbBtn">
    <ul>
        <li id="gnbBookmark" class="on">

            <a class="profile_gnb gnb_bookmark on" href="#">즐겨찾기 ${profile.bookmarkCount}</a>

            <div class="gnb_bookmarkDetail">
                <div class="gnb_cafeBookmark">카페</div>
                <div class="gnb_seatBookmark">좌석</div>
            </div>

        </li>
        <li><a class="profile_gnb gnb_review" href="#">리뷰 ${profile.reviewCount}</a></li>
        <li><a class="profile_gnb gnb_following" href="#">팔로잉 ${profile.following}</a></li>
        <li><a class="profile_gnb gnb_follower" href="#">팔로워 ${profile.follower}</a></li>
    </ul>
</div>
<div id="detailsProfileWrap">
    <div class="box_board box_bookmark on">
    <c:choose>
    <c:when test="${cafeBookmarkList.isEmpty()}">
        <div class="box_content_none">
            <i class="fas fa-star"></i><br/>
            <span>
            아직 즐겨찾기한 카페가 없어요<br/>
            마음에 드는 카페를 즐겨찾기 해보세요!
            </span>
        </div> 
    </c:when>      
    <c:otherwise>
        <div class="box_bookmarkList_cafe on">
        <c:forEach items="${cafeBookmarkList}" var="cafeBookmark">
       
		    <div class="wrap_cafecard">
		    	<a href="/cafe/${cafeBookmark.cafe.no}">
		        <div class="box_cafecard_image">
		            <div class="content_cafecard_image">
		                <img src="/img/cafe/${cafeBookmark.cafePic}" />
		            </div>
		            <div class="cover_cafecard_image"></div>
		            <div class="box_cafecard_title">
		                <div class="cafecard_title">${cafeBookmark.cafe.name}</div>
		                <div class="cafecard_branch">${cafeBookmark.cafe.branch}<c:if
					test="${cafeBookmark.cafe.branch == null }"> ${cafeBookmark.cafe.sido} ${cafeBookmark.cafe.sigungu }</c:if></span></div>
		            </div>
		          
		            	
            		<span  class="icon_cafecard_bookmark <c:if test='${cafeBookmark.bookmarkWhether!=null}'>active</c:if>" data-bookmarkNo="${cafeBookmark.cafe.no}"><i class="fas fa-star"></i></span>
		            
		            	
		            
		            		
		            	
		        </div><!--//.box_cafecard_image-->
		
		        <div class="box_cafecard_info">
		            <ul>
		                <li class="cafecard_info cafecard_info_facility">
							<c:forEach items="${cafeBookmark.cafeFacil}" var="cafeFacil" begin="0" end="5">
								<span><img src="/img/icon/facils_icon/${cafeFacil.icon}"></span>
							</c:forEach>
		                </li>
		                <li class="cafecard_info cafecard_info_rating">평점${cafeBookmark.cafe.avgRating} 리뷰 ${cafeBookmark.reviewCount}개</li>
		                <li class="cafecard_info cafecard_info_status cafecard_info_share">조금씩 붐비고 있어요.</li>
		                <li class="cafecard_info cafecard_info_status cafecard_info_atmosphere">적당히 밝아요 / 조용한 편 입니다.</li>
		                <li class="cafecard_info cafecard_info_music">
		                    <div class="icon_cafecard_music">
		                        <i class="fas fa-music"></i>
		                    </div>
		                    <div class="wrap_cafecard_music">
		                        <div class="movingbar_cafecard_music">링딩동 - 샤이니</div>
		                    </div>
		                </li>
		            </ul>
		        </div><!--//.box_cafecard_info-->
		        </a>
		    </div><!--//.wrap_cafecard-->
		
		</c:forEach>
        </div>
        </c:otherwise>
        </c:choose>
        <div class="box_bookmarkList_seat">
        <c:forEach items="${seatBookmarkList}" var="seatBookmark">
	        <a href="/cafe/${seatBookmark.cafe.no}">
	            <div class="wrap_chair_card">
	                <div class="box_chair_img">
	                    <img src="/img/chair/${seatBookmark.chair.pic}">
	                    <div class="box_imgColor"></div>
	                    <div class="box_cafe_title">
	                        <div class="text_cafeTitle">${seatBookmark.cafe.name}</div>
	                        <div class="line_branchTitle_division"></div>
	                        <div class="text_branch">${seatBookmark.cafe.branch}<c:if
					test="${seatBookmark.cafe.branch == null }"> ${seatBookmark.cafe.sido} ${seatBookmark.cafe.sigungu }</c:if></span></div>
	                    </div>
	                </div>
	                <div class="box_cafeStatus_icon">
	                    <div><img src="/img/icon/status_icon/armchair.svg"> <span>사용가능</span></div>
	                </div>
	                <div class="box_cafeInfo">
	                    <div class="text_chairNum">좌석번호 ${seatBookmark.chair.idx}번</div>
	                    
	                    <i data-bookmarkChairNo="${seatBookmark.chair.no}" class="fas fa-star <c:if test='${seatBookmark.bookmarkWhether!=null}'>on</c:if>"></i>
	                    	 
	                    
	                
	                </div>
	            </div>
	         </a>
        </c:forEach>
        </div>
    </div>
    <div class="box_board box_review">
    <c:choose>
    	<c:when test="${reviewList.isEmpty()}">
	        <div class="box_content_none">
	            <i class="fas fa-comments"></i><br/>
	            <span>
	            아직 남긴 리뷰가 없어요<br/>
	            이용한 카페에 대한 리뷰를 남겨보세요!
	            </span>
	        </div>
        </c:when>
        <c:otherwise>
        <div class="wrap_cafeReviewCard">
		<c:forEach items="${reviewList}" var="review">
		<a href="/cafe/${review.cafeNo}">
		    <div class="wrap_cafeReviewCard">
		        <div class="box_reviewCard_image">
		            <div class="content_reviewCard_image">
		                <img src="/img/cafe/${review.picName}" />
		            </div>
		            <div class="cover_cafecard_image"></div>
		            <div class="cover_reviewCard_image"></div>
		            <div class="box_reviewCard_title">
		                <div class="reviewCard_title">${review.name}</div>
		                <div class="reviewCard_branch">${review.branch}</div>
		            </div>
		            <span class="icon_cafeReviewCard_bookmark"><i class="fas fa-star"></i></span>
		        </div><!--//.box_cafecard_image-->
		        <div class="box_reviewCard_info">
		            <div class="box_review_top">
		                <div class="box_review_score">
		               
		                    <div class="rating_bean"><img src="/img/icon/bean_off.jpg"></div>
		                 	<div class="rating_bean rating_active" style='width: ${review.rating*20}px;'><img src="/img/icon/bean_on.jpg"></div>
		                </div>
		                <div class="box_review_percent">
		                    긍정 71%
		                </div>
		            </div>
		            <div class="box_review_content">
		                ${review.content}
		            </div>
		            <div class="box_review_tags">
		            </div>
		
		            <div class="box_review_date">
		                <fmt:formatDate value="${review.regdate }"
							pattern="YYYY년 MM월 dd일" />
		            </div>
		        </div><!--//.box_reviewCard_info-->
		    </div><!--//.wrap_cafeReviewCard-->
		</a>    
		</c:forEach>        
        </div>
        </c:otherwise>
    </c:choose>
    </div>
    <div class="box_board box_following">
	    <c:choose>
		    <c:when test="${followingList.isEmpty()}">
		        <div class="box_content_none">
		            <i class="fas fa-users"></i><br/>
		            <span>
		            아직 팔로우한 유저가 없어요<br/>
		            마음에 드는 유저를 팔로우 해보세요!
		            </span>
		        </div>
		    </c:when>
		    <c:otherwise>
		        <div class="box_followingList">
			    <c:forEach items="${followingList}" var="following">
					<div class="card_following">
						<a href="/user/${following.no}">
				        <div class="box_followUserPic">
				            <img src="/img/profile/${following.profile}">
				            <div class="nickname_followUser">${following.nickname}</div>
				        </div>
				        </a>
				        <div class="line_division"></div>
				        <div class="list_followUserContent">
				            <ul>
				                <li>즐겨찾기${following.bookmarkCount}개</li>
				                <li>리뷰 ${following.reviewCount}개</li>
				                <li>팔로잉 ${following.following}명</li>
				                <li>팔로워 ${following.follower}명</li>
				            </ul>
				        </div>
				        <div class="box_following">
				        <c:choose>
				        	<c:when test="${loginUser.no==profile.no}">
								<button data-no="${following.no}" class="btn_following on">팔로잉</button>
					        </c:when>
					        <c:otherwise>
						        <c:choose>
						        	<c:when test="${following.followWhether==null}">
						        		<button data-no="${following.no}" class="btn_following">팔로우</button>
						        	</c:when>
						        	<c:otherwise>
						        		<button data-no="${following.no}" class="btn_following on">팔로잉</button>
						        	</c:otherwise>
						        </c:choose>
					        </c:otherwise>
				        </c:choose>
						</div>
				    </div>
				</c:forEach>	
		        </div>
	        </c:otherwise>
	    </c:choose>
    </div>
    <div class="box_board box_follower">
    <c:choose>
	    <c:when test="${followerList.isEmpty()}">
	        <div class="box_content_none">
	            <i class="fas fa-users"></i><br/>
	            <span>
	            아직 팔로워가 없어요<br/>
	            열심히 활동하여 팔로워를 늘려보세요!
	            </span>
	        </div>
	     </c:when>
	     <c:otherwise>
            <div class="box_followerList">
	            <c:forEach items="${followerList}" var="follower">
					<div class="card_following">
						<a href="/user/${follower.no}">
					        <div class="box_followUserPic">
					            <img src="/img/profile/${follower.profile}">
					            <div class="nickname_followUser">${follower.nickname}</div>
					        </div>
				        </a>
				        <div class="line_division"></div>
				        <div class="list_followUserContent">
				            <ul>
				                <li>즐겨찾기${follower.bookmarkCount}개</li>
				                <li>리뷰 ${follower.reviewCount}개</li>
				                <li>팔로잉 ${follower.following}명</li>
				                <li>팔로워 ${follower.follower}명</li>
				            </ul>
				        </div>
				        <div class="box_following">
						   <c:choose>
						       <c:when test="${follower.followWhether!=null}">
						        	<button data-no="${follower.no}" class="btn_following on">팔로잉</button>
						        </c:when>
						        <c:otherwise>
						        	<button data-no="${follower.no}" class="btn_following">팔로워</button>
						        </c:otherwise>
						   </c:choose>						        			
				        </div>
				    </div>
				</c:forEach>
            </div>
            </c:otherwise>       
    </c:choose>    
    </div>
</div>

<!--<script type="text/template" id="followingCardTmp">
    <@ $(list).each(function(){ @>
    <div class="card_following">
        <div class="box_followUserPic">
            <img src="/img/profile/profile2.jpg">
            <div class="nickname_followUser"><@=this.nickname%></div>
        </div>
        <div class="line_division"></div>
        <div class="list_followUserContent">
            <ul>
                <li>즐겨찾기 <@=this.like%>개</li>
                <li>리뷰 <@=this.review%>개</li>
                <li>팔로잉 <@=this.following%>명</li>
                <li>팔로워 <@=this.follower%>명</li>
            </ul>
        </div>
        <div class="box_following">
            <button class="btn_following on">팔로잉</button>
        </div>
    </div>
    <@ }) @>
</script>
<script type="text/template" id="followerCardTmp">
    <@ $(follower).each(function(){ @>
    <div class="card_follower">
        <div class="box_followerUserPic">
            <img src="/img/profile/profile3.jpg">
            <div class="nickname_followerUser"><@=this.nickname%></div>
        </div>
        <div class="line_division"></div>
        <div class="list_followerUserContent">
            <ul>
                <li>즐겨찾기 <@=this.like%>개</li>
                <li>리뷰 <@=this.review%>개</li>
                <li>팔로잉 <@=this.following%>명</li>
                <li>팔로워 <@=this.follower%>명</li>
            </ul>
        </div>
        <div class="wrap_follower">
            <div class="box_follower">팔로워</div>
        </div>
    </div>
    <@ }) @>
</script>  -->

<%@ include file="/WEB-INF/view/templates/footer.jsp"%>
<%@ include file="/WEB-INF/view/templates/js.jsp"%>
<script src="/js/template/template_cafecard.js"></script>
<script>

	var loginUserNo = ${loginUser.no};
	var profileNo = ${profile.no};

</script>
<script src="/js/user/user.js?date=20180621"></script>
<script src="/js/user/chair_bookmark_card.js"></script>
<script src="/js/user/user_ws.js"></script>
<script>


</script>
</body>
</html>