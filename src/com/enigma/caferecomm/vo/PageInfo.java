package com.enigma.caferecomm.vo;

import org.springframework.web.socket.WebSocketSession;

public class PageInfo {

	private String address;
	private String[] cafeNoStrArr;
	private WebSocketSession webSocketSession;
	
	public PageInfo() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String[] getCafeNoStrArr() {
		return cafeNoStrArr;
	}

	public void setCafeNoStrArr(String[] cafeNoArr) {
		this.cafeNoStrArr = cafeNoArr;
	}

	public WebSocketSession getWebSocketSession() {
		return webSocketSession;
	}

	public void setWebSocketSession(WebSocketSession webSocketSession) {
		this.webSocketSession = webSocketSession;
	}
	
	
	
	
	
}
