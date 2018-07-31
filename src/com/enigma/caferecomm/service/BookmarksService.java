package com.enigma.caferecomm.service;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.enigma.caferecomm.vo.Bookmark;

public interface BookmarksService {
	
	//좌석 북마크 리스트
	public List<HashMap<String, Object>> seatBookmarkList(int no, HttpSession session);
	
	//카페 북마크 리스트
	public List<HashMap<String, Object>> cafeBookmarkList(int no, HttpSession session);
}
