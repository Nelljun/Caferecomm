package com.enigma.caferecomm.vo;

import com.sun.jmx.snmp.Timestamp;

public class Relationship {

	private int no, fromUserNo, toUserNo ;
	private Timestamp regdate;
	
	public Relationship() {
		// TODO Auto-generated constructor stub
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public int getFromUserNo() {
		return fromUserNo;
	}

	public void setFromUserNo(int fromUserNo) {
		this.fromUserNo = fromUserNo;
	}

	public int getToUserNo() {
		return toUserNo;
	}

	public void setToUserNo(int toUserNo) {
		this.toUserNo = toUserNo;
	}

	public Timestamp getRegdate() {
		return regdate;
	}

	public void setRegdate(Timestamp regdate) {
		this.regdate = regdate;
	}

	
	
}
