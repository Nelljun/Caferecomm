package com.enigma.caferecomm.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.enigma.caferecomm.vo.User;

public class UsersDAOImpl implements UsersDAO {

	private SqlSession session;
	
	public void setSession(SqlSession session) {
		this.session = session;
	}
	
	@Override
	public User selectLoginUser(User user) {
		// TODO Auto-generated method stub
		return session.selectOne("users.selectLoginUser", user);
	}
	
	@Override
	public int join(User user) {
		return session.insert("users.insertUser",user);
	}
	
	@Override
	public User getUserNo(int no) {
		return session.selectOne("users.selectUserNo",no);
	}
	
	@Override
	public User selectLogin(User user) {
		// TODO Auto-generated method stub
		return session.selectOne("users.selectLogin", user);
	}
	
	@Override
	public User userSelectOne(int no) {
		// TODO Auto-generated method stub
		return session.selectOne("users.userSelectOne", no);
	}
	
	@Override
	public List<User> list(int no) {
		// TODO Auto-generated method stub
		return session.selectList("relationships.followSelectList", no);
	}
	
	@Override
	public List<User> followerlist(int no) {
		// TODO Auto-generated method stub
		return session.selectList("relationships.followerSelectList",no);
	}
	
	@Override
	public int updateNickname(User user) {
		// TODO Auto-generated method stub
		return session.update("users.updateNickname", user);
	}
	
	@Override
	public int updateProfile(User user) {
		// TODO Auto-generated method stub
		return session.update("users.updateProfile", user);
	}
	
}
