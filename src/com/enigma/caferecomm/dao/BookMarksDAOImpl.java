package com.enigma.caferecomm.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.enigma.caferecomm.vo.Bookmark;

public class BookMarksDAOImpl implements BookmarksDAO {

	private SqlSession session;
	
	public void setSession(SqlSession session) {
		this.session = session;
	}
	
	@Override
	public int insertBookmark(Bookmark bookmark) {
		// TODO Auto-generated method stub
		return session.insert("bookmarks.insertBookmark", bookmark);
	}
	
	@Override
	public int deleteBookmark(Bookmark bookmark) {
		// TODO Auto-generated method stub
		return session.delete("bookmarks.deleteBookmark", bookmark);
	}
	
	@Override
	public Bookmark selectOneBookmark(Bookmark bookmark) {
		// TODO Auto-generated method stub
		return session.selectOne("bookmarks.selectOneBookmark", bookmark);
	}
	
	@Override
	public Bookmark bookmarkWhetherSelectOne(Bookmark bookmark) {
		// TODO Auto-generated method stub
		return session.selectOne("bookmarks.bookmarkWhetherSelectOne", bookmark);
	}
	
	@Override
	public List<Bookmark> bookmarkSeatSelectList(int no) {
		// TODO Auto-generated method stub
		return session.selectList("bookmarks.bookmarkSeatSelectList", no);
	}
	
	@Override
	public List<Bookmark> bookmarkCafeSelectList(int no) {
		// TODO Auto-generated method stub
		return session.selectList("bookmarks.bookmarkCafeSelectList", no);
	}
	
	@Override
	public int countBookmarkSelectOne(int no) {
		// TODO Auto-generated method stub
		return session.selectOne("bookmarks.countBookmarkSelectOne",no);
	}
}
