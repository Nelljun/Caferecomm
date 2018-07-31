package com.enigma.caferecomm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enigma.caferecomm.service.BookmarksService;
import com.enigma.caferecomm.vo.Bookmark;
import com.enigma.caferecomm.vo.Relationship;

@Controller
public class BookmarkController {
	
	private BookmarksService bookmarkService;
	
	public void setBookmarkService(BookmarksService bookmarkService) {
		this.bookmarkService = bookmarkService;
	}

	//북마크 삭제
	@RequestMapping(value="/ajax/bookmark/delete", method=RequestMethod.DELETE)
	@ResponseBody
	public String ajaxBookmarkDelete(int userNo, int bookmarkNo) {
		
		System.out.println("유저번호 : "+userNo);
		System.out.println("삭제한 북마크번호 : "+bookmarkNo);
		
		Bookmark bookmark = new Bookmark();
		bookmark.setBookmarkNo(bookmarkNo);
		bookmark.setUserNo(userNo);
		
		
		return "a";
	}
}
