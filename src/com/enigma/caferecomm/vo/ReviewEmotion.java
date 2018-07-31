package com.enigma.caferecomm.vo;

import java.sql.Timestamp;

public class ReviewEmotion {

	private int no, reviewNo;
	private double positive, negative, complex, neutral,none;
	private Timestamp regdate;
	
	public ReviewEmotion() {
		// TODO Auto-generated constructor stub
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public int getReviewNo() {
		return reviewNo;
	}

	public void setReviewNo(int reviewNo) {
		this.reviewNo = reviewNo;
	}

	public double getPositive() {
		return positive;
	}

	public void setPositive(double positive) {
		this.positive = positive;
	}

	public double getNegative() {
		return negative;
	}

	public void setNegative(double negative) {
		this.negative = negative;
	}

	public double getComplex() {
		return complex;
	}

	public void setComplex(double complex) {
		this.complex = complex;
	}

	public double getNeutral() {
		return neutral;
	}

	public void setNeutral(double neutral) {
		this.neutral = neutral;
	}

	public double getNone() {
		return none;
	}

	public void setNone(double none) {
		this.none = none;
	}

	public Timestamp getRegdate() {
		return regdate;
	}

	public void setRegdate(Timestamp regdate) {
		this.regdate = regdate;
	}
	
	
}
