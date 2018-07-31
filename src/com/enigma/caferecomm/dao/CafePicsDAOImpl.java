package com.enigma.caferecomm.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.enigma.caferecomm.vo.CafePic;

public class CafePicsDAOImpl implements CafePicsDAO {

	private SqlSession session;
	
	public void setSession(SqlSession session) {
		this.session = session;
	}
	
	@Override
	public List<CafePic> selectCafePics(int cafeNo) {
		// TODO Auto-generated method stub
		return session.selectList("cafe_pics.selectCafePics", cafeNo);
	}
	
	@Override
	public int insertCafePic(CafePic cafePic) {

		return session.insert("cafe_pics.insert", cafePic);
	}
	
	@Override
	public int deleteCafePic(int cafeNo) {
		return session.delete("cafe_pics.delete", cafeNo);
	}
	
	@Override
	public String cafePicSelectOne(int no) {
		// TODO Auto-generated method stub
		return session.selectOne("cafe_pics.cafePicSelectList", no);
	}
}
