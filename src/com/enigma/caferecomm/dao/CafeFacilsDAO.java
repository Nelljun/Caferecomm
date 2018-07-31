package com.enigma.caferecomm.dao;

import java.util.List;

import com.enigma.caferecomm.vo.CafeFacil;

public interface CafeFacilsDAO {

	public List<CafeFacil> selectCafeFacils(int cafeNo);
	
	public List<CafeFacil> facilList(int cafeNo);
	
	public int insertCafeFacil(CafeFacil cafeFacil);
	
	public int deleteCafeFacil(int cafeNo);
	
	public List<CafeFacil> cafeFacilSelectList(int no);
	
	public List<CafeFacil> registerFacils(int cafeNo);
}
