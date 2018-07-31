package com.enigma.caferecomm.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.enigma.caferecomm.dao.BookmarksDAO;
import com.enigma.caferecomm.dao.CafeFacilsDAO;
import com.enigma.caferecomm.dao.CafePicsDAO;
import com.enigma.caferecomm.dao.CafesDAO;
import com.enigma.caferecomm.dao.ChairsDAO;
import com.enigma.caferecomm.dao.ReviewsDAO;
import com.enigma.caferecomm.vo.Bookmark;
import com.enigma.caferecomm.vo.Cafe;
import com.enigma.caferecomm.vo.CafeFacil;
import com.enigma.caferecomm.vo.CafePic;
import com.enigma.caferecomm.vo.Chair;
import com.enigma.caferecomm.vo.Review;
import com.enigma.caferecomm.vo.User;

public class BookmarksServiceImpl implements BookmarksService {

	private BookmarksDAO bookmarksDAO;
	
	public void setBookmarksDAO(BookmarksDAO bookmarksDAO) {
		this.bookmarksDAO = bookmarksDAO;
	}
	
	private CafesDAO cafesDAO;
	
	public void setCafesDAO(CafesDAO cafesDAO) {
		this.cafesDAO = cafesDAO;
	}
	
	private CafePicsDAO cafePicDAO;
	
	public void setCafePicDAO(CafePicsDAO cafePicDAO) {
		this.cafePicDAO = cafePicDAO;
	}
	
	private CafeFacilsDAO cafeFacilsDAO;
	
	public void setCafeFacilsDAO(CafeFacilsDAO cafeFacilsDAO) {
		this.cafeFacilsDAO = cafeFacilsDAO;
	}
	
	private ChairsDAO chairDAO;
	
	public void setChairDAO(ChairsDAO chairDAO) {
		this.chairDAO = chairDAO;
	}
	
	private ReviewsDAO reviewDAO;
	
	public void setReviewDAO(ReviewsDAO reviewDAO) {
		this.reviewDAO = reviewDAO;
	}
	
	@Override
	public List<HashMap<String, Object>> seatBookmarkList(int no, HttpSession session) {
		List<HashMap<String, Object>> seatMapList = new ArrayList<HashMap<String,Object>>();
		
		List<Bookmark> seatBookmarkList = bookmarksDAO.bookmarkSeatSelectList(no);
		for(Bookmark bookmark : seatBookmarkList) {
			int bookmarkNo = bookmark.getBookmarkNo();
			
			HashMap<String, Object> seatMap = new HashMap<String,Object>();
			
			Bookmark bookmark2 = new Bookmark();
			
			User user = (User)session.getAttribute("loginUser");
			int userNo = user.getNo();
			
			bookmark2.setBookmarkNo(bookmarkNo);
			bookmark2.setUserNo(userNo);
			bookmark2.setType(2);
			
			
			Bookmark bookmarkWhether =  bookmarksDAO.bookmarkWhetherSelectOne(bookmark2);
			Cafe cafe = cafesDAO.cafeNameSelectOne(bookmarkNo);
			//System.out.println("카페이름 :"+cafe.getName());
			//System.out.println("카페이름 :"+cafe.getBranch());
			//System.out.println("카페평점 :"+cafe.getAvgRating());
			Chair chair = chairDAO.bookmarkChairSelectOne(bookmarkNo);
			//System.out.println("의자 사진 :"+chair.getPic());
			//System.out.println("의자 번호 :"+chair.getIdx());
			
			seatMap.put("bookmarkWhether", bookmarkWhether);
			seatMap.put("cafe", cafe);
			seatMap.put("chair", chair);
			
			seatMapList.add(seatMap);
			
		}
		
		return seatMapList;
	}
	
	@Override
	public List<HashMap<String, Object>> cafeBookmarkList(int no, HttpSession session) {
		
		List<HashMap<String, Object>> cafeMapList = new ArrayList<HashMap<String,Object>>();
		
		List<Bookmark> cafeBookmarkList = bookmarksDAO.bookmarkCafeSelectList(no);
		for(Bookmark bookmark: cafeBookmarkList) {
			//System.out.println(bookmark.getNo());
			int bookmarkNo = bookmark.getBookmarkNo();

			HashMap<String,Object> cafeMap = new HashMap<String,Object>();
			
			Bookmark bookmark2 = new Bookmark();
			
			User user = (User)session.getAttribute("loginUser");
			int userNo = user.getNo();
			
			bookmark2.setBookmarkNo(bookmarkNo);
			bookmark2.setUserNo(userNo);
			bookmark2.setType(1);
			
			Bookmark bookmarkWhether = bookmarksDAO.bookmarkWhetherSelectOne(bookmark2);
			Cafe cafe = cafesDAO.cafeNameSelectOne(bookmarkNo);
			//System.out.println("name:" +cafe.getName());
			String cafePic = cafePicDAO.cafePicSelectOne(bookmarkNo);
			//System.out.println("카페사진 : "+cafePic);
			List<CafeFacil> cafeFacil = cafeFacilsDAO.cafeFacilSelectList(bookmarkNo);
			//System.out.println("카페시설 :"+cafeFacil);
			int reviewCount = reviewDAO.cafeReviewCountSelectOne(bookmarkNo);
			//System.out.println("리뷰개수 :"+reviewCount);
			
			cafeMap.put("bookmarkWhether", bookmarkWhether);
			cafeMap.put("reviewCount", reviewCount);
			cafeMap.put("cafe", cafe);
			cafeMap.put("cafePic", cafePic);
			cafeMap.put("cafeFacil", cafeFacil);
			
			cafeMapList.add(cafeMap);
		}
		
		
		return cafeMapList;
	}
	
}
