package com.enigma.caferecomm.dao;

import java.util.List;

import com.enigma.caferecomm.vo.Review;
import com.enigma.caferecomm.vo.ReviewEmotion;

public interface ReviewEmotionsDAO {

	public int insert(ReviewEmotion reviewEmotion);
	
	public ReviewEmotion selectReviewEmotion(int reviewNo);
}
