package com.enigma.caferecomm.service;


import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

public class MailServiceImpl implements MailService {
	
		MailService mailService;
		
		public void setMailService(MailService mailService) {
			this.mailService = mailService;
		}
	  
		// org.springframework.mail.javamail.JavaMailSender
	    private JavaMailSender javaMailSender;
	 
	    public void setJavaMailSender(JavaMailSender javaMailSender) {
	        this.javaMailSender = javaMailSender;
	    }
	 
	    @Override
	    public String send(String to) {
	        // javax.mail.internet.MimeMessage
	    	String from = "CafeRecomm@gmail.com";
	    	System.out.println(from);
	    	System.out.println(to);
	    	
	    	int ran = new Random().nextInt(100000) + 100000; // 10000 ~ 99999
	    	
	        String joinCode = String.valueOf(ran);
	 
	        String subject = "CafeRecomm사이트에서 요청하신 임시비밀번호 안내입니다.";
	        
	        StringBuilder sb = new StringBuilder();
	        
	        sb.append("귀하의 임시 비밀번호는 " + joinCode + " 입니다.");
	        String text = sb.toString();
	        MimeMessage message = javaMailSender.createMimeMessage();
	        
	        System.out.println(text);
	        try {
	            // org.springframework.mail.javamail.MimeMessageHelper
	            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
	            helper.setSubject(subject);
	            helper.setText(text, true);
	            helper.setFrom(from);
	            helper.setTo(to);
	 
	            javaMailSender.send(message);
	            
	        } catch (MessagingException e) {
	            e.printStackTrace();
	        }
	        
			return "";
	        
	    }

}
