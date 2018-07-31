package com.enigma.caferecomm.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.enigma.caferecomm.service.CafesService;
import com.enigma.caferecomm.vo.Search;
import com.enigma.caferecomm.vo.User;

@Controller
public class SearchController {
	
	private CafesService cafesService;
	
	public void setCafeService(CafesService cafesService) {
		this.cafesService = cafesService;
	}
	
	
	
	
	@RequestMapping(value = "cafe/search", method = RequestMethod.GET)
	public String serachPage(HttpSession session,
			@RequestParam("searchKeyword") String keyword, Model model, RedirectAttributes ra) {
		User loginUser = (User)session.getAttribute("loginUser");
		int userNo = loginUser.getNo();
		 
		System.out.println("검색값 " + keyword);
		model.addAttribute("searchKeyword", keyword); 
		model.addAttribute("userNo",  userNo);
		return "/search";
	}
	
	
	@RequestMapping(value = "/ajax/search", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> cafe(Model model, 
			String search, String minLat, String minlng) {
		
		System.out.println("컨트롤구간");
		
		System.out.println(minLat + "\n" +  minlng);
		
		Search se = new Search(search, minLat, minlng);
		
		Map<String, Object> list = cafesService.cafeInfo(se);
		
		return list; 
	}

}
