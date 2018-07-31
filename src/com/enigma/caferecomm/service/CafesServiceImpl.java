package com.enigma.caferecomm.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.spark.sql.SparkSession;

import com.enigma.caferecomm.dao.BookmarksDAO;
import com.enigma.caferecomm.dao.CafeFacilsDAO;
import com.enigma.caferecomm.dao.CafePicsDAO;
import com.enigma.caferecomm.dao.CafeRatingsDAO;
import com.enigma.caferecomm.dao.CafeTagsDAO;
import com.enigma.caferecomm.dao.CafesDAO;
import com.enigma.caferecomm.dao.ChairsDAO;
import com.enigma.caferecomm.dao.MenusDAO;
import com.enigma.caferecomm.dao.PlugsDAO;
import com.enigma.caferecomm.dao.ReviewsDAO;
import com.enigma.caferecomm.dao.TablesDAO;
import com.enigma.caferecomm.vo.Bookmark;
import com.enigma.caferecomm.vo.Cafe;
import com.enigma.caferecomm.vo.CafeFacil;
import com.enigma.caferecomm.vo.CafePic;
import com.enigma.caferecomm.vo.CafeRating;
import com.enigma.caferecomm.vo.CafeTag;
import com.enigma.caferecomm.vo.Chair;
import com.enigma.caferecomm.vo.Menu;
import com.enigma.caferecomm.vo.Plug;
import com.enigma.caferecomm.vo.Review;
import com.enigma.caferecomm.vo.Search;
import com.enigma.caferecomm.vo.Table;
import com.enigma.caferecomm.vo.User;

public class CafesServiceImpl implements CafesService {


	private CafesDAO cafesDAO;
	private CafeFacilsDAO cafeFacilsDAO;
	private CafePicsDAO cafePicsDAO;
	private MenusDAO menusDAO;
	private ReviewsDAO reviewsDAO;
	private BookmarksDAO bookmarksDAO;
	private PlugsDAO plugsDAO;
	private ChairsDAO chairsDAO;
	private TablesDAO tablesDAO;
	private CafeTagsDAO cafeTagsDAO;
	private CafeRatingsDAO cafeRatingsDAO;

	public void setCafesDAO(CafesDAO cafesDAO) {
		this.cafesDAO = cafesDAO;
	}
	public void setCafeFacilsDAO(CafeFacilsDAO cafeFacilsDAO) {
		this.cafeFacilsDAO = cafeFacilsDAO;
	}
	public void setCafePicsDAO(CafePicsDAO cafePicsDAO) {
		this.cafePicsDAO = cafePicsDAO;
	}
	public void setMenusDAO(MenusDAO menusDAO) {
		this.menusDAO = menusDAO;
	}
	public void setReviewsDAO(ReviewsDAO reviewsDAO) {
		this.reviewsDAO = reviewsDAO;
	}
	public void setBookmarksDAO(BookmarksDAO bookmarksDAO) {
		this.bookmarksDAO = bookmarksDAO;
	}
	public void setChairsDAO(ChairsDAO chairsDAO) {
		this.chairsDAO = chairsDAO;
	}
	public void setPlugsDAO(PlugsDAO plugsDAO) {
		this.plugsDAO = plugsDAO;
	}
	public void setTablesDAO(TablesDAO tablesDAO) {
		this.tablesDAO = tablesDAO;
	}
	public void setCafeTagsDAO(CafeTagsDAO cafeTagsDAO) {
		this.cafeTagsDAO = cafeTagsDAO;
	}
	public void setCafeRatingsDAO(CafeRatingsDAO cafeRatingsDAO) {
		this.cafeRatingsDAO = cafeRatingsDAO;
	}
	
