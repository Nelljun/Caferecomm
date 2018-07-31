<%@page import="com.fasterxml.jackson.annotation.JsonInclude.Include"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core_1_1" %>
    
   <c:if test="${loginFail}">
 	<script >
		alert("아이디나 비밀번호가 틀렸습니다!")
		location.href="/";
	
	</script>
 </c:if>
  	
  	
 	<c:if test="${findPassword!=null}">
		<script>
			alert("요청하신 임시 비밀번호를 메일로 보냈습니다.");
		</script>
 	</c:if>
		
  	
  	
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>로그인</title>
    <c:import url="/WEB-INF/view/templates/link.jsp"></c:import>
    <link rel="stylesheet" href="css/index/login.css">
</head>
<body>


<nav class="gnb gnb_login">
    <a class="logo" href="" ></a>
    <div class="gnb_signUp_btn">
        <a class="gnb_signUp signUp_btn" href="/user/join">회원가입</a>
    </div>
</nav>


<div class="login_warp">
    <div class="login_top_label">
        <span class="login_span">로그인</span>
        <a class="login_find_password" href="/user/pwd/find">비밀번호를 잊으셨나요?</a></div>
    <form class="login_form" action="/session" method="post"  autocomplete="off">
        <div class="login_input_wrap">
            <label id="EmailBox" class="login_input">
                <input name="email" type="email" value="" placeholder="이메일(1234@naver.com)" id="Email" required>
                <span class="msg good id"><i class="far fa-check-circle"></i></span>
                <span class="msg bad id"><i class="far fa-times-circle"></i></span>
            </label>
            <label id="pwdBox" class="login_input">
                <input name="password" type="password" value="" placeholder="비밀번호"  id="pwd" required>
                <span class="msg good id"><i class="far fa-check-circle"></i></span>
                <span class="msg bad id"><i class="far fa-times-circle"></i></span>
            </label>
        </div>
        <input  disabled class="btn_login_submit" type="submit" value="로그인">
    </form>
    <div class="login_noSign">
        <a class="login_noSign_click" href="/user/join" >아직가입하지 않으셨나요?</a>
    </div>

</div>


<div class="login_footer">
    <span class="login_footer_contacts">
        <span>고객 센터 | 032-123-1234(이용 및 결제문의)</span>
        <span>&nbsp;&nbsp;</span>
        <span>문의 사항 | cafeRecoom@gamil.com(그 외)</span>
    </span>
    <br>
    <span>주식회사 까페레꼼 / 대표 enigma / 서울특별시 관악구 남부순환로 1820 14층 B반 1분단 앞자리 / 까페레꼼 Copyright &copy; 2018 by enigma. Inc. All rights reserved </span>
</div>



<script src="js/api/jquery.js"></script>
<script src="js/index/login.js"></script>



</body>
</html>