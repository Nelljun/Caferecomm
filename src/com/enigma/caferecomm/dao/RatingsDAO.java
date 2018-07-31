package com.enigma.caferecomm.dao;

import com.enigma.caferecomm.vo.Rating;

public interface RatingsDAO {

	public Rating selectOneRatingByUserCafeNo(Rating rating);
	
	public int insertRating(Rating rating);
	
	public int updateRating(Rating rating);
	
	public int deleteRating(Rating rating);
}
