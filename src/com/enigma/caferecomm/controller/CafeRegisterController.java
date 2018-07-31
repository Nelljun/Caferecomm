package com.enigma.caferecomm.controller;

import java.io.File;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.enigma.caferecomm.service.CafesService;
import com.enigma.caferecomm.util.ResizeImageUtil;
import com.enigma.caferecomm.vo.Cafe;
import com.enigma.caferecomm.vo.Chair;
import com.enigma.caferecomm.vo.Table;
import org.springframework.validation.FieldError;


@Controller
public class CafeRegisterController {

	private CafesService cafeService;
	
	public void setCafeService(CafesService cafeService) {
		this.cafeService = cafeService;
	}
	
	@RequestMapping(value="/cafe/register", method=RequestMethod.GET)
	public String cafeRegister() {
		
		return "register";
	}
	@RequestMapping(value="/cafe/modify/{no}", method=RequestMethod.GET)
	public String cafeModify(Model model, @PathVariable int no) {
		
		model.addAllAttributes(cafeService.getModifyInfo(no));
		
		return "register";
	}
	
	@RequestMapping(value="/cafe", method=RequestMethod.POST)
	public String cafeRegister(Cafe cafe, String[] facils, String[] picName, int repPic,
			String[] menuName, String[] menuPrice, String[] menuType, String[] menuInfo, String [] menuPic,
			String[] outletCount, String[] plugX, String[] plugY, 
			String[] chairPic, String[] radius, String[] x, String[] y, int[] idx,
			String[] ex, String[] ey, String[] sx, String[] sy,HttpSession session) {
		int flag = 1;
/*		System.out.println(cafe.getName());
		System.out.println(cafe.getBranch());
		System.out.println(cafe.getType());
		System.out.println(cafe.getPhone());
		System.out.println(cafe.getOpenTime());
		System.out.println(cafe.getAddress());
		System.out.println(cafe.getSido());
		System.out.println(cafe.getSigungu());
		System.out.println(cafe.getLat());
		System.out.println(cafe.getLng());
		System.out.println(cafe.getRegNo());
		System.out.println(cafe.getRegPic());
		System.out.println(cafe.getFloorPlanPic());
		
		for(int i=0 ; i<facils.length ; i++) {
			System.out.println("facils : "+facils[i]);
		}
		
		for(int i=0 ; i<picName.length ; i++) {
			System.out.println("picName :"+ picName[i]);
		}
		System.out.println("repPic :"+repPic);
		for(int i=0 ; i<picName.length ; i++) {
			System.out.println("picName : "+picName[i]);
		}
		for(int i=0 ; i<menuName.length ; i++) {
			System.out.println("menuName : "+menuName[i]);
		}
		
		for(int i=0 ; i<menuPrice.length ; i++) {
			System.out.println("menuPrice : "+menuPrice[i]);
		}
		
		for(int i=0 ; i<menuType.length ; i++) {
			System.out.println("menuType : "+menuType[i]);
		}
		
		for(int i=0 ; i<menuInfo.length ; i++) {
			System.out.println("menuInfo : "+menuInfo[i]);
		}
		for(int i=0 ; i<menuPic.length ; i++) {
			System.out.println("menuPic : "+menuPic[i]);
		}
		
		for(int i=0 ; i<outletCount.length ; i++) {
			System.out.println("outletCount : "+outletCount[i]);
		}
		
		for(int i=0 ; i<plugX.length ; i++) {
			System.out.println("plugX : "+plugX[i]);
		}
		
		for(int i=0 ; i<plugY.length ; i++) {
			System.out.println("plugY : "+plugY[i]);
		}
		for(int i=0 ; i<chairPic.length ; i++) {
			System.out.println("chairPic : "+chairPic[i]);
		}
		for(int i=0 ; i<radius.length ; i++) {
			System.out.println("radius : "+radius[i]);
		}
		for(int i=0 ; i<x.length ; i++) {
			System.out.println("x : "+x[i]);
		}
		
		for(int i=0 ; i<y.length ; i++) {
			System.out.println("y : "+y[i]);
		}
		
		for(int i=0 ; i<idx.length ; i++) {
			System.out.println("idx : "+idx[i]);
		}
		
		for(int i=0 ; i<ex.length ; i++) {
			System.out.println("ex : "+ex[i]);
		}
		
		for(int i=0 ; i<ey.length ; i++) {
			System.out.println("ey : "+ey[i]);
		}
		
		for(int i=0 ; i<sx.length ; i++) {
			System.out.println("sx : "+sx[i]);
		}
		
		for(int i=0 ; i<sy.length ; i++) {
			System.out.println("sy : "+sy[i]);
		}*/
		int cafeNo = cafeService.uploadCafe(cafe, facils, picName, repPic, menuName, menuPrice, menuType, 
				menuInfo, menuPic, outletCount, plugX, plugY, chairPic, radius, x, y, idx, ex, ey, sx, sy,session,flag);
		
		return "redirect:/cafe/"+ cafeNo;
	}
	@RequestMapping(value="/cafe", method=RequestMethod.PUT)
	public String cafeModify(Cafe cafe, String[] facils, String[] picName, int repPic,
			String[] menuName, String[] menuPrice, String[] menuType, String[] menuInfo, String [] menuPic,
			String[] outletCount, String[] plugX, String[] plugY, 
			String[] chairPic, String[] radius, String[] x, String[] y, int[] idx,
			String[] ex, String[] ey, String[] sx, String[] sy,HttpSession session,BindingResult result) {
		
		System.out.println("에러갯수 : "+result.getErrorCount());

		List<FieldError> list = result.getFieldErrors();
		for(FieldError error: list) {
		System.out.println(error.getField()+", "+error.getCode());
		}
		int flag = 2;
/*		//System.out.println(chairPic.length);
		System.out.println("들어옴");
		System.out.println(cafe.getName());
		System.out.println(cafe.getBranch());
		System.out.println(cafe.getType());
		System.out.println(cafe.getPhone());
		System.out.println(cafe.getOpenTime());
		System.out.println(cafe.getAddress());
		System.out.println(cafe.getSido());
		System.out.println(cafe.getSigungu());
		System.out.println(cafe.getLat());
		System.out.println(cafe.getLng());
		System.out.println(cafe.getRegNo());
		System.out.println(cafe.getRegPic());
		System.out.println(cafe.getFloorPlanPic());
		
		for(int i=0 ; i<facils.length ; i++) {
			System.out.println("facils : "+facils[i]);
		}
		
		for(int i=0 ; i<picName.length ; i++) {
			System.out.println("picName :"+ picName[i]);
		}
		System.out.println("repPic :"+repPic);

		for(int i=0 ; i<menuName.length ; i++) {
			System.out.println("menuName : "+menuName[i]);
		}
		
		for(int i=0 ; i<menuPrice.length ; i++) {
			System.out.println("menuPrice : "+menuPrice[i]);
		}
		
		for(int i=0 ; i<menuType.length ; i++) {
			System.out.println("menuType : "+menuType[i]);
		}
		
		for(int i=0 ; i<menuInfo.length ; i++) {
			System.out.println("menuInfo : "+menuInfo[i]);
		}
		for(int i=0 ; i<menuPic.length ; i++) {
			System.out.println("menuPic : "+menuPic[i]);
		}
		
		for(int i=0 ; i<outletCount.length ; i++) {
			System.out.println("outletCount : "+outletCount[i]);
		}
		
		for(int i=0 ; i<plugX.length ; i++) {
			System.out.println("plugX : "+plugX[i]);
		}
		
		for(int i=0 ; i<plugY.length ; i++) {
			System.out.println("plugY : "+plugY[i]);
		}
		for(int i=0 ; i<chairPic.length ; i++) {
			System.out.println("chairPic : "+chairPic[i]);
		}
		for(int i=0 ; i<radius.length ; i++) {
			System.out.println("radius : "+radius[i]);
		}
		for(int i=0 ; i<x.length ; i++) {
			System.out.println("x : "+x[i]);
		}
		
		for(int i=0 ; i<y.length ; i++) {
			System.out.println("y : "+y[i]);
		}
		
		for(int i=0 ; i<idx.length ; i++) {
			System.out.println("idx : "+idx[i]);
		}
		
		for(int i=0 ; i<ex.length ; i++) {
			System.out.println("ex : "+ex[i]);
		}
		
		for(int i=0 ; i<ey.length ; i++) {
			System.out.println("ey : "+ey[i]);
		}
		
		for(int i=0 ; i<sx.length ; i++) {
			System.out.println("sx : "+sx[i]);
		}
		
		for(int i=0 ; i<sy.length ; i++) {
			System.out.println("sy : "+sy[i]);
		}
		*/
		cafeService.uploadCafe(cafe, facils, picName, repPic, menuName, menuPrice, menuType, 
				menuInfo, menuPic, outletCount, plugX, plugY, chairPic, radius, x, y, idx, ex, ey, sx, sy,session,flag);
		
		return "redirect:/cafe/"+ cafe.getNo();
	}
	
	
	
