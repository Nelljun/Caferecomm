package com.enigma.caferecomm.service;

import java.util.List;

import javax.servlet.http.HttpSession;

import com.enigma.caferecomm.vo.Cafe;
import com.enigma.caferecomm.vo.User;

public interface UsersService {

	public User login(User user);
	
	public boolean register(User user);

	public Cafe getCafe(int ownerNo);
	
	//프로필페이지 해당 유저 사진 닉네임 출력
	public User getUser(int no);
	
	//팔로워한 사람들 리스트 출력
	public List<User> followerList (int no, HttpSession session);
	
	//팔로잉한 사람들 리스트 출력
	public List<User> list (int no,HttpSession httpSession);
	
	//닉네임 변경
    public boolean modifyUserNickname(User user);	
    
    //프로필 변경
    public int modifyUserProfile(User user);
	
}
