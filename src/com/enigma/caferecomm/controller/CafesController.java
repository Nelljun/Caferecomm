package com.enigma.caferecomm.controller;

import java.io.Console;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enigma.caferecomm.service.CafesService;
import com.enigma.caferecomm.service.ReviewsService;
import com.enigma.caferecomm.service.SparkService;
import com.enigma.caferecomm.vo.Bookmark;
import com.enigma.caferecomm.vo.Cafe;
import com.enigma.caferecomm.vo.CafeRating;
import com.enigma.caferecomm.vo.CafeTag;
import com.enigma.caferecomm.vo.Rating;
import com.enigma.caferecomm.vo.Review;
import com.enigma.caferecomm.vo.User;

@Controller
public class CafesController {
	
	private CafesService cafesService;
	private ReviewsService reviewsService;
	private SparkService sparkService;
	private WSController wsController;
	
	public void setCafesService(CafesService cafesService) {
		this.cafesService = cafesService;
	}
	public void setReviewsService(ReviewsService reviewsService) {
		this.reviewsService = reviewsService;
	}
	public void setWsController(WSController wsController) {
		this.wsController = wsController;
	}
	public void setSparkService(SparkService sparkService) {
		this.sparkService = sparkService;
	}
	
	//IOT기기에서 넘어오는 정보 받는 method
	@RequestMapping(value="/test")
	public void test(@RequestBody (required=false)String csv) {
	
		//System.out.println(csv);
		
		wsController.broadcast(csv);
		
	}
	
	//메인페이지로 이동
	@RequestMapping(value="/main", method=RequestMethod.GET)
	public String main(
					HttpSession session,
					Model model) {
		
		System.out.println("GET /main 메인페이지 이동");
		
		//session에서 로그인한 유저 정보 가져옴
		User loginUser = (User)session.getAttribute("loginUser");
		int userNo = loginUser.getNo();
		
		int cafeNo = 42; //hero cafe 번호
		
		model.addAttribute("heroCafeMap", cafesService.getCafeInfo(cafeNo, userNo));
		
		List<CafeRating> cafeRecommList = cafesService.getRecommCafe(userNo);

		int[] tempList = new int[10];
		int j=0;
		for(CafeRating cafe: cafeRecommList) {
			tempList[j] = cafe.getCafe_no();
			j++;
		}

		int[][] cafeNumsGroup = {
						tempList,  //추천 카페 번호 배열
						{20, 21, 22, 23, 24, 25},  //추천 카페 번호 배열
						{30, 31, 46, 33, 34, 35},  //추천 카페 번호 배열
						{40, 41, 42, 43, 44, 45},  //추천 카페 번호 배열
						{5, 6, 7, 8, 9},           //추천 카페 번호 배열
						{16, 17, 18, 19, 4}		   //추천 카페 번호 배열
					};  
		
		System.out.println(cafeNumsGroup.length);
		
		for(int i = 0; i <= cafeNumsGroup.length-1; i++) {
			List<HashMap<String, Object>> cafeMapList = new ArrayList<HashMap<String, Object>>(); //cafeMap담을 리스트 객체
			
			for(int cafeNum : cafeNumsGroup[i]) {
				HashMap<String, Object> cafeMap = cafesService.getCafeInfo(cafeNum, userNo);
				
				cafeMapList.add(cafeMap); //각 카페에 해당하는 정보를 담은 map을 list에 추가
			}//for end

			model.addAttribute("cafeMapList"+i, cafeMapList);
		}
		
		return "main";
	}
	
