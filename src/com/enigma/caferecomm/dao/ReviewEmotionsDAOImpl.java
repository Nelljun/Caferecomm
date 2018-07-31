package com.enigma.caferecomm.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.enigma.caferecomm.vo.Review;
import com.enigma.caferecomm.vo.ReviewEmotion;

public class ReviewEmotionsDAOImpl implements ReviewEmotionsDAO{

	private SqlSession session;
	public void setSession(SqlSession session) {
		this.session = session;
	}
	
	@Override
	public int insert(ReviewEmotion reviewEmotion) {
		
		return session.insert("review_emotions.insert", reviewEmotion);
	}
	
	@Override
	public ReviewEmotion selectReviewEmotion(int reviewNo) {
		return session.selectOne("review_emotions.selectEmotion", reviewNo);
	}
}
