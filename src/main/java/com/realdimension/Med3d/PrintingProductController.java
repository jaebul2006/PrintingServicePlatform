package com.realdimension.Med3d;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import com.realdimension.Med3d.VO.PrintProductCompaniesVO;
import com.realdimension.Med3d.service.AccountService;
import java.util.List;
import com.realdimension.Med3d.service.PrintProductCompaniesService;

// 회원대상으로의 제품 제작 신청과 관련된 콘트롤러
@Controller
public class PrintingProductController {

	@Autowired
	PrintProductCompaniesService printproduct_service;
	
	@GetMapping(value = "/PrintingProductHome")
	public ModelAndView PrintingProductHome() throws Exception
	{
		List<PrintProductCompaniesVO> cast_splint_companies = printproduct_service.CastSplintCompaniesList();
		List<PrintProductCompaniesVO> brace_companies = printproduct_service.BraceCompaniesList();
		List<PrintProductCompaniesVO> insole_companies = printproduct_service.InsoleCompaniesList();
		ModelAndView mav = new ModelAndView("/PrintingProductHome");
		mav.addObject("cast_splint_companies", cast_splint_companies);
		mav.addObject("brace_companies", brace_companies);
		mav.addObject("insole_companies", insole_companies);
		return mav;
	}
	
	// 해당 제품군에 등록된 업체 목록을 가져온다
	@GetMapping(value = "/CastSplintCompaniesList")
	public ModelAndView CastSplintCompanies(HttpServletRequest request) throws Exception
	{
		List<PrintProductCompaniesVO> companies = printproduct_service.CastSplintCompaniesList();
		ModelAndView mav = new ModelAndView("/CastSplintCompaniesList");
		mav.addObject("companies", companies);
		return mav;
	}
	
	@GetMapping(value = "/auth/CastSplintCompanyRegistForm")
	public ModelAndView CastSplintCompanyRegistForm()
	{
		ModelAndView mav = new ModelAndView("/CastSplintCompanyRegistForm");
		return mav;
	}
	
	// 해당 제품 업체로 등록한다
	@Transactional
	@PostMapping(value = "/auth/CastSplintCompanyRegist")
	public ModelAndView CastSplintCompanyRegist(HttpServletRequest request, 
			@RequestParam("com_num")String com_num, 
			@RequestParam("com_name")String com_name, @RequestParam("represen_name")String represen_name,
			@RequestParam("represen_num")String represen_num, @RequestParam("region")String region) throws Exception
	{
		// 중복 account_id 에 대해서는 에러처리가 필요하다
		PrintProductCompaniesVO vo = new PrintProductCompaniesVO();
		vo.setAccount_id(request.getSession().getAttribute("id").toString());
		vo.setCom_num(com_num);
		String hcom_name = new String(com_name.getBytes("8859_1"), "UTF-8");
		vo.setCom_name(hcom_name);
		String hrepresen_name = new String(represen_name.getBytes("8859_1"), "UTF-8");
		vo.setRepresen_name(hrepresen_name);
		vo.setRepresen_num(represen_num);
		String hregion = new String(region.getBytes("8859_1"), "UTF-8");
		vo.setRegion(hregion);
		printproduct_service.CastSplintCompanyRegist(vo);
		ModelAndView mav = new ModelAndView("/PrintingProductHome");
		return mav;
	}

	@GetMapping(value = "/BraceCompaniesList")
	public ModelAndView BraceCompaniesList(HttpServletRequest request) throws Exception
	{
		List<PrintProductCompaniesVO> companies = printproduct_service.BraceCompaniesList();
		ModelAndView mav = new ModelAndView("/BraceCompaniesList");
		mav.addObject("companies", companies);
		return mav;
	}
	
	@GetMapping(value = "/auth/BraceCompanyRegistForm")
	public ModelAndView BraceCompanyRegistForm()
	{
		ModelAndView mav = new ModelAndView("/BraceCompanyRegistForm");
		return mav;
	}
	
	@Transactional
	@PostMapping(value = "/auth/BraceCompanyRegist")
	public ModelAndView BraceCompanyRegist(HttpServletRequest request, 
			@RequestParam("com_num")String com_num, 
			@RequestParam("com_name")String com_name, @RequestParam("represen_name")String represen_name,
			@RequestParam("represen_num")String represen_num, @RequestParam("region")String region) throws Exception
	{
		PrintProductCompaniesVO vo = new PrintProductCompaniesVO();
		vo.setAccount_id(request.getSession().getAttribute("id").toString());
		vo.setCom_num(com_num);
		String hcom_name = new String(com_name.getBytes("8859_1"), "UTF-8");
		vo.setCom_name(hcom_name);
		String hrepresen_name = new String(represen_name.getBytes("8859_1"), "UTF-8");
		vo.setRepresen_name(hrepresen_name);
		vo.setRepresen_num(represen_num);
		String hregion = new String(region.getBytes("8859_1"), "UTF-8");
		vo.setRegion(hregion);
		printproduct_service.BraceCompanyRegist(vo);
		ModelAndView mav = new ModelAndView("/BraceCompaniesList");
		return mav;
	}
	
	@GetMapping(value = "/InsoleCompaniesList")
	public ModelAndView InsoleCompaniesList(HttpServletRequest request) throws Exception
	{
		List<PrintProductCompaniesVO> companies = printproduct_service.InsoleCompaniesList();
		ModelAndView mav = new ModelAndView("/InsoleCompaniesList");
		mav.addObject("companies", companies);
		return mav;
	}
	
	@GetMapping(value = "/auth/InsoleCompanyRegistForm")
	public ModelAndView InsoleCompanyRegistForm()
	{
		ModelAndView mav = new ModelAndView("/InsoleCompanyRegistForm");
		return mav;
	}
	
	@Transactional
	@PostMapping(value = "/auth/InsoleCompanyRegist")
	public ModelAndView InsoleCompanyRegist(HttpServletRequest request, 
			@RequestParam("com_num")String com_num, 
			@RequestParam("com_name")String com_name, @RequestParam("represen_name")String represen_name,
			@RequestParam("represen_num")String represen_num, @RequestParam("region")String region) throws Exception
	{
		PrintProductCompaniesVO vo = new PrintProductCompaniesVO();
		vo.setAccount_id(request.getSession().getAttribute("id").toString());
		vo.setCom_num(com_num);
		String hcom_name = new String(com_name.getBytes("8859_1"), "UTF-8");
		vo.setCom_name(hcom_name);
		String hrepresen_name = new String(represen_name.getBytes("8859_1"), "UTF-8");
		vo.setRepresen_name(hrepresen_name);
		vo.setRepresen_num(represen_num);
		String hregion = new String(region.getBytes("8859_1"), "UTF-8");
		vo.setRegion(hregion);
		printproduct_service.InsoleCompanyRegist(vo);
		ModelAndView mav = new ModelAndView("/InsoleCompaniesList");
		return mav;
	}
	
}
