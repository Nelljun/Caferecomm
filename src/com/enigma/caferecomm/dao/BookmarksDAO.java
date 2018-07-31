package com.enigma.caferecomm.dao;

import java.util.List;

import com.enigma.caferecomm.vo.Bookmark;

public interface BookmarksDAO {

	public int insertBookmark(Bookmark bookmark);
	
	public int deleteBookmark(Bookmark bookmark);
	
	public Bookmark selectOneBookmark(Bookmark bookmark);
	
	//북마크 했는지 않했는지 여부
	public Bookmark bookmarkWhetherSelectOne(Bookmark bookmark);
	
	//북마크 개수 
	public int countBookmarkSelectOne(int no);
	
	//좌석 즐겨찾기 리스트
	public List<Bookmark> bookmarkSeatSelectList(int no);
	
	//카페 즐겨찾기 리스트
	public List<Bookmark> bookmarkCafeSelectList(int no);

}
