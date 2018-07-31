<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core_1_1" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>비밀번호 찾기</title>
    <c:import url="/WEB-INF/view/templates/link.jsp"></c:import>
    <link rel="stylesheet" href="/css/index/find_password.css">
</head>
<body>

<nav class="gnb gnb_login">
    <a class="logo" href="" ></a>
    <div class="gnb_signUp_btn">
        <a class="gnb_signUp btn " href="/user/join" >회원가입</a>
    </div>
</nav>


<div class="password_find_warp">
    <div class="password_find_warp_top_label">
        <span class="password_find_span">비밀번호를 잊어버리셨군요.</span>
        <a id="BtnBack" class="find-password-page__sign-in" href="/index"><i id="fa_left" class="fas fa-arrow-left"></i></a>
    </div>
    <form action="/sendMail/auth/" method="post" class="find-password_form" autocomplete="off">
        <div id="EmailBox" class="find-password_input_wrap">
            <label class="find-password_input">
                <input name="email" type="email" value="" placeholder="이메일(1234@naver.com)" id="Email" >
                <span class="msg good id"><i class="far fa-check-circle"></i></span>
                <span class="msg bad id"><i class="far fa-times-circle"></i></span>
            </label>

        </div>


        <p style="line-height: 150%" class="find-password-page__description">기존에 가입하신 이메일 주소를 입력해주시면 임시주소가 발송됩니다. 임시주소로 들어오신 뒤 새로운 비밀 번호를 설정하세요.</p>


        <input disabled class="btn_find_password_submit" type="submit" value="확인">
    </form>


</div>


<div class="password_find_footer">
    <span class="password_find_footer_contacts">
        <span>고객 센터 | 032-123-1234(이용 및 결제문의)</span>
        <span>&nbsp;&nbsp;</span>
        <span>문의 사항 | cafeRecoom@gamil.com(그 외)</span>
    </span>
    <br>
    <span>주식회사 까페레꼼 / 대표 enigma / 서울특별시 관악구 남부순환로 1820 14층 B반 1분단 앞자리 / 까페레꼼 Copyright &copy; 2018 by enigma. Inc. All rights reserved </span>
</div>


<script src="/js/api/jquery.js"></script>
<script src="/js/index/find_password.js"></script>



</body>
</html>