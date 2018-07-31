package com.enigma.caferecomm.service;

import com.enigma.caferecomm.dao.RelationshipsDAO;
import com.enigma.caferecomm.vo.Relationship;

public class RelationshipsServiceImpl implements RelationshipsService {

	private RelationshipsDAO relationshipsDAO;
	
	public void setRelationshipsDAO(RelationshipsDAO relationshipsDAO) {
		this.relationshipsDAO = relationshipsDAO;
	}
	
	@Override
	public Relationship followWhether(Relationship relationship) {
		// TODO Auto-generated method stub
		return relationshipsDAO.followWhether(relationship);
	}
	
	@Override
	public int addUserFollowing(Relationship relationship) {
		// TODO Auto-generated method stub
		return relationshipsDAO.followingInsert(relationship);
	}
	
	@Override
	public int removeUserFollowing(Relationship relationship) {
		
		return relationshipsDAO.followingUserDelete(relationship);
	}
	
}
