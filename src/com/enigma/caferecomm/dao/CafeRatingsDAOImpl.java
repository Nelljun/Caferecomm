package com.enigma.caferecomm.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.enigma.caferecomm.vo.Cafe;
import com.enigma.caferecomm.vo.CafeRating;

public class CafeRatingsDAOImpl implements CafeRatingsDAO{

	private SqlSession session;
	
	public void setSession(SqlSession session) {
		this.session = session;
	}
	
	@Override
	public List<CafeRating> selectCafes(int userNo) {
		
		return session.selectList("cafe_ratings.selectCafes", userNo);
	}

	@Override
	public CafeRating selectUserPredRating(Map<String, Object> map) {
		
		return session.selectOne("cafe_ratings.selectUserPredRating", map);
	}
}
