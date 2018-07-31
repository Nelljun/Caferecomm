package com.enigma.caferecomm.service;

import java.util.List;

import javax.servlet.http.HttpSession;

import com.enigma.caferecomm.dao.BookmarksDAO;
import com.enigma.caferecomm.dao.CafesDAO;
import com.enigma.caferecomm.dao.RelationshipsDAO;
import com.enigma.caferecomm.dao.ReviewsDAO;
import com.enigma.caferecomm.dao.UsersDAO;
import com.enigma.caferecomm.vo.Cafe;
import com.enigma.caferecomm.vo.Relationship;
import com.enigma.caferecomm.vo.User;

public class UsersServiceImpl implements UsersService {

	private UsersDAO usersDAO;
	private CafesDAO cafesDAO;
	private RelationshipsDAO relationshipsDAO;
	private BookmarksDAO BookmarksDAO;
	private ReviewsDAO reviewsDAO;
	
	public void setUsersDAO(UsersDAO usersDAO) {
		this.usersDAO = usersDAO;
	}
	
	public void setCafesDAO(CafesDAO cafesDAO) {
		this.cafesDAO = cafesDAO;
	}
	
	public void setRelationshipsDAO(RelationshipsDAO relationshipsDAO) {
		this.relationshipsDAO = relationshipsDAO;
	}
	
	public void setBookmarksDAO(BookmarksDAO bookmarksDAO) {
		BookmarksDAO = bookmarksDAO;
	}
	
	public void setReviewsDAO(ReviewsDAO reviewsDAO) {
		this.reviewsDAO = reviewsDAO;
	}
	
	@Override
	public User login(User user) {
		// TODO Auto-generated method stub
		
		User loginUser = usersDAO.selectLoginUser(user);
		
		return loginUser;
	}
	

	@Override
	public boolean register(User user) {
		return 1==usersDAO.join(user);
	}
	
	
	@Override
	public Cafe getCafe(int ownerNo) {

		return cafesDAO.getCafeOwner(ownerNo);
	}
	
	//해당 프로필 유저 사진과 닉네임 출력
	@Override
	public User getUser(int no) {
		
		User user = usersDAO.userSelectOne(no);
		user.setReviewCount(reviewsDAO.reviewCountSelectOne(no));
		user.setBookmarkCount(BookmarksDAO.countBookmarkSelectOne(no));
		user.setFollower(relationshipsDAO.followerCountSelectOne(no));
		user.setFollowing(relationshipsDAO.followingCountSelectOne(no));
		
		return user;
	}
	
	//팔로워한 사람들 리스트 출력
	@Override
	public List<User> followerList(int no,HttpSession session) {	
		
		List<User> followerList =  usersDAO.followerlist(no);
		for(User user:followerList) {
//			System.out.println(user.getNickname());
			int userNo = user.getNo();
//			System.out.println(relationshipsDAO.followingCountSelectOne(userNo));
//			System.out.println(relationshipsDAO.followerCountSelectOne(userNo));
			
			Relationship relationship = new Relationship();
			int toUserNo = userNo;
			User user2 = (User)session.getAttribute("loginUser");
			int fromUserNo = user2.getNo();
			relationship.setFromUserNo(fromUserNo);
			relationship.setToUserNo(toUserNo);
			user.setFollowWhether(relationshipsDAO.followWhether(relationship));
			user.setReviewCount(reviewsDAO.reviewCountSelectOne(userNo));
			user.setBookmarkCount(BookmarksDAO.countBookmarkSelectOne(userNo));
			user.setFollower(relationshipsDAO.followerCountSelectOne(userNo));
			user.setFollowing(relationshipsDAO.followingCountSelectOne(userNo));
			//user.setCountf...(relationshipsDAO.selectOne(userNo))
		}
/*		List<Review> reviewList = reviewsDAO.reviewSelectList(no);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("followingList", list);
		map.put("reviewList", reviewList);*/
		
		return followerList;
	}
	
	//팔로잉한 사람들 리스트 출력
	@Override
	public List<User> list(int no, HttpSession session) {
		
		int followingCount = relationshipsDAO.followingCountSelectOne(no);
		int followerCount = relationshipsDAO.followerCountSelectOne(no);

		
		List<User> list =  usersDAO.list(no);
		for(User user:list) {
//			System.out.println(user.getNickname());
			int userNo = user.getNo();
//			System.out.println(relationshipsDAO.followingCountSelectOne(userNo));
//			System.out.println(relationshipsDAO.followerCountSelectOne(userNo));
			
			Relationship relationship = new Relationship();
			int toUserNo = userNo;
			User user2 = (User)session.getAttribute("loginUser");
			int fromUserNo = user2.getNo();
			relationship.setFromUserNo(fromUserNo);
			relationship.setToUserNo(toUserNo);
			
			user.setFollowWhether(relationshipsDAO.followWhether(relationship));			
			user.setReviewCount(reviewsDAO.reviewCountSelectOne(userNo));
			user.setBookmarkCount(BookmarksDAO.countBookmarkSelectOne(userNo));
			user.setFollower(relationshipsDAO.followerCountSelectOne(userNo));
			user.setFollowing(relationshipsDAO.followingCountSelectOne(userNo));
			//user.setCountf...(relationshipsDAO.selectOne(userNo))
		}
/*		List<Review> reviewList = reviewsDAO.reviewSelectList(no);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("followingList", list);
		map.put("reviewList", reviewList);*/
		
		return list;
	}
	
	//user 닉네임 수정
	@Override
	public boolean modifyUserNickname(User user) {
		// TODO Auto-generated method stub
		return 1 == usersDAO.updateNickname(user);
	}
	
	//user profile이미지 수정
	@Override
	public int modifyUserProfile(User user) {
		// TODO Auto-generated method stub
		return usersDAO.updateProfile(user);
	}
		
}
