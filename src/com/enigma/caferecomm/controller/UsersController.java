package com.enigma.caferecomm.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.enigma.caferecomm.service.BookmarksService;
import com.enigma.caferecomm.service.RelationshipsService;
import com.enigma.caferecomm.service.ReviewsService;
import com.enigma.caferecomm.service.UsersService;
import com.enigma.caferecomm.vo.Cafe;
import com.enigma.caferecomm.vo.Relationship;
import com.enigma.caferecomm.vo.User;

@Controller
public class UsersController {

	private UsersService usersService;
	
	public void setUsersService(UsersService usersService) {
		this.usersService = usersService;
	};
	
	private ReviewsService reviewService;
	
	public void setReviewService(ReviewsService reviewService) {
		this.reviewService = reviewService;
	}
	
	private RelationshipsService relationshipService;
	
	public void setRelationshipService(RelationshipsService relationshipService) {
		this.relationshipService = relationshipService;
	}
	
	private BookmarksService bookmarksService;
	
	public void setBookmarksService(BookmarksService bookmarksService) {
		this.bookmarksService = bookmarksService;
	}

	//유저페이지 맵핑
	@RequestMapping(value="/user/{no}", method=RequestMethod.GET)
	public String user(@PathVariable int no, Model model, HttpSession session) {
		
		User loginUser = (User)session.getAttribute("loginUser");
		
		int toUserNo = loginUser.getNo();
		
		//System.out.println("toUserNo :"+no);
		//System.out.println("fromUserNo :"+toUserNo);
		
		Relationship relationship = new Relationship();
		relationship.setFromUserNo(toUserNo);
		relationship.setToUserNo(no);
		
		model.addAttribute("seatBookmarkList", bookmarksService.seatBookmarkList(no,session));
		model.addAttribute("cafeBookmarkList", bookmarksService.cafeBookmarkList(no,session));
		model.addAttribute("followingList", usersService.list(no,session));
		model.addAttribute("followerList", usersService.followerList(no,session));
		model.addAttribute("reviewList",reviewService.list(no));
		model.addAttribute("profile",usersService.getUser(no));
		model.addAttribute("followWhether",relationshipService.followWhether(relationship));

		return "user";
	}
	
	//프로필페이지 유저 닉네임 수정
	@RequestMapping(value="/ajax/user", method=RequestMethod.PUT)
	@ResponseBody
	public String ajaxNicknameModify(User user,HttpSession session) {
		System.out.println("Test");
		System.out.println("유저 번호 : "+ user.getNo());
		System.out.println("닉네임 : "+ user.getNickname());
		
		usersService.modifyUserNickname(user);

		User loginUser =(User)session.getAttribute("loginUser");
		
		loginUser.setNickname(user.getNickname());
		
		session.setAttribute("loginUser", loginUser);
		
		return "a";
	}

	//유저 팔로잉취소
	@RequestMapping(value="/ajax/user/delete", method=RequestMethod.DELETE)
	@ResponseBody
	public String ajaxfollowingUserDelete(int fromUserNo, int toUserNo) {
		
		System.out.println("from delete 유저 : "+fromUserNo);
		System.out.println("to delete 유저 : "+toUserNo);
		
		Relationship relationship = new Relationship();
		
		relationship.setFromUserNo(fromUserNo);
		relationship.setToUserNo(toUserNo);
		
		relationshipService.removeUserFollowing(relationship);
		
		return "a";
	}
	
	//유저 팔로잉신청
	@RequestMapping(value="/ajax/user/bookmarkInsert", method=RequestMethod.POST)
	@ResponseBody
	public String ajaxfollowingUserInsert(int fromUserNo, int toUserNo) {
		
		System.out.println("from insert 유저 : "+fromUserNo);
		System.out.println("to insert 유저 : "+toUserNo);
		
		Relationship relationship = new Relationship();
		
		relationship.setFromUserNo(fromUserNo);
		relationship.setToUserNo(toUserNo);
		
		relationshipService.addUserFollowing(relationship);
		
		
		
		return "a";
	}
	
	
	//login 화면 이동
	@RequestMapping(value="/", method=RequestMethod.GET)
	public String login() {
		return "login";
	}
	
	
		
		// 로그인 구현하기
		@RequestMapping(value = "/session", method = RequestMethod.POST)
		public String login(HttpSession session, User user, RedirectAttributes ra) {


			User loginUser = usersService.login(user);
				
			if (loginUser == null) {
				ra.addFlashAttribute("loginFail", true);	
				return "redirect:/";
				
			} else if(loginUser.getType()==1){
				session.setAttribute("loginUser", loginUser);
				return "redirect:/main";
				
			} else if(loginUser.getType()==2) {
				session.setAttribute("loginUser", loginUser);
				
				Cafe cafe = usersService.getCafe(loginUser.getNo());
				if(cafe != null) {
					//관리페이지로
					return "redirect:/cafe/"+cafe.getNo();
					//return redirect:/+cafe.getNo;;
				}else {
					
					return "redirect:/cafe/register";
				}
			}else {
				session.setAttribute("loginUser", loginUser);
				return "redirect:/main";
				
			}
			
		}
		
		
		// 로그아웃
		@RequestMapping(value = "/session", method = RequestMethod.DELETE)
		public String logout(HttpSession session) {
			session.invalidate();

			return "redirect:/";
		}

		//회원가입
		@RequestMapping(value = "/user/join", method = RequestMethod.GET)
		public String join() {

			return "join";
		}

		//회원가입
		@RequestMapping(value = "/user/join", method = RequestMethod.POST)
		public String join(@ModelAttribute User user) {

			usersService.register(user);

			return "redirect:/";

		}

		// 비밀번호 찾기
		@RequestMapping(value = "/user/pwd/find", method = RequestMethod.GET)
		public String find() {

			return "find_password";

		}
	
}
