package com.enigma.caferecomm.vo;

import java.sql.Timestamp;

public class CafePic {

	private int no, repPic, cafeNo;
	private String name;
	private Timestamp regdate;
	
	public CafePic() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public int getRepPic() {
		return repPic;
	}

	public void setRepPic(int repPic) {
		this.repPic = repPic;
	}

	public int getCafeNo() {
		return cafeNo;
	}

	public void setCafeNo(int cafeNo) {
		this.cafeNo = cafeNo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Timestamp getRegdate() {
		return regdate;
	}

	public void setRegdate(Timestamp regdate) {
		this.regdate = regdate;
	}
	
	
}
