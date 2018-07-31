<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core_1_1" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>회원가입</title>
    <c:import url="/WEB-INF/view/templates/link.jsp"></c:import>
	<link rel="stylesheet" href="/css/index/join.css"/>
</head>
<body>

<nav class="gnb gnb_login">
    <a class="logo" href=""></a>
    <div class="gnb_signUp_btn">
        <a class="gnb_signUp btn " href="/" >로그인</a>
    </div>
</nav>


<div class="signUp_warp">
    <div class="signUp_top_label">
        <span class="signUp_span">회원가입</span>
    </div>

    <form class="signUp_form" action="/user/join" method="post"  autocomplete="off">
        <div class="signUp_input_wrap">
            <label id="NickNameBox" class="signUp_input">
                <input name="nickname" type="text" value="" placeholder="닉네임"  id="NickName" required  />
                <span class="msg good id"><i class="far fa-check-circle"></i></span>
                <span class="msg bad id"><i class="far fa-times-circle"></i></span>
            </label>
            <label id="EmailBox" class="signUp_input">
                <input name="email" type="email" value="" placeholder="이메일(1234@naver.com)" id="Email" required />
                <span class="msg good id"><i class="far fa-check-circle"></i></span>
                <span class="msg bad id"><i class="far fa-times-circle"></i></span>
            </label>
            <label id="pwdBox" class="signUp_input">
                <input name="password" type="password" value="" placeholder="비밀번호" minlength="6" id="pwd"  />
                <span class="msg good id"><i class="far fa-check-circle"></i></span>
                <span class="msg bad id"><i class="far fa-times-circle"></i></span>
            </label>
        </div>

        <div class="signUp_agreement_list">
            <div class="signUp_page_agreement_list_item">
                <input id="signUp_page_agreement" class="signUp_page_agreement_all" type="checkbox">
                <label id="AllAgree" class="signUp_page_agreement_label" for="signUp_page_agreement"> 전체약관에 동의합니다.</label>
            </div>
            <div class="signUp_page_agreement_list_item">
                <input id="signUp_page_cafereccom_agreement"  class="signUp_page_agreement_all" type="checkbox">

                <label id="AgAgree" class="signUp_page_agreement_label" for="signUp_page_cafereccom_agreement">
                    까페레꼼 서비스 이용 약관에 동의합니다.
                </label>
            </div>

            <div class="signUp_page_agreement_list_item">

                <input id="signUp_page_privacy_agreement"  class="signUp_page_agreement_all" type="checkbox">

                <label id="PvAgree" class="signUp_page_agreement_label" for="signUp_page_privacy_agreement">
                    개인정보 취급 방침에 동의합니다.
                </label>
            </div>
        </div>
		<input type="hidden" name="type" class="submit"/>
        <div class="submot_btn">
            <button class="btn_signUp_submit" type="submit" data-no="1">가입완료</button>
            <button class="btn_signUp_submit" type="submit" data-no="2">점주로 가입완료</button>
        </div>

    </form>


</div>


<div class="signUp_footer">
    <span class="signUp_footer_contacts">
        <span>고객 센터 | 032-123-1234(이용 및 결제문의)</span>
        <span>&nbsp;&nbsp;</span>
        <span>문의 사항 | cafeRecoom@gamil.com(그 외)</span>
    </span>
    <br>
    <span>주식회사 까페레꼼 / 대표 enigma / 서울특별시 관악구 남부순환로 1820 14층 B반 1분단 앞자리 / 까페레꼼 Copyright &copy; 2018 by enigma. Inc. All rights reserved </span>
</div>



<script src="/js/api/jquery.js"></script>
<script src="/js/index/join.js"></script>

</body>
</html>