package com.enigma.caferecomm.vo;

import java.io.Serializable;

public class PredictRating implements Serializable{
	
	private int no, user_no, cafe_no;
	private float pred_rating;
	
	public PredictRating() {
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public String toString() {
		return "no : " + no + " / "+user_no+"번 유저의 "+cafe_no+"번 카페 예상평점 : " + pred_rating;
	}

	public PredictRating(int no, int userNo, int cafeNo, float predictRating) {
		this.no= no;
		this.user_no = userNo;
		this.cafe_no = cafeNo;
		this.pred_rating = predictRating;
	}

	public int getNo() {
		return no;
	}
	public void setNo(int no) {
		this.no = no;
	}
	public int getUser_no() {
		return user_no;
	}
	public void setUser_no(int user_no) {
		this.user_no = user_no;
	}
	public int getCafe_no() {
		return cafe_no;
	}
	public void setCafe_no(int cafe_no) {
		this.cafe_no = cafe_no;
	}
	public float getPred_rating() {
		return pred_rating;
	}
	public void setPred_rating(float pred_rating) {
		this.pred_rating = pred_rating;
	}
	
	
	

}