	@RequestMapping(value="/ajax/uploadPic", method=RequestMethod.POST)
	@ResponseBody
	public String uploadPic(MultipartFile upload,HttpServletRequest request, String imgPath) throws Exception {
		
		// 1) ServletContext얻기
		ServletContext sc = request.getServletContext();

		// 2) 기본경로 얻기
		String path = sc.getRealPath("");

		// 3) upload경로
		String uploadPath = path + "img" + File.separator + imgPath + File.separator;


		// 5) 고유한 값을 위한 UUID
		UUID uuid = UUID.randomUUID();

		String ext = upload.getOriginalFilename();

		int dotIdx = ext.lastIndexOf(".");

		ext = ext.substring(dotIdx, ext.length());

		System.out.println(ext);

		String fileName = uuid + ext;

		// 6) 경로+파일이름
		String fullPath = uploadPath + fileName;

		// 7) 실제 생성될 파일
		File file = new File(fullPath);

		// 8) 파일 옮기기
		upload.transferTo(file);
		System.out.println("파일 생성 성공");

		
		return "{\"src\":\"" + fileName + "\"}";

	}
	
	@RequestMapping(value="/ajax/deletePic", method=RequestMethod.DELETE)
	@ResponseBody
	public void deletePic(String name,HttpServletRequest request, String imgPath) {
		// 1) ServletContext얻기
		ServletContext sc = request.getServletContext();
		// 2) 기본경로 얻기
		String path = sc.getRealPath("");

		// 3) upload경로
		String uploadPath = path + "img" + File.separator + imgPath + File.separator;

		
		  try {
			    File fileEx = new File(uploadPath);
			    if (fileEx.exists()) {fileEx.delete();}

		  } catch (Exception e) {
		    	e.printStackTrace();

		  }

	}
}
