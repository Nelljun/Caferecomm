package com.enigma.caferecomm.dao;

import java.util.List;

import com.enigma.caferecomm.vo.User;

public interface UsersDAO {

	public User selectLoginUser(User user);
	
	
	public int join(User user);

	public User getUserNo(int no);
	
	//로그인
	public User selectLogin(User user);
	
	//프로필 유저 닉네임 프로필사진 출력
	public User userSelectOne(int no);
	
	//팔로잉 리스트 출력
	public List<User> list(int no);
	
	//팔로워 리스트 출력
	public List<User> followerlist(int no);
	
	//닉네임 업데이트
	public int updateNickname(User user);
	
	//프로필 사진 업데이트
	public int updateProfile(User user);
	
}
