<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core_1_1"%>

<!DOCTYPE html>
<div id="header">
	<h1 class="header_logo">
		<a href="/main"><img src="/img/logo.svg" /></a>
	</h1>
	<div class="box_header_search">
		<button class="btn_header_search active">
			<i class="fas fa-search"></i> 검색
		</button>
		<!-- method="get" action="/cafe/search" -->
	<form method="get" action="/cafe/search"
		 class="box_header_input">
			<span><i class="fas fa-search"></i></span> <input
				name="searchKeyword" class="input_header_search"
				placeholder="카페, 지역, 분위기로 검색" />
		</form>
	</div>
	<!-- //.box_header_search -->
	<div class="box_header_user">
		<div class="wrap_header_user">
			<div class="wrap_header_profile">
				<div class="bg_header_profile">
					<div class="content_header_profile">
						<img src="/img/profile/${loginUser.profile }" />
					</div>
				</div>
			</div>
			<span class="header_username">${loginUser.nickname }</span> <span><i
				class="fas fa-caret-down"></i></span>
		</div>
		<!-- //.wrap_header_user -->
		<div class="box_header_tooltip">
			<ul>
				<li><a href="/user/${loginUser.no}">즐겨찾기</a></li>
				<li><a href="/user/${loginUser.no}">리뷰</a></li>
				<li><a href="/user/${loginUser.no}">팔로잉</a></li>
				<li><a href="/user/${loginUser.no}">팔로워</a></li>
            	<form action="/session" method="POST" id="logoutForm">
               		<input type="hidden" name="_method" value="DELETE">
               	</form>
				<li><a href="#" onclick=logoutForm.submit()>로그아웃</a></li>
			</ul>
		</div>
		<!-- //.box_header_tooltip -->
	</div>
	<!-- //.box_header_user -->
</div>
<!--//#header -->

