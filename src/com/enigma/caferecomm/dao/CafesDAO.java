package com.enigma.caferecomm.dao;

import java.util.List;

import com.enigma.caferecomm.vo.Cafe;
import com.enigma.caferecomm.vo.Search;

public interface CafesDAO {

	public Cafe getCafeDetail(int no);

	public Cafe selectModify(int no);

	public int cafeResister(Cafe cafe);

	public int cafeUpdate(Cafe cafe);

	public Cafe getCafeOwner(int ownerNo);

	public List<Search> selectFirstCafeInfo(Search info);

	public List<Search> selectSecondCafeInfo(Search info);

	public List<Search> selectThirdCafeInfo(Search info);
	
	public Cafe cafeNameSelectOne(int no);
}
