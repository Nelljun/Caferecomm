package com.enigma.caferecomm.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.enigma.caferecomm.vo.Plug;

public class PlugsDAOImpl implements PlugsDAO {

	private SqlSession session;
	
	public void setSession(SqlSession session) {
		this.session = session;
	}
	
	@Override
	public List<Plug> selectPlugList(int cafeNO) {
		return session.selectList("plugs.selectPlugList",cafeNO);
	}
	
	@Override
	public int insertPlugs(Plug plug) {

		return session.insert("plugs.insert", plug);
	}
	
	@Override
	public int deletePlugs(int cafeNo) {
		return session.delete("plugs.delete", cafeNo);
	}
}
