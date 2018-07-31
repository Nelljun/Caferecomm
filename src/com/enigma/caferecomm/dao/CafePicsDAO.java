package com.enigma.caferecomm.dao;

import java.util.List;

import com.enigma.caferecomm.vo.CafePic;

public interface CafePicsDAO {

	public List<CafePic> selectCafePics(int cafeNo);
	
	public int insertCafePic(CafePic cafePic);
	
	public int deleteCafePic(int cafeNo);
	
	public String cafePicSelectOne(int no);
}
