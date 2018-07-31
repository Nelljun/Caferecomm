package com.enigma.caferecomm.dao;

import org.apache.ibatis.session.SqlSession;

import com.enigma.caferecomm.vo.Rating;

public class RatingsDAOImpl implements RatingsDAO {
	
	private SqlSession session;
	
	public void setSession(SqlSession session) {
		this.session = session;
	}
	
	@Override
	public Rating selectOneRatingByUserCafeNo(Rating rating) {
		// TODO Auto-generated method stub
		return session.selectOne("ratings.selectOneRatingByUserCafeNo", rating);
	}
	
	@Override
	public int insertRating(Rating rating) {
		// TODO Auto-generated method stub
		return session.insert("ratings.insertRating", rating);
	}
	
	@Override
	public int updateRating(Rating rating) {
		// TODO Auto-generated method stub
		return session.update("ratings.updateRating", rating);
	}
	
	@Override
	public int deleteRating(Rating rating) {
		// TODO Auto-generated method stub
		return session.delete("ratings.deleteRating", rating);
	}

}
