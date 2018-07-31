package com.enigma.caferecomm.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.enigma.caferecomm.vo.Menu;

public class MenusDAOImpl implements MenusDAO {

	private SqlSession session;
	
	public void setSession(SqlSession session) {
		this.session = session;
	}
	
	@Override
	public List<Menu> selectMenus(int cafeNo) {
		// TODO Auto-generated method stub
		return session.selectList("menus.selectMenus", cafeNo);
	}
	
	@Override
	public int insertMenu(Menu menu) {

		return session.insert("menus.insert", menu);
	}
	
	@Override
	public int deleteMenu(int cafeNo) {
		return session.delete("menus.delete",cafeNo);
	}
}
