package com.enigma.caferecomm.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.enigma.caferecomm.dao.CafeTagsDAO;
import com.enigma.caferecomm.dao.RatingsDAO;
import com.enigma.caferecomm.dao.ReviewEmotionsDAO;
import com.enigma.caferecomm.dao.ReviewsDAO;
import com.enigma.caferecomm.util.MorphologicalAnalysisUtil;
import com.enigma.caferecomm.vo.CafeTag;
import com.enigma.caferecomm.vo.Rating;
import com.enigma.caferecomm.vo.Review;
import com.enigma.caferecomm.vo.ReviewEmotion;

public class ReviewsServiceImpl implements ReviewsService {

	private ReviewsDAO reviewsDAO;
	private RatingsDAO ratingsDAO;
	private CafeTagsDAO cafeTagsDAO;
	private ReviewEmotionsDAO reviewEmotionsDAO;

	public void setReviewsDAO(ReviewsDAO reviewsDAO) {
		this.reviewsDAO = reviewsDAO;
	}
	public void setRatingsDAO(RatingsDAO ratingsDAO) {
		this.ratingsDAO = ratingsDAO;
	}
	public void setCafeTagsDAO(CafeTagsDAO cafeTagsDAO) {
		this.cafeTagsDAO = cafeTagsDAO;
	}
	public void setReviewEmotionsDAO(ReviewEmotionsDAO reviewEmotionsDAO) {
		this.reviewEmotionsDAO = reviewEmotionsDAO;
	}

	@Override
	public Map<String, Object> getReviewListByCafeNo(int cafeNo) {
		// TODO Auto-generated method stub
		Map<String, Object> map = new HashMap<>();
		List<Review> reviewList = reviewsDAO.selectReviews(cafeNo);
		

		for(Review review:reviewList) {
			ReviewEmotion re = reviewEmotionsDAO.selectReviewEmotion(review.getNo());
			review.setComplex(re.getComplex());
			review.setNegative(re.getNegative());
			review.setPositive(re.getPositive());
			review.setNone(re.getNone());
			review.setNeutral(re.getNeutral());
		}
		
		List<CafeTag> tagList = cafeTagsDAO.selectTags(cafeNo);
		map.put("reviewList", reviewList);
		map.put("tagList", tagList);

		return map;
	}//getReviewListByCafeNo() end
	
	@Override
	public int insertReview(Review review, Rating rating) {
		// TODO Auto-generated method stub
	
		boolean result1 = (1==reviewsDAO.insertReview(review)); //리뷰 insert
		
		System.out.println(review.getNo());
		int reviewNo = review.getNo();
		//등록된 평점이 있는지 확인
		Rating ratingBefore = ratingsDAO.selectOneRatingByUserCafeNo(rating);
		
		boolean result2;
		
		if(ratingBefore == null) {
			//등록된 평점이 없다면
			result2 = (1==ratingsDAO.insertRating(rating));
		} else {
			//등록된 평점이 있다면 update
			result2 = (1==ratingsDAO.updateRating(rating));
		}
		int cafeNo = review.getCafeNo();
		//카페 태그 추가
		List<String> tags = MorphologicalAnalysisUtil.morphologicalAnalysis(review.getContent());
		for(String tag:tags) {
			
			CafeTag cafeTag = new CafeTag();
			cafeTag.setCafeNo(cafeNo);
			cafeTag.setContent(tag);
			
			cafeTagsDAO.insertTag(cafeTag);
			
			
			
		}
		
		
		return reviewNo;
		
	}//insertReview() end
	
	
	@Override
	public boolean removeReview(Review review) {
		// TODO Auto-generated method stub
		boolean result1 = (1==reviewsDAO.removeReview(review));
		
		//해당 카페에 해당 유저가 남긴 리뷰가 있는지 확인
		Review reviewInfo = new Review();
		reviewInfo.setCafeNo(review.getCafeNo());
		reviewInfo.setUserNo(review.getUserNo());
		reviewInfo.setNo(review.getNo());
		//넘어온 정보에서 cafeNo, usrNo만 담은 review객체(reviewInfo) 만들어서 paramater로 db에 보내서 확인
		List<Review> reviewsBefore = reviewsDAO.selectReviewsByUserCafeNo(reviewInfo);
			
		boolean result2 = true;
		
		if(reviewsBefore.size() == 0) {
			//등록된 리뷰가 없다면
			Rating ratingInfo = new Rating();
			ratingInfo.setCafeNo(review.getCafeNo());
			ratingInfo.setUserNo(review.getUserNo());
			
			result2 = (1==ratingsDAO.deleteRating(ratingInfo));	
		}
		
		return (result1 && result2);
		
	}
	
	@Override
	public boolean updateReview(Review review, Rating rating) {
		// TODO Auto-generated method stub
		
		boolean result1 = (1==reviewsDAO.updateReview(review)); //리뷰 update
		
		boolean result2 = (1==ratingsDAO.updateRating(rating));
		
		return (result1 && result2);
	}
	
	@Override
	public List<Review> list(int no) {
		
		return reviewsDAO.reviewSelectList(no);
	}

}
