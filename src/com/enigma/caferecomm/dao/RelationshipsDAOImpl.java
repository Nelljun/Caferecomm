package com.enigma.caferecomm.dao;

import org.apache.ibatis.session.SqlSession;

import com.enigma.caferecomm.vo.Relationship;

public class RelationshipsDAOImpl implements RelationshipsDAO {

	private SqlSession session;
	
	public void setSession(SqlSession session) {
		this.session = session;
	}
	
	@Override
	public Relationship followWhether(Relationship relationship) {
		// TODO Auto-generated method stub
		return session.selectOne("relationships.relationshipWhetherSelectOne", relationship);
	}
	
	@Override
	public int followingInsert(Relationship relationship) {
		// TODO Auto-generated method stub
		return session.delete("relationships.relationshipUserInsert", relationship);
	}
	
	@Override
	public int followingUserDelete(Relationship relationship) {
		// TODO Auto-generated method stub
		return session.delete("relationships.relationshipUserDelete", relationship);
	}
	
	@Override
	public int followingCountSelectOne(int no) {
		// TODO Auto-generated method stub
		return session.selectOne("relationships.followingCountSelectOne", no);
	}
	
	@Override
	public int followerCountSelectOne(int no) {
		// TODO Auto-generated method stub
		return session.selectOne("relationships.followerCountSelectOne",no);
	}
}
