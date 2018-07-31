package com.enigma.caferecomm.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.enigma.caferecomm.vo.Cafe;
import com.enigma.caferecomm.vo.Search;

public class CafesDAOImpl implements CafesDAO {

	private SqlSession session;
	
	public void setSession(SqlSession session) {
		this.session = session;
	}
	
	@Override
	public Cafe getCafeDetail(int no) {
		// TODO Auto-generated method stub
		
		return session.selectOne("cafes.selectOneCafeDetail", no);
	}
	
	@Override
	public Cafe selectModify(int no) {

		return session.selectOne("cafes.selectOneCafeDetail", no);
	}
	
	@Override
	public int cafeResister(Cafe cafe) {
		
		return session.insert("cafes.insert", cafe);
	}
	
	@Override
	public int cafeUpdate(Cafe cafe) {
		return session.update("cafes.update", cafe);
	}
	
	@Override
	public Cafe getCafeOwner(int ownerNo) {
		return session.selectOne("cafes.selectOneOwnerNo",ownerNo);
	}
	
	//박성배 작성
	
	@Override
	public List<Search> selectThirdCafeInfo(Search info) {
		
		return session.selectList("cafes.thirdSearch", info);
	}
    @Override
    public List<Search> selectSecondCafeInfo(Search info) {
    	return session.selectList("cafes.secondSearch", info);
    }
	
	@Override
	public List<Search> selectFirstCafeInfo(Search info){
		return session.selectList("cafes.firstSearch", info);
	}
	
	//박성배 작성 끝
	
	@Override
	public Cafe cafeNameSelectOne(int no) {
		// TODO Auto-generated method stub
		return session.selectOne("cafes.cafeNameSelectOne", no);
	}
	
}
