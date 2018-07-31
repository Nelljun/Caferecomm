package com.enigma.caferecomm.dao;

import java.util.List;
import java.util.Map;

import com.enigma.caferecomm.vo.CafeRating;

public interface CafeRatingsDAO {


	public List<CafeRating> selectCafes(int userNo);
	
	public CafeRating selectUserPredRating(Map<String, Object> map);
}
