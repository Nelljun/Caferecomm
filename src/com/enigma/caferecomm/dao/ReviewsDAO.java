package com.enigma.caferecomm.dao;

import java.util.List;

import com.enigma.caferecomm.vo.Review;

public interface ReviewsDAO {
	
	public List<Review> selectReviews(int cafeNo);

	public int insertReview(Review review);
	
	public int removeReview(Review review);
	
	public List<Review> selectReviewsByUserCafeNo(Review review);
	
	public int updateReview(Review review);
	
	//카페 리뷰 개수
	public int cafeReviewCountSelectOne(int no);
	
	//리뷰 개수
	public int reviewCountSelectOne(int no);
	
	//리뷰 카드 내용불러오기
	public List<Review> reviewSelectList(int no);
}
