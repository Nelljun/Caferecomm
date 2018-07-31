package com.enigma.caferecomm.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.enigma.caferecomm.vo.Bookmark;
import com.enigma.caferecomm.vo.Cafe;
import com.enigma.caferecomm.vo.CafeRating;
import com.enigma.caferecomm.vo.Search;

public interface CafesService {

	public HashMap<String, Object> getCafeInfo(int cafeNo, int userNo);
	
	public boolean addBookmark(Bookmark bookmark);
	
	public boolean deleteBookmark(Bookmark bookmark);
	
	public Map<String, Object> getModifyInfo(int no); 
	
	public Map<String, Object> cafeInfo(Search searchCon);   //박성배 작성
	
	
	public int uploadCafe(Cafe cafe, String[] facils, String[] picName, int repPic,
			String[] menuName, String[] menuPrice, String[] menuType, String[] menuInfo, String [] menuPic,
			String[] outletCount, String[] plugX, String[] plugY, 
			String[] chairPic, String[] radius, String[] x, String[] y, int[] idx,
			String[] ex, String[] ey, String[] sx, String[] sy,HttpSession session, int flag);
	
	public List<CafeRating> getRecommCafe(int userNo);
	

}
