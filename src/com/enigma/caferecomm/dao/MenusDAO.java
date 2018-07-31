package com.enigma.caferecomm.dao;

import java.util.List;

import com.enigma.caferecomm.vo.Menu;

public interface MenusDAO {

	public List<Menu> selectMenus(int cafeNo);
	
	public int insertMenu(Menu menu);
	
	public int deleteMenu(int cafeNo);
}