	@Override
	public Map<String, Object> cafeInfo(Search searchCon) {
		Search contain = new Search();
		List<CafeFacil> cafeFacil = null;
		String Str = new String(searchCon.getSearch());
		String firstSearch = ("%" + Str + "%");
		searchCon.setFirstSearch(firstSearch);
		searchCon.setSearchType(0);

		List<Search> firstList = cafesDAO.selectFirstCafeInfo(searchCon);
		if (firstList.get(0).getNo() != 0) {
			searchCon.setSearchType(1);
		}

		List<Search> secondList = cafesDAO.selectSecondCafeInfo(searchCon);
		if (secondList.get(0).getNo() != 0) {
			searchCon.setSearchType(2);
		}

		List<Search> list = cafesDAO.selectThirdCafeInfo(searchCon);

		int count = list.size();

		Map<String, Object> map = new HashMap<>();
		ArrayList<Integer> li = new ArrayList<Integer>();

		for (int i = 0; i < count; i++) {
			li.add(list.get(i).getNo());
		} // 카페번호를 가지고옴

		map.put("cafeNo", li);
		map.put("cafeList", list);
		map.put("count", count);
		for (Integer cafeNo : li) {
			cafeFacil = cafeFacilsDAO.facilList(cafeNo);
		}
		map.put("facilList", cafeFacil);
		return map;
	}
	
	//박성배 작성 끝

	

	
	@Override
	public HashMap<String, Object> getCafeInfo(int cafeNo, int userNo) {
		// TODO Auto-generated method stub
		
		HashMap<String, Object> cafeMap = new HashMap<String, Object>();
		
		Cafe cafe = cafesDAO.getCafeDetail(cafeNo);
		List<CafeFacil> cafeFacils = cafeFacilsDAO.selectCafeFacils(cafeNo);
		List<CafePic> cafePics = cafePicsDAO.selectCafePics(cafeNo);
		List<Menu> menus = menusDAO.selectMenus(cafeNo);
		List<Review> reviews = reviewsDAO.selectReviews(cafeNo);
		
		//북마크 여부 확인
		Bookmark bookmark = new Bookmark(); //db로 보낼 정보 담을 bookmark 객체 생성
		bookmark.setUserNo(userNo);
		bookmark.setBookmarkNo(cafeNo);
		bookmark.setType(1); //카페 : 1, 좌석 : 2
		
		Bookmark bookmarkFromDB = bookmarksDAO.selectOneBookmark(bookmark);
				
		cafeMap.put("cafe", cafe);
		cafeMap.put("cafeFacils", cafeFacils);
		cafeMap.put("cafePics", cafePics);
		cafeMap.put("menus", menus);
		cafeMap.put("reviews", reviews);
		cafeMap.put("bookmarkFromDB", bookmarkFromDB);
		cafeMap.put("plugList", plugsDAO.selectPlugList(cafeNo));
		cafeMap.put("tableList", tablesDAO.selectTableList(cafeNo));
		cafeMap.put("tagList",cafeTagsDAO.selectTags(cafeNo));
		List<Chair> list = chairsDAO.selectChairList(cafeNo);
		
		Map<String, Object> map = new HashMap<>();
		
		map.put("userNo", userNo);
		map.put("cafeNo", cafeNo);
		cafeMap.put("userPred", cafeRatingsDAO.selectUserPredRating(map));
		System.out.println("예상점수ㅁ:"+cafeRatingsDAO.selectUserPredRating(map));
		
		List<Bookmark> bookmarkList = new ArrayList<>();
		for(Chair chair:list) {
			Bookmark chairBookmark = new Bookmark(); //db로 보낼 정보 담을 bookmark 객체 생성
			chairBookmark.setUserNo(userNo);
			chairBookmark.setBookmarkNo(chair.getNo());
			chairBookmark.setType(2); //카페 : 1, 좌석 : 2
			
			Bookmark bookmarkFromDB1 = bookmarksDAO.selectOneBookmark(chairBookmark);
			if(bookmarkFromDB1 != null) {
				//1이면 북마크 한 좌석
				chair.setBookmark(1);
			}
			else {
				chair.setBookmark(2);
			}
		}
		cafeMap.put("chairList", list);
		
		return cafeMap;
		
	}
	
	@Override
	public boolean addBookmark(Bookmark bookmark) {
		// TODO Auto-generated method stub
		return (1==bookmarksDAO.insertBookmark(bookmark));
	}
	
	@Override
	public boolean deleteBookmark(Bookmark bookmark) {
		// TODO Auto-generated method stub
		return (1==bookmarksDAO.deleteBookmark(bookmark));
	}
	
	
	@Override
	public Map<String, Object> getModifyInfo(int no) {

		Map<String, Object> map = new HashMap<>();
		map.put("cafe", cafesDAO.selectModify(no));
		map.put("facilityList", cafeFacilsDAO.registerFacils(no));
		map.put("cafePicList",cafePicsDAO.selectCafePics(no));
		map.put("menuList", menusDAO.selectMenus(no));
		map.put("plugList", plugsDAO.selectPlugList(no));
		map.put("chairList", chairsDAO.selectChairList(no));
		map.put("tableList", tablesDAO.selectTableList(no));
		return map;
	}
	
