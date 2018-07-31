package com.enigma.caferecomm.dao;

import org.apache.ibatis.session.SqlSession;

public class FacilsDAOImpl implements FacilsDAO {

	private SqlSession session;
	
	public void setSession(SqlSession session) {
		this.session = session;
	}
}
