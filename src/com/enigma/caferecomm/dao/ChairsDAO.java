package com.enigma.caferecomm.dao;

import java.util.List;

import com.enigma.caferecomm.vo.Chair;

public interface ChairsDAO {
	public List<Chair> selectChairList(int cafeNo);
	
	public int insertChairs(Chair chair);
	
	public int deleteChairs(int cafeNo);
	
	public Chair bookmarkChairSelectOne(int no);
}
