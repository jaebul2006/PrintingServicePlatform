package com.realdimension.Med3d;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.realdimension.Med3d.service.AccountService;
import com.realdimension.Med3d.service.HospitalService;
import com.realdimension.Med3d.VO.accountVO;
import com.realdimension.Med3d.VO.hospitalVO;
import com.realdimension.Med3d.VO.patientVO;
import com.realdimension.Med3d.VO.personalVO;

import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;
import com.realdimension.Med3d.VO.accountVO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
public class AccountController {

	private static final Logger logger = LoggerFactory.getLogger(AccountController.class);
	
	@Autowired
	AccountService account_service;
	
	@Autowired
	HospitalService hospital_service;
	
	/*
	@RequestMapping(value="/LogoutTry", method=RequestMethod.GET)
	public ModelAndView LogoutTry(HttpServletRequest request) throws Exception
	{
		request.getSession().removeAttribute("id");
		ModelAndView mav = new ModelAndView("/main");
		mav.addObject("msg", "로그아웃 되었습니다");
		return mav;
	}
	*/
	
	@RequestMapping(value = "/login", method=RequestMethod.GET)
	public void login(HttpSession session)
	{
		
	}
	
	@RequestMapping(value = "/logoutDo", method=RequestMethod.POST)
	public ModelAndView logoutDo(HttpServletRequest request, HttpServletResponse response)
	{	
		request.getSession().removeAttribute("id");
		ModelAndView mav = new ModelAndView("/main");
		mav.addObject("msg", "로그아웃 되었습니다");
		return mav;
	}
	
	@RequestMapping(value = "/login_success", method=RequestMethod.GET)
	public ModelAndView login_success(HttpSession session) 
	{
		session.setAttribute("session_login", "session_login");
		logger.info("######################################로그인 세션 is {}.", session);
		ModelAndView mav = new ModelAndView("/PrevManager");
		return mav;
	}
	
	@RequestMapping(value = "/", method=RequestMethod.GET)
	public String index(HttpSession session) 
	{
		return "PrevManager";
	}
	
	@RequestMapping(value = "/login_fail", method=RequestMethod.GET)
	public String login_fail(HttpServletRequest request) 
	{
		logger.info("로그인실패");
		return "login";
	}

	@RequestMapping(value = "/CategoryMain", method=RequestMethod.GET)
	public ModelAndView CategoryMain(HttpServletRequest request, @RequestParam("id")String id) throws Exception
	{
		String group_type = account_service.AccountType(id);
		
		if(group_type.equals("producer")) {
			ModelAndView mav = new ModelAndView("/ProducerMain");
			return mav;
		}
		else if(group_type.equals("hospital")) {
			// 병원이름 쿼리
			hospitalVO hospital_vo = account_service.getHospital(id);
			String account_id = hospital_vo.getAccount_id();
			String hospital_name = hospital_vo.getName();
			// 환자 총목록 쿼리
			List<patientVO> patients = hospital_service.getPatients(id);
			
			ModelAndView mav = new ModelAndView("/HospitalMain");
			mav.addObject("account_id", account_id);
			mav.addObject("hospital_name", hospital_name);
			mav.addObject("patients", patients);
			return mav;
		}
		else {
			ModelAndView mav = new ModelAndView("/PersonalMain");
			return mav;
		}
	}
	
	// 회원가입을 위한 폼페이지로 이동
	@RequestMapping(value = "/RegistForm", method=RequestMethod.GET)
	public ModelAndView RegistForm(HttpServletRequest request) 
	{
		ModelAndView mav = new ModelAndView("/RegistForm");
		return mav;
	}
	
	// 회원가입처리
	@Transactional
	@PostMapping(value = "/RegistAccount")
	public ModelAndView RegistAccount(HttpServletRequest request) throws Exception
	{
		String id = request.getParameter("id");
		String password = request.getParameter("password");
		String typeAccount = request.getParameter("typeAccount");
		String account_name = new String(request.getParameter("account_name").getBytes("8859_1"), "UTF-8");
		
		accountVO account_vo = new accountVO();
		account_vo.setId(id);
		account_vo.setPass(password);
		account_vo.setAccount_name(account_name);
		account_vo.setGroup_type(typeAccount);
		account_service.RegistAccount(account_vo);
		
		if(typeAccount.equals("hospital")) {
			// 병원이름, 주소
			String name = new String(request.getParameter("hospital_name").getBytes("8859_1"), "UTF-8");
			String address = new String(request.getParameter("hospital_address").getBytes("8859_1"), "UTF-8");
			hospitalVO hospital_vo = new hospitalVO();
			hospital_vo.setAccount_id(id);
			hospital_vo.setId(UUID.randomUUID().toString());
			hospital_vo.setName(name);
			hospital_vo.setAddress(address);
			account_service.InsHospital(hospital_vo);
		}
		else if(typeAccount.equals("personal")) {
			// 이름, 나이, 성별
			String name = request.getParameter("personal_name");
			String age = request.getParameter("personal_age");
			String sex = request.getParameter("sexRadio");
			personalVO personal_vo = new personalVO();
			account_service.InsPersonal(personal_vo);
		}
		else {
			// 관리자인데 굳이 필요x
		}
		
		ModelAndView mav = new ModelAndView("/RegistForm");
		return mav;
	}
	
	@RequestMapping(value = "/RegistPatientForm", method=RequestMethod.GET)
	public ModelAndView RegistPatientForm(HttpServletRequest request) 
	{
		ModelAndView mav = new ModelAndView("/RegistPatientForm");
		mav.addObject("id", request.getParameter("id"));
		return mav;
	}
	
	// 환자등록
	@Transactional
	@RequestMapping(value = "/RegistPatient", method=RequestMethod.POST)
	public ModelAndView RegistPatient(HttpServletRequest request) throws Exception
	{
		String account_id = request.getParameter("id");
		String id = UUID.randomUUID().toString();
		String name = new String(request.getParameter("name").getBytes("8859_1"), "UTF-8");
		String birth =request.getParameter("birth");
		String sex = request.getParameter("sex");
		int age = Integer.parseInt(request.getParameter("age"));
		
		patientVO vo = new patientVO();
		vo.setAccount_id(account_id);
		vo.setId(id);
		vo.setName(name);
		vo.setBirth(birth);
		vo.setSex(sex);
		vo.setAge(age);
		hospital_service.insPatient(vo);
		
		ModelAndView mav = new ModelAndView("/RegistPatientForm");
		return mav;
	}
	
}
