package com.enigma.caferecomm.vo;

public class Search {

	private String name, branch, type, address, roadAddress, sido, sigungu, minLat, minLng, search, lat, lng,
			       firstSearch, secondSearch, thirdSearch, picture, title, icon;

	private int searchType, no, avgRating;

	

	public int getAvgRating() {
		return avgRating;
	}


	public void setAvgRating(int avgRating) {
		this.avgRating = avgRating;
	}


	public Search(String search, String lat, String lng) {
		this.search = search;
		this.minLat = lat;
		this.minLng = lng;
	}


	public Search() {

	}

	
	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	
	

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public String getFirstSearch() {
		return firstSearch;
	}

	public void setFirstSearch(String firstSearch) {
		this.firstSearch = firstSearch;
	}

	public String getSecondSearch() {
		return secondSearch;
	}

	public void setSecondSearch(String secondSearch) {
		this.secondSearch = secondSearch;
	}

	public String getThirdSearch() {
		return thirdSearch;
	}

	public void setThirdSearch(String thirdSearch) {
		this.thirdSearch = thirdSearch;
	}

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getRoadAddress() {
		return roadAddress;
	}

	public void setRoadAddress(String roadAddress) {
		this.roadAddress = roadAddress;
	}

	public String getSido() {
		return sido;
	}

	public void setSido(String sido) {
		this.sido = sido;
	}

	public String getSigungu() {
		return sigungu;
	}

	public void setSigungu(String sigungu) {
		this.sigungu = sigungu;
	}

	public String getMinLat() {
		return minLat;
	}

	public void setMinLat(String minLat) {
		this.minLat = minLat;
	}

	public String getMinLng() {
		return minLng;
	}

	public void setMinLng(String minLng) {
		this.minLng = minLng;
	}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}

	public String getLng() {
		return lng;
	}

	public void setLng(String lng) {
		this.lng = lng;
	}

	public int getSearchType() {
		return searchType;
	}

	public void setSearchType(int searchType) {
		this.searchType = searchType;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

}
