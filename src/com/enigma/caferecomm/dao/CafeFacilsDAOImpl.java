package com.enigma.caferecomm.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.enigma.caferecomm.vo.CafeFacil;

public class CafeFacilsDAOImpl implements CafeFacilsDAO {
	
	private SqlSession session;
	
	public void setSession(SqlSession session) {
		this.session = session;
	}
	
	@Override
	public List<CafeFacil> selectCafeFacils(int cafeNo) {
		// TODO Auto-generated method stub
		return session.selectList("cafe_facils.selectCafeFacils", cafeNo);
	}
	@Override
	public List<CafeFacil> facilList(int cafeNo) {
		List<CafeFacil> test = session.selectList("cafe_facils.selectCafeFacils", cafeNo);
		return test;
	}//박성배, search에서 사용할 목록
	
	public List<CafeFacil> registerFacils(int cafeNo){
		return session.selectList("cafe_facils.selectFacils", cafeNo);
	}
	@Override
	public int insertCafeFacil(CafeFacil cafeFacil) {

		return session.insert("cafe_facils.insert", cafeFacil);
	}
	
	@Override
	public int deleteCafeFacil(int cafeNo) {
		return session.delete("cafe_facils.delete", cafeNo);
	}
	
	@Override
	public List<CafeFacil> cafeFacilSelectList(int no) {
		// TODO Auto-generated method stub
		return session.selectList("cafe_facils.cafeFacilsSelectList", no);
	}
}
