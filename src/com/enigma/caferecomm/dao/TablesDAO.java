package com.enigma.caferecomm.dao;

import java.util.List;

import com.enigma.caferecomm.vo.Table;

public interface TablesDAO {

	public List<Table> selectTableList(int cafeNo);
	
	public int insertTables(Table table);
	
	public int deleteTables(int cafeNO);
}
