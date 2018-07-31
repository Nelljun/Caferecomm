package com.enigma.caferecomm.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.enigma.caferecomm.vo.Review;

public class ReviewsDAOImpl implements ReviewsDAO {

	private SqlSession session;
	
	public void setSession(SqlSession session) {
		this.session = session;
	}
	
	@Override
	public List<Review> selectReviews(int cafeNo) {
		// TODO Auto-generated method stub
		return session.selectList("reviews.selectReviews", cafeNo);
	}
	
	@Override
	public int insertReview(Review review) {
		// TODO Auto-generated method stub
		return session.insert("reviews.insertReview", review);
	}
	
	@Override
	public int removeReview(Review review) {
		// TODO Auto-generated method stub
		return session.delete("reviews.removeReview", review);
	}
	
	@Override
	public List<Review> selectReviewsByUserCafeNo(Review review) {
		// TODO Auto-generated method stub
		return session.selectList("reviews.selectReviewsByUserCafeNo", review);
	}
	
	@Override
	public int updateReview(Review review) {
		// TODO Auto-generated method stub
		return session.update("reviews.updateReview", review);
	}
	
	@Override
	public int cafeReviewCountSelectOne(int no) {
		// TODO Auto-generated method stub
		return session.selectOne("reviews.cafeReviewCountSelectOne", no);
	}
	
	@Override
	public int reviewCountSelectOne(int no) {
		// TODO Auto-generated method stub
		return session.selectOne("reviews.reviewCountSelectOne",no);
	}
	
	@Override
	public List<Review> reviewSelectList(int no) {
		// TODO Auto-generated method stub
		return session.selectList("reviews.reviewSelectList", no);
	}
	
}
