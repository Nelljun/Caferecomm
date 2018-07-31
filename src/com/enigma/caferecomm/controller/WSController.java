package com.enigma.caferecomm.controller;

import java.util.List;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.enigma.caferecomm.vo.PageInfo;
import com.fasterxml.jackson.databind.ObjectMapper;

public class WSController {
	
	private List<PageInfo> pageInfos;
	private ObjectMapper om;
	
	public void setPageInfos(List<PageInfo> pageInfos) {
		this.pageInfos = pageInfos;
	}
	public void setOm(ObjectMapper om) {
		this.om = om;
	}
	
	//새로운 유저가 들어오면
	public void add(WebSocketSession session) throws Exception {
		
		System.out.println("유저가 들어옴");
		
		//새로운 유저가 들어왔으니 CafeInfo객체 생성하여 
		//멤버필드 webSocketSession에 해당 유저의 session 세팅
		PageInfo pageInfo = new PageInfo();
		pageInfo.setWebSocketSession(session);
		
		pageInfos.add(pageInfo);
		
		System.out.println("add-session : "+session);
		System.out.println("add-사람 수 : "+pageInfos.size());
		
		//유저가 들어왔으니 현재 유저가 보고 있는 페이지에서
		//필요한 카페의 번호를 넘기라고 message를 보냄
		session.sendMessage(new TextMessage("r".getBytes()));
	}
	
	//유저가 나가면
	public void remove(WebSocketSession session) {
		System.out.println("유저가 나감");
		
		//나가면 session 삭제
		for(PageInfo pageInfo : pageInfos) {
			
			if(session == pageInfo.getWebSocketSession()) {
				pageInfos.remove(pageInfo);
			}//if end
			
		}//for end
		
		System.out.println("remove-session : "+session);
		System.out.println("remove-사람 수 : "+pageInfos.size());
	}//remove() end
	
	
	
	//sessions에 있는 모든 session에
	public void handleMsg(WebSocketSession session, String msg) {
		
		try {
			
			String[] cafeNoStrsFromClient = msg.split(",");
			
			System.out.println("cafeNoStrsFromClient"+cafeNoStrsFromClient);
			
			for(PageInfo pageInfo : pageInfos) {
				
				if(pageInfo.getWebSocketSession() == session) {
					pageInfo.setCafeNoStrArr(cafeNoStrsFromClient);
					System.out.println("카페번호배열 세팅");
				}//if end
				
				//client에서 카페번호배열 string이 넘어오면 이를 split하여 String[]로 만들고
				//해당 session에 해당하는 pageInfo객체에 그 카페번호 배열(String[])을
				//setting 해준다.
				
			}//for end
			
		}catch (Exception e) {
			e.printStackTrace();
		}//try~catch end
		
	}//handleMsg() end
	
	
	
	public void broadcast(String csv) {
		// TODO Auto-generated method stub
		//csv를 json으로 변경
		
		String newCSV = csv.replace("\\,", ":");
		
		//System.out.println(newCSV);
		
		String splitted[] = newCSV.split(",", 2);
		
		//System.out.println("카페번호 : "+splitted[0]); //"," 앞 첫 번째 string
		
		for(PageInfo pageInfo : pageInfos) {
			
			for(String cafeNoStrFromClient : pageInfo.getCafeNoStrArr()) {
				
				if(splitted[0].equals(cafeNoStrFromClient)) {
					try {
						pageInfo.getWebSocketSession().sendMessage(new TextMessage(newCSV.getBytes()));
						//System.out.println("데이터 넘어가는 중");
					} catch (Exception e) {
						e.printStackTrace();
					}//try~catch end
				}//if end
				
			}//for end
			
		}//for end
		
	}//broadcast() end
	
	

}
