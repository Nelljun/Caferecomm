package com.enigma.caferecomm.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.enigma.caferecomm.vo.Chair;

public class ChairsDAOImpl implements ChairsDAO {

	private SqlSession session;
	
	public void setSession(SqlSession session) {
		this.session = session;
	}
	
	@Override
	public List<Chair> selectChairList(int cafeNo) {
		return session.selectList("chairs.selectChairList", cafeNo);
	}
	
	@Override
	public int insertChairs(Chair chair) {

		return session.insert("chairs.insert", chair);
	}
	
	@Override
	public int deleteChairs(int cafeNo) {
		return session.delete("chairs.delete", cafeNo);
	}
	
	@Override
	public Chair bookmarkChairSelectOne(int no) {
		// TODO Auto-generated method stub
		return session.selectOne("chairs.bookmarkChairselectOne", no);
	}
	
}
