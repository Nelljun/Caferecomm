package com.enigma.caferecomm.service;

import com.enigma.caferecomm.vo.Relationship;

public interface RelationshipsService {

	public Relationship followWhether(Relationship relationship);
	
	public int addUserFollowing(Relationship relationship);
	
	public int removeUserFollowing(Relationship relationship);
}
