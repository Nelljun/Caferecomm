package com.enigma.caferecomm.dao;

import java.util.List;

import com.enigma.caferecomm.vo.CafeTag;

public interface CafeTagsDAO {

	public int insertTag(CafeTag cafeTag);
	
	public List<CafeTag> selectTags(int cafeNo);
}