	//카페 상세페이지로 이동
	@RequestMapping(value= "/cafe/{cafeNo}", method=RequestMethod.GET)
	public String detail(
					@PathVariable int cafeNo,
					HttpSession session,
					Model model) {
		
		System.out.println("GET /detail/"+cafeNo+" detail 페이지 이동");
		
		//session에서 로그인한 유저 정보 가져옴
		User loginUser = (User)session.getAttribute("loginUser");
		int userNo = loginUser.getNo();	
		
		model.addAttribute("heroCafeMap", cafesService.getCafeInfo(cafeNo, userNo)); //here 카페 정보
		
		List<CafeRating> cafeRecommList = cafesService.getRecommCafe(userNo);

		//추천 카페번호 배열
		int[] cafeNums = new int[10];
		int j=0;
		for(CafeRating cafe: cafeRecommList) {
			cafeNums[j] = cafe.getCafe_no();
			j++;
		}
		
		
		//int[] cafeNums = {30, 40, 45};  //추천 카페 번호 배열
		
		List<HashMap<String, Object>> cafeMapList = new ArrayList<HashMap<String, Object>>(); //cafeMap담을 리스트 객체
		
		for(int cafeNum : cafeNums) {
			HashMap<String, Object> cafeMap = cafesService.getCafeInfo(cafeNum, userNo);
			
			cafeMapList.add(cafeMap); //각 카페에 해당하는 정보를 담은 map을 list에 추가
		}//for end
		
		System.out.println(cafeMapList);
		
		model.addAttribute("cafeMapList", cafeMapList); //이거는 list하나를 추가하는 것이므로 addAttribute사용
		
		
		return "detail";
	}
	
	//북마크 추가 및 삭제
	@RequestMapping(value="/ajax/bookmark", method=RequestMethod.POST)
	@ResponseBody
	public boolean bookmark(
						@ModelAttribute Bookmark bookmark,
						@RequestParam int kind) {
		
		System.out.println("POST /ajax/bookmark 북마크 추가 및 삭제");
		System.out.println("유저번호"+bookmark.getUserNo());
		System.out.println("북마크번호"+bookmark.getBookmarkNo());
		System.out.println("북마크타입"+bookmark.getType());
		System.out.println("종류"+kind);
		
		boolean result;
		
		if(kind == 1) {
			//delete
			
			result = cafesService.deleteBookmark(bookmark);
			
		} else {
			//insert
			
			result = cafesService.addBookmark(bookmark);
			
		}
		
		return result;
	}
	
	//리뷰 리스트 불러오기(ajax)
	@RequestMapping(value="/ajax/reviewList", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getReviewListByCafeNo(@RequestParam int cafeNo) {
		
		System.out.println("POST /ajax/reviewList 리뷰리스트 불러오기");

		return reviewsService.getReviewListByCafeNo(cafeNo);
	}
	
	//리뷰 추가
	@RequestMapping(value="/ajax/review/insert", method=RequestMethod.POST)
	@ResponseBody
	public boolean addReview(
						@ModelAttribute Review review,
						@ModelAttribute Rating rating
							) {
		
		System.out.println("POST /ajax/review/insert 리뷰 추가");
		
		System.out.println("review cafe_no : "+review.getCafeNo());
		System.out.println("review user_no : "+review.getUserNo());
		System.out.println("review content : "+review.getContent());
		System.out.println("rating cafe_no : "+rating.getCafeNo());
		System.out.println("rating user_no : "+rating.getUserNo());
		int reviewNo = reviewsService.insertReview(review, rating);
		//감정사전 등록

		sparkService.getEmotion(review.getContent(),reviewNo);
		
		return true;		
	};//addReview() end
	
	
	//리뷰 삭제(ajax)
	@RequestMapping(value="/ajax/review/delete", method=RequestMethod.POST)
	@ResponseBody
	public boolean removeReview(
			@ModelAttribute Review review) {
		
		System.out.println("POST /ajax/review/delete 리뷰 삭제");
		
		System.out.println("review cafe_no : "+review.getCafeNo());
		System.out.println("review user_no : "+review.getUserNo());
		System.out.println("review no : "+review.getNo());
		
		return reviewsService.removeReview(review);		
	};//addReview() end
	
	
	//리뷰수정 (ajax)
	@RequestMapping(value="/ajax/review/update", method=RequestMethod.POST)
	@ResponseBody
	public boolean updateReview(
						@ModelAttribute  Review review,
						@ModelAttribute Rating rating) {
		
		System.out.println("POST /ajax/review/update 리뷰 수정");
		
		System.out.println("review cafe_no : "+review.getCafeNo());
		System.out.println("review user_no : "+review.getUserNo());
		System.out.println("review content : "+review.getContent());
		System.out.println("review no : "+review.getNo());
		System.out.println("rating cafe_no : "+rating.getCafeNo());
		System.out.println("rating user_no : "+rating.getUserNo());
		
		return reviewsService.updateReview(review, rating);		
	}

}