	@Override
	public int uploadCafe(Cafe cafe, String[] facils, String[] picName, int repPic,
			String[] menuName, String[] menuPrice, String[] menuType, String[] menuInfo, String [] menuPic,
			String[] outletCount, String[] plugX, String[] plugY, 
			String[] chairPic, String[] radius, String[] x, String[] y, int[] idx,
			String[] ex, String[] ey, String[] sx, String[] sy,HttpSession session, int flag) {
		User user = (User)session.getAttribute("loginUser");
		cafe.setOwnerNo(user.getNo());
		//입력
		if(flag == 1) {
			//카페입력
			cafesDAO.cafeResister(cafe);
		}else { //업데이트
			cafesDAO.cafeUpdate(cafe);
			
			//기존 자료들 삭제
			int cafeNo = cafe.getNo();

		}


		
		int cafeNo = cafe.getNo();
		if(facils !=null) {
			//카페시설입력
			cafeFacilsDAO.deleteCafeFacil(cafeNo);
			for(int i = 0 ; i<facils.length ; i++) {
				CafeFacil cafeFacil = new CafeFacil();
				cafeFacil.setCafeNo(cafeNo);
				cafeFacil.setFacilityNo(Integer.parseInt(facils[i]));
				
				cafeFacilsDAO.insertCafeFacil(cafeFacil);
			}
		}

		if(picName!=null) {
			//카페 사진입력
			cafePicsDAO.deleteCafePic(cafeNo);
			for(int i = 0 ; i<picName.length ; i++) {
				CafePic cafePic = new CafePic();
				cafePic.setCafeNo(cafeNo);
				cafePic.setName(picName[i]);
				if(i==repPic) {
					cafePic.setRepPic(1);
				}else {
					cafePic.setRepPic(2);
				}
				
				cafePicsDAO.insertCafePic(cafePic);
			}
		}

		if(menuName !=null) {
			//메뉴 입력
			menusDAO.deleteMenu(cafeNo);
			for(int i=0 ; i<menuName.length ; i++) {
				Menu menu = new Menu();
				
				menu.setType(Integer.parseInt(menuType[i]));
				menu.setName(menuName[i]);
				menu.setPrice(menuPrice[i]);
				menu.setInfo(menuInfo[i]);
				menu.setPic(menuPic[i]);
				menu.setCafeNo(cafeNo);
				
				menusDAO.insertMenu(menu);
			}
		}
		
		



		if(plugX !=null) {
			//플러그 입력
			plugsDAO.deletePlugs(cafeNo);
			for(int i=0 ; i<plugX.length ; i++) {
				Plug plug = new Plug();
				
				plug.setX(plugX[i]);
				plug.setY(plugY[i]);
				plug.setCount(Integer.parseInt(outletCount[i]));
				plug.setCafeNo(cafeNo);
				
				plugsDAO.insertPlugs(plug);
				
			}
		}

		if(radius != null ) {
			//좌석 입력
			chairsDAO.deleteChairs(cafeNo);
			for(int i=0 ; i<x.length ; i++) {
				Chair chair = new Chair();
				
				chair.setPic(chairPic[i]);
				chair.setRadius(radius[i]);
				chair.setX(x[i]);
				chair.setY(y[i]);
				chair.setIdx(idx[i]);
				chair.setCafeNo(cafeNo);
				chairsDAO.insertChairs(chair);
			}
		}

		if(ex != null) {
			//테이블 입력
			tablesDAO.deleteTables(cafeNo);
			for(int i=0 ; i<ex.length ; i++) {
				Table table = new Table();
				table.setEx(ex[i]);
				table.setEy(ey[i]);
				table.setSx(sx[i]);
				table.setSy(sy[i]);
				table.setCafeNo(cafeNo);
				tablesDAO.insertTables(table);
			}
		}

		
		return cafeNo;
	}
	@Override
	public List<CafeRating> getRecommCafe(int userNo) {
		return cafeRatingsDAO.selectCafes(userNo);
	}
	
}
