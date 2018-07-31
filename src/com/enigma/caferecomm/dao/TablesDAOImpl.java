package com.enigma.caferecomm.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.enigma.caferecomm.vo.Table;

public class TablesDAOImpl implements TablesDAO {

	private SqlSession session;
	
	public void setSession(SqlSession session) {
		this.session = session;
	}
	
	@Override
	public List<Table> selectTableList(int cafeNo) {
		return session.selectList("tables.selectTableList", cafeNo);
	}
	
	@Override
	public int insertTables(Table table) {

		return session.insert("tables.insert", table);
	}
	
	@Override
	public int deleteTables(int cafeNO) {
		return session.delete("tables.delete", cafeNO);
	}
}
