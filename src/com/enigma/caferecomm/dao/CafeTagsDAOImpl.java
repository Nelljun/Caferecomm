package com.enigma.caferecomm.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.enigma.caferecomm.vo.CafeTag;

public class CafeTagsDAOImpl implements CafeTagsDAO{

	private SqlSession session;
	
	public void setSession(SqlSession session) {
		this.session = session;
	}
	
	@Override
	public int insertTag(CafeTag cafeTag) {
		return session.insert("cafe_tags.insert", cafeTag);
	}
	
	@Override
	public List<CafeTag> selectTags(int cafeNo) {
		return session.selectList("cafe_tags.selectTag", cafeNo);
	}
}
