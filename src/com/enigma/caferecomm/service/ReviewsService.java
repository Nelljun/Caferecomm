package com.enigma.caferecomm.service;

import java.util.List;
import java.util.Map;

import com.enigma.caferecomm.vo.Rating;
import com.enigma.caferecomm.vo.Review;
import com.enigma.caferecomm.vo.ReviewEmotion;

public interface ReviewsService {

	public Map<String, Object> getReviewListByCafeNo(int cafeNo);
	
	public int insertReview(Review review, Rating rating);
	
	public boolean removeReview(Review review);
	
	public boolean updateReview(Review review, Rating rating);
	
	public List<Review> list (int no);
	

}
