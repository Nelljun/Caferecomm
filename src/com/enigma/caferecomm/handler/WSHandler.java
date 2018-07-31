package com.enigma.caferecomm.handler;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.enigma.caferecomm.controller.WSController;

public class WSHandler extends TextWebSocketHandler {

	//클래스 상속받으면서 웹소켓의 기능을 가짐 
	
	//handler는 controller를 필요로함 (의존성)
	private WSController wsController;
	
	public void setWsController(WSController wsController) {
		this.wsController = wsController;
	}
	
	
	
	//연결됨 (handshaking)
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		// TODO Auto-generated method stub
		super.afterConnectionEstablished(session);
		System.out.println("연결");
		
		wsController.add(session);
	}
	
	//에러발생
	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
		// TODO Auto-generated method stub
		super.handleTransportError(session, exception);
		
		System.out.println("에러발생");
	}
	
	//메시지
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		// TODO Auto-generated method stub
		super.handleTextMessage(session, message);
		
		System.out.println("메시지 : "+message.getPayload());
		
		wsController.handleMsg(session, message.getPayload());
		
	}
	
	//닫혔음
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		// TODO Auto-generated method stub
		super.afterConnectionClosed(session, status);
		
		wsController.remove(session);
	}
}
