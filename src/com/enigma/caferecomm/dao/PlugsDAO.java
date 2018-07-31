package com.enigma.caferecomm.dao;

import java.util.List;

import com.enigma.caferecomm.vo.Plug;

public interface PlugsDAO {

	public List<Plug> selectPlugList(int cafeNO);
	
	public int insertPlugs(Plug plug);
	
	public int deletePlugs(int cafeNo);
}
