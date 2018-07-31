package com.enigma.caferecomm.dao;

import com.enigma.caferecomm.vo.Relationship;

public interface RelationshipsDAO {

	//유저페이지 해당유저 팔로우했는지 여부
	public Relationship followWhether(Relationship relationship);
	
	//유저 팔로잉
	public int followingInsert(Relationship relationship);
	
	//팔로잉한 유저 delete
	public int followingUserDelete(Relationship relationship);
	
	//팔로잉 Count
	public int followingCountSelectOne(int no);
	
	//팔로워 Count
	public int followerCountSelectOne(int no);
	
}
