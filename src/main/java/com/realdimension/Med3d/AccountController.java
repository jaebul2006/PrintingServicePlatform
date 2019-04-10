package com.realdimension.Med3d;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.realdimension.Med3d.service.AccountService;
import com.realdimension.Med3d.VO.accountVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class AccountController {

	@Autowired
	AccountService account_service;
	
	@Transactional
	@PostMapping(value = "/RegistAccount")
	public ModelAndView RegistAccount(@RequestParam("id")String id, @RequestParam("pass")String pass, 
			@RequestParam("account_name")String account_name,
			@RequestParam("type")String type
			) throws Exception
	{
		int count = account_service.AccountCnt(id);
		ModelAndView mav = new ModelAndView("/UserLogin");
		
		if(count > 0) {
			System.out.println("존재하는 id");
			return mav;
		}
		else {
			System.out.println("신규 id 등록");
			accountVO new_account = new accountVO();
			new_account.setId(id);
			new_account.setPass(pass);
			new_account.setAccount_name(account_name);
			new_account.setType(type);
			account_service.RegistAccount(new_account);
			return mav;
		}
	}
	
	@RequestMapping(value="/LoginCheck", method=RequestMethod.POST)
	public String LoginCheck(HttpServletRequest request, HttpServletResponse response, 
			@RequestParam("id")String id, @RequestParam("pass")String pass) throws Exception
	{		
		accountVO login_account = new accountVO();
		login_account.setId(id);
		login_account.setPass(pass);
		
		// 올바른 유저정보라면 LoginInterceptor 에 세션검사를 통과하도록 id 란 key에 현재 계정의 id 값으로 값채움
		if(account_service.LoginCheck(login_account) > 0) {
			HttpSession session = request.getSession(true);
			session.setAttribute("id", id);
			return "main";
		}
		else {
			// 로그인 실패
			return "Login";
		}
	}
	
	@RequestMapping(value="/LogoutTry", method=RequestMethod.GET)
	public ModelAndView LogoutTry(HttpServletRequest request) throws Exception
	{
		request.getSession().removeAttribute("id");
		ModelAndView mav = new ModelAndView("/main");
		mav.addObject("msg", "로그아웃 되었습니다");
		return mav;
	}
	
}
