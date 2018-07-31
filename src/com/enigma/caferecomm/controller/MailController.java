package com.enigma.caferecomm.controller;


import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.enigma.caferecomm.service.MailService;

@Controller
public class MailController {
	
	    private MailService mailService;
	 
	    
	    public void setMailService(MailService mailService) {
	        this.mailService = mailService;
	    }

	    @RequestMapping(value = "/sendMail/auth/", method = RequestMethod.POST)
	    public String sendMailAuth(HttpSession session,
	    		RedirectAttributes ra,
	    		@RequestParam String email) {
	    	String a = mailService.send(email);   
	    	ra.addFlashAttribute("findPassword","귀하의 이메일 주소로 새로운 임시 비밀번호를 발송 하였습니다."); 
	        return "redirect:/";
	        
	    }
	    


	

}