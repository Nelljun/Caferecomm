package com.enigma.caferecomm.vo;

import java.sql.Timestamp;

public class User {
	
	private int no, type, following, follower, bookmarkCount, reviewCount, toUserNo, fromUserNo;
	private Relationship followWhether;
	private String nickname, email, password, profile;
	private Timestamp regdate;
	
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	public int getFollowing() {
		return following;
	}



	public void setFollowing(int following) {
		this.following = following;
	}



	public int getFollower() {
		return follower;
	}



	public void setFollower(int follower) {
		this.follower = follower;
	}



	public int getBookmarkCount() {
		return bookmarkCount;
	}



	public void setBookmarkCount(int bookmarkCount) {
		this.bookmarkCount = bookmarkCount;
	}



	public int getReviewCount() {
		return reviewCount;
	}



	public void setReviewCount(int reviewCount) {
		this.reviewCount = reviewCount;
	}



	public int getToUserNo() {
		return toUserNo;
	}



	public void setToUserNo(int toUserNo) {
		this.toUserNo = toUserNo;
	}



	public int getFromUserNo() {
		return fromUserNo;
	}



	public void setFromUserNo(int fromUserNo) {
		this.fromUserNo = fromUserNo;
	}



	public Relationship getFollowWhether() {
		return followWhether;
	}



	public void setFollowWhether(Relationship followWhether) {
		this.followWhether = followWhether;
	}



	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public Timestamp getRegdate() {
		return regdate;
	}

	public void setRegdate(Timestamp regdate) {
		this.regdate = regdate;
	}
	
	
}
